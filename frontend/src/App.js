import React, {Component} from 'react';
import Login from './components/login';
import MainPage from './pages/main'
import {BackgroundBody} from './components/style'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      isLoggedIn:false,
      username:''
    }
    this.changeToLoggedIn = this.changeToLoggedIn.bind(this);
    this.doLogout = this.doLogout.bind(this);
  }

  changeToLoggedIn(username){
    this.setState({
      isLoggedIn:true,
      username:username
    })
  }



 /*will be used*/
  async doLogout(){
      try {
          let res = await fetch('http://localhost:5000/api/logout',{
              method:'POST',
              headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
              }
          });

          let result = await res.json();
          if (result && result.success) {
              this.setState({
                isLoggedIn:false,
                username:'' 
              })
          }
          

      }
      catch(e){
        console.log(e)
      }}


      async componentDidMount(){
             
      }




  render() 
  {
    
      return (
        < Router>
          < Switch>

            <Route path= "/" exact>
              <BackgroundBody> 
              <div > 
                <Login changeToLoggedIn={this.changeToLoggedIn} />
              </div>
              </BackgroundBody>
            </Route>

            <Route path= "/main" exact>
              <div> 
                <MainPage  username={this.state.username} doLogout={this.doLogout}/> 
              </div>  
            </Route>
          </ Switch>
        </ Router>
      )
   
  }

 
};


export default App;
