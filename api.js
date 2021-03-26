require('express');
require('mongodb');

const jwt = require('./createJWT');

//load user model
//const User = require("./models/user.js");
//load card model
//const Card = require("./models/card.js");

exports.setApp = function ( app, client )
{
	// Login
	app.post('/api/login', async (req, res, next) => 
	{
		// incoming: login, password
		// outgoing: id, firstName, lastName, error

		var error = '';

		const { login, password } = req.body;

		const db = client.db();
		const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

		var id = -1;
		var fn = '';
		var ln = '';

		if( results.length > 0 )
		{
			id = results[0].UserId;
			fn = results[0].FirstName;
			ln = results[0].LastName;
		}

		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}

		var ret = { id:id, firstName:fn, lastName:ln, error:''};
		res.status(200).json(ret);


	});

	// Register
	app.post('/api/register', async (req, res, next) =>
	{
		// incoming: name, login, password, email
		// outgoing: id, firstName, lastName, error
		
		var error = '';

		const { name, login, password, email } = req.body;

		//const db = client.db();
		//const results = await db.collection('Users').find({Name:name, Login:login, Password:password, Email:email});	// Maybe just email/login & password???
		
		const newUser = new User({Name:name, Login:login, Password:login, Email:email});
		
		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			//const db = client.db();
			//const result = db.collection('Users').insertOne(newUser);
			newUser.save();
		}
		catch(e)
		{
			error = e.message;
			console.log(e.message);
		}
		
		var ret = {error:''};
		res.status(200).json(ret);
	});

	// Logout
	/*
	app.post('/api/logout', async (req, res, next) =>
	{
		// incoming: ???
		// outgoing: error
		
		var error = '';

		const { ??? } = req.body;

		const db = client.db();
		
		// LOGOUT HERE
		
		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		var ret = {error:''};
		res.status(200).json(ret);
	});
	*/

	// Add task
	app.post('/api/addTask', async (req, res, next) =>
	{
		// incoming: name, description, date/time
		// outgoing: error
		
		var error = '';

		const { name, description, date } = req.body;

		//const db = client.db();
		
		const newTask = new Task({Name:name, Description:description, Date:date});	// NEED TO APPEND TO GIVEN LIST
		
		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			//const db = client.db();
			//const result = db.collection('Tasks').insertOne(newTask);
			newTask.save();
		}
		catch(e)
		{
			error = e.message;
			console.log(e.message);
		}
		
		var ret = {error:''};
		res.status(200).json(ret);
	});

	// Mark task
	app.post('/api/markTask', async (req, res, next) =>
	{
		// incoming: id
		// outgoing: error
		
		var error = '';

		const { id } = req.body;

		const db = client.db();
		
		var task = db.collection('Tasks').findOne({ ID: id })
			
		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			//const db = client.db();
			//const result = db.collection('Tasks').insertOne(newTask);
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


	// Remove task
	app.post('/api/removeTask', async (req, res, next) =>
	{
		// incoming: id
		// outgoing: error
		
		var error = '';

		const { id } = req.body;

		const db = client.db();
			
		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			//const db = client.db();
			//const result = db.collection('Tasks').insertOne(newTask);
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


	// Edit task
	app.post('/api/editTask', async (req, res, next) =>
	{
		// incoming: id, name, description, date, urgent
		// outgoing: error
		
		var error = '';

		const { id, name, description, date, urgent } = req.body;

		const db = client.db();
		
		// EDITTASK HERE
		
		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			//const db = client.db();
			//const result = db.collection('Tasks').insertOne(newTask);
			db.collection('Tasks').update({ID: id}, {$set: {Name: name, Description: description, Date: date, Urgent: urgent}});
		}
		catch(e)
		{
			error = e.message;
			console.log(e.message);
		}
		
		var ret = {error:''};
		res.status(200).json(ret);
	});

	// Flag task
	app.post('/api/flagTask', async (req, res, next) =>
	{
		// incoming: id
		// outgoing: error
		
		var error = '';

		const { id } = req.body;

		const db = client.db();
		
		var task = db.collection('Tasks').findOne({ ID: id })
			
		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			//const db = client.db();
			//const result = db.collection('Tasks').insertOne(newTask);
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

	// Add list/category
	app.post('/api/addList', async (req, res, next) =>
	{
		// incoming: name, userID
		// outgoing: error
		
		var error = '';

		const { name, userId } = req.body;

		const db = client.db();
		
		const newList = new Collections({Name:name, UserID:userId});
		
		if( token.isExpired(jwtToken))
		{
			var r = {error:'The JWT is no longer valid'};
			res.status(200).json(r);
			return;
		}
		
		try
		{
			//const db = client.db();
			//const result = db.collection('Collections').insertOne(newList);
			newList.save();
		}
		catch(e)
		{
			error = e.message;
			console.log(e.message);
		}
		
		var ret = {error:''};
		res.status(200).json(ret);
	});
}