import { useState } from "react";



const Creator = () => {
    const [file, setFile] = useState('');
    async function handleOnSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        const fileInput = document.getElementByID

        
    }


    return (
        <div className="container">
            <form>

                <h1 >Annotation Creator</h1>

                <h3 className="light">First, Please Upload file with annotation data</h3>

                
                <input 
                type="file" 
                required
                value={file}
                onChange={(e) => setFile(e.target.value)}

                style={{margin: 25}}
                
                
                />

                <button onClick={handleOnSubmit}>Upload</button>

            </form>
        </div>


    )
}

export default Creator