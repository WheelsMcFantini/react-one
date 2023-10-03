import React, { useState } from 'react';

function Login({ onLogin } ) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const isLoggedIn = useState(false)

  const handleLogin = (e) => {
    e.preventDefault();
    authenticate(username, password);
  };


function authenticate(username, password) {

    fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST', // or 'PUT', 'PATCH', etc.
        headers: {
          'Content-Type': 'application/json' // Specifying the content type of the data being sent
        },
        mode: 'cors',
        body: JSON.stringify({
            'username': username,
            'password': password
        }) // Converting the data object to a JSON string
        //body: formData
      })
      .then(response => {
        if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then(data => {
          // Here, `data` is the parsed response body.
          localStorage.setItem('access_token', data.access_token);
          window.location.reload();
/*           console.log("This is the response:")
            console.log(data)
            if () {
                console.log("Logging in!")
                onLogin()
            } else {
                console.log("bad username or password")
            } */
          
        })
        .catch(error => {
          // Handle any errors here.
          console.error(error);
        })
    }
      


  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;