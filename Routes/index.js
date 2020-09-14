const Todo = require('../models/Todo')


module.exports = app => {
    app.get('/getTodos', async (req, res, next) => {
        const userTodos = await Todo.find({});
        res.json(userTodos)
    })

    app.post('/toggleTodo', async (req, res) => {
        const todoId = req.body.id;
        const todoState = req.body.todoState
        const userTodo = await Todo.findOneAndUpdate(
            { _id: todoId },
            {
                $set: { isCompleted: todoState }
            },
            {
                useFindAndModify: true, new: true
            }
        );
        res.json(userTodo)
    })

    app.post('/addTodo', async (req, res) => {
        const todoName = req.body.todoName;
        let newTodo = null;
        const todosCount = await Todo.find().countDocuments()
        if (todosCount < 10) {
            const newTodoObject = {
                name: todoName,
                isCompleted: false
            }
            newTodo = await new Todo(newTodoObject).save();
        }
        res.json(newTodo);
    })

    app.get("/removeTodo", async (req, res) => {
        const todoId = req.query.id;
        const deletedTodo = await Todo.findOneAndDelete({ _id: todoId })
        res.json(deletedTodo)
    })
}