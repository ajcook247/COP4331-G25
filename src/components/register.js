import React, {Component} from 'react';
import {Input,Button,RegisterWrapper,RegisterCloseButton,RegisterInputGroup} from './style';



class Register extends Component{
    constructor(props){
      super(props);
      this.state={
        username:'',
        password:'',
        confirmed:'',
        emial:'',
      }
    }
    render(){
        if(!this.props.showRegister){
            return null;
        }
      return <RegisterWrapper>
                <RegisterCloseButton onClick={this.props.closeRegisterButton}>X</RegisterCloseButton>
                <RegisterInputGroup>
                    <Input placeholder='Email' />
                    <Input placeholder='Username' />  
                    <Input placeholder='Password' />
                    <Input placeholder='Confirm Password' />  
                    <Button onClick={this.props.closeRegisterButton}>Register</Button> 
                </RegisterInputGroup>
              </RegisterWrapper>;
       




    }

    


}


export default Register;