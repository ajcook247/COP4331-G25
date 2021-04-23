require('express');
require('mongodb');

const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = require('react-dom');
const jwt = require('./createJWT');
const jwt2 = require('jsonwebtoken');
const { db } = require('./models/user.js');
const User = require("./models/user.js");
const task = require("./models/task.js");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const Collections = require("./models/collection.js");
var ObjectId = require('mongodb').ObjectId;
const app_name = 's21l-g25';

function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }   
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}

function buildPath2(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }   
    else
    {        
        return 'http://localhost:3000/' + route;
    }
}




	function doVerified(emailToken) {
			console.log("aaaa");
			db.collection('Users').updateOne({EmailToken:emailToken}, {$set: {Verified:true}});
		}
	


async function handlePasswordReset(username, password){
	

	var obj = {login: username, password: password}
	var js = JSON.stringify(obj);
	
	try {
		
		let response = await fetch(buildPath('api/PasswordReset'),{
				method:'POST',
				body : js,
				headers:{
					'Content-Type':'application/json'
				}   
				
		});
		alert(response);
		

		var res = JSON.parse(await response.text());
		console.log(res);
		alert(res);
		alert("res");
		
		if(res.error)
		{
			alert('hulk2' );
			console.log(res.error);       
		}else{
			alert('hulk' );

			storage.storeToken(res);
			var tok = storage.retrieveToken();
			var ud = jwt.decode(tok,{complete:true});
			console.log(ud.payload);
			window.location.href = '/';
			this.props.changeToLoggedIn(this.state.username);
		}

	}

	catch(e){
	  //  console.log(e);
		return;
	}

}

//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


exports.setApp = function(app, client)
{
    const transporter = nodemailer.createTransport(sendgridTransport({

        auth:{
          api_key:"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"
        }
      
    }))

    app.post('/api/reset-password',(req, res)=>{
        crypto.randomBytes(32,(err,buffer)=>{
          if(err){
            console.log(err);
          }
          const token = buffer.toString("hex");
          const { login, password, email, Verified} = req.body;
          try
          {
              console.log("lis");

			  const results =  db.collection('Users').findOne({Email:email}).then(user=>{
				if(!user){
					return res.statis(422).json({error:"User with that email does not exist"})

				}
				ret = jwt.createToken(user.Name, user._id);
			  })
      
              transporter.sendMail({
                to: email,
                from: "bdreamywebsite@hotmail.com",
                subject: "B_DREAMY : passwrod reset",
                html:`
                <h1>Password reset</h1>
                <h4>To reset password : <a href =${buildPath2('resetpassword')}> reset </a> </h4>
               `
              }, function (err, data) {
				if (err) {
				  console.log("error", err);
				} else {
				  console.log("email sent!");
				}
			  })
      
              res.json({message: "check your email"})
      
              console.log("lis");
      
              // newUser.save();
          }
          catch(e)
          {
      
            console.log("what");
        
              error = e.message;
              console.log(e.message);
          }
         // var ret = {error:email};
          //res.status(200).json(ret);
          
        })
      })

	  app.post('/api/PasswordReset', async (req, res, next) =>
	  {
		var error = '';

        const {login, password} = req.body;
        // db = client.db();
        // const results = await User.find({ Login: login, Password: password });
        const results = await db.collection('Users').find({Login:login}).toArray(); 
		
		var email = results[0].Email;

        var id = -1;
        var name = '';

        if(results.length > 0)
        {
            id = results[0]._id;
            name = results[0].Name;
            try
            {
				const result = db.collection('Users').findOneAndUpdate({Email : email}, {$set: {Password: password}});
                // ret = {"id":id, "name":name};
                ret = jwt.createToken(name, id);
            }
            catch(e)
            {
                ret = {error:e.message};
            }

        }else{
            ret = {error:"Check your credential pleaseeeSSSS!"};
        }

       

        res.status(200).json(ret);
	  });//end login

    app.post('/api/login', async (req, res, next) =>
    {
        var error = '';
		//console.log("sdasdasdasd");
        const {login, password} = req.body;
        // db = client.db();
        // const results = await User.find({ Login: login, Password: password });
        const results = await db.collection('Users').find({Login:login, Password:password}).toArray();        
        var id = -1;
        var name = '';

		var verified = results[0].Verified;
        if(!verified){
            ret = {error:"Check your credential please!"};
            res.status(200).json(ret);
            return;
        }


        if(results.length > 0)
        {
            id = results[0]._id;
            name = results[0].Name;
            try
            {
                // ret = {"id":id, "name":name};
                ret = jwt.createToken(name, id);
            }
            catch(e)
            {
                ret = {error:e.message};
            }

        }else{
            ret = {error:"Check your credential pleaseeeSSSS!"};
        }

       

        res.status(200).json(ret);
    });//end login

	
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    app.post('/api/register', async (req, res, next) =>
    { 	
        var error = '';
        const { login, password, email, name} = req.body;

        // const results = await User.find()

        const newUser = new User({ Login: login, Password: password, Email : email, Name : name, Verified: false, EmailToken:crypto.randomBytes(64).toString('hex')});
        const duplicates = await db.collection('Users').find({Login:login}).toArray(); 
		var token = newUser.EmailToken;
		

        if(duplicates.length > 0){
            ret = {error:'Exists user, please change your username!'};
        }else{
			let link=`${buildPath('')}verify/${token}`;
			const msg = {
				to: newUser.Email,
				from: 'yuboli0403@gmail.com',
				subject: 'B-DREAMY : Confirm Email',
				html:`
				<h1>Hello, thanks for registering on our site.</h1>
				<p>lease click the link to verify:</p>
				<a href="${link}">Verify your account</a>
				

				`,
			};



            try
            {
                const result = await db.collection('Users').insertOne(newUser);
			//	db.collection('Users').updateOne({EmailToken:token.toString()}, {$set: {Verified:true}});

				try{
					await sgMail.send(msg);
				//ret = jwt.createToken(name, id);
               
				}
				catch(e){
				error = e.message;   
				}
	
			
            }
            catch(e)
            {
                error = e.message;
            }
        }
		var ret = {error:error};
        res.status(200).json(ret);
    });
    

	app.get('/verify/:token',async (req, res, next) =>
    {
        var err = '';

	//	const newUser = new User({ Login: "tttttt", Password: "ttt", Email : "ttt", Name : "ttt", Verified: false, EmailToken:crypto.randomBytes(64).toString('hex')});
		//const result = await db.collection('Users').insertOne(newUser);





		db.collection('Users').updateOne({EmailToken:req.params.token.toString()}, {$set: {Verified:true}});
		//res.redirect(buildPath(''));
        try
        {
            const results = await db.collection('Users').find({EmailToken:req.params.token}).toArray();
            if (results.length == 0)
            {
                var ret = { error: "No User Found" };      
				//req.flash('error','error');
            }
            else 
            {
				db.collection('Users').updateOne({EmailToken:req.params.token}, {$set: {Verified:true}});

                var ret = { error: err };      
                res.status(200).json(ret);
            }
        }
        catch (error)
        {
            console.log(error);
            err = error.toString();
            var ret = {error : err}
            res.status(200).json(ret);
        }   
    });









    app.post('/api/getList', async (req, res, next) =>
    {
		var error = '';

		const {id,jwtToken} = req.body;
		var list = [];
		var ObjectId = require('mongodb').ObjectID;
		var new_id = new ObjectId(id);

		if( jwt.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		

        try{
            list = await db.collection('Collections').find({UserId:new_id}).toArray();
        }
        catch(e){
            error = e.message;
        };
        
            
        var ret ={list:list,
                  error:error,
                };
		res.status(200).json(ret);
    });

	
	app.post('/api/showAll', async (req, res, next) =>
    {
		var error = '';
		var tasks = [];
        const {userId,jwtToken} = req.body;
       // const newList = new Collections({Name:name, UserId:userId});     
	   var ObjectId = require('mongodb').ObjectID;
	   var new_id = new ObjectId(userId);

        if( jwt.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			tasks = await db.collection('Tasks').find({UserId:new_id}).toArray();
		}
		catch(e)
		{
			error = e.message;
			//console.log(e.message);
		}
		
		var ret ={result:tasks,
			error:error,
		  };
		res.status(200).json(ret);

    });
	
	app.post('/api/showCompleted', async (req, res, next) =>
    {
		var error = '';
		var tasks = [];
        const {userId,jwtToken} = req.body;
       // const newList = new Collections({Name:name, UserId:userId});     
	   var ObjectId = require('mongodb').ObjectID;
	   var new_id = new ObjectId(userId);

        if( jwt.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			tasks = await db.collection('Tasks').find({UserId:new_id,Done:true}).toArray();
		}
		catch(e)
		{
			error = e.message;
			//console.log(e.message);
		}
		
		var ret ={result:tasks,
			error:error,
		  };
		res.status(200).json(ret);

    });

	app.post('/api/showUrgent', async (req, res, next) =>
    {
		var error = '';
		var tasks = [];
        const {userId,jwtToken} = req.body;
       // const newList = new Collections({Name:name, UserId:userId});     
	   var ObjectId = require('mongodb').ObjectID;
	   var new_id = new ObjectId(userId);

        if( jwt.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			tasks = await db.collection('Tasks').find({UserId:new_id,Urgent:true}).toArray();
		}
		catch(e)
		{
			error = e.message;
			//console.log(e.message);
		}
		
		var ret ={result:tasks,
			error:error,
		  };
		res.status(200).json(ret);

    });

	
	app.post('/api/showCustomizedItem', async (req, res, next) =>
    {
		var error = '';
		var tasks = [];
        const {CollectionId,jwtToken} = req.body;
       // const newList = new Collections({Name:name, UserId:userId});     
	   var ObjectId = require('mongodb').ObjectID;
	   var new_id = new ObjectId(CollectionId);

        if( jwt.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			tasks = await db.collection('Tasks').find({CollectionId:new_id}).toArray();
		}
		catch(e)
		{
			error = e.message;
			//console.log(e.message);
		}
		
		var ret ={result:tasks,
			error:error,
		  };
		res.status(200).json(ret);
    });
	

    app.post('/api/addList', async (req, res, next) =>
    {
        var error = '';

        const {name,userId,jwtToken} = req.body;
        const newList = new Collections({Name:name, UserId:userId});     
        
        if( jwt.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			const result = db.collection('Collections').insertOne(newList);
		}
		catch(e)
		{
			error = e.message;
		//	console.log(e.message);
		}
		
		var ret = {error:error};
		res.status(200).json(ret);
    });


    
    app.post('/api/addTask', async (req, res, next) =>
    {
        var error = '';

        const {userId, jwtToken, collectionId, description, date} = req.body;
        const newTask = new task({Name:description, Done:false, Urgent: false, Description:description, Deadline:date, UserId:userId, CollectionId:collectionId});     
        
        if( jwt.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			const result = db.collection('Tasks').insertOne(newTask);
		}
		catch(e)
		{
			error = e.message;
			console.log(e.message);
		}
		
		var ret = {error:error};
		res.status(200).json(ret);
    });

    app.post('/api/editTask', async (req, res, next) =>
    {
        var error = '';
		const { jwtToken,description, deadline, taskId } = req.body;
		var ObjectId = require('mongodb').ObjectID;
	    var new_id = new ObjectId(taskId);

		if( jwt.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			db.collection('Tasks').updateOne({_id:new_id}, {$set: {Name: description, Description: description, Deadline: deadline}});
		}
		catch(e)
		{
			error = e.message;
			console.log(e.message);
		}
		
		var ret = {error:error};
		res.status(200).json(ret);
    });

    app.post('/api/removeTask', async (req, res, next) =>
    {
        var error = '';
		const { jwtToken,taskId } = req.body;
		var ObjectId = require('mongodb').ObjectID;
	    var new_id = new ObjectId(taskId);
			
		if( jwt.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		try
		{
			db.collection('Tasks').deleteOne({ _id:new_id});
		}
		catch(e)
		{
			error = e.message;
			console.log(e.message);
		}
		
		var ret = {error:error};
		res.status(200).json(ret);
    });

    app.post('/api/markTask', async (req, res, next) =>
    {
        var error = '';
		const {jwtToken, taskId } = req.body;
		var ObjectId = require('mongodb').ObjectID;
	    var new_id = new ObjectId(taskId);
		//var task = db.collection('Tasks').findOne({ _id:new_id}).Done;
		//var new_task = (!task);
		
		if( jwt.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			db.collection('Tasks').findOneAndUpdate({_id: new_id},[{$set: {Done:{$not:"$Done"}}}]);
		}
		catch(e)
		{
			error = e.message;
			console.log(e.message);
		}
		
		var ret = {error:error};
		
		res.status(200).json(ret);
    });

	



    app.post('/api/flagTask', async (req, res, next) =>
    {
        var error = '';
		const {jwtToken, taskId } = req.body;
		var ObjectId = require('mongodb').ObjectID;
	    var new_id = new ObjectId(taskId);
			
		if( jwt.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			db.collection('Tasks').findOneAndUpdate({_id: new_id},[{$set: {Urgent:{$not:"$Urgent"}}}]);
		}
		catch(e)
		{
			error = e.message;
			//console.log(e.message);
		}
		
		var ret = {error:error};
		res.status(200).json(ret);
    });


	app.post('/api/removeCollection', async (req, res, next) =>
    {
        var error = '';
		const {collectionId,jwtToken} = req.body;
		var ObjectId = require('mongodb').ObjectID;
	    var new_id = new ObjectId(collectionId);
			
		if( jwt.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		try
		{
			db.collection('Collections').deleteOne({ _id:new_id});
			db.collection('Tasks').deleteMany({CollectionId:new_id});

		}
		catch(e)
		{
			error = e.message;
			console.log(e.message);
		}
		
		var ret = {error:error};
		res.status(200).json(ret);
    });




	app.post('/api/logout', async (req, res, next) =>
    {
        var error = '';
		
		try
		{	
			req.session = null
			//	req.session.destroy(null);
				res.clearCookie('sid');
			 
		}
		catch(e)
		{
			error = e.message;
		//	console.log(e.message);
		}
		
		var ret = {error:error};
		res.status(200).json(ret);
    });

	

}

