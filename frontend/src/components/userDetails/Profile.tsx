import axios from 'axios';
import { useEffect, useState } from 'react'
import Bearer from '../validation/Bearer';


const Profile = () => {
    const [username, setUserame] = useState<string>('f');
    

    useEffect(() => {
        const fetchName = async () =>{
            try {
                const config = Bearer()
                const response = await axios.get('http://localhost:3001/users/name',config);
                setUserame(response.data.name);
            } catch (error) {
                console.error('Error getting name:', error);
            }
        };
        fetchName();
    }, []);

    const handleClick = async () => {
     
      await localStorage.removeItem('jwtToken'); // Consider removing the token if it's invalid
      window.location.reload();
    }


  return (
    <div>
      <h1>Hello, {username}</h1>
      <button
      onClick={handleClick}
      
      >Log Out</button>
    </div>
  )
}

export default Profile