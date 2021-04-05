import React, {Component} from 'react';
import {MainPageNavWrapper,TodoListOrder,NewTodoListEnter} from './style';
import { StarOutlined, CheckOutlined, ReadOutlined, SmileOutlined,PlusOutlined,RightSquareOutlined} from '@ant-design/icons';
import { VscTrash } from "react-icons/vsc";
import storage from '../tokenStorage';

const jwt = require("jsonwebtoken");
var tok = storage.retrieveToken();
var ud = jwt.decode(tok,{complete:true});


class MainNav extends Component {

    

    constructor(props){
        super(props);

        this.state=
        {
            hasTodoList:false,
            todoList:[],
            //{name:'Summer Vacation',ID:'0'},{name:'Study React',ID:'1'},{name:'Study Node.js',ID:'2'}
            newTodoList:'',
            errorMsg:'',
            userId:ud.payload.userId,
            username:ud.payload.fullName,
            
        }
        this.handleShowAllItems = this.handleShowAllItems.bind(this);
        this.handleShowStarItems = this.handleShowStarItems.bind(this);
        this.handleShowCompletedItems = this.handleShowCompletedItems.bind(this);
        this.addNewTodoList = this.addNewTodoList.bind(this);
        this.getTodoList = this.getTodoList.bind(this);
        this.handleShowCustomizedTodoItem = this.handleShowCustomizedTodoItem.bind(this);
        this.handleAddNewTodoListChange = this.handleAddNewTodoListChange.bind(this);

 

    }




    render(){
        return (
           
        
            <MainPageNavWrapper> 
                
                           <h1><SmileOutlined /> Welcome {this.state.username}!<br/><br/></h1>
                            <br/>
                            
                            <TodoListOrder onClick={this.handleShowAllItems}><h2><ReadOutlined />All Tasks</h2></TodoListOrder>
                            <TodoListOrder onClick={this.handleShowStarItems}><h2><StarOutlined />Important</h2></TodoListOrder>
                            <TodoListOrder onClick={this.handleShowCompletedItems}><h2><CheckOutlined />Completed</h2></TodoListOrder>
                            <br/> <hr />
                            <h2><NewTodoListEnter onChange={this.handleAddNewTodoListChange} /><PlusOutlined onClick={this.addNewTodoList} /> </h2><br/>
                             {!this.state.hasTodoList && <p>You don't have a Todo-List yet, It's time to schedule your own!</p>}
                            
                                
                           {this.state.todoList.map(
                            (list)=><TodoListOrder key={list._id} onClick={()=>this.handleShowCustomizedTodoItem(list._id)}><RightSquareOutlined/ >{list.Name}<VscTrash /></TodoListOrder>)}
                           
                          
                            
            
            
            </MainPageNavWrapper>
            


        )
    }

    componentDidMount(){
        this.getTodoList();
        
      }

    async handleShowAllItems(){
        
        try {
            this.props.closeAddButton();

            let response = await fetch('http://localhost:5000/api/showAll',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        userID:this.state.userID,
                        jwtToken:this.state.tok,
                    })
                    
            });
            var res = JSON.parse(await response.text());
            if( res.error)
            {
               return;
                
                
            }else{               
                this.props.showItems(res.result);
            }

        }

        catch(e){
            console.log(e);
            return;
        }


       
    }

    async handleShowCompletedItems(){

        try {
            this.props.closeAddButton();

            let response = await fetch('http://localhost:5000/api/showComplete',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        userID:this.state.userID,
                        jwtToken:this.state.tok,
                    })
                    
            });
            var res = JSON.parse(await response.text());
            if( res.error)
            {
               return;
                
                
            }else{
               
                this.props.showItems(res.result);
            }

        }

        catch(e){
            console.log(e);
            return;
        }

       
    }

    async handleShowStarItems(){

        try {
            this.props.closeAddButton()

            let response = await fetch('http://localhost:5000/api/showStar',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        userID:this.state.userID,
                        jwtToken:this.state.tok,
                    })
                    
            });
            var res = JSON.parse(await response.text());
            if( res.error)
            {
               return;
                
                
            }else{               
                this.props.showItems(res.result);
            }

        }

        catch(e){
            console.log(e);
            return;
        }

    }


    async getTodoList(){
        
       // var ud = jwt.decode(tok,{complete:true});
       //console.log(ud.payload);
        try {
            let response = await fetch('http://localhost:5000/api/getList',{
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
            console.log(e);
            return;
        }


    }

    async handleShowCustomizedTodoItem(listID){
        try {
            this.props.showAddButton();
            let response = await fetch('http://localhost:5000/api/showCustomizedTodoItem',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        userID:this.state.userID,
                        jwtToken:this.state.tok,
                        todoListID:listID,
                    })
                    
            });
            var res = JSON.parse(await response.text());
            
            if( res.error)
            {
               return;
                
            }else{
                this.props.showItems(res.result);
                
            }

        }

        catch(e){
            console.log(e);
            return;
        }


    }
    

    handleAddNewTodoListChange(e){

        this.setState({
            newTodoList:e.target.value,
        });
    }

    async addNewTodoList(){
        console.log(this.state.newTodoList);
        console.log(this.state.userId);
        console.log(tok);

        try {
            if(!this.state.newTodoList){
                return;
            }

            let response = await fetch('http://localhost:5000/api/addList',{
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




}


export default MainNav;
