import React, { Component, useState } from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { Navigation_Container, Welcome_Message } from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Input } from 'react-native-elements';
import IconIon from 'react-native-vector-icons/Ionicons';


import Storage from '../tokenStorage';

// Variable to hold entire token
var tok;


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

    }

    // Before page render, load To-do lists and token variables
    async componentDidMount(){
        
        // Loads Todo lists
        this.getTodoList();

        // retrieves token from storage
        tok = await Storage.retrieveToken();

        // sets username and userId of user
        this.setState({username: tok.fullName});
        this.setState({userId: tok.userId})

        
        console.log(tok.fullName);
        console.log(tok.userId);
    }

    render(){
        return (

            <View style = {{flexDirection:"column", flex:1}}>
                <View style={{ flex: 1.5, backgroundColor: "#96CAF7" }}>
                    <View>
                        <View style = {{
                            flexDirection: 'row',
                            justifyContent: "space-between"
                            }}>
                            <Text style = {{alignSelf: "center", marginLeft: 75}}>
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
                                    titleStyle={{fontSize: 20}}
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
                                >
                                </Button>
                            </View>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                            <Button
                                    title="Important"
                                    titleStyle={{fontSize: 20}}
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
                                >
                                </Button>
                            </View>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Button
                                    title="Completed"
                                    titleStyle={{fontSize: 20}}
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
                                onPress = {() => {
                                    //addNewTodoList();
                                }}
                                type="clear"
                            > 
                            </Button>
                        </View> 
                        <SafeAreaView>
                            <ScrollView>


                                <View style = {{
                                    flexDirection: "row"
                                    }}>
                                    <Button
                                        icon={
                                            <IconIon raised name = "create-outline"
                                            size={30}
                                            color='black'
                                            />
                                            }   
                                            title=""
                                            onPress = {() => {
                                                //addNewTodoList();
                                            }}
                                            type="clear"
                                    > 
                                    </Button>
                                    <Button
                                        icon={
                                            <IconIon raised name = "arrow-forward-outline"
                                            size={30}
                                            color='black'
                                            />
                                            }   
                                            title=""
                                            onPress={this.retrieveToken}
                                            type="clear"
                                    > 
                                    </Button>
                                    <TouchableHighlight
                                        //onPress={onPress}
                                    > 
                                        <Text style={{
                                            fontWeight: 'bold',
                                            alignSelf: "center",
                                            marginLeft: 20,
                                            marginTop: 5,
                                            fontSize: 25,
                                         }}
                                        >
                                            I'm an example list!
                                        </Text>
                                    </TouchableHighlight>
                                    
                                    {this.state.todoList.map(
                                        (list)=><TouchableHighlight key={list._id} onClick={()=>this.handleShowCustomizedTodoItem(list._id)}>
                                        <IconIon raised name = "create-outline"
                                            size={30}
                                            color='black'
                                        />
                                        {list.Name}</TouchableHighlight>)
                                    }


                                    
                                </View>
                                
                                
                                
                                
                                
                                
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
        console.log(this.state.newTodoList);
        console.log(this.state.userId);
        console.log(tok);

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
                  errorMsg:"new todo list has been added!"  
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
                         userID:this.state.userID,
                         jwtToken:tok,
                     })
                     
             });
             var res = JSON.parse(await response.text());
             //console.log(res);
             if( res.error || !res.list)
             {
                return;
                 
             }else{
                 //console.log(res.list);
                 this.setState({
                     hasTodoList:true,
                     todoList:[...res.list],
                 })
               //console.log("asd");
               //console.log(this.state.todoList);
               //  console.log("aaa");
                 
             }
 
         }
 
         catch(e){
            //console.log(e);
             return;
         }
     }


}

export default HomeTest;
