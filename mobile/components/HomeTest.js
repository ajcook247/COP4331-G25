import React, { Component, useState } from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import { Navigation_Container, Welcome_Message } from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Icon, Button, Input } from 'react-native-elements';
import IconIon from 'react-native-vector-icons/Ionicons';



class HomeTest extends Component {

    constructor(props){
        super(props);
        this.state={
            todoItem:
            [
                {
                    des:'go to park1',
                    due:'2020',
                    id:'1',
                    completed:false,
                    star:true,
                },
                { 
                    des:'go to park2',
                    due:'2020',
                    id:'2',
                    completed:false,
                    star:true,
                },
                { 
                    des:'go to park3',
                    due:'2020',
                    id:'3',
                    completed:true,
                    star:true,
                }
            ],
            
            
        }

    this.logout = this.logout.bind(this);

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
                            Welcome, [user]
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
                                            onPress = {() => {
                                                //addNewTodoList();
                                            }}
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


}

export default HomeTest;
