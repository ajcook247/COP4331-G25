import React, {Component} from 'react';
import {LoginWrapper,LoginHeader,LoginFooter,Input,Button,ButtonGroup,ForgetPasswordButton,LoginInputGroup,WrongPasswordMsg,PasswordInput} from './style';
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

class Login extends Component{
    
    constructor(props){
        super(props);

        this.state={
            username:'',
            password:'',
            wrongCombination:false,
            showRegister:false,
            showForgetPassword:false,
            loggedIn:false
        }

        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.CloseRegisterButton = this.CloseRegisterButton.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.handleForgetPassword = this.handleForgetPassword.bind(this);
        this.closeForgetPasswordButton = this.closeForgetPasswordButton.bind(this);
        this.newRegisterLogin = this.newRegisterLogin.bind(this);
    }


    render(){
        return (
            <div>
                <LoginHeader><h1>B-DREAMY!</h1></LoginHeader>
                <LoginWrapper>
                    
                <Register showRegister={this.state.showRegister} closeRegisterButton={this.CloseRegisterButton} registerSucceed={this.handleLoginClick} newRegisterLogin={this.newRegisterLogin}/>
                <ForgetPassword showForgetPassword={this.state.showForgetPassword} closeForgetPasswordButton={this.closeForgetPasswordButton} />
                    <LoginInputGroup>
                    <Input placeholder='Username' onChange={this.handleUsernameChange} onKeyPress={this.handleKeypress} />
                    <PasswordInput placeholder='Password' onChange={this.handlePasswordChange} onKeyPress={this.handleKeypress} />  
                    </LoginInputGroup>     
                    <ButtonGroup>
                    <Button onClick={this.handleLoginClick}>Login</Button>
                    <Button onClick={this.handleRegisterClick}>Register</Button>     
                    </ButtonGroup  >    
                    {this.state.wrongCombination && <WrongPasswordMsg><h4> Check your credential please!</h4></WrongPasswordMsg>}
                
                    <ForgetPasswordButton onClick={this.handleForgetPassword}>Forget Password?</ForgetPasswordButton>
                </LoginWrapper>
              
                <LoginFooter><h2>Best To-do App in the MARKET!</h2></LoginFooter>
                   
            
        </div>
        );
    }

    

    

    handleRegisterClick(){
        this.setState({
            showRegister:true
        })
    }


    CloseRegisterButton(){
        this.setState({
            showRegister:false
        })
        
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


    async handleLoginClick(){
        if(!this.state.username){
            return;
        }
        if(!this.state.password){
            return;
        }

        var obj = {login: this.state.username, password: this.state.password}
        var js = JSON.stringify(obj);
        
        try {
            let response = await fetch(buildPath('api/login'),{
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
                this.setState({
                    wrongCombination:true
                })
                
                
            }else{

                storage.storeToken(res);
                var tok = storage.retrieveToken();
                var ud = jwt.decode(tok,{complete:true});
                console.log(ud.payload);
                window.location.href = '/main';
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
            this.handleLoginClick();
        }
    }

    handleForgetPassword(){
        this.setState({
            showForgetPassword:true
        })
        
    }

    closeForgetPasswordButton(){
        this.setState({
            showForgetPassword:false
        })
    }

    newRegisterLogin(username, password){
        this.setState({
            username:username,
            password:password,
        })
    }


}



export default Login;
