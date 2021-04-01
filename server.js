const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//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


userList =
[

]

const transporter = nodemailer.createTransport(sendgridTransport({

  auth:{
    api_key:"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"
  }

}))

app.post('/api/reset-password',(req, res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
    if(err){
      alert(err);
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

app.post('/api/addcard', async (req, res, next) =>
{
  // incoming: userId, color
  // outgoing: error

  var error = '';

  const { userId, card } = req.body;

  // TEMP FOR LOCAL TESTING.
  cardList.push( card );

  var ret = { error: error };
  res.status(200).json(ret);
});


app.post('/api/register', async (req, res, next) =>
    {
        var error = '';

        const { login, password, email, Verified} = req.body;

        // const results = await User.find()

        try
        {
          console.log("lol");
      
            userList.push( login );
            transporter.sendMail({
              to: email,
              from: "bdreamywebsite@hotmail.com",
              subject: "B-DREAMY : Confirm Email",
              html:`
              <h1>Welcome to B-DREAMY!!</h1>
              <h4>Please confirm e-mail :<a href ="http://localhost:3000/main/"> CONFIRM </a></h4>

              `
            })

            console.log("lol");
            

            // newUser.save();
        }
        catch(e)
        {

          console.log("what");
      
            error = e.message;
            console.log(e.message);
        }
        
        var ret = {error: email};
        res.status(200).json(ret);
    });

app.post('/api/login', async (req, res, next) => 
{
  // incoming: login, password
  // outgoing: id, firstName, lastName, error
  

  var error = '';

  const { login, password } = req.body;

  var id = -1;
  var fn = '';
  var ln = '';

  if( login.toLowerCase() == 'rickl' && password == 'COP4331' )
  {
    id = 1;
    fn = 'Rick';
    ln = 'Leinecker';
  }
  else
  {
    error = 'Invalid user name/password';
  }

  var ret = { id:id, firstName:fn, lastName:ln, error:error};
  res.status(200).json(ret);
});



app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(5000); 
