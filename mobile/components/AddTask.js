import React, { Component, useState } from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, TouchableHighlight, Alert, Modal } from 'react-native';
import { Navigation_Container, Welcome_Message } from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Input } from 'react-native-elements';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import { Register_Container } from '../components/style'



import Storage from '../tokenStorage';
import IdStorage from '../ListIdStorage';

import jwtDecode from 'jwt-decode';

var tok;

var ud;

var listId;

class AddTask extends Component {

    constructor (props){
        super(props);
        this.state = {
            des:'',
            due:'',
            userId:'',
            modalVisible:false,
        }
        this.handleAddTaskSubmit = this.handleAddTaskSubmit.bind(this);
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

        
        // Loads Todo lists
        //this.handleShowCustomizedTodoItem(listId);

        // console.log(tok);
        // console.log(ud);
        // console.log(ud.fullName);
        // console.log(ud.userId);
        console.log(listId);
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
                        
                        <Text>Add a Task</Text>

                        <Input 
                        value={this.state.des} 
                        onChangeText={(text) => this.setState({des: text})}
                        placeholder='Task description'
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
                        value={this.state.due} 
                        onChangeText={(text) => this.setState({due: text})}
                        placeholder='Due date'
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
                        title="Submit"
                        titleStyle={{fontSize: 20}}
                        containerStyle={{width: 200, marginTop:30, borderRadius: 20}}
                        onPress={this.handleAddTaskSubmit}
                        />
                        <Button
                        title="Back to tasks"
                        titleStyle={{fontSize: 20}}
                        containerStyle={{width: 150}}
                        type="clear"
                        onPress={() => {
                            this.closeModal();
                        }}
                        />
                    </Register_Container>
                </View>
            </View>
            </Modal>
            <Button
                titleStyle={{fontSize: 20}}
                containerStyle={{marginTop:30, alignSelf:"center"}}
                icon={
                <IconIon 
                    raised 
                    name = "add-outline"
                    size={32}
                    color='black'
                />  
                }   
                title="Add Task"
                type="clear"
                onPress={() => {
                    this.setState({modalVisible: true})
                }}
            > 
            </Button>
        </View>
        )
    }

    async handleAddTaskSubmit(){
        try {
            let response = await fetch('http://s21l-g25.herokuapp.com/api/addTask',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        userId:this.state.userId,
                        jwtToken:tok,
                        collectionId:listId,
                        description:this.state.des,
                        date:this.state.due,
                    })
                    
            });
            var res = JSON.parse(await response.text());
            if( res.error)
            {
               return;       
            }else{               
                //this.props.showItems(res.result);
                this.setState({modalVisible: false});
                this.props.handleShowCustomizedTodoItem(listId);
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

}

export default AddTask;