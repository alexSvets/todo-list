// Globals

// Atach events

// Event logic

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
