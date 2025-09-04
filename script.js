// Select elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// State (array of tasks)
let tasks = [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        // task text
        const span = document.createElement("span");
        span.textContent = task.text;
        span.classList.add("task-text");
        if (task.completed) {
            span.classList.add("completed");
        }

        // buttons container
        const actions = document.createElement("div");
        actions.classList.add("actions");

        // delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.addEventListener("click", () => {
            deleteTask(index);
        });

        // complete button
        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.classList.add("completeBtn");
        completeBtn.addEventListener("click", () => {
            completeTask(index);
        });

        // append buttons to actions container
        actions.appendChild(deleteBtn);
        actions.appendChild(completeBtn);

        // append everything to li
        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    saveTasks();
}


// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const loadedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (loadedTasks) {
        tasks = loadedTasks; // restore into state
        renderTasks();
    }
}

// Function to add task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        renderTasks();
    }
}

// Function to delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Function to toggle completion
function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Event listeners
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);
