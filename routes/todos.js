var express = require("express");
var router = express.Router();
const createError = require("http-errors");

const todos = [{ id: 1, name: "Do something", completed: false }];

router.get("/", function (req, res, next) {
  res.json(todos);
});

router.get("/:id", function (req, res, next) {
  const todo = todos.find((todo) => todo.id === Number(req.params.id));
  if (!todo) {
    return next(createError(404, "Not Found"));
  }
  res.json(todo);
});

router.post("/", function (req, res, next) {
  if (typeof req.body.name !== "string") {
    return next(createError(422, "Validation Error"));
  }

  const newTodo = {
    id: todos.length + 1,
    name: req.body.name,
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

module.exports = router;
