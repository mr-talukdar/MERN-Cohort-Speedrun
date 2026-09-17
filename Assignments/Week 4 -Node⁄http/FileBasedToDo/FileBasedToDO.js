const { Command } = require("commander");
const fs = require("fs/promises");

const addToDo = async (todo, status) => {
  const todos = await fs.readFile("todos.json", "utf-8");
  const todosJSON = JSON.parse(todos);
  todosJSON.push({
    id: todosJSON.length + 1 + Date.now(),
    title: todo,
    complete: status,
  });
  await fs.writeFile("todos.json", JSON.stringify(todosJSON));
};

const deleteToDo = async (todo) => {
  const todos = await fs.readFile("todos.json", "utf-8");

  const todosJSON = JSON.parse(todos);
  const newToDos = todosJSON.filter((task) => task.title != todo);
  await fs.writeFile("todos.json", JSON.stringify(newToDos));
};

const updateToDo = async (todo, status) => {
  const todos = await fs.readFile("todos.json", "utf-8");
  const todosJSON = JSON.parse(todos);
  const newToDos = todosJSON.map((task) => {
    if (task.title === todo) {
      task.complete = status;
    }
    return task;
  });

  await fs.writeFile("todos.json", JSON.stringify(newToDos));
};

const todo = (task, todo, status) => {
  if (task.toLowerCase() === "add") {
    addToDo(todo, status);
  } else if (task.toLowerCase() === "delete") {
    deleteToDo(todo);
  } else if (task.toLowerCase() === "update") {
    updateToDo(todo, status);
  }
};
todo("update", "build helix", false);
