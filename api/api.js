require('express');
require('mongodb');

const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = require('react-dom');
const jwt = require('./createJWT');
const { db } = require('./models/user.js');
const User = require("./models/user.js");

exports.setApp = function(app, client)
{
    app.post('/api/login', async (req, res, next) =>
    {
        var error = '';

        const {login, password} = req.body;
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
    });
    
    app.post('/api/register', async (req, res, next) =>
    {
        var error = '';

        const { login, password, email, name} = req.body;
        const newUser = new User({ Login: login, Password: password, Email : email, Name : name, Verified: false});
        const duplicates = await db.collection('Users').find({Login:login}).toArray();      

        if(duplicates.length > 0){
            ret = {error:'Exists user, please change your username!'};
        }else{
            try
            {
                const result = db.collection('Users').insertOne(newUser);
                var ret = {error:''};
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

		const {id} = req.body;
		const list;
		
		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		list = await db.collection('Collections').findOne({ID:id});
		res.status(200).json(ret);
    });

	/*
	app.post('/api/showCompleted', async (req, res, next) =>
    {

    });
	*/

	/*
	app.post('/api/showCustomizedItem', async (req, res, next) =>
    {

    });
	*/

    app.post('/api/addList', async (req, res, next) =>
    {
        var error = '';

        const {name, userId} = req.body;
        const newList = new Collections({Name:name, UserID:userId});     
        
        if( token.isExpired(jwtToken))
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
	
	app.post('/api/editTask', async (req, res, next) =>
    {
		var error = '';
		const { id, name } = req.body;

		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			db.collection('Collections').update({ID: id}, {$set: {Name: name}});
		}
		catch(e)
		{
			error = e.message;
			console.log(e.message);
		}
		
		var ret = {error:''};
		res.status(200).json(ret);
    });
	
	app.post('/api/removeTask', async (req, res, next) =>
    {
		var error = '';
		const { id } = req.body;
			
		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			db.collection('Collections').deleteOne({ ID: id });
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

        const {name, description, date, userId} = req.body;
        const newTask = new Collections({Name:name, Description:description, Date:date, UserID:userId});     
        
        if( token.isExpired(jwtToken))
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
		
		var ret = {error:''};
		res.status(200).json(ret);
    });

    app.post('/api/editTask', async (req, res, next) =>
    {
        var error = '';
		const { id, name, description, date } = req.body;

		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			db.collection('Tasks').update({ID: id}, {$set: {Name: name, Description: description, Date: date}});
		}
		catch(e)
		{
			error = e.message;
			console.log(e.message);
		}
		
		var ret = {error:''};
		res.status(200).json(ret);
    });

    app.post('/api/removeTask', async (req, res, next) =>
    {
        var error = '';
		const { id } = req.body;
			
		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			db.collection('Tasks').deleteOne({ ID: id });
		}
		catch(e)
		{
			error = e.message;
			console.log(e.message);
		}
		
		var ret = {error:''};
		res.status(200).json(ret);
    });

    app.post('/api/markTask', async (req, res, next) =>
    {
        var error = '';
		const { id } = req.body;
		var task = db.collection('Tasks').findOne({ ID: id })
			
		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			db.collection('Tasks').updateOne({ID: id}, {$set: {Done: !task.Done}});
		}
		catch(e)
		{
			error = e.message;
			console.log(e.message);
		}
		
		var ret = {error:''};
		res.status(200).json(ret);
    });

    app.post('/api/flagTask', async (req, res, next) =>
    {
        var error = '';
		const { id } = req.body;
		var task = db.collection('Tasks').findOne({ ID: id })
			
		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			db.collection('Tasks').updateOne({ID: id}, {$set: {Urgent: !task.Urgent}});
		}
		catch(e)
		{
			error = e.message;
			console.log(e.message);
		}
		
		var ret = {error:''};
		res.status(200).json(ret);
    });

    /*
	// TEMPLATE
    app.post('/api/NAME', async (req, res, next) =>
    {

    });
    */
}