import React, {Component} from 'react';
import Login from './components/login';
import MainPage from './pages/main'
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
    //this.resetAll = this.resetAll.bind(this);
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
          let response = await fetch('http://localhost:5000/api/logout',{
              method:'POST',
              headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
              }
          });

          var res = JSON.parse(await response.text());
         // console.log(res);
          if (!res.error) {
              this.setState({
                isLoggedIn:false,
                username:'' 
              })
        //      this.resetAll();


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
          <MainPage  username={this.state.username} doLogout={this.doLogout}/>
         
           
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
