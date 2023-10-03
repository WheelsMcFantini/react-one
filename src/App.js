/* import React, { useState} from 'react';
import Login from './components/Login';
import Message from './components/Message';
import Cookies from 'js-cookie';



function App() {
  // Assume getToken() is a function that retrieves the session token from cookies
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  const handleAuthentication = () => {
    setIsAuthenticated(!!getToken());
  };
  
  return (
  <div>
    {isAuthenticated ? (
      <div>
        <p>You are logged in!</p>
        <Message />
      </div>
    ) : (
      <div>
        <p>You are not logged in.</p>
        <Login onLogin={handleAuthentication} />
      </div>
    )}
  </div>
);
}

function getToken() {
  // For example, retrieve the session token from cookies
  console.log("this is the session cookie")
  console.log(Cookies.get('sessionToken'))
  return Cookies.get('sessionToken');
}

export default App;
 */
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Message from './components/Message';
import Cookies from 'js-cookie';

function App() {


  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  // This function will be called after successful login
  const handleAuthentication = () => {
    // Setting a cookie to represent user authentication
    Cookies.set('sessionToken', getToken(), { expires: 7 });
    // Update the authentication state
    setIsAuthenticated(true);
  };

  // Check the token on component mount and update isAuthenticated accordingly
  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>You are logged in!</p>
          <Message />
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <Login onLogin={handleAuthentication} />
        </div>
      )}
    </div>
  );
}

function getToken() {
  // Retrieving the session token from cookies
  //return Cookies.get('sessionToken');
  const token = localStorage.getItem('access_token');
  return token 

}

export default App;
