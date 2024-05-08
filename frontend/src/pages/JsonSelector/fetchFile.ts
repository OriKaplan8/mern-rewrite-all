import api from '../../api';

interface JsonData {
    json_data: any;
    [key: string]: any;
}

export async function fetchJsonFile(file_id: string, username: string): Promise<JsonData | null> {
    try {
        const response = await api.get(`/jsonAnnotations/${file_id}/${username}`);
        if (response.data) {
            console.log(response.data);
            return response.data; // Return the fetched JSON data
        } else {
            console.log(`User-specific file not found. Fetching an empty file instead.`);
        }
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.log(`User-specific file not found. Fetching an empty file instead.`);
        } else {
            console.error('Error fetching user-specific JSON file:', error.message);
        }
    }

    try {
        const batchResponse = await api.get(`/jsonBatches/${file_id}`);
        console.log(batchResponse.data);
        return batchResponse.data as JsonData; // Return the fallback JSON data
    } catch (secondError: any) {
        console.error('Error fetching fallback JSON file:', secondError.message);
        return null;
    }
}
