import React, { Component, useState } from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { Navigation_Container, Welcome_Message } from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Input } from 'react-native-elements';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import EditAllTask from '../components/EditAll';


import Storage from '../tokenStorage';

import jwtDecode from 'jwt-decode';


// Variable to hold entire token
var tok;

// Variable to hold decoded JWT
var ud;


class AllTaskList extends Component {

    constructor(props){
        super(props);
        this.state={
            hasTodoList:false,
            allList:[],
            newTodoList:'',
            errorMsg:'',
            username:'',
            userId:'',
            value:'',
        }

    this.logout = this.logout.bind(this);
    this.handleShowAllItems = this.handleShowAllItems.bind(this);
    this.handleDateFormat = this.handleDateFormat.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);


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
        this.handleShowAllItems();

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

                <Input 
                    onChangeText={this.handleSearchChange}
                    // onChange={this.handleSearchChange}
                    placeholder='Search for task'
                    placeholderTextColor='#000'
                    textAlign="center"
                    style={{fontSize: 20}}
                    containerStyle={{width: 300, marginLeft:50, marginTop:30}}
                />

                   <View style={{marginTop:40}}>
                        <SafeAreaView>
                            <ScrollView>

                            {this.state.allList.map(
                            (list)=>
                            <View style = {{
                                flexDirection: "row",
                                backgroundColor:"white",
                                borderWidth:2,
                                marginTop:8,
                                borderRadius:50,
                                }}
                                key={list._id}
                                >

                            {!list.Done && <Button style = {{flex: 1}}
                                    icon={
                                        <IconIon 
                                            raised 
                                            name = "checkmark-circle-outline"
                                            size={25}
                                        />
                                        }   
                                        title=""
                                        onPress={() => {
                                            this.markTask(list._id);
                                        }}
                                        type="clear"
                                > 
                                </Button>
                            }
                            {list.Done && <Button style = {{flex: 1}}
                                    icon={
                                        <IconIon 
                                        raised 
                                        name = "checkmark-circle"
                                        size={25}
                                        />
                                        }   
                                        title=""
                                        onPress={() => {
                                            this.markTask(list._id);
                                        }}
                                        type="clear"
                                > 
                                </Button>
                            }
                            {!list.Urgent && <Button style = {{flex: 1}}
                                    icon={
                                        <IconIon 
                                            raised 
                                            name = "star-outline"
                                            size={25}
                                        />
                                        }   
                                        title=""
                                        onPress={() => {
                                            this.flagTask(list._id);
                                        }}
                                        type="clear"
                                > 
                                </Button>
                            }
                            {list.Urgent && <Button style = {{flex: 1}}
                                    icon={
                                        <IconIon 
                                        raised 
                                        name = "star"
                                        size={25}
                                        />
                                        }   
                                        title=""
                                        onPress={() => {
                                            this.flagTask(list._id);
                                        }}
                                        type="clear"
                                > 
                                </Button>
                            }
                            

                            {!list.Urgent && !list.Done && <Text style={{fontSize:20, marginTop:7, flex: 10}}> {list.Name} {"\n"} Due: {this.handleDateFormat(list.Deadline)}  </Text> }
                            {list.Urgent && !list.Done && <Text style={{fontWeight:"bold", fontSize:20, marginTop:7, flex: 10}}> {list.Name} {"\n"} Due: {this.handleDateFormat(list.Deadline)} </Text> }
                            {!list.Urgent && list.Done && <Text style={{marginTop:7, fontSize:20, textDecorationLine: 'line-through', textDecorationStyle: 'solid', flex: 10}}> {list.Name} {"\n"} Due: {this.handleDateFormat(list.Deadline)}  </Text> }
                            {list.Urgent && list.Done && <Text style={{marginTop:7, fontSize:20, fontWeight:"bold", textDecorationLine: 'line-through', textDecorationStyle: 'solid', flex: 10}}> {list.Name} {"\n"} Due: {this.handleDateFormat(list.Deadline)} </Text> }

                                
                                

                                <EditAllTask taskName={list.Name} taskDate={list.Deadline} taskID={list._id} handleShowAllItems={this.handleShowAllItems}> </EditAllTask>

                                <Button
                                    style={{alignSelf: 'flex-end', flex:1}}
                                    icon={
                                        <IconMCI 
                                        raised 
                                        name = "trash-can"
                                        size={25}
                                        color='black'
                                        />
                                        }   
                                        title=""
                                        onPress = {() => {
                                            this.deleteItem(list._id);
                                        }}
                                        type="clear"
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

    

    

    async handleSearchChange(text){

        console.log(text);

        await this.setState({
            value:text,
        })

        
        try {
            let response = await fetch('http://s21l-g25.herokuapp.com/api/searchTasks',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        jwtToken:tok,
                        userId:this.state.userId,
                        words:this.state.value,
                    })
                    
            });
            var res = JSON.parse(await response.text());
            // console.log(res);
            var result = res.result;
            // console.log(result);

            if( res.error)
            {
               return;       
            }else{               
                await this.setState({
                    allList:result,
                })
            }

        }

        catch(e){
          //  console.log(e);
            return;
        }

        

    

    }

    handleDateFormat(date)
    {
        var dateOne;
        var dateTwo;

        var finalDate;

        date = date.toString();

        if (date.includes("T"))
        {
            dateOne = date.substring(0,10);
        }
        else
        {
            dateOne = date.substring(0,11);
        }

        dateTwo = date.substring(11,19); // Gives Hour

        finalDate = dateOne.concat(dateTwo); // Concats with no space

        return dateOne;
    }

    async markTask(itemID){
        // console.log("asdsss");
       //  console.log(itemID);
         try {
             let response = await fetch('http://s21l-g25.herokuapp.com/api/markTask',{
                     method:'POST',
                     headers:{
                         'Accept': 'application/json',
                         'Content-Type':'application/json'
                     },
                     body: JSON.stringify({                        
                         jwtToken:tok,
                         taskId:itemID
                     })
                     
             });
             var res = JSON.parse(await response.text());
             console.log(res);
             if( res.error)
             {
                return;       
             }else{               
               //  this.showItems(res.result);
               //  console.log(listId);
               this.handleShowAllItems();
             }
 
         }
 
         catch(e){
             console.log(e);
             return;
         }
     }

    async flagTask(itemID){
        //console.log("asddddd");
        //console.log(tok);
        //console.log(itemID);
        try {
            let response = await fetch('http://s21l-g25.herokuapp.com/api/flagTask',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        jwtToken:tok,
                        taskId:itemID
                    })
                    
            });
            var res = JSON.parse(await response.text());
            if( res.error)
            {
               return;       
            }else{               
                this.handleShowAllItems();
            }

        }

        catch(e){
          //  console.log(e);
            return;
        }
    }

    async deleteItem(itemID){
        //console.log("delete");
        //console.log(tok);
        //console.log(itemID);
        try {
            let response = await fetch('http://s21l-g25.herokuapp.com/api/removeTask',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        jwtToken:tok,
                        taskId:itemID,
                    })
                    
            });
            var res = JSON.parse(await response.text());
            if( res.error)
            {
               return;       
            }else{               
                this.handleShowAllItems();
            }

        }

        catch(e){
          //  console.log(e);
            return;
        }

    }

    async handleShowAllItems(){
        
        try {

            let response = await fetch('http://s21l-g25.herokuapp.com/api/showAll',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        userId:this.state.userId,
                        jwtToken:tok,
                    })
                    
            });
            var res = JSON.parse(await response.text());
            if( res.error)
            {
               return;
                
                
            }else{         
                this.setState({
                    allList:[...res.result],
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

export default AllTaskList;
