let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Load tasks on page load
window.onload = () => {
  renderTasks();
};

// Add new task
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  tasks.push({ text: text, completed: false });

  input.value = "";
  saveTasks();
  renderTasks();
}

// Render task list
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filteredTasks = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const realIndex = tasks.indexOf(task);

    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleTask(realIndex);

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(realIndex);

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.onclick = () => deleteTask(realIndex);

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(span);
    li.appendChild(actions);
    list.appendChild(li);
  });

  updateCount();
}

// Toggle task completed
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Edit task
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// Filter tasks
function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

// Update task count
function updateCount() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  document.getElementById("taskCount").textContent =
    `Total: ${total} | Completed: ${completed}`;
}

// Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Save tasks in localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
