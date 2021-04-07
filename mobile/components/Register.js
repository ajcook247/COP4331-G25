import React, {Component} from 'react';
import { Text, View, StyleSheet, Modal, Image, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Button, Avatar, Input, CheckBox } from 'react-native-elements';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { Register_Container } from './style';


class RegisterPage extends Component {
    constructor(props){
        super(props);
        this.state={
          username:'',
          password:'',
          confirmed:'',
          email:'',
          name:'',
          passwordMatch:true,
          modalVisible: false,
        }

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
                            value={this.state.email} 
                            onChangeText={(text) => this.setState({email: text})}
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
                            value={this.state.username} 
                            onChangeText={(text) => this.setState({username: text})}
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
                            value={this.state.password} 
                            onChangeText={(text) => this.setState({password: text})}
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
                            value={this.state.confirmed} 
                            onChangeText={(text) => this.setState({confirmed: text})}
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
                            <Input
                            value={this.state.name} 
                            onChangeText={(text) => this.setState({name: text})}
                            secureTextEntry={true}
                            placeholder='Enter your name'
                            placeholderTextColor='#000'
                            textAlign="left"
                            style={{fontSize: 20}}
                            leftIcon={
                                <IconFA
                                    name='child'
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
                            onPress={this.handleRegisterSubmit}
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

    // Opens Register Modal
    setModalVisible() {
        this.setState({
            modalVisible: true
        })      
    }

    // Closes Register Modal
    closeModal(){
        this.setState({
            modalVisible:false
        })
    }

    // Handles Register
    async handleRegisterSubmit()
    {
        if(!this.state.email)
        {
          return;
        }
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
        if(!this.state.name)
        {
          return;
        }
        if(this.state.confirmed != this.state.password)
        {
        
            Alert.alert('Please make sure your passwords are the same');

        //Alert.alert(this.state.email, this.state.username) // If all are filled, show email and username
        
        //Alert.alert(this.state.password, this.state.confirmed) // If all are filled, show password and confirmed
        
          return;
        }
        else
        {

            var obj = {login: this.state.username, password: this.state.password, email: this.state.email, Verified: false, name: this.state.name }
            var js = JSON.stringify(obj);

            try {
                /* we will add register api*/ 
                let response = await fetch('https://s21l-g25.herokuapp.com/api/register',{
                    method:'POST',
                    body: js,
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        login:this.state.username,
                        password:this.state.password,
                        email:this.state.email,
                        name:this.state.name,
                   })        
                });
                var res = JSON.parse(await response.text());
                if( res.error )
                {
                    Alert.alert('Username Already exists, please try a new one'); //email duplicate??
                    return;
                }
                else
                {
                    this.resetForm();
                    this.closeModal();
                }
            }
            catch(e)
            {
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
          name:'',
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
