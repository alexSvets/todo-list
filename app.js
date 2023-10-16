// Globals
const todoList = document.getElementById("todo-list");
const userSelect = document.getElementById("user-todo");
const form = document.querySelector("form");
let todos = [];
let users = [];

// Atach events
document.addEventListener("DOMContentLoaded", initApp);
form.addEventListener("submit", handleSubmit);

// Basic logic
function getUserName(userId) {
  const user = users.find((u) => u.id === userId);
  return user.name;
}

function printTodo({ userId, id, title, completed }) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = id;
  li.innerHTML = `<span> ${title} <i>by</i> <b>${getUserName(
    userId
  )}</b></span>`;

  const status = document.createElement("input");
  status.type = "checkbox";
  status.checked = completed;

  const close = document.createElement("span");
  close.innerHTML = "&times";
  close.className = "close";

  li.prepend(status);
  li.append(close);

  todoList.prepend(li);
}

function createUserOption(user) {
  const option = document.createElement("option");
  option.value = user.id;
  option.innerText = user.name;

  userSelect.append(option);
}

// Event logic
function initApp() {
  Promise.all([getAllTodos(), getAllUsers()]).then((values) => {
    [todos, users] = values;

    todos.forEach((todo) => {
      printTodo(todo);
    });

    users.forEach((user) => {
      createUserOption(user);
    });
  });
}

function handleSubmit(event) {
  event.preventDefault();

  createTodo({
    userId: Number(form.user.value),
    title: form.todo.value,
    completed: false,
  });
}

// Async logic
async function getAllUsers() {
  const responce = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await responce.json();
  return data;
}

async function getAllTodos() {
  const responce = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await responce.json();
  return data;
}

async function createTodo(todo) {
  const responce = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json",
    },
  });
  const newTodo = await responce.json();

  printTodo(newTodo);
}
