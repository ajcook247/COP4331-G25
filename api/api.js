require('express');
require('mongodb');

const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = require('react-dom');
const jwt = require('./createJWT');
const { db } = require('./models/user.js');
const User = require("./models/user.js");
const Collections = require("./models/collection.js");
const task = require("./models/task.js");
var ObjectId = require('mongodb').ObjectId;
exports.setApp = function(app, client)
{
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

        if(duplicates.length > 0){
            ret = {error:'Exists user, please change your username or email!'};
        }else{
            try
            {
    
                const result = db.collection('Users').insertOne(newUser);
                var ret = {error:''};

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
			console.log(e.message);
		}
		
		var ret = {error:''};
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
