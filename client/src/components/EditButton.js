import React,{ useState } from 'react';

export default function EditButton({ todo }) {

    const [description, setdescription] = useState(todo.description);

//    editDescription Function
    const updateDescription = async e =>{
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch(`http://localhost:5000/todo/${todo.todo_id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });
            window.location = "/";

        } catch (error) {
            console.log(error.message);
        }
    } 
    return (
        <div onClick = {() => setdescription(todo.description)}>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
                Edit
        </button>

            <div className="modal" id={`id${todo.todo_id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick = {() => setdescription(todo.description)}>&times;</button>
                        </div>

                        <div className="modal-body">
                            <input 
                                type="text" 
                                className="form-control" 
                                value={description} 
                                onChange={e => setdescription(e.target.value)} 
                            />
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={e => updateDescription(e)}>Save</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick = {() => setdescription(todo.description)}>Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
