import React, { Component, useState } from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { Navigation_Container, Welcome_Message } from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Input } from 'react-native-elements';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';



import Storage from '../tokenStorage';
import IdStorage from '../ListIdStorage';

import jwtDecode from 'jwt-decode';


// Variable to hold entire token
var tok;

// Variable to hold decoded JWT
var ud;

var listId;

class CustomTaskList extends Component {

    constructor(props){
        super(props);
        this.state={
            hasTodoList:false,
            customList:[],
            newTodoList:'',
            errorMsg:'',
            username:'',
            userId:'',
            ListKey:'',
        }

    this.logout = this.logout.bind(this);
    this.handleShowCustomizedTodoItem = this.handleShowCustomizedTodoItem.bind(this);
    // this.setParams = this.setParams.bind(this);
    }

    // Before page render, load To-do lists and token variables
    async componentDidMount(){

        // const {navigate} = this.props.navigation;


        // retrieves token from storage
        tok = await Storage.retrieveToken();

        // Decode JWT on retrieval
        ud = jwtDecode(tok, {complete:true});

        // sets username and userId of user
        this.setState({username: ud.fullName});
        this.setState({userId: ud.userId});

        listId = await IdStorage.retrieveId();

        
        // Loads Todo lists
        this.handleShowCustomizedTodoItem(listId);

        // console.log(tok);
        // console.log(ud);
        // console.log(ud.fullName);
        // console.log(ud.userId);
    }

    render(){
        
        return (

            <View style = {{flexDirection:"column", flex:1}}>

                <View style = {{
                    borderBottomColor: '#030608',
                    borderBottomWidth: 2
                }}/>

                <View style={{ flex: 1.3, backgroundColor: "#96CAF7" , paddingBottom:75}}>
                   <View>
                        <SafeAreaView>
                            <ScrollView>

                            {this.state.customList.map(
                            (list)=>
                            <View style = {{
                                flexDirection: "row"
                                }}>
                                <Button
                                    icon={
                                        <IconMCI 
                                        raised 
                                        name = "trash-can"
                                        size={30}
                                        color='black'
                                        />
                                        }   
                                        title=""
                                        onPress = {() => {
                                            this.deleteTodoList(list._id);
                                        }}
                                        type="clear"
                                > 
                                </Button>
                                
                                <Button 
                                    title={list.Name} 
                                    key={list._id} 
                                    type="clear"> 
                            
                                </Button>

                                
                            </View>
                              
                            )}  
                                
                                
                            </ScrollView>
                        </SafeAreaView>
                    </View>
                </View>
            </View>

        )
    }

    async handleShowCustomizedTodoItem(listId){
        try {
            let response = await fetch('http://s21l-g25.herokuapp.com/api/showCustomizedItem',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        CollectionId:listId,
                        jwtToken:tok,
                    })
                    
            });
            var res = JSON.parse(await response.text());
            
            if( res.error)
            {
               return;
                
            }else{
                console.log(res);
                this.setState({
                    customList:[...res.result],
                })
                
                
            }

        }

        catch(e){
            console.log(e);
            return;
        }


    }

    logout()
    {
        const {navigate} = this.props.navigation;

        navigate('Login');
    }




    // async addNewTodoList(){
    //     console.log(this.state.newTodoList);
    //     console.log(this.state.userId);
    //     console.log(tok);

    //     try {
    //         if(!this.state.newTodoList){
    //             return;
    //         }

    //         let response = await fetch('http://s21l-g25.herokuapp.com/api/addList',{
    //                 method:'POST',
    //                 headers:{
    //                     'Accept': 'application/json',
    //                     'Content-Type':'application/json'
    //                 },
    //                 body: JSON.stringify({
    //                     name:this.state.newTodoList,
    //                     userId:this.state.userId,
    //                     jwtToken:tok,
                        
    //                 })
                    
    //         });

    //         var res = JSON.parse(await response.text());
    //         console.log(res);
    //         if( res.error)
    //         {
    //            return;
                
    //         }else{
    //             this.setState({
    //               errorMsg:"new todo list has been added!"  
    //             })
    //             this.getTodoList();
    //             return;
                
    //         }

    //     }

    //     catch(e){
    //         console.log(e);
    //         return;
    //     }
    // }

    // async getTodoList(){

    //     try {
    //          let response = await fetch('http://s21l-g25.herokuapp.com/api/getList',{
    //                  method:'POST',
    //                  headers:{
    //                      'Accept': 'application/json',
    //                      'Content-Type':'application/json'
    //                  },
    //                  body: JSON.stringify({
    //                      id:this.state.userId,
    //                      jwtToken:tok,
    //                  })
                     
    //          });
    //          var res = JSON.parse(await response.text());
    //         //  console.log(res);
    //          if( res.error || !res.list)
    //          {
    //             return;
                 
    //          }else{
    //              console.log(res.list);
    //              this.setState({
    //                  hasTodoList:true,
    //                  todoList:[...res.list],
    //              })
    //         //    console.log("asd");
    //         //    console.log(this.state.todoList);
    //         //    console.log("aaa");
                 
    //          }
 
    //      }
 
    //      catch(e){
    //         //console.log(e);
    //          return;
    //      }
    //  }


    //  async deleteTodoList(id){
    //     console.log(this.state.userId);
    //     console.log(tok);
    //      try {
             
 
    //          let response = await fetch('http://s21l-g25.herokuapp.com/api/removeCollection',{
    //                  method:'POST',
    //                  headers:{
    //                      'Accept': 'application/json',
    //                      'Content-Type':'application/json'
    //                  },
    //                  body: JSON.stringify({
    //                      collectionId:id,
    //                      jwtToken:tok,
                         
    //                  })
                     
    //          });
 
    //          var res = JSON.parse(await response.text());
    //         // console.log(res);
    //          if( res.error)
    //          {
    //             return;
                 
    //          }else{
    //              console.log("deleting");
    //              this.getTodoList();
    //              return;
                 
    //          }
 
    //      }
 
    //      catch(e){
    //          console.log(e);
    //          return;
    //      }
    //  }


}

export default CustomTaskList;
