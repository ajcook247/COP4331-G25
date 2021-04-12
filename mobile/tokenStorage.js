// exports.storeToken = function ( tok )
// {
//     try
//     {
//       localStorage.setItem('user_data', tok.accessToken);
//     }
//     catch(e)
//     {
//       console.log(e.message);
//     }
// }
  
// exports.retrieveToken = function ()
// {
//     var ud;
//     try
//     {
//       ud = localStorage.getItem('user_data');
//     }
//     catch(e)
//     {
//       console.log(e.message);
//     }
//     return ud;
// }



import * as React from 'react';
import * as SecureStore from 'expo-secure-store'
import jwtDecode from 'jwt-decode';


class Storage extends React.Component{

  // Store token method for mobile
  static async storeToken( tok ) 
  {
    try
    {
      // Store token
      await SecureStore.setItemAsync('user_data', tok.accessToken);
    }
    catch(e)
    {
      console.log(e.message);
    }
  }
  
  static async retrieveToken() {
  
    var ud;
    try
    {
      // Retrieve token
      ud = await SecureStore.getItemAsync('user_data');

      // Decode JWT token on retrieval
      ud = jwtDecode(ud, {complete:true});
    }
    catch(e)
    {
      console.log(e.message);
    }

    // Return decoded JWT
    return ud;
  }

}

export default Storage;
