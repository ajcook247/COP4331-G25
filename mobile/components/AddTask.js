import React, { Component, useState } from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, TouchableHighlight, Alert, Modal } from 'react-native';
import { Navigation_Container, Welcome_Message } from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Input } from 'react-native-elements';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import { Register_Container } from '../components/style';

import DateTimePicker from '@react-native-community/datetimepicker';

import ChooseTime from '../components/ChooseTime';



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
            date:'2000-10-09'
        }
        this.handleAddTaskSubmit = this.handleAddTaskSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.handleSetDate = this.handleSetDate.bind(this);
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
                    <LinearGradient colors={['pink', '#FFF']}>
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

                        <ChooseTime handleSetDate={this.handleSetDate} > </ChooseTime>
                        
                        <Button
                        title="Submit"
                        titleStyle={{fontSize: 20}}
                        containerStyle={{width: 200, marginTop:80, borderRadius: 20}}
                        onPress={this.handleAddTaskSubmit}
                        />
                        <Button
                        title="Back to tasks"
                        titleStyle={{fontSize: 20}}
                        containerStyle={{width: 150}}
                        type="clear"
                        style={{marginTop:50}}
                        onPress={() => {
                            this.closeModal();
                            this.resetForm();
                        }}
                        />
                    </Register_Container>
                    </LinearGradient>
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

    async handleSetDate(date)
    {
        if (!date)
        {
            await this.setState({due:'N/A'});
        }
        else
        {
            date = date.toString();
            date = date.substring(4,15);
            await this.setState({due:date});
            console.log(this.state.due);
        }

    
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
                this.resetForm();
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

    resetForm(){
        this.setState({
          des:'',
          due:'',
        })
    }

}

export default AddTask;