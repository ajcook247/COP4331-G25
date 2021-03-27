const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function( name, id)
{
    try
    {
        const expiration = new Date();
        const user = { userId: id, fullName : name};

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        var ret = {accessToken: accessToken};
    }
    catch(e)
    {
        var ret = {error: e.message};
    }
    return ret;
}

exports.isExpired = function( token )
{
    var isError = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET, (err, verifiedJwt) => 
    {
        if(err)
        {
            return true;
        }
        else
        {
            return false;
        }
    });

    return isError;
}

exports.refresh = function(token)
{
    var ud = jwt.decode(token, {complete:true});

    var userId = ud.payload.id;
    var fullName = ud.payload.name;
    return createToken(fullName, userId);
}