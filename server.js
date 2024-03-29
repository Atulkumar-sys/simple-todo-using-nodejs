import express, { response } from "express";
import { v4 as uuidv4 } from 'uuid';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))




let todo_items = [];
app.post("/api/new-todo", (request, response) => {
    const {task_name, task_description } = request.body;
    if(task_name === undefined || task_description === undefined) response.status(500).json({error : "Error"})
    let new_task = {id: uuidv4(), task_name, task_description, completed : false};
    todo_items.push(new_task)
    console.log(todo_items)
    response.status(200).json({"sucess": true, "message" : "Succesfully created"});
})

app.get("/api/todo-item", (request, response) => {
    response.status(200).json({todo_items});
})


app.get("/api/todo-item/:id", (request, response) => {
    const user_id = request.params.id;
    let filterTodoItems = todo_items.filter((obj) => obj.id === user_id)
    console.log(filterTodoItems);
    response.status(200).json({filterTodoItems})

})


app.patch("/api/todo-item-update/:id", (request, response) => {
    const user_id = request.params.id;
    const updated_details = request.body;




    try {
        todo_items.map((obj) => {
            if(obj.id === user_id){
                for(let key in updated_details){
                    if(obj.hasOwnProperty(key)){
                        obj[key] = updated_details[key];
                    }
                }
            }
        })
        response.status(200).send("Successs");
    } catch (error) {
        response.status(500).send("Unsuccessfull")
    }
})


app.delete("/api/delete/:id", (request, response) => {
    try {
        const user_id = request.params.id;
        todo_items = todo_items.filter((obj) => obj.id != user_id)
        response.status(200).json({"Success": true})
    } catch (error) {
        response.status(500).json({"succes" : false});
    }




})


app.listen(8080, () => {
    console.log("The server is running on 8080")
})


