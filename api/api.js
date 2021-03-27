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
        // db = client.db();
        // const results = await User.find({ Login: login, Password: password });
        const results = await db.collection('Users').find({Login:login, Password:password}).toArray();        
        var id = -1;
        var name = '';

        if(results.length > 0)
        {
            id = results[0]._id;
            name = results[0].Name;
        }

        try
        {
            // ret = {"id":id, "name":name};
            ret = jwt.createToken(name, id);
        }
        catch(e)
        {
            ret = {error:e.message};
        }

        res.status(200).json(ret);
    });//end login
    
    app.post('/api/register', async (req, res, next) =>
    {
        var error = '';

        const { login, password, email, name} = req.body;

        // const results = await User.find()

        const newUser = new User({ Login: login, Password: password, Email : email, Name : name, Verified: false});

        try
        {
            const result = db.collection('Users').insertOne(newUser);
            // newUser.save();
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