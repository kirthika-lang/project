// ===============================
// TASK.JS (Frontend -> Node API)
// ===============================

// DOM Elements
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Backend URL
const API_URL = "http://localhost:5000/api/tasks";

// ===============================
// LOAD ALL TASKS
// ===============================
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();

        taskList.innerHTML = "";

        tasks.forEach(task => {
            taskList.innerHTML += `
                <div class="task-card">
                    <h3>${task.title}</h3>
                    <p><strong>Assigned:</strong> ${task.assigned}</p>
                    <p><strong>Deadline:</strong> ${task.deadline}</p>
                    <span class="status">${task.status}</span>
                    <button onclick="deleteTask('${task.id}')">Delete</button>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}

// ===============================
// ADD NEW TASK
// ===============================
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const assigned = document.getElementById("assigned").value;
    const deadline = document.getElementById("deadline").value;
    const status = document.getElementById("status").value;

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                assigned,
                deadline,
                status
            })
        });

        taskForm.reset();
        loadTasks();

    } catch (error) {
        console.error("Error adding task:", error);
    }
});

// ===============================
// DELETE TASK
// ===============================
async function deleteTask(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        loadTasks();

    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

// ===============================
// INITIAL LOAD
// ===============================
loadTasks();