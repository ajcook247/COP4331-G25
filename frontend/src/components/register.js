import React, {Component} from 'react';
import {Input,Button,RegisterWrapper,RegisterCloseButton,RegisterInputGroup} from './style';

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

class Register extends Component{
    constructor(props){
      super(props);
      this.state={
        username:'',
        password:'',
        confirmed:'',
        email:'',
        fullName:'',
        passwordMatch:true,
      }
      this.handleConfirmedChange = this.handleConfirmedChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
      this.handleFullnameChange = this.handleFullnameChange.bind(this);
      this.resetForm = this.resetForm.bind(this);
    }
    render(){
        if(!this.props.showRegister){
            return null;
        }
      return <RegisterWrapper>
                <RegisterCloseButton onClick={this.props.closeRegisterButton}>X</RegisterCloseButton>
                <RegisterInputGroup>
                    <Input style={{borderColor:"black", color:"black", marginTop:0}} placeholder='Email' onChange={this.handleEmailChange} />
                    <Input style={{borderColor:"black", color:"black", marginTop:20}} placeholder='Fullname' onChange={this.handleFullnameChange} />
                    <Input style={{borderColor:"black", color:"black", marginTop:20}} placeholder='Username' onChange={this.handleUsernameChange} />  
                    <Input style={{borderColor:"black", color:"black", marginTop:20}} placeholder='Password' onChange={this.handlePasswordChange} />
                    <Input style={{borderColor:"black", color:"black", marginTop:20}} placeholder='Confirm Password' onChange={this.handleConfirmedChange} />  
                    {!this.state.passwordMatch && <h4> Two password needs to be same! please enter again.</h4>}
                    <Button style={{marginTop: 20, borderRadius:30}} onClick={this.handleRegisterSubmit}>Register</Button> 
                </RegisterInputGroup>
              </RegisterWrapper>;
       

    }

    handleEmailChange(e){
      this.setState({
          email:e.target.value,
      })   }

    handleUsernameChange(e){
      this.setState({
          username:e.target.value,
      })   }

    handlePasswordChange(e){
      this.setState({
          password:e.target.value,
          passwordMatch:true,

        })   }

    handleFullnameChange(e){
      this.setState({
        fullName:e.target.value,

      }) 
    }

    handleConfirmedChange(e){
      this.setState({
          confirmed:e.target.value,
          passwordMatch:true,
        })   }

    async handleRegisterSubmit(){
      if(!this.state.username){
          return;
      }
      if(!this.state.password){
          return;
      }
      if(!this.state.confirmed){
        return;
      }
      if(!this.state.email){
        return;
      }

      if(this.state.confirmed !== this.state.password){
        this.setState({
          passwordMatch:false,
        })  
        return;
      }else{

        var obj = {login: this.state.username, password: this.state.password, email: this.state.email, Verified: false, name: this.state.fullName }
        var js = JSON.stringify(obj);

        try {
          //https://s21l-g25.herokuapp.com/
          let response = await fetch(buildPath('api/register'),{
                  method:'POST',
                  headers:{
                    'Content-Type':'application/json'
                },
                body: js     
          });
          var res = JSON.parse(await response.text());
          if( res.error )
          {
            console.log(res.error);
            this.props.closeRegisterButton();
            return;
          }else{
          //  this.props.newRegisterLogin(this.state.username,this.state.password);
          //console.log(res);
            this.resetForm();
            this.props.closeRegisterButton();
            console.log(res);

          }

      }

      catch(e){
          console.log(e);
          return;
      }
      }
    }


    resetForm(){
      this.setState({
        username:'',
        password:'',
        email:'',
        confirmed:'',
      })
    }



}


export default Register;
