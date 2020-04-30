import React,{Fragment,useState} from 'react';


const InputTodo = () => {
    const [ description,setDescription ] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {description};
            const response = fetch("http://localhost:5000/todos",{
                method : "POST",
                headers : {"Content-Type":"Application/json"},
                body:JSON.stringify(body)
            });
            console.log(response);
            window.location = "/";
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <Fragment>
            <h1 className = "text-centre mt-5">PERN Todo List</h1>
            <form className="d-flex mt-5" onSubmit ={onSubmitForm}>
                <input type="text" className="form-control" onChange={e => setDescription(e.target.value)}/>
                <button className="btn btn-success ml-2">Add</button>
            </form>
        </Fragment>
    )
};

export default InputTodo;