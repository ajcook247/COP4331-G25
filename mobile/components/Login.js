import React, {Component, useState} from 'react';
import { Text, View, StyleSheet, Modal, Image } from 'react-native';
//import { LinearGradient } from 'expo-linear-gradient';


import { Button, Avatar, Input } from 'react-native-elements';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { Login_Container, Register_Container, Register_Text, Welcome_Message } from './style';
import RegisterPage from './Register';

//hello
class LoginPage extends Component
{

    constructor(props){
        super(props);

        this.state={
            username:'',
            password:'',
            showRegister:false
        }

        this.handleRegisterClick = this.handleRegisterClick.bind(this);
    }


    // fontFamily:'sans-serif-light'
    render(){
        return (
            <View>
                <Welcome_Message> 
                    <Text style={{fontSize: 20}}>Welcome to B-Dreamy</Text>
                </Welcome_Message>

                <Login_Container>
                    <Image
                        source={require('../images/TodoTwo.png')}
                        style={{width:70, height:70, marginTop: 20}}
                    />
                    <Input 
                        placeholder='Email'
                        placeholderTextColor='#000'
                        textAlign="left"
                        style={{fontSize: 20}}
                        leftIcon={
                            <IconMCI
                                name='email'
                                size={24}
                                color='black'
                            />
                        }
                        containerStyle={{marginTop: 40, width: 300}}
                    />
                    <Input
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
                    <Button
                        title="Sign In"
                        titleStyle={{fontSize: 20}}
                        containerStyle={{width: 200, marginTop: 20, borderRadius:30}}
                    />
                    <Button
                        title="Forgot password?"
                        titleStyle={{fontSize: 20}}
                        containerStyle={{width: 180, marginTop:30}}
                        type="clear"
                    />
                </Login_Container>

                <Register_Container>
                    <Register_Text> 
                        <Text style={{fontSize: 20}}>Don't have an account?</Text>
                    </Register_Text>
                    <RegisterPage showRegister={this.state.showRegister}/>
                </Register_Container>
            </View>
        );
    }

    handleRegisterClick(){
        this.setState({
            showRegister:true
        })
    }

}

export default LoginPage;


/*
function LoginPage()
{

  return (
    <View>
        <Welcome_Message> 
            <Text style={{fontSize: 20, fontFamily:'sans-serif-light'}}>Welcome to WebsiteName</Text>
        </Welcome_Message>

        <Login_Container>
        <Image
            source={require('../images/TodoTwo.png')}
            style={{width:70, height:70, marginTop: 20}}
        />
        <Input 
            placeholder='Email'
            placeholderTextColor='#000'
            textAlign="left"
            style={{fontSize: 20, fontFamily:'sans-serif-light'}}
            leftIcon={
                <IconMCI
                    name='email'
                    size={24}
                    color='black'
                />
            }
            containerStyle={{marginTop: 40, width: 300}}
        />
        <Input 
            placeholder='Password'
            placeholderTextColor='#000'
            textAlign="left"
            style={{fontSize: 20, fontFamily:'sans-serif-light'}}
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
            title="Sign In"
            titleStyle={{fontSize: 20, fontFamily:'sans-serif-light'}}
            containerStyle={{width: 200, marginTop: 20, borderRadius:30}}
            raised
        />
        

        <Button
            title="Forgot password?"
            titleStyle={{fontSize: 20, fontFamily:'sans-serif-light'}}
            containerStyle={{width: 180, marginTop:30}}
            type="clear"
        />
        </Login_Container>

        <Register_Container>
            <Register_Text> 
                <Text style={{fontSize: 20, fontFamily:'sans-serif-light'}}>Don't have an account?</Text>
            </Register_Text>
        <Button
            title="Sign Up"
            titleStyle={{fontSize: 20, fontFamily:'sans-serif-light'}}
            containerStyle={{width: 150, marginTop:10}}
            type="clear"
        />
        </Register_Container>
    </View>
  )
};


export default LoginPage;

*/

/*

<Avatar
    rounded
        icon={{name: 'user', type: 'font-awesome', color: 'white'}}
        overlayContainerStyle={{backgroundColor: 'gray'}}
        containerStyle={{marginTop: 40}}
        size="large"
/>

*/
