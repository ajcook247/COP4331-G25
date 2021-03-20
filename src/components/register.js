import React, {Component} from 'react';
import {Input,Button,RegisterWrapper,RegisterCloseButton,RegisterInputGroup,PlusOutlined} from './style';



class Register extends Component{
    constructor(props){
      super(props);
      this.state={
        username:'',
        password:'',
        confirmed:'',
        email:'',
        passwordMatch:true,
      }
      this.handleConfirmedChange = this.handleConfirmedChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
      this.resetForm = this.resetForm.bind(this);
    }
    render(){
        if(!this.props.showRegister){
            return null;
        }
      return <RegisterWrapper>
                <RegisterCloseButton onClick={this.props.closeRegisterButton}>X</RegisterCloseButton>
                <RegisterInputGroup>
                    <Input placeholder='Email' onChange={this.handleEmailChange} />
                    <Input placeholder='Username' onChange={this.handleUsernameChange} />  
                    <Input placeholder='Password' onChange={this.handlePasswordChange} />
                    <Input placeholder='Confirm Password' onChange={this.handleConfirmedChange} />  
                    {!this.state.passwordMatch && <h4> Two password needs to be same! please enter again.</h4>}
                    <Button onClick={this.handleRegisterSubmit}>Register</Button> 
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

      if(this.state.confirmed != this.state.password){
        this.setState({
          passwordMatch:false,
        })  
        return;
      }else{
        try {
          /* we will add register api*/ 
          let response = await fetch('http://localhost:5000/api/register',{
                  method:'POST',
                  headers:{
                      'Accept': 'application/json',
                      'Content-Type':'application/json'
                  },
                  body: JSON.stringify({
                      username:this.state.username,
                      password:this.state.password,
                      email:this.state.email,
                 })        
          });
          var res = JSON.parse(await response.text());
          if( res.id <= 0 )
          {
            return;
          }else{
            this.props.newRegisterLogin(this.state.username,this.state.password);
            this.resetForm();
            this.props.registerSucceed();
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
