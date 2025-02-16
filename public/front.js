// const taskInput = document.getElementById('taskInput')
// const addTaskButton = document.getElementById('addTaskButton');
// const taskList = document.getElementById('taskList'); 

// const tasks = [];

// function addTask() {
//     const taskName = taskInput.value;
//     if (taskName !== '') {
//         tasks.push(taskName); 
//         renderTasks();
//         taskInput.value = '';
//     }
// }

// function renderTasks() {
//     taskList.innerHTML = '';
//     tasks.forEach((task) => {
//         const listItem = document.createElement('li');
//         listItem.textContent = task;
//         taskList.appendChild(listItem);   

//     });
// }

// addTaskButton.addEventListener('click', addTask);

document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task");
            if (task.completed) taskDiv.classList.add("completed");

            taskDiv.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p><strong>Deadline:</strong> ${task.deadline}</p>
                <p><strong>Status:</strong> ${task.status}</p>
                <p><strong>Priority:</strong> ${task.priority}</p>
                <div class="task-actions">
                    <button class="delete" onclick="deleteTask(${index})">Delete</button>
                    <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Complete"}</button>
                </div>
            `;

            taskList.appendChild(taskDiv);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add Task
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newTask = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            deadline: document.getElementById("deadline").value,
            status: document.getElementById("status").value,
            priority: document.getElementById("priority").value,
            completed: false,
            created: new Date().toISOString()
        };

        tasks.push(newTask);
        taskForm.reset();
        renderTasks();
    });

    // Delete Task
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    // Toggle Task Completion
    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    renderTasks();
});
