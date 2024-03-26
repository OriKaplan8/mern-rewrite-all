import React, { createContext, useState, useEffect } from "react"
import api from "../../api";
import Bearer from "../../components/validation/Bearer";

interface FormContextValue {
    title: { [key: number]: string };
    page: number;
    setPage: (page: number) => void;
    data: {
      FileName: string;
      File: File | null;
      LabelSetName: string;
      Labels: any[];
    };
    setData: (data: (prevData: any) => any) => void;
    canSubmit: boolean | string;
    files: File[] | null;
    setFiles: (files: File[] | null) => void;
    progress: { started: boolean; pc: number };
    msg: string;
    handleUpload: () => void;
  }
  
  const FormContext = createContext<FormContextValue>({
    title: {},
    page: 0,
    setPage: () => {},
    data: {
      FileName: "",
      File: null,
      LabelSetName: "",
      Labels: [],
    },
    setData: () => {},
    canSubmit: false,
    files: null,
    setFiles: () => {},
    progress: { started: false, pc: 0 },
    msg: "",
    handleUpload: () => {},
  });



export const FormProvider: React.FC<{children: React.ReactNode }> = ({ children }) => {
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
    
    
  const title = {
    0: "Upload Json",
    1: "Show Dialogs",
    2: "Choose Existing or New Labels Set",
    3: "Create New Labels Set",
  };

  const [page, setPage] = useState<number>(0);
  const [data, setData] = useState({
    FileName: "",
    File: null,
    LabelSetName: "",
    Labels: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const canSubmit =
    data.FileName &&
    data.LabelSetName &&
    data.Labels.length > 0 &&
    page === Object.keys(title).length - 1;

  return (
    <FormContext.Provider
      value={{
        title,
        page,
        setPage,
        data,
        setData,
        canSubmit,
        files,
        setFiles,
        progress,
        msg,
        handleUpload,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;