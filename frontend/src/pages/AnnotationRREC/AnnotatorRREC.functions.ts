
interface JsonData {
    json_data: any;
    [key: string]: any;
}



export async function findFirstEmptyTurn(jsonData: JsonData){
    if (!jsonData || !jsonData.json_data) {
        console.error('No JSON data found in location state.');
        return;
    }



    for (const key of Object.keys(jsonData.json_data)) {
        const value = jsonData.json_data[key];
        console.log(`key: ${key}, value: ${value}`);
    }
   
}
