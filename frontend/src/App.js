import React, {Component} from 'react';
import Login from './components/login';
import MainPage from './pages/main'
import {BackgroundBody} from './components/style'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Reset from './components/reset'
import {useParams} from "react-router-dom";
//import GetId from './components/function';


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

function GetId()
{
    const {token2} = useParams();

    return(
        <div>
            <Reset ID={token2}/>
        </div>
    )

}



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
          let response = await fetch(buildPath('api/logout'),{
              method:'POST',
              headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
              }
          });

          var res = JSON.parse(await response.text());
         // console.log(res);
          if (!res.error) {
            window.location.href = '/';
        //      this.resetAll();


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

            <Route path= "/resetpassword/:token2"  exact>
              <div> 
                <Reset  username={this.state.username}/> 
              </div>  
            </Route>

          </ Switch>
        </ Router>
      )
   
  }

 
};


export default App;
