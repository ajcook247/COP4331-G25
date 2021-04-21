import React, {Component} from 'react';
import {EditTodoItemWrapper,Input,EditTodoItemButton,EditItemHeader,EditItemCloseButton,DatePickerWrapper} from './style';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
class EditTodoItem extends Component{

    constructor(props){
        super(props);
        this.state={
            currentItem:this.props.currentItem,
            startDate: new Date(),
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
                <Input style={{borderColor:"black", color:"black"}} placeholder={this.props.currentItem.Description} onChange={this.handleDesChange} />

        <DatePickerWrapper>
                <DatePicker
                selected={this.state.startDate}
                onChange={this.handleDueChange}
                
            />
            </DatePickerWrapper>

               {/* <Input style={{borderColor:"black", color:"black"}} placeholder={this.props.currentItem.Deadline} onChange={this.handleDueChange} />  */}
                
                
                <EditTodoItemButton onClick={this.handleEditSubmit}>Submit</EditTodoItemButton>
                
            
              </EditTodoItemWrapper>



    }


    closeEditItem(){
        this.props.closeEditItem();
    }

    async handleDesChange(e){
      await this.setState(prevState=>({
        currentItem:{...prevState.currentItem,
            Description:e.target.value,}}
       ))
      // console.log(this.state.currentItem);
    }



    
    async handleDueChange(date){
        await this.setState(prevState=>({
            currentItem:{...prevState.currentItem,
                Deadline:date
            
            },
            startDate:date,
        }
            
           ))

          // console.log(this.state.currentItem);
    }

    async handleEditSubmit(){
     

        try {
            let response = await fetch(buildPath('api/editTask'),{
                    method:'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                       // userID:this.props.userID,
                        jwtToken:this.props.tok,
                       // listID:this.props.currentTodoList.listID,
                        description:this.state.currentItem.Description,
                        deadline:this.state.currentItem.Deadline,
                        taskId:this.state.currentItem._id,

                    })
                    
            });
            var res = JSON.parse(await response.text());
            if( res.error)
            {
               return;       
            }else{               
                this.props.RefreshCustomizedTodoItem(this.props.currentTodoListID);
                this.closeEditItem();
            }

        }

        catch(e){
            console.log(e);
            return;
        }

    }


}


export default EditTodoItem;
