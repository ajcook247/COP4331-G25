import React, { Component, useState } from 'react';
import { Text, View, Image, Button } from 'react-native';
import { Navigation_Container, Welcome_Message } from './style';


// ---- Components ----

//red logout button on top right, currently big centered button
const LogOutButton = ({props, navigation}) => {

    return (
        <Button
            onPress = {() => {
                //setIsLoggedIn(false);
                //navigation.navigate('Login');
            }}
            title = "Logout"
            color = "#FF0000"
            alignSelf = "flex-end"
        >
            {/* onclick = props.setIsLoggedIn(false) */}
            {/* style =  */}
        </Button>
    );
}

//list of user-made lists
const TodoListList = () => {

    //return (

    //    );

}

//TodoListList item (individual list)
const ListItem = () => {
    
    //return (

    //    );

}

//buttons that allow to filter lists (important, finished, etc)
const FilterTasks = () => {

    //return (

    //    );
    
}

//dividing line between top and bottom views
const DividingLine = () => {

    //<View style = {StyleSheet.separator} />
    /* put below into a stylesheet:
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
    */
}

//Button with "+" icon to add a task-list
const AddButton = () => {

    //color likely to change
    //bring up modal/new page to add a task-list
    return (
        <Button
        title = "+"
        color = "F6C2B7"
        >
            
        </Button>
    );

}

//scrollable view that shows all task-lists (loads TaskListList items)
const TaskList = () => {

    //return (

    //);

}

//main component
const HomePage = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(true); //used to determine render back to login page (false -> render LoginPage)


    return (
        <View>
            <LogOutButton/>
            {/*add other two views with necessary components*/}
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
