import React, {Component} from 'react';
import { Text, View, StyleSheet, Modal, Image, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Button, Avatar, Input, CheckBox } from 'react-native-elements';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { Login_Container, Register_Container, Register_Text, Reset_Container, Welcome_Message } from './style';



class ResetPage extends Component {
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
    }

    render() {
        return (
            <View>
                <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.modalVisible}
                >
                
                <View>
                    <View>
                        <LinearGradient colors={['pink', '#FFF']}>
                        <Reset_Container> 
                             
                            <Avatar
                            rounded
                            icon={{name: 'user', type: 'font-awesome', color: 'white'}}
                            overlayContainerStyle={{backgroundColor: 'gray'}}
                            containerStyle={{marginTop: 60, marginBottom: 30}}
                            size="large"
                            />  

                            <Text>Please enter your email below</Text>
                            
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

                            <Text>Send reset form to Your Email</Text>
                            
                            <Button
                            title="Change Password"
                            titleStyle={{fontSize: 20}}
                            containerStyle={{width: 200, marginTop:30, borderRadius: 20}}
                            onPress={() => {
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
                        </Reset_Container>
                    </LinearGradient>
                    </View>
                </View>
                </Modal>

                <Button
                title="Forgot Password?"
                titleStyle={{fontSize: 20}}
                containerStyle={{width: 180, marginTop:30}}
                type="clear"
                onPress={() => {
                    this.setModalVisible();
                }}>
                </Button>
            </View>
        );
    }

    // Opens Forgot Password Modal
    setModalVisible() {
        this.setState({
            modalVisible: true
        })      
    }

    // Closes Forgot Password Modal
    closeModal(){
        this.setState({
            modalVisible:false
        })
    }
}


export default ResetPage;



