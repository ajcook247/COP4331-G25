import React, {Component} from 'react';
import {EditTodoItemWrapper,Input,EditTodoItemButton,EditItemHeader,EditItemCloseButton} from './style';

class EditTodoItem extends Component{

    constructor(props){
        super(props);
        this.state={
            currentItem:this.props.currentItem,
                     


        }

        this.closeEditItem = this.closeEditItem.bind(this);
        this.handleDesChange = this.handleDesChange.bind(this);
        this.handleDueChange = this.handleDueChange.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        
    }





    render(){
        return <EditTodoItemWrapper>
                <EditItemCloseButton onClick={this.closeEditItem}>X</EditItemCloseButton>

                <EditItemHeader>EDIT</EditItemHeader>
                <Input placeholder={this.props.currentItem.des} onChange={this.handleDesChange} />
                <Input placeholder={this.props.currentItem.due} onChange={this.handleDueChange} />  
                
                
                <EditTodoItemButton onClick={this.handleEditSubmit}>Submit</EditTodoItemButton>
                
            
              </EditTodoItemWrapper>



    }


    closeEditItem(){
        this.props.closeEditItem();
    }

    async handleDesChange(e){
      await this.setState(prevState=>({
        currentItem:{...prevState.currentItem,
            des:e.target.value,}}
       ))
       console.log(this.state.currentItem);
    }

    async handleDueChange(e){
        await this.setState(prevState=>({
            currentItem:{...prevState.currentItem,
                due:e.target.value,}}
           ))
           console.log(this.state.currentItem);
    }

    async handleEditSubmit(){
        try {
            let response = await fetch('http://localhost:5000/api/editItem',{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        userID:this.props.userID,
                        jwtToken:this.props.tok,
                        listID:this.props.currentTodoList.listID,
                        item:this.state.currentItem,
                    })
                    
            });
            var res = JSON.parse(await response.text());
            if( res.error)
            {
               return;       
            }else{               
                this.props.showItems(res.result);
                this.props.closeEditItem();
            }

        }

        catch(e){
            console.log(e);
            return;
        }

    }


}


export default EditTodoItem;
