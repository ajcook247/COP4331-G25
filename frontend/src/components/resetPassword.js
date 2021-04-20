import React, {Component} from 'react';
import {Input,Button,ForgetPasswordWrapper,ForgetPasswordCloseButton} from './style';

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

class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state={
            email:''
        }

        this.sendPasswordRequestLink = this.sendPasswordRequestLink.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);

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
                    <Input style={{borderColor:"black", color:"black"}} placeholder='Email' onChange={this.handleEmailChange} onKeyPress={this.handleKeypress}/>  
                    <Button style={{marginTop: 40, borderRadius:30}} onClick={this.sendPasswordRequestLink}>Send</Button>  
                
                </ForgetPasswordWrapper>
                
                </div>

        )

    }

    handleEmailChange(e){
        this.setState({
            email: e.target.value
        })
    }

    handleKeypress(e){
        if(e.key=='Enter'){
            this.sendPasswordRequestLink();
        }
    }

    async sendPasswordRequestLink(){

        alert('doIt() ' + this.state.email );

        if(!this.state.email){
            return;
        }

        var obj = {email: this.state.email}
        var js = JSON.stringify(obj);


        try {
            alert('hulk' );
            let response = await fetch(buildPath('api/reset-password'),{
                    method:'POST',
                    body : js,
                    headers:{
                        'Content-Type':'application/json'
                    }        
            });

            alert(response);
            var res = JSON.parse(await response.text());

            alert('mal');

           if( res.error )
            {
                alert('wrong' );
                
            }else{
                alert('hu' );


            }

        }

        catch(e){
            alert(e);
            console.log(e);
            return;
        }
    
    }




}


export default ForgetPassword;