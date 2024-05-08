import React, { useState } from 'react';
import { fetchJsonFile } from './fetchFile';
import { useNavigate } from 'react-router-dom';

interface JsonData {
    json_data: any;
    [key: string]: any;
}

const JsonSelector: React.FC = () => {
    const [fileId, setFileId] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleFileIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileId(event.target.value);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const isJsonDataType = (data: any): data is JsonData => {
        return data && typeof data === 'object' && 'json_data' in data;
    };

    const handleStartClick = async () => {
        // Perform the desired action with the file_id and username
        console.log('File ID:', fileId);
        console.log('Username:', username);

        const jsonData = await fetchJsonFile(fileId, username);
        if (isJsonDataType(jsonData)) {
            navigate('/RREC-annotator', { state: { jsonData } });
        } else {
            console.warn('Fetched data is not of expected type.');
        }
        
    };

    return (
        <div className='defaultContainer'>
            <h1>Select File</h1>
            <form>
                

                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={handleUsernameChange} />

                <label htmlFor="fileId">File ID:</label>
                <input type="text" id="fileId" value={fileId} onChange={handleFileIdChange} />

                
                <button className="centeredButton" type="button" onClick={handleStartClick}>Start</button>
                

            </form>
        </div>
    );
};

export default JsonSelector;