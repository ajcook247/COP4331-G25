import React, {Component} from 'react';
import {MainPageNavWrapper,TodoListOrder,NewTodoListEnter} from './style';
import { StarOutlined, CheckOutlined, ReadOutlined, SmileOutlined,PlusOutlined,RightSquareOutlined} from '@ant-design/icons';
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

class MainNav extends Component {

    

    constructor(props){
        super(props);

        this.state=
        {
            hasTodoList:true,
            todoList:[{name:'Summer Vacation',ID:'0'},{name:'Study React',ID:'1'},{name:'Study Node.js',ID:'2'}],
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
                            (list)=><TodoListOrder key={list.ID} onClick={()=>this.handleShowCustomizedTodoItem(list.ID)}><RightSquareOutlined/ >{list.name}</TodoListOrder>)}
                           
                          
                            
            
            
            </MainPageNavWrapper>
            


        )
    }

    componentDidMount(){
        this.getTodoList();
        
      }

    async handleShowAllItems(){
        try {
            let response = await fetch(buildPath('api/showAll'),{
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
            let response = await fetch(buildPath('api/showComplete'),{
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
            let response = await fetch(buildPath('api/showStar'),{
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
        
        try {
            let response = await fetch(buildPath('api/getTodoList'),{
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

                this.setState({
                    todoList:res.result,
                })
                
            }

        }

        catch(e){
            console.log(e);
            return;
        }


    }

    async handleShowCustomizedTodoItem(listID){
        try {
            let response = await fetch(buildPath('api/showCustomizedTodoItem'),{
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
        try {
            let response = await fetch(buildPath('api/addNewTodoList'),{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        userID:this.state.userID,
                        jwtToken:this.state.tok,
                        listName:this.state.newTodoList,
                    })
                    
            });
            var res = JSON.parse(await response.text());
            
            if( res.error)
            {
               return;
                
            }else{
                this.setState({
                  errorMsg:"new todo list has been added!"  
                })
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
