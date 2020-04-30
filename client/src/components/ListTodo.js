import React, { Fragment ,useEffect , useState} from 'react';
import EditButton from './EditButton';

const ListTodos = () => {

    const [todos,setTodos] = useState([]);

    //Delete Function 
    const deleteTodo =async (todo_id) => {
      try {
        const response = await fetch(`http://localhost:5000/todo/${todo_id}`,{
          method:"DELETE"
        });
        console.table(response);
        if(response.ok){
          setTodos(todos.filter(todo => todo.todo_id !== todo_id));
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    //Get Todos 
    const getTodos =  async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getTodos();
    },[]);


    return (<Fragment>
    <table className="table mt-5 text-centre">
    <thead>
      <tr>
        <th>Task</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
    {todos.map(todo => (
      <tr key= {todo.todo_id}>
          <td>{todo.description}</td>
        <td><EditButton todo = {todo}/></td>
        <td><button className="btn btn-danger" onClick = {() => deleteTodo(todo.todo_id)}>Delete</button></td>
    </tr>))}
    </tbody>
  </table>
    </Fragment>);
}

export default ListTodos;