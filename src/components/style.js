import styled from 'styled-components';
import backgroundImg from '../static/background.png'

export const LoginHeader = styled.div`
  margin-left:300px;
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


`
export const ForgetPasswordCloseButton = styled.div`
      width:10px;
      height:10px;
      position: relative;
      padding:3px;
      background: red;
      color: white;
      float:right;
        
`;



export const BackgroundBody = styled.div`
    
    background:black;
    
    width: 100%;
    height: 100%;
`



export const WrongPasswordMsg = styled.div`    
    text-align:center;
`


