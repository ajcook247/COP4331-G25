import React, {Component} from 'react';
import MainNav from '../components/todoNav';
import {LogoutButton,TodoItemWrapper,TodoListOrderMainPage,TodoItem,DeleteItemIcon,CurrentTodoListHeader, AddTodoItemButton, DoneTodoItem} from '../components/style'
import { FiSettings } from "react-icons/fi";
import { VscTrash } from "react-icons/vsc";

import { RiBookmark3Fill,RiBookmark3Line,RiBookmark2Fill,RiBookmark2Line } from "react-icons/ri";
import AddTodoItem from '../components/addTodoItem';
import EditTodoItem from '../components/editTodoItem';
import storage from '../tokenStorage';

const jwt = require("jsonwebtoken");
var tok = storage.retrieveToken();
var ud = jwt.decode(tok,{complete:true});

const app_name = 's21l-g25';

function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }   
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}

class MainPage extends Component {

    constructor(props){
        super(props);
        this.state={
            todoItem:[],
            editIsOpen:false,
            addIsOpen:false,
            addButtonIsOpen:false,
            currentTodoListID:'',
            currentTodoItem:'',
            errorMsg:'',
            userId:ud.payload.userId,
            usename:ud.payload.username,
             }

            this.showItems = this.showItems.bind(this);
            this.handleEditTodoitem = this.handleEditTodoitem.bind(this);
            this.handleAddTodoitem = this.handleAddTodoitem.bind(this);
            this.flagTask = this.flagTask.bind(this);
            this.closeEditItem = this.closeEditItem.bind(this);
            this.closeAddTodoItem = this.closeAddTodoItem.bind(this);
            this.deleteItem = this.deleteItem.bind(this);
            this.showAddButton = this.showAddButton.bind(this);
            this.closeAddButton = this.closeAddButton.bind(this);
            this.setCurrentTodoList = this.setCurrentTodoList.bind(this);
            this.markTask = this.markTask.bind(this);


    }




    render(){
        return (
           
           <div> <MainNav username={this.props.username}  showItems={this.showItems} showAddButton={this.showAddButton} closeAddButton={this.closeAddButton} setCurrentTodoList={this.setCurrentTodoList}/>               
                        <TodoItemWrapper style={{overflowY:'scroll'}} >  <LogoutButton onClick={this.props.doLogout}>Logout</LogoutButton>         
                         <CurrentTodoListHeader>Your Tasks</CurrentTodoListHeader>                     
                                {this.state.todoItem.map(
                                (item)=><TodoListOrderMainPage style={{marginTop:10, marginBottom:10}} key={item._id}>      
                                <TodoItem>
                                
                                 {item.Done && <RiBookmark2Fill style={{marginRight:5}} onClick={()=>this.markTask(item._id)} />} 
                                {!item.Done && <RiBookmark2Line style={{marginRight:5}} onClick={()=>this.markTask(item._id)} />}

                                {item.Urgent && <RiBookmark3Fill style={{marginRight:15}}  onClick={()=>this.flagTask(item._id)} />}
                                 {!item.Urgent && <RiBookmark3Line style={{marginRight:15}}  onClick={()=>this.flagTask(item._id)} />} 

                                 { item.Description } Due {item.Deadline}   
                                <DeleteItemIcon> <FiSettings onClick={()=>this.handleEditTodoitem(item)} /> 
                                <VscTrash onClick={()=>this.deleteItem(item._id)} />
                                </DeleteItemIcon>
            
                                </TodoItem> 
                               {this.state.editIsOpen && <EditTodoItem currentItem={this.state.currentTodoItem} 
                               currentTodoList={this.state.CurrentTodoList} 
                               userID={this.state.userID} tok={tok} 
                               showItems={this.showItems} closeEditItem={this.closeEditItem}/>} 

                               


                                </TodoListOrderMainPage>)}    
                                {this.state.addIsOpen && <AddTodoItem currentTodoListID={this.state.currentTodoListID} 
                               userID={this.state.userId} tok={tok} 
                               showItems={this.showItems} closeAddItem={this.closeAddTodoItem}/>} 
                          {this.state.addButtonIsOpen && <AddTodoItemButton style={{borderRadius:30, borderWidth:3, marginBottom:20}} onClick={this.handleAddTodoitem}>Add</AddTodoItemButton>}
                        </TodoItemWrapper>

            </div>

            







        )
    }




    async markTask(itemID){
       // console.log("asdsss");
      //  console.log(itemID);
        try {
            let response = await fetch(buildPath('api/markTask'),{
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
            let response = await fetch(buildPath('api/flagTask'),{
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
            //    this.showItems(res.result);
            }

        }

        catch(e){
          //  console.log(e);
            return;
        }
    }

    


    showItems(result){
       // console.log(result);
        this.setState({
        //    currentTodoListID:result[0].CollectionId,
            todoItem:result,
        })
    }


    setCurrentTodoList(currentlistID){
        this.setState({
            currentTodoListID:currentlistID,
        })
    }
    async handleEditTodoitem(item){

        await this.setState({
            editIsOpen:true,
            currentTodoItem:item,
        })

       // console.log(this.state.currentTodoItem);
    }

    closeEditItem(){
        this.setState({
            editIsOpen:false,
        })

    }

    showAddButton(){
        this.setState({
            addButtonIsOpen:true
        })
    }

    closeAddButton(){
        this.setState({
            addButtonIsOpen:false
        })
    }
    

    handleAddTodoitem(){
        this.setState({
            addIsOpen:true
        })
    }

    closeAddTodoItem(){
        this.setState({
            addIsOpen:false
        })
    }


    async deleteItem(itemID){
        //console.log("delete");
        //console.log(tok);
        //console.log(itemID);
        try {
            let response = await fetch(buildPath('api/removeTask'),{
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
               // this.showItems(res.result);
            }

        }

        catch(e){
          //  console.log(e);
            return;
        }

    }

}

export default MainPage;
