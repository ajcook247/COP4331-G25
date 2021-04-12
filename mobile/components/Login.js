import React, {Component, useState} from 'react';
import { Text, View, StyleSheet, Modal, Image, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Avatar, Input } from 'react-native-elements';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { Login_Container, Register_Container, Register_Text, Welcome_Message } from './style';
import RegisterPage from './Register';
import ResetPage from './ResetPassword';
import Storage from '../tokenStorage';


class LoginPage extends Component
{
    constructor(props){
        super(props);

        this.state={
            username:'',
            password:'',
            wrongCombination:false,
            showForgetPassword:false,
            loggedIn:false,
        }
        
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
    }

    // fontFamily:'sans-serif-light'
    render(){
        // const {navigate} = this.props.navigation; // Where this would go if used on onPress
        return (
            <View style={styles.container}>
                <LinearGradient 
                style={styles.container}
                colors={['#96CAF7', '#FFF']}>

                    <Welcome_Message> 
                        <Text style={{fontSize: 20}}>Welcome to B-Dreamy</Text>
                    </Welcome_Message>

                    <Login_Container>
                        <Image
                            source={require('../images/TodoTwo.png')}
                            style={{width:70, height:70, marginTop: 20}}
                        />
                        <Input 
                            value={this.state.username} 
                            onChangeText={(text) => this.setState({username: text, wrongCombination:false,})}
                            placeholder='Username'
                            placeholderTextColor='#000'
                            textAlign="left"
                            style={{fontSize: 20}}
                            leftIcon={
                                <IconMCI
                                    name='account-circle'
                                    size={22}
                                    color='black'
                                />
                            }
                            containerStyle={{marginTop: 40, width: 300}}
                        />
                        <Input
                            value={this.state.password} 
                            onChangeText={(text) => this.setState({password: text, wrongCombination:false,})}
                            //onKeyPress={this.handleKeypress}
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
                        {this.state.wrongCombination && <Text> Check your credential please!</Text>}
                        <Button
                            onPress={this.handleLoginClick}
                            // onPress={() =>
                            //     navigate('Home')
                            //   }
                            title="Sign In"
                            titleStyle={{fontSize: 20}}
                            containerStyle={{width: 200, marginTop: 20, borderRadius:30}}
                        />

                        <ResetPage
                        // Creates forgot password page
                        />

                    </Login_Container>
                
                    <Register_Container>
                        <Register_Text> 
                            <Text style={{fontSize: 20}}>Don't have an account?</Text>
                        </Register_Text>

                        <RegisterPage style={{flex:1}}
                        // Creates register page
                        />

                    </Register_Container>
                </LinearGradient>
            </View>
        );
    }


    async handleLoginClick()
    {
        // necessary anywhere we want to call navigate(location)
        const {navigate} = this.props.navigation;

        if(!this.state.username)
        {
            //Alert.alert(this.state.password) // If username not filled, show password
            return;
        }
        if(!this.state.password)
        {
            //Alert.alert(this.state.username) // If password not filled, show username
            return;
        }

        var obj = {login: this.state.username, password: this.state.password}
        var js = JSON.stringify(obj);

        //Alert.alert(this.state.username, this.state.password) // If both are filled, show both
        try 
        {
            let response = await fetch('https://s21l-g25.herokuapp.com/api/login',{
                method:'POST',
                body: js,
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    login:this.state.username,
                    password:this.state.password
                })
                    
            });
            var res = JSON.parse(await response.text());

            if( res.error )
            {
                this.setState({
                    wrongCombination:true
                })  
            }
            else
            {                   
                // Stores token on storage
                Storage.storeToken(res);

                navigate('Home', { username: this.state.username}); //When navigating home, pass username
                // navigate("Home");
            }
        }
        catch(e)
        {
            console.log(e);
            return;
        }
    }

    handleKeypress(e){
        if(e.key=='Enter'){
            this.handleLoginClick();
        }
    }

    
}

const styles = StyleSheet.create({
    // Fits entire screen  
    container: {
      flex: 1,
    },
  });

export default LoginPage;
