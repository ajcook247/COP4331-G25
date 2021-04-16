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


class IdStorage extends React.Component{

  // Store token method for mobile
  static async storeId ( list ) 
  {
    try
    {
      // Store token
      await SecureStore.setItemAsync('list_id', list._id);
    }
    catch(e)
    {
      console.log(e.message);
    }
  }
  
  // Retrieve token method for mobile
  static async retrieveId() {
  
    var ud;
    try
    {
      // Retrieve token
      ud = await SecureStore.getItemAsync('list_id');

    }
    catch(e)
    {
      console.log(e.message);
    }

    // Return token
    return ud;
  }

}

export default IdStorage;
