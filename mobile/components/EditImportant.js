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


import ChooseTime from '../components/ChooseTime';


import Storage from '../tokenStorage';
import IdStorage from '../ListIdStorage';

import jwtDecode from 'jwt-decode';

var tok;

var ud;

var listId;

class EditImportantTask extends Component {

    constructor (props){
        super(props);
        this.state = {
            userId:'',
            modalVisible:false,
            newTaskName:'',
            newTaskDate:'',
        }
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleDateFormat = this.handleDateFormat.bind(this);
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

        this.setState({newTaskName: this.props.taskName});
        this.handleDateFormat(this.props.taskDate);
        // this.setState({newTaskDate: this.props.taskDate});
        
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
                    <LinearGradient colors={['pink', '#FFF']}>
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

                        <ChooseTime handleSetDate={this.handleSetDate}></ChooseTime>
                        
                        <Button
                        title="Change Task"
                        titleStyle={{fontSize: 20}}
                        containerStyle={{width: 200, marginTop:80, borderRadius: 20}}
                        onPress={this.handleEditSubmit}
                        />
                        <Button
                        title="Back to tasks"
                        titleStyle={{fontSize: 20}}
                        containerStyle={{width: 150}}
                        type="clear"
                        style={{marginTop:50}}
                        onPress={() => {
                            this.resetForm();
                            this.closeModal();
                        }}
                        />
                    </Register_Container>
                    </LinearGradient>
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

    async handleDateFormat(date)
    {
        if (!date)
        {
            this.setState({newTaskDate: 'N/A'});
        }
        else
        {
            date = date.toString();
        
            if (date.includes("T"))
            {
                date = date.substring(0,10);
            }
            else
            {
                date = date.substring(0,11);
            }

            this.setState({newTaskDate: date});

        }
    }

    async handleSetDate(date)
    {
        var year;
        var month;
        var day;
        var final;
        
        if (date.includes("Jan"))
        {
            month = "01"
            year = date.substring(11,15);
            day = date.substring(8,10);

            final = year + '-' + month + '-' + day;

            await this.setState({newTaskDate:final});
            return;
        }
        if (date.includes("Feb"))
        {
            month = "02"
            year = date.substring(11,15);
            day = date.substring(8,10);

            final = year + '-' + month + '-' + day;

            await this.setState({newTaskDate:final});
            return;
        }
        if (date.includes("Mar"))
        {
            month = "03"
            year = date.substring(11,15);
            day = date.substring(8,10);

            final = year + '-' + month + '-' + day;

            await this.setState({newTaskDate:final});
            return;
        }
        if (date.includes("Apr"))
        {
            month = "04"
            year = date.substring(11,15);
            day = date.substring(8,10);

            final = year + '-' + month + '-' + day;

            await this.setState({newTaskDate:final});
            return;
        }
        if (date.includes("May"))
        {
            month = "05"
            year = date.substring(11,15);
            day = date.substring(8,10);

            final = year + '-' + month + '-' + day;

            await this.setState({newTaskDate:final});
            return;
        }
        if (date.includes("Jun"))
        {
            month = "06"
            year = date.substring(11,15);
            day = date.substring(8,10);

            final = year + '-' + month + '-' + day;

            await this.setState({newTaskDate:final});
            return;
        }
        if (date.includes("Jul"))
        {
            month = "07"
            year = date.substring(11,15);
            day = date.substring(8,10);

            final = year + '-' + month + '-' + day;

            await this.setState({newTaskDate:final});
            return;
        }
        if (date.includes("Aug"))
        {
            month = "08"
            year = date.substring(11,15);
            day = date.substring(8,10);

            final = year + '-' + month + '-' + day;

            await this.setState({newTaskDate:final});
            return;
        }
        if (date.includes("Sep"))
        {
            month = "09"
            year = date.substring(11,15);
            day = date.substring(8,10);

            final = year + '-' + month + '-' + day;

            await this.setState({newTaskDate:final});
            return;
        }
        if (date.includes("Oct"))
        {
            month = "10"
            year = date.substring(11,15);
            day = date.substring(8,10);

            final = year + '-' + month + '-' + day;

            await this.setState({newTaskDate:final});
            return;
        }
        if (date.includes("Nov"))
        {
            month = "11"
            year = date.substring(11,15);
            day = date.substring(8,10);

            final = year + '-' + month + '-' + day;

            await this.setState({newTaskDate:final});
            return;
        }
        if (date.includes("Dec"))
        {
            month = "12"
            year = date.substring(11,15);
            day = date.substring(8,10);

            final = year + '-' + month + '-' + day;

            await this.setState({newTaskDate:final});
            return;
        }
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
                this.props.handleShowStarItems(listId);
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

export default EditImportantTask;