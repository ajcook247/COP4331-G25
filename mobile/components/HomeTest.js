import React, { Component, useState } from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { Navigation_Container, Welcome_Message } from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Input } from 'react-native-elements';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';


import Storage from '../tokenStorage';
import IdStorage from '../ListIdStorage';
import NameStorage from '../ListNameStorage';

import jwtDecode from 'jwt-decode';


// Variable to hold entire token
var tok;

// Variable to hold decoded JWT
var ud;


class HomeTest extends Component {

    constructor(props){
        super(props);
        this.state={
            hasTodoList:false,
            todoList:[],
            newTodoList:'',
            errorMsg:'',
            username:'',
            userId:'',
        }

    this.logout = this.logout.bind(this);
    this.addNewTodoList = this.addNewTodoList.bind(this);
    this.getTodoList = this.getTodoList.bind(this);
    this.deleteTodoList = this.deleteTodoList.bind(this);

    }

    // Before page render, load To-do lists and token variables
    async componentDidMount(){

        // retrieves token from storage
        tok = await Storage.retrieveToken();

        // Decode JWT on retrieval
        ud = jwtDecode(tok, {complete:true});

        // sets username and userId of user
        this.setState({username: ud.fullName});
        this.setState({userId: ud.userId})

        
        // Loads Todo lists
        this.getTodoList();

        // console.log(tok);
        // console.log(ud);
        // console.log(ud.fullName);
        // console.log(ud.userId);
    }

    render(){

        const {navigate} = this.props.navigation;


        return (

            <View style = {{flexDirection:"column", flex:1}}>
                <View style={{ flex: 1.5, backgroundColor: "#96CAF7" }}>
                    <View>
                        <View style = {{
                            flexDirection: 'row',
                            justifyContent: "space-between"
                            }}>
                            <Text style = {{alignSelf: "center", fontSize:18, fontWeight: "bold", marginTop:30, marginLeft:15}}>
                            Welcome, {this.state.username}
                            </Text>
                            <View style = {{
                                width: 75,
                                alignSelf: "flex-end",
                                margin: 10
                                }}> 
                                <Button
                                    onPress={this.logout}
                                    title = "Logout"
                                    color = "#F08080"
                                    alignSelf = "flex-end"
                                    containerStyle={{marginTop:30, borderRadius: 20}}
                                >
                                    {/* onclick = props.setIsLoggedIn(false) */}
                                    {/* style =  */}
                                </Button>
                                
                            </View>
                        </View>
                        <View style = {{
                            margin: 35
                            }}>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Button
                                    title="All Tasks"
                                    titleStyle={{fontSize: 20, color:"black"}}
                                    containerStyle={{width: 200, marginTop: 20, borderRadius:30}}
                                    type="clear"
                                    icon={
                                        <IconIon
                                            name='folder-outline'
                                            size={22}
                                            color='black'
                                            style={{paddingRight: 10}}
                                        />
                                        
                                    }
                                    onPress={() =>
                                        navigate('All Tasks')
                                    }

                                >
                                </Button>
                            </View>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                            <Button
                                    title="Important"
                                    titleStyle={{fontSize: 20, color:"black"}}
                                    containerStyle={{width: 200, marginTop: 20, borderRadius:30}}
                                    type="clear"
                                    icon={
                                        <IconIon
                                            name='star'
                                            size={22}
                                            color='black'
                                            style={{paddingRight: 10}}
                                        />
                                    }
                                    onPress={() =>
                                        navigate('Important Tasks')
                                    }
                                >
                                </Button>
                            </View>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Button
                                    title="Completed"
                                    titleStyle={{fontSize: 20, color:"black"}}
                                    containerStyle={{width: 200, marginTop: 20, borderRadius:30}}
                                    type="clear"
                                    icon={
                                        <IconIon
                                            name='checkmark'
                                            size={22}
                                            color='black'
                                            style={{paddingRight: 10}}
                                        />
                                    }
                                    onPress={() =>
                                        navigate('Completed Tasks')
                                    }
                                >
                                </Button>
                            </View>
                        </View>
                    </View>
                </View>

                <View style = {{
                    borderBottomColor: '#030608',
                    borderBottomWidth: 2
                }}/>

                <View style={{ flex: 1.3, backgroundColor: "#96CAF7" , paddingBottom:75}}>
                   <View>

                        <View style = {{
                            alignSelf: "flex-end",
                            marginRight: 35,
                            flexDirection: "row",
                            }}>

                            <Input
                            placeholder='Type custom list here'
                            placeholderTextColor='#000'
                            textAlign="left"
                            style={{fontSize: 20}}
                            containerStyle={{width: 210}}
                            value={this.state.newTodoList} 
                            onChangeText={(text) => this.setState({newTodoList: text})}
                            />

                            <Button
                                titleStyle={{fontSize: 20}}
                                icon={
                                <IconIon 
                                    raised 
                                    name = "add-outline"
                                    size={32}
                                    color='black'
                                />  
                                }   
                                title="Add List"
                                type="clear"
                                onPress={() => {
                                    this.addNewTodoList();
                                }}
                            > 
                            </Button>
                        </View> 
                        <SafeAreaView>
                            <ScrollView>

                            {this.state.todoList.map(
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
                                    titleStyle={{fontSize: 20, color:"black"}}
                                    containerStyle={{}}
                                    key={list._id} 
                                    type="clear"
                                    onPress={() => {
                                        IdStorage.storeId(list);
                                        NameStorage.storeName(list);
                                        navigate('Custom Task');
                                      }}

                                > 
                            
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

    logout()
    {
        const {navigate} = this.props.navigation;

        navigate('Login');
    }

    async addNewTodoList(){
        // console.log(this.state.newTodoList);
        // console.log(this.state.userId);
        // console.log(tok);

        try {
            if(!this.state.newTodoList){
                return;
            }

            let response = await fetch('http://s21l-g25.herokuapp.com/api/addList',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        name:this.state.newTodoList,
                        userId:this.state.userId,
                        jwtToken:tok,
                        
                    })
                    
            });

            var res = JSON.parse(await response.text());
            console.log(res);
            if( res.error)
            {
               return;
                
            }else{
                this.setState({
                  errorMsg:"new todo list has been added!",
                  newTodoList:'',
                })
                this.getTodoList();
                return;
                
            }

        }

        catch(e){
            console.log(e);
            return;
        }
    }

    async getTodoList(){

        try {
             let response = await fetch('http://s21l-g25.herokuapp.com/api/getList',{
                     method:'POST',
                     headers:{
                         'Accept': 'application/json',
                         'Content-Type':'application/json'
                     },
                     body: JSON.stringify({
                         id:this.state.userId,
                         jwtToken:tok,
                     })
                     
             });
             var res = JSON.parse(await response.text());
            //  console.log(res);
             if( res.error || !res.list)
             {
                return;
                 
             }else{
                 console.log(res.list);
                 this.setState({
                     hasTodoList:true,
                     todoList:[...res.list],
                 })
            //    console.log("asd");
            //    console.log(this.state.todoList);
            //    console.log("aaa");
                 
             }
 
         }
 
         catch(e){
            //console.log(e);
             return;
         }
     }


     async deleteTodoList(id){
        console.log(this.state.userId);
        console.log(tok);
         try {
             
 
             let response = await fetch('http://s21l-g25.herokuapp.com/api/removeCollection',{
                     method:'POST',
                     headers:{
                         'Accept': 'application/json',
                         'Content-Type':'application/json'
                     },
                     body: JSON.stringify({
                         collectionId:id,
                         jwtToken:tok,
                         
                     })
                     
             });
 
             var res = JSON.parse(await response.text());
            // console.log(res);
             if( res.error)
             {
                return;
                 
             }else{
                 console.log("deleting");
                 this.getTodoList();
                 return;
                 
             }
 
         }
 
         catch(e){
             console.log(e);
             return;
         }
     }


}

export default HomeTest;
