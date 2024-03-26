import { FormEvent } from "react";
import useFormContext from "../../hooks/useFormContext";


const Form = () => {
    
    const { page, setPage, title, canSubmit } = useFormContext();

    const handlePrev = () => {
        const newPage = page - 1;
        setPage(newPage);
    };

    const handleNext = () => {
        const newPage = page + 1;
        setPage(newPage);
    };

    const handleSubmit =(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault;
        console.log(JSON.stringify(''));
    }

    


    const content = (
        <form onSubmit={handleSubmit}>

            <header>
                <h2>{title[page]}</h2>
                <div className="button-container">
                    <button className="button" type="button">Prev</button>
                    <button className="button" type="button">Next</button>

                    <button className="button" type="submit" disabled={!canSubmit}>Submit</button>

                </div>
            </header>

            
            
            




        </form>
    )

    return content
}