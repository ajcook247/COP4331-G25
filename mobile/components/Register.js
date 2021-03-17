import React, {Component} from 'react';
import { Text, View, StyleSheet, Modal, Image } from 'react-native';
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
          hidePass : true,
          setHidePass : true
        }
    }

    render() {
        return (
            <View>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                >
                
                <View style={{flex:1}}>
                    <View>
                        <LinearGradient colors={['pink', '#FFF']}>
                        <Register_Container> 
                             
                            <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome', color: 'white'}}
                            overlayContainerStyle={{backgroundColor: 'gray'}}
                            containerStyle={{marginTop: 100, marginBottom: 30}}
                            size="large"
                            />  
                            <Text>Register for a new user below</Text>

                            <Input 
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

                            <CheckBox
                                checked={this.state.checked}
                                onPress={() => this.setState({ checked: !this.state.checked})}
                                title='Show passwords'
                            />

                            <Button
                            title="Create Account"
                            titleStyle={{fontSize: 20}}
                            containerStyle={{width: 200, marginTop:30, borderRadius: 20}}
                            onPress={() => {
                                this.closeModal();
                            }}
                            />

                            <Button
                            title="Back to main page"
                            titleStyle={{fontSize: 20}}
                            containerStyle={{width: 150, marginTop:100}}
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

    showPassword(){
        this.setState({
            hidePass:false
        })
    }
}

export default RegisterPage;
