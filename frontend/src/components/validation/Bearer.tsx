import React from 'react';

import UserCheck from './UserCheck';

const Bearer = () => {
    const token = localStorage.getItem('jwtToken'); // This hook checks for authentication and returns the JWT token

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    return config;

};

export default Bearer;
