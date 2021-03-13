import React, {Component} from 'react';
import {Input,Button,ForgetPasswordWrapper,ForgetPasswordCloseButton} from './style';



class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state={
            email:''
        }





      }

    render(){
        if(!this.props.showForgetPassword){
            return null;
        }
        return (
            <div> 
                <ForgetPasswordWrapper>
                <ForgetPasswordCloseButton onClick={this.props.closeForgetPasswordButton}>X</ForgetPasswordCloseButton>
                    <br/><br/><br/><br/>
                    <br/><br/>
                   <h4>Send Verification to Your Email:</h4>
                    <Input placeholder='Email' />  
                    <Button>Send</Button>  
                
                </ForgetPasswordWrapper>
                
                </div>



        )



    }


}


export default ForgetPassword;