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
    taskForm.addEventListener("submit", async(e)  => {
        e.preventDefault();

        const newTask = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            deadline: document.getElementById("deadline").value,
            status: document.getElementById("status").value,
            priority: document.getElementById("priority").value,
            completed: false,
            created: new Date()
        };

        tasks.push(newTask);
        taskForm.reset();
        renderTasks();
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        

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
