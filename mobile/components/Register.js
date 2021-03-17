import React, {Component} from 'react';
import { Text, View, StyleSheet, Modal, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


import { Button, Avatar, Input } from 'react-native-elements';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { Login_Container, Register_Container, Register_Text, Welcome_Message } from './style';


import {TouchableHighlight} from 'react-native';

class RegisterPage extends Component {
    constructor(props){
        super(props);
        this.state={
          username:'',
          password:'',
          confirmed:'',
          email:'',
          passwordMatch:true,
          modalVisible: false
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
                
                <View style={{marginTop: 100}}>
                    <View>
                        <Text>Hello World!</Text>

                        <Input placeholder='Email' />
                        <Input placeholder='Username'/>  
                        <Input placeholder='Password'/>
                        <Input placeholder='Confirm Password'/> 

                        <TouchableHighlight
                            onPress={() => {
                            this.closeModal();
                            }}
                        >
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
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
}

export default RegisterPage;
