import React, {Component} from 'react';
import Login from './components/login';
import {BackgroundBody} from './components/style'

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




  async doLogout(){
      try {
          let res = await fetch('/logout',{
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




  render() {
    if(this.state.isLoggedIn){

      return (
        <div> 
          todolist...welcome {this.state.username}
         </div>
      )

    }else{
      return (
         <BackgroundBody> <div > 
            <Login changeToLoggedIn={this.changeToLoggedIn} />
          </div></BackgroundBody>
     
    )
  }



    
  };
}

export default App;