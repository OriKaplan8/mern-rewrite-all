import { useState } from "react";
import api from "../api";
import Bearer from "../components/validation/Bearer";


const Creator = () => {
    const [files, setFiles] = useState<File[] | null>(null);
    const [ progress, setProgress ] = useState({started: false, pc: 0});
    const [msg, setMsg ] = useState('');

   
    function handleUpload() {
        if (!files) {
            setMsg("No file selected");
            return null;
            
        } else {

            const fd = new FormData();
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileExtension = file.name.split('.').pop()?.toLocaleLowerCase();

                if (fileExtension !== 'json') {
                    setMsg("Invalid File Format. Only Json supported");
                    return null;
                }

                fd.append(`file`, file);
            }
                
            
            setMsg("Uploading...");
            setProgress(prevState => {
                return {...prevState, started: true}
            });
            api.post('/batch/uploadBatch', fd, {
                onUploadProgress: (ProgressEvent) => {
                    
                    setProgress( prevState => {
                    return {...prevState, pc: (ProgressEvent.progress ?? 0) * 100 };
                    })
                    
                }

            })
            .then(res => {
                setMsg("Upload Complete");
                console.log(res.data)})
            .catch(err => {
                setMsg("Upload Failed");
                console.log(err.response.data);});
        }
    }
    
    
    const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleUpload();
    }

    return (
        <div className="container">
            <form onSubmit={handleSumbit}>
                <h1 >Annotation Creator</h1>
                <h3 className="light">First, Please Upload file with annotation data</h3>

                <input 
                type="file" 
                required
                onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
                style={{margin: 25}}
                multiple
                />

                <button type="submit">Upload</button>

                {progress.started &&
                 <progress 
                 style={{
                    width: '100%',
                    height: '20px',
                  }}
                 max="100" 
                 value={progress.pc}/>
                }
                <div>
                {msg && <span>{msg}</span>}
                </div>
                
            </form>
        </div>
    )
}

export default Creator