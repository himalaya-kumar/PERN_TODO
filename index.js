const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());


//ROUTES//

// Create a toodo
const INSERT_QUERY = "INSERT INTO todo(description) Values($1) RETURNING *";

app.post("/todos",async(req,res) => {
    try {
        const {description} = req.body;        
        const newTodo = await pool.query(INSERT_QUERY,[description]);
        res.json(newTodo.rows[0]);
//        console.table(newTodo.rows);
    } catch (error) {
        console.table(error.message);
    }
});
// get all todo
app.get("/todos",async(req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
//        console.table(allTodos.rows);
    } catch (error) {
        console.log(error.message);
        
    }
});

// get a todo
app.get("/todo/:id",async(req,res) => {
    try {
        console.log(req.params);
        let id = req.params.id;
        const allTodos = await pool.query("SELECT * FROM todo where todo_id = $1",[id]);
        res.json(allTodos.rows);
//        console.table(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});

// update a todo
app.put("/todo/:id",async(req,res) => {
    try {
        console.log(req.params);
        let id = req.params.id;
        const { description } = req.body;
        const UPDATE_QUERY = "Update todo SET description = $1 where todo_id = $2 RETURNING *";
        const allTodos = await pool.query(UPDATE_QUERY,[description,id]);
        res.json(allTodos.rows);
//        console.table(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});
// delete a todo
app.delete("/todo/:id",async(req,res) => {
    try {
        console.log(req.params);
        let id = req.params.id;
        const { description } = req.body;
        const allTodos = await pool.query("DELETE FROM todo where todo_id=$1 RETURNING *",[id]);
        res.json(allTodos.rows);
        console.table(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
});
// Listening the app
app.listen(5000,() => {
    console.log(`server has started on port 5000`);
});
