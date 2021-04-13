require('express');
require('mongodb');

const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = require('react-dom');
const jwt = require('./createJWT');
const { db } = require('./models/user.js');
const User = require("./models/user.js");
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
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
      
              transporter.sendMail({
                to: email,
                from: "bdreamywebsite@hotmail.com",
                subject: "B_DREAMY : passwrod reset",
                html:`
                <h1>Password reset</h1>
                <h4>To reset password : <a href ="http://localhost:3000/resetpassword/"> reset </a></h4>
               `
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

    app.post('/api/login', async (req, res, next) =>
    {
        var error = '';

        const {login, password} = req.body;
        // db = client.db();
        // const results = await User.find({ Login: login, Password: password });
        const results = await db.collection('Users').find({Login:login, Password:password}).toArray();        
        var id = -1;
        var name = '';

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
            ret = {error:"Check your credential please!"};
        }

       

        res.status(200).json(ret);
    });//end login
    
    app.post('/api/register', async (req, res, next) =>
    {
        var error = '';

        const { login, password, email, name} = req.body;

        // const results = await User.find()

        const newUser = new User({ Login: login, Password: password, Email : email, Name : name, Verified: false});
        const duplicates = await db.collection('Users').find({Login:login}).toArray(); 

        /*function handleVerified()
        {

            
        }*/
        
        if(duplicates.length > 0){
            ret = {error:'Exists user, please change your username!'};
        }else{
            try
            {
                const result = db.collection('Users').insertOne(newUser);
                var ret = {error:''};
                transporter.sendMail({
                    to: newUser.Email,
                    from: "bdreamywebsite@hotmail.com",
                    subject: "B-DREAMY : Confirm Email",
                    html:`

                    <h1>Welcome to B-DREAMY!!</h1>
                    <h4>Please confirm e-mail :< a onclick = href ="http://localhost:3000/main/" > CONFIRM </a></h4>

                    `
                  })

                // newUser.save();
            }
            catch(e)
            {
                error = e.message;
                console.log(e.message);
            }
        }

        
        res.status(200).json(ret);
    });


    app.post('/api/getList', async (req, res, next) =>
    {
		var error = '';

		const {id,jwtToken} = req.body;
		var list = [];
		
		if( jwt.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		

        try{
            list = await db.collection('Collections').find({ID:id}).toArray();
        }
        catch(e){
            error = e.message;
        };
        
            
        var ret ={list:list,
                  error:error,
                };
		res.status(200).json(ret);
    });

}
