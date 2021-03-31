import React, { Component, useState } from 'react';
import { Text, View, Image, Button, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Navigation_Container, Welcome_Message } from './style';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';




// ---- Components ----

//red logout button on top right, currently big centered button
const LogOutButton = ({props, navigation}) => {
    
    navigation = useNavigation();

    //button wrapped in view because buttons cannot be resized but views can
    //alignSelf: "flex-end" puts the button to the end of the screen horizontally
    //margin: 10 was a nice number to keep the button from bordering the screen too closely
    return (
        <View style = {{
            width: 75,
            alignSelf: "flex-end",
            margin: 10
            }}> 
            <Button
                onPress = {() => {
                    //setIsLoggedIn(false);
                    navigation.navigate('Login');
                }}
                title = "Logout"
                color = "#F08080"
                alignSelf = "flex-end"
            >
                {/* onclick = props.setIsLoggedIn(false) */}
                {/* style =  */}
            </Button>
        </View>
    );
}

//Button with "+" icon to add a task-list
const AddButton = () => {

    //color likely to change
    //bring up modal/new page to add a task-list
    return (
        <View style = {{
            width: 45,
            alignSelf: "flex-end",
            marginRight: 35
        }}>
            <Icon raised name = "add-outline" type = 'ionicon'>

            </Icon>
        </View> 
    );

}

//buttons that allow to filter lists (important, finished, etc)
const FilterTasks = () => {

    return (
        <View style = {{
            margin: 35
        }}>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <Icon raised name = "folder-outline" type = 'ionicon' />
                <Text style={{ fontWeight: 'bold' }}>All Tasks</Text>
            </View>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <Icon raised name = "star" type = 'ionicon' />
                <Text style={{ fontWeight: 'bold' }}>Important</Text>
            </View>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <Icon raised name = "checkmark" type = 'ionicon' />
                <Text style={{ fontWeight: 'bold' }}>Completed</Text>
            </View>
        </View>
    );
    
}

//scrollable view of user-made lists
//currently has arbitrary list items, supposed to grab from api
const ListGroup = () => {

    return (
        <SafeAreaView>
            <ScrollView>
                <TodoListItem/>
                <TodoListItem/>
                <TodoListItem/>
                <TodoListItem/>
                <TodoListItem/>
                <TodoListItem/>
                <TodoListItem/>
                <TodoListItem/>
            </ScrollView>
        </SafeAreaView>
    );

}

//TodoListList item (individual list)
const TodoListItem = () => {
    
    return (
        <View style = {{
            flexDirection: "row"
        }}>
            <Icon raised name = "create-outline" type = 'ionicon' />
            <Icon raised name = "arrow-forward-outline" type = 'ionicon' />
            <Text style={{
                fontWeight: 'bold',
                alignSelf: "center",
                marginLeft: 20 }}>I'm an example list!</Text>
        </View>
    );

}

//contains logout button, welcome message, and avatar (todo)
//maybe mess with welcome message placement
const Header = () => {

    return (
        <View style = {{
            flexDirection: 'row',
            justifyContent: "space-between"
        }}>
            <Text style = {{alignSelf: "center", marginLeft: 75}}>
            Welcome, [user]
            </Text>
            <LogOutButton/>
        </View>
    );

}

//dividing line view
const DividingLine = () => {

    return (
        <View style = {{
            marginVertical: 2,
            borderBottomColor: '#030608',
            borderBottomWidth: 2
        }}/>
    );
    
}

const TopView = () => {

    return (
        <View style = {{
            //flex:1 ---IMPORTANT--- (breaks the whole screen lmao but should make the scrollview work. parent view for scrollview needs flex:1?)
        }}>
            <Header/>
            <FilterTasks/>
        </View>
    );

}

const BottomView = () => {

    return (
        <View>
            <AddButton/>
            <ListGroup/>
        </View>
    );

}

//main component
const HomePage = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(true); //used to determine render back to login page (false -> render LoginPage)


    return (
        
        <View>
            <LinearGradient colors={['#96CAF7', '#FFF']}>
                <TopView/>
                <DividingLine/>
                <BottomView/>
            </LinearGradient>
        </View>
        
    );
    
}

// ---- Helper Functions ----
const CheckForLogout = (props) => {

    if(!props.isLoggedIn){
        //reset values/unrender
        navigation.navigate('Login'); //broken ;w;
    }

}

// get list of tasks from db
const getTasks = () => {
    
}

//get all tasklists from db
const getListItems = () => {

}

export default HomePage;
