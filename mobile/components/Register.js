import React, {Component} from 'react';
import { Text, View, StyleSheet, Modal, Image, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Button, Avatar, Input, CheckBox } from 'react-native-elements';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { Login_Container, Register_Container, Register_Text, Welcome_Message } from './style';


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
        if(this.state.confirmed != this.state.password)
        {

        //Alert.alert(this.state.email, this.state.username) // If all are filled, show email and username
        
        //Alert.alert(this.state.password, this.state.confirmed) // If all are filled, show password and confirmed
        
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
