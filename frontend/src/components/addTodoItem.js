import React, {Component} from 'react';
import {AddTodoItemWrapper,Input,AddItemCloseButton,AddItemHeader,AddTodoItemSubmitButton,DatePickerWrapper} from './style';
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


class AddTodoItem extends Component{

    constructor(props){
        super(props);
        this.state={
            des:'',
            due:'',
            startDate: new Date(),
        }



        this.closeAddItem = this.closeAddItem.bind(this);
        this.handleDesChange = this.handleDesChange.bind(this);
        this.handleDueChange = this.handleDueChange.bind(this);
        this.handleAddSubmit = this.handleAddSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        }

        
    





    render(){
        return <AddTodoItemWrapper>

            <AddItemCloseButton onClick={this.closeAddItem}>X</AddItemCloseButton>

            <AddItemHeader>New Task</AddItemHeader>
            <Input style={{borderColor:"black", color:"black", marginTop:40}} placeholder="What to do..." onChange={this.handleDesChange} />
           


            <DatePickerWrapper>
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
            />
  
            </ DatePickerWrapper>


                
  
           {/*<Input style={{borderColor:"black", color:"black", marginTop:40}} placeholder="Due by..." onChange={this.handleDueChange} />  
*/} 



            <AddTodoItemSubmitButton style={{marginTop:50}} onClick={this.handleAddSubmit}>Submit</AddTodoItemSubmitButton>


        </AddTodoItemWrapper>



    }


    handleChange(date){
        this.setState({
          due: date.toString()
        });
      };


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
     //  console.log(this.props.userID);
     //  console.log(this.props.tok);
     //  console.log(this.props.currentTodoListID);
       console.log(this.state.des);
       console.log(this.state.due);


    try {
        let response = await fetch(buildPath('api/addTask'),{
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
            this.props.RefreshCustomizedTodoItem(this.props.currentTodoListID);
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
