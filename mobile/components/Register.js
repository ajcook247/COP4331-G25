import React, {Component} from 'react';
import { Text, View, StyleSheet, Modal, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';


import { Button, Avatar, Input, CheckBox } from 'react-native-elements';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { Login_Container, Register_Container, Register_Text, Welcome_Message } from './style';
import { Alert } from 'react-native';


class RegisterPage extends Component {
    constructor(props){
        super(props);
        this.state={
          username:'',
          password:'',
          confirmed:'',
          email:'',
          passwordMatch:true,
          modalVisible: false,
        }

        this.handleConfirmedChange = this.handleConfirmedChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }


    render() {
        return (
            <View>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                >
                
                <View>
                    <View>
                        <LinearGradient colors={['pink', '#FFF']}>
                        <Register_Container > 
                             
                            <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome', color: 'white'}}
                            overlayContainerStyle={{backgroundColor: 'gray'}}
                            containerStyle={{marginTop: 60, marginBottom: 30}}
                            size="large"
                            />  
                            <Text>Register for a new user below</Text>

                            <Input 
                            onChange={this.handleEmailChange}
                            placeholder='Email'
                            placeholderTextColor='#000'
                            textAlign="left"
                            style={{fontSize: 20}}
                            leftIcon={
                                <IconMCI
                                    name='email'
                                    size={22}
                                    color='black'
                                />
                            }
                            containerStyle={{marginTop: 40, width: 300}}
                            />
                            <Input
                            onChange={this.handleUsernameChange}
                            placeholder='Username'
                            placeholderTextColor='#000'
                            textAlign="left"
                            style={{fontSize: 20}}
                            leftIcon={
                                <IconMCI
                                    name='account-circle'
                                    size={20}
                                    color='black'
                                />
                            }
                            containerStyle={{width: 300}}
                            /> 
                            <Input
                            onChange={this.handlePasswordChange}
                            secureTextEntry={true}
                            placeholder='Password'
                            placeholderTextColor='#000'
                            textAlign="left"
                            style={{fontSize: 20}}
                            leftIcon={
                                <IconFA
                                    name='lock'
                                    size={24}
                                    color='black'
                                />
                            }
                            containerStyle={{width: 300}}
                            />
                            <Input
                            onChange={this.handleConfirmedChange}
                            secureTextEntry={true}
                            placeholder='Confirm Password'
                            placeholderTextColor='#000'
                            textAlign="left"
                            style={{fontSize: 20}}
                            leftIcon={
                                <IconFA
                                    name='lock'
                                    size={24}
                                    color='black'
                                />
                            }
                            containerStyle={{width: 300}}
                            />
                            <Button
                            title="Create Account"
                            titleStyle={{fontSize: 20}}
                            containerStyle={{width: 200, marginTop:30, borderRadius: 20}}
                            onPress={() => {
                                this.handleRegisterSubmit
                                //Alert.alert('passwords dont match')
                                //this.closeModal();
                            }}
                            />
                            <Button
                            title="Back to main page"
                            titleStyle={{fontSize: 20}}
                            containerStyle={{width: 150}}
                            type="clear"
                            onPress={() => {
                                this.closeModal();
                            }}
                            />
                        </Register_Container>
                    </LinearGradient>
                    </View>
                </View>
                </Modal>

                <Button
                title="Sign Up"
                titleStyle={{fontSize: 20}}
                containerStyle={{width: 150, marginTop:10}}
                type="clear"
                onPress={() => {
                    this.setModalVisible();
                }}>
                </Button>
            </View>
        );
    }

    setModalVisible() {
        this.setState({
            modalVisible: true
        })      
    }

    closeModal(){
        this.setState({
            modalVisible:false
        })
    }

    handleEmailChange(e){
        this.setState({
            email:e.target.value,
        })  
    }
  
    handleUsernameChange(e){
        this.setState({
            username:e.target.value,
        })   
    }
  
    handlePasswordChange(e){
        this.setState({
            password:e.target.value,
            passwordMatch:true,
        })   
    }
  
    handleConfirmedChange(e){
        this.setState({
            confirmed:e.target.value,
            passwordMatch:true,
        }) 
    }

    async handleRegisterSubmit(){
        if(!this.state.username)
        {
            return;
        }
        if(!this.state.password)
        {
            return;
        }
        if(!this.state.confirmed)
        {
          return;
        }
        if(!this.state.email)
        {
          return;
        }
        if(this.state.confirmed != this.state.password)
        {
          this.setState({
            passwordMatch:false,
          })
          return;
        }
        else
        {
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
                }
                else
                {
                this.props.newRegisterLogin(this.state.username,this.state.password);
                this.resetForm();
                this.props.registerSucceed();
                }
            }
            catch(e)
            {
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

export default RegisterPage;


/*
<CheckBox
    checked={this.state.checked}
    onPress={() => this.setState({ checked: !this.state.checked})}
    title='Show passwords'
/>
*/
