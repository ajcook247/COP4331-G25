import { withRouter } from "react-router";
import {useParams} from 'react-router-dom'
import React, {Component} from 'react';
import {BackGround, LoginWrapper,LoginHeader2,LoginFooter,Input,Button2,ButtonGroup,ForgetPasswordButton,LoginInputGroup,WrongPasswordMsg,PasswordInput} from './style';
import Register from './register';
import ForgetPassword from './resetPassword';
import storage from '../tokenStorage';
const jwt = require("jsonwebtoken");





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

class Reset extends Component{

    componentDidMount() {
        const token2 = this.props.match.params.token2;
        return token2;
    }
    
    constructor(props){
        super(props);

        this.state={
            username:'',
            password:'',
            wrongCombination:false,
            showRegister:false,
            showForgetPassword:false,
            loggedIn:false,
            rtoken:''
        }

        

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordReset = this.handlePasswordReset.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.Password = this.Password.bind(this);

 
    }
    


    render(){
        
        return (
            <BackGround>
            <div>
                <LoginHeader2><h1>B-DREAMY! Password Reset</h1></LoginHeader2>
                <LoginWrapper>
                
                    <LoginInputGroup>
                    <PasswordInput placeholder='Password' onChange={this.handlePasswordChange} onKeyPress={this.handleKeypress} />  
                    </LoginInputGroup>     
                    <ButtonGroup>
                    <Button2 onClick={this.handlePasswordReset}>Reset Password</Button2>     
                    </ButtonGroup  >    
                             
                </LoginWrapper>             
                <LoginFooter><h2>Best To-do App in the MARKET!</h2></LoginFooter>    
            
        </div>
         </BackGround>
        );
    }

    

    Password(){
        const {jwtToken} = this.props.params;
    }


    handleUsernameChange(e){
            this.setState({
                username:e.target.value,
                wrongCombination:false
            })   }


    handlePasswordChange(e){
            this.setState({
                wrongCombination:false,
                password:e.target.value
            })   }  


    async handlePasswordReset(){
        

        if(!this.state.password){
            return;
        }

 

        console.log( this.componentDidMount());


        var obj = {sentToken:  this.componentDidMount(), password: this.state.password}
        var js = JSON.stringify(obj);
        
        try {
            
            let response = await fetch(buildPath('api/PasswordReset'),{
                    method:'POST',
                    body : js,
                    headers:{
                        'Content-Type':'application/json'
                    }   
                    
            });
 
            

            var res = JSON.parse(await response.text());
            console.log(res);
 
            
            if(res.error)
            {
  
                console.log(res.error);       
            }else{
 
                window.location.href = '/';
                storage.storeToken(res);
                var tok = storage.retrieveToken();
                var ud = jwt.decode(tok,{complete:true});
                console.log(ud.payload);
                
                this.props.changeToLoggedIn(this.state.username);
            }

        }

        catch(e){
          //  console.log(e);
            return;
        }
    
    }

    handleKeypress(e){
        if(e.key==='Enter'){
            this.handlePasswordReset();
        }
    }



}



export default withRouter (Reset);