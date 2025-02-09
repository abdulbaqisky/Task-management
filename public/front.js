const taskInput = document.getElementById('taskInput')
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList'); 

const tasks = [];

function addTask() {
    const taskName = taskInput.value;
    if (taskName !== '') {
        tasks.push(taskName); 
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const listItem = document.createElement('li');
        listItem.textContent = task;
        taskList.appendChild(listItem);   

    });
}

addTaskButton.addEventListener('click', addTask);