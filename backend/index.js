const express = require("express");
const { createTodo, updateTodo } = require("./type");
const { todo } = require("./db");
const cors = require("cors");
require('dotenv').config();



const app = express();

app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173"
}));

app.post("/todo", async function (req, res) {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }

  try {
    await todo.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false,
    });

    res.json({
      msg: "Todo created",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error creating todo",
    });
  }
});

app.get("/todos", async function (req, res) {
  try {
    const todos = await todo.find({});

    res.json({
      todos:[]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error fetching todos",
    });
  }
});

app.put("/completed", async function (req, res) {
  const updatePayload = req.body;
  const parsePayload = updateTodo.safeParse(updatePayload);

  if (!parsePayload.success) {
    res.status(411).json({
      msg: "You sent the wrong inputs",
    });
    return;
  }

  try {
    await todo.updateOne({ _id: req.body.id },  { completed: true });

    res.json({
      msg: "Todo updated",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error updating todo",
    });
  }
});

app.listen(process.env.PORT);