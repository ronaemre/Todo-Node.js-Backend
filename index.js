const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//npx nodemon index.js 


//post 
app.post("/todos", async (req, res) => {
    try {
        console.log(req.body);
        const { description, todoname, tododate } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description,todoname,tododate) VALUES($1,$2,$3) RETURNING *", [description, todoname, tododate]);

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all todos

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message);
    }
})

//get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id =$1", [id])

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update

app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description, todoname, todoupdatedate } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 ,todoname=$3,todoupdatedate=$4 WHERE todo_id=$2", [description, id, todoname, todoupdatedate]);

        res.json("todo was updated")

    } catch (err) {
        console.error(err.message)
    }
})

//delete a todo

app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);

        res.json("Todo was Deleted")
    } catch (err) {
        console.error(err.message)
    }
})


app.listen(5000, () => {
    console.log("server has started on port 5000")
});
