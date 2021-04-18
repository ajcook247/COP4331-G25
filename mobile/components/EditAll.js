import React, { Component, useState } from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, TouchableHighlight, Alert, Modal } from 'react-native';
import { Navigation_Container, Welcome_Message } from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Input } from 'react-native-elements';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import { Register_Container } from './style'



import Storage from '../tokenStorage';
import IdStorage from '../ListIdStorage';

import jwtDecode from 'jwt-decode';

var tok;

var ud;

var listId;

class EditAllTask extends Component {

    constructor (props){
        super(props);
        this.state = {
            userId:'',
            modalVisible:false,
            newTaskName:'',
            newTaskDate:'',
        }
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
    }

    async componentDidMount(){

        // const {navigate} = this.props.navigation;


        // retrieves token from storage
        tok = await Storage.retrieveToken();

        // Decode JWT on retrieval
        ud = jwtDecode(tok, {complete:true});

        // sets username and userId of user
        this.setState({userId: ud.userId});

        listId = await IdStorage.retrieveId();

        this.setState({newTaskName: this.props.taskName});
        this.setState({newTaskDate: this.props.taskDate});
        
        // Loads Todo lists
        //this.handleShowCustomizedTodoItem(listId);

        // console.log(tok);
        // console.log(ud);
        // console.log(ud.fullName);
        // console.log(ud.userId);
        // console.log(listId);
    }

    render(){
        return(
            <View>
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            >
            
            <View>
                <View>
                    <Register_Container > 
                        
                        <Text>Edit Task</Text>

                        <Input 
                        value={this.state.newTaskName} 
                        onChangeText={(text) => this.setState({newTaskName: text})}
                        placeholderTextColor='#000'
                        textAlign="left"
                        style={{fontSize: 20}}
                        leftIcon={
                            <IconMCI
                                name='note-plus'
                                size={22}
                                color='black'
                            />
                        }
                        containerStyle={{marginTop: 40, width: 300}}
                        />
                        <Input
                        value={this.state.newTaskDate} 
                        onChangeText={(text) => this.setState({newTaskDate: text})}
                        placeholderTextColor='#000'
                        textAlign="left"
                        style={{fontSize: 20}}
                        leftIcon={
                            <IconMCI
                                name='calendar-month'
                                size={20}
                                color='black'
                            />
                        }
                        containerStyle={{width: 300}}
                        /> 
                        
                        <Button
                        title="Change Task"
                        titleStyle={{fontSize: 20}}
                        containerStyle={{width: 200, marginTop:30, borderRadius: 20}}
                        onPress={this.handleEditSubmit}
                        />
                        <Button
                        title="Back to tasks"
                        titleStyle={{fontSize: 20}}
                        containerStyle={{width: 150}}
                        type="clear"
                        onPress={() => {
                            this.resetForm();
                            this.closeModal();
                        }}
                        />
                    </Register_Container>
                </View>
            </View>
            </Modal>
            <Button
            style={{alignSelf: 'flex-end', flex: 1}}
            icon={
                <IconIon 
                raised 
                name = "ios-cog"
                size={25}
                color='black'
                />
                }   
                title=""
                onPress = {() => {
                    this.setModalVisible();
                }}
                type="clear"
            > 
            </Button>
        </View>
        )
    }

    async handleEditSubmit(){
     

        try {
            let response = await fetch('http://s21l-g25.herokuapp.com/api/editTask',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        jwtToken:tok,
                        description:this.state.newTaskName,
                        deadline:this.state.newTaskDate,
                        taskId:this.props.taskID,

                    })
                    
            });
            var res = JSON.parse(await response.text());
            if( res.error)
            {
               return;       
            }else{            
                this.closeModal();
                this.props.handleShowAllItems(listId);
            }

        }

        catch(e){
            console.log(e);
            return;
        }

    }

    // Opens AddTask Modal
    setModalVisible() {
        this.setState({
            modalVisible: true
        })      
    }

    // Closes AddTask Modal
    closeModal(){
        this.setState({
            modalVisible:false
        })
    }

    resetForm(){
        this.setState({
          newTaskName:this.props.taskName,
          newTaskDate:this.props.taskDate,
        })
    }

}

export default EditAllTask;