import styled from 'styled-components';
import backgroundImg from '../static/background.png'

export const LoginHeader = styled.div`
  margin-left:520px;
  margin-top:1 0px;
  color: #c9d0d4; 
  font-size: 26px; 
  font-weight: 100; 
  line-height: 50px; 
  letter-spacing: 1px; 
  padding: 0 0 10px; 
`;

export const LoginWrapper = styled.div`
  overflow:hidden;
  width:570px;
  height:530px;
  margin:0 auto;
  background:#C4C4C4;
  box-shadow:0 0 8px rgba(0,0,0 .1);
  border-radius:20px;
  background-image: linear-gradient(#C4C4C4, #9198e5);

  

`;

export const LoginFooter = styled.div`
  margin-left:380px;
  color: #f2f2f2; 
  font-size: 25px; 
  line-height: 74px; 
  
  
`;



export const LoginInputGroup = styled.div`
      padding-top:150px;
  
`;




export const Input = styled.input`
  font-size:15px;
  display:block;
  width: 250px;
  height:30px;
  background-color: transparent;
  border-top: 0;
  border-left:0;
  border-right:0;
  line-height:30px;
  padding:0 10px;
  color:#777;
  margin:10px auto;
  
`;


export const PasswordInput = styled.input.attrs({
  type: "password"
})`
  font-size:15px;
  display:block;
  width: 250px;
  height:30px;
  background-color: transparent;
  border-top: 0;
  border-left:0;
  border-right:0;
  line-height:30px;
  padding:0 10px;
  color:#777;
  margin:10px auto;
  type:password,
  
`;




export const ButtonGroup = styled.div`
  
  margin-left:150px;
`;

export const Button = styled.button`
  width:110px;
  padding: 11px 20px;
  color: black;
  font-weight: 400;
  text-transform: uppercase;
  background: white;
  border-radius: 3px;
  margin-top: 30px;
  margin-left:10px;

`;

export const ForgetPasswordButton = styled.div`
  width:30px
  height:20px;
  margin-top:120px;
  margin-left:440px;
  text-decoration: underline;
`;


export const RegisterWrapper = styled.div`
    text-align:center;
    overflow:hidden;
    width:370px;
    height:330px;
    margin:50px auto;
    background:white;
    box-shadow:0 0 8px rgba(0,0,0 .1);
    padding-bottom:130px;
    border-radius:15px;
    background-image: linear-gradient(#C4C4C4, white);

  
`;

export const RegisterCloseButton = styled.div`
      width:10px;
      height:10px;
      position: relative;
      padding:3px;
      background: red;
      color: white;
      float:right;
        
`;


export const RegisterInputGroup = styled.div`
        margin-top:120px;      
`;

export const ForgetPasswordWrapper = styled.div`
text-align:center;
    overflow:hidden;
    width:370px;
    height:330px;
    margin:50px auto;
    background:white;
    box-shadow:0 0 8px rgba(0,0,0 .1);
    padding-bottom:130px;
    border-radius:10px;
    background-image: linear-gradient(#C4C4C4, white);




`
export const ForgetPasswordCloseButton = styled.div`
      width:10px;
      height:10px;
      position: relative;
      padding:3px;
      background: red;
      color: white;
      float:right;
      cursor:pointer;
        
`;



export const BackgroundBody = styled.div`
    background:black;
    
    
    width: 100%;
    height: 100%;
    background-image: linear-gradient(black, #9198e5);

`



export const WrongPasswordMsg = styled.div`    
    text-align:center;
`



export const MainPageNavWrapper = styled.div`    
      position: absolute;
      width: 350px;
      height: 100%;
      left: 0px;
      top: 0px;
      border-color:#C4C4C4;
      border-style: solid;
      background-image: linear-gradient(#C4C4C4, #9198e5);
      
`


export const LogoutButton = styled.button`   
      float:right;
      background: #C4C4C4;
      border-color:red;
      border-style: solid;
      color:red;
      
`

export const TodoListOrder = styled.div`   
      position:
      list-style-type: none;
      padding: 0px;
      margin-left: 45px;
      font-size:25px;
      cursor:pointer;
      
`


export const TodoItemWrapper = styled.div`   

      position: absolute;
      width: 995px;
      height: 100%;
      right: 0px;
      top:  0px;
      background-image: linear-gradient(#C4C4C4, #9198e5);

      
      
`


export const TodoListOrderMainPage = styled.div`   
      width:700px;
      height:100px;
      list-style-type: none;
      padding: 0px;
      margin-left: 175px;
      font-size:25px;
      background:#C4C4C4;
      border:solid;
      border-radius:10px;
      background-image: linear-gradient(#C4C4C4, white);
      
`




export const TodoItem = styled.p`   
   padding:10px;
   position:relative;
      
      
`



export const DeleteItemIcon = styled.span`   

      position:absolute;
      right:0;
      cursor:pointer;

      
`


export const NewTodoListEnter = styled.input.attrs({
      placeholder: "Add your own Todo-List! "

    })`
         width:240px;
         height:40px;
         background:white;  
         border-radius:10px; 


`



export const CurrentTodoListHeader = styled.h1`
      text-align:center;
      


`
