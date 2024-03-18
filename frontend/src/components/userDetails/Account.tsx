import api from '../../api';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Account.css'

const Account: React.FC = () => {
    const [Message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          setIsLoggedIn(true);
        }
      }, [])
  

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSignIn = () => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            setMessage('account is already logged in');
            setMessageColor('black');
        }
        else {
            const body = {
                email: formData.email,
                password: formData.password,
            };

            api.post('/auth/signin', body)
            .then((response) => {
                console.log(response);
                const token = response.data.token;
                localStorage.setItem('jwtToken', token);

                setMessage("Account Signed In");
                setMessageColor('green');
                setTimeout(() => {
                navigate('/turns');
                }, 1000);
                })
                .catch(function (error) {
                    setMessage(error.response.data.message);
                    setMessageColor('red');
                });
            
            
        }
    };

    const handleSignUp = () => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            setMessage('account is already logged in');
            setMessageColor('black');
        } else {
            const {username, email, password} = formData;

            api.post(('auth/signup'), {
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
    };

    

    return (
        <div className='container'>
            
            <h1 >Sign In / Sign Up</h1>
            <div className='AccountInputsContainer'>
                <div >
                    <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={formData.username}
                    onChange={handleInputChange}
                    />
                </div>
                <div >
                    <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleInputChange}
                    />
                </div>
                <div >
                    <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className='AccountSumbitButtonsContainer'>
                <button onClick={handleSignIn}>Sign In</button>
                <button onClick={handleSignUp}>Sign Up</button>
            </div>

            {<div style={{color:messageColor}}>{Message} </div>}
        </div>
        )
}

export default Account