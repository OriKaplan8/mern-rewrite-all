import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {{
      const token = localStorage.getItem('jwtToken');
      if (token) {
        setIsLoggedIn(true);
      }
    }}, [])

    function logObjectKeys(obj: { [key: string]: any }) {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            console.log(key);
          }
        }
      }
  
    const handleSubmit=(event: React.FormEvent)=>{
        event.preventDefault()
      
    const response = axios.post(('http://localhost:3001/auth/signup'), {
            name: username,
            email: email,
            password: password
      })
      .then(function(response) {
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);

        setMessage("Account Created");
        setMessageColor('green');
        setTimeout(() => {
          navigate('/turns');
        }, 1000);
        
        
      })
      .catch(function (error) {
        setMessage(error.response.data.message[0]);
        setMessageColor('red');
      });
  
    }
  
    if (isLoggedIn) {
      return (
        <p>user signed in</p>
      )
    }
    return (
      <div className="App">
        <h1>Signup</h1> 
            <form 
            className="username"
            onSubmit={handleSubmit}
            >
            <p>Username</p>
            <input
            required
            type='text'
            value={username}
            onChange={(e)=>{
                setUsername(e.target.value)
            }}
            />
            <p>Email</p>
            <input
            required
            type='email'
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            />
    
            <p>Password</p>
            <input
            required
            type='text'
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            />
            
            <button type="submit">submit</button>
            <br />
            {<div style={{color:messageColor}}>{Message} </div>}
            </form>
            
        </div>
        
    )
}

export default UserDetails
