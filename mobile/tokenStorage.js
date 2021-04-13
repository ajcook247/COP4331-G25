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
import * as SecureStore from 'expo-secure-store';


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
  
  // Retrieve token method for mobile
  static async retrieveToken() {
  
    var ud;
    try
    {
      // Retrieve token
      ud = await SecureStore.getItemAsync('user_data');

    }
    catch(e)
    {
      console.log(e.message);
    }

    // Return token
    return ud;
  }

}

export default Storage;
