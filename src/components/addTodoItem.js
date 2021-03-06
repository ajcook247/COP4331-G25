import React, {Component} from 'react';
import {AddTodoItemWrapper,Input,AddItemCloseButton,AddItemHeader,AddTodoItemSubmitButton} from './style';





class AddTodoItem extends Component{

    constructor(props){
        super(props);
        this.state={
            des:'',
            due:'',
        }



        this.closeAddItem = this.closeAddItem.bind(this);
        this.handleDesChange = this.handleDesChange.bind(this);
        this.handleDueChange = this.handleDueChange.bind(this);
        this.handleAddSubmit = this.handleAddSubmit.bind(this);
        }

        
    





    render(){
        return <AddTodoItemWrapper>

            <AddItemCloseButton onClick={this.closeAddItem}>X</AddItemCloseButton>

            <AddItemHeader>New Task</AddItemHeader>
            <Input placeholder="What to do..." onChange={this.handleDesChange} />
            <Input placeholder="Due by..." onChange={this.handleDueChange} />  


            <AddTodoItemSubmitButton onClick={this.handleAddSubmit}>Submit</AddTodoItemSubmitButton>


        </AddTodoItemWrapper>



    }


    closeAddItem(){
        this.props.closeAddItem();
    }


   handleDesChange(e){
    this.setState({
        des:e.target.value,
    })
   }

   handleDueChange(e){
       this.setState({
           due:e.target.value,
       })
   }

   async handleAddSubmit(){
       console.log(this.props.userID);
       console.log(this.props.tok);
       console.log(this.props.currentTodoListID);
       console.log(this.state.des);
       console.log(this.state.due);


    try {
        let response = await fetch('http://localhost:5000/api/addTask',{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    userId:this.props.userID,
                    jwtToken:this.props.tok,
                    collectionId:this.props.currentTodoListID,
                    description:this.state.des,
                    date:this.state.due,
                })
                
        });
        var res = JSON.parse(await response.text());
        if( res.error)
        {
           return;       
        }else{               
            //this.props.showItems(res.result);
            this.props.closeAddItem();
        }

    }

    catch(e){
        console.log(e);
        return;
    }

}


}


export default AddTodoItem;
