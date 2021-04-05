import React, {Component} from 'react';
import MainNav from '../components/todoNav';
import {LogoutButton,TodoItemWrapper,TodoListOrderMainPage,TodoItem,DeleteItemIcon,CurrentTodoListHeader, AddTodoItemButton} from '../components/style'
import { FiSettings } from "react-icons/fi";
import { VscTrash } from "react-icons/vsc";

import { RiBookmark3Fill,RiBookmark3Line,RiBookmark2Fill,RiBookmark2Line } from "react-icons/ri";
import AddTodoItem from '../components/addTodoItem';
import EditTodoItem from '../components/editTodoItem';
import storage from '../tokenStorage';

const jwt = require("jsonwebtoken");
var tok = storage.retrieveToken();
var ud = jwt.decode(tok,{complete:true});


class MainPage extends Component {

    constructor(props){
        super(props);
        this.state={
            todoItem:[],

            editIsOpen:false,
            addIsOpen:false,
            addButtonIsOpen:false,
            currentTodoList:{
            },
            currentTodoItem:'',
            errorMsg:'',



          //   tok:storage.retrieveToken(),
          //   ud:decodeToken(this.state.tok),
          userId:ud.payload.userId,
          usename:ud.payload.username,
            
        }
    this.showItems = this.showItems.bind(this);
    this.handleEditTodoitem = this.handleEditTodoitem.bind(this);
    this.handleAddTodoitem = this.handleAddTodoitem.bind(this);
    this.changeItemToIncompleted = this.changeItemToIncompleted.bind(this);
    this.changeItemToCompleted = this.changeItemToCompleted.bind(this);
    this.changeItemToUnstar = this.changeItemToUnstar.bind(this);
    this.changeItemToStar = this.changeItemToStar.bind(this);
    this.closeEditItem = this.closeEditItem.bind(this);
    this.closeAddTodoItem = this.closeAddTodoItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.showAddButton = this.showAddButton.bind(this);
    this.closeAddButton = this.closeAddButton.bind(this);

    }




    render(){
        return (
           
           <div> <MainNav username={this.props.username}  showItems={this.showItems} showAddButton={this.showAddButton} closeAddButton={this.closeAddButton}/>               
                        <TodoItemWrapper>  <LogoutButton onClick={this.props.doLogout}>Logout</LogoutButton>         
                         <CurrentTodoListHeader>{this.state.currentTodoList.name}</CurrentTodoListHeader>                     
                                {this.state.todoItem.map(
                                (item)=><TodoListOrderMainPage key={item.des}>      
                                <TodoItem>
                                 {item.completed && <RiBookmark2Fill onClick={()=>this.changeItemToIncompleted(item.id)} />} 
                                {!item.completed && <RiBookmark2Line onClick={()=>this.changeItemToCompleted(item.id)} />}  
                                {item.star && <RiBookmark3Fill onClick={()=>this.changeItemToUnstar(item.id)} />}
                                 {!item.star && <RiBookmark3Line onClick={()=>this.changeItemToStar(item.id)} />} 
                                 { item.des} Due {item.due}   
                                <DeleteItemIcon> <FiSettings onClick={()=>this.handleEditTodoitem(item)} /> 
                                <VscTrash onClick={()=>this.deleteItem(item.id)} />
                                </DeleteItemIcon>
            
                                </TodoItem> 
                               {this.state.editIsOpen && <EditTodoItem currentItem={this.state.currentTodoItem} 
                               currentTodoList={this.state.CurrentTodoList} 
                               userID={this.state.userID} tok={this.state.tok} 
                               showItems={this.showItems} closeEditItem={this.closeEditItem}/>} 

                               


                                </TodoListOrderMainPage>)}    
                                {this.state.addIsOpen && <AddTodoItem currentTodoList={this.state.CurrentTodoList} 
                               userID={this.state.userID} tok={this.state.tok} 
                               showItems={this.showItems} closeAddItem={this.closeAddTodoItem}/>} 
                          {this.state.addButtonIsOpen && <AddTodoItemButton onClick={this.handleAddTodoitem}>Add</AddTodoItemButton>}
                        </TodoItemWrapper>

            </div>

            







        )
    }

    async changeItemToIncompleted(itemID){
        try {
            let response = await fetch('http://localhost:5000/api/changeToIncomplete',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        userID:this.state.userID,
                        jwtToken:this.state.tok,
                        listID:this.state.currentTodoList.listID,
                        itemID:itemID
                    })
                    
            });
            var res = JSON.parse(await response.text());
            if( res.error)
            {
               return;       
            }else{               
                this.showItems(res.result);
            }

        }

        catch(e){
            console.log(e);
            return;
        }
    }

    async changeItemToCompleted(itemID){
        try {
            let response = await fetch('http://localhost:5000/api/changeToIncomplete',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        userID:this.state.userID,
                        jwtToken:this.state.tok,
                        listID:this.state.currentTodoList.listID,
                        itemID:itemID
                    })
                    
            });
            var res = JSON.parse(await response.text());
            if( res.error)
            {
               return;       
            }else{               
                this.showItems(res.result);
            }

        }

        catch(e){
            console.log(e);
            return;
        }
    }



    async changeItemToUnstar(itemID){
        try {
            let response = await fetch('http://localhost:5000/api/changeToUnstar',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        userID:this.state.userID,
                        jwtToken:this.state.tok,
                        listID:this.state.currentTodoList.listID,
                        itemID:itemID
                    })
                    
            });
            var res = JSON.parse(await response.text());
            if( res.error)
            {
               return;       
            }else{               
                this.showItems(res.result);
            }

        }

        catch(e){
            console.log(e);
            return;
        }
    }

    async changeItemToStar(itemID){
        try {
            let response = await fetch('http://localhost:5000/api/changeToStar',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        userID:this.state.userID,
                        jwtToken:this.state.tok,
                        listID:this.state.currentTodoList.listID,
                        itemID:itemID
                    })
                    
            });
            var res = JSON.parse(await response.text());
            if( res.error)
            {
               return;       
            }else{               
                this.showItems(res.result);
            }

        }

        catch(e){
            console.log(e);
            return;
        }
    }


    showItems(result){
        this.setState({
            currentTodoList:result.todoList,
            todoItem:result.todoItems,
        })
    }


    async handleEditTodoitem(item){

        await this.setState({
            editIsOpen:true,
            currentTodoItem:item,
        })


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
        try {
            let response = await fetch('http://localhost:5000/api/deleteItem',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        userID:this.state.userID,
                        jwtToken:this.state.tok,
                        listID:this.state.currentTodoList.listID,
                        itemID:itemID
                    })
                    
            });
            var res = JSON.parse(await response.text());
            if( res.error)
            {
               return;       
            }else{               
                this.showItems(res.result);
            }

        }

        catch(e){
            console.log(e);
            return;
        }

    }

}

export default MainPage;
