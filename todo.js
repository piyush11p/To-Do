document.addEventListener('DOMContentLoaded', loadTasks);
document.querySelector('#task-form').addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
    const taskInput = document.querySelector('#task-input');
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = createTaskElement(taskText);
        document.querySelector('#task-list').appendChild(task);
        saveTask(taskText);
        taskInput.value = '';
    }
}

function createTaskElement(text) {
    const li = document.createElement('li');
    li.textContent = text;
    
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.classList.add('complete');
    completeBtn.addEventListener('click', toggleComplete);
    li.appendChild(completeBtn);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', editTask);
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', deleteTask);
    li.appendChild(deleteBtn);

    return li;
}

function toggleComplete(e) {
    const li = e.target.parentElement;
    li.classList.toggle('completed');
    updateLocalStorage();
}

function editTask(e) {
    const li = e.target.parentElement;
    const newText = prompt('Edit your task', li.firstChild.textContent);
    if (newText) {
        li.firstChild.textContent = newText;
        updateLocalStorage();
    }
}

function deleteTask(e) {
    if (confirm('Are you sure you want to delete this task?')) {
        const li = e.target.parentElement;
        li.remove();
        removeTaskFromLocalStorage(li.firstChild.textContent);
    }
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: task, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task.text);
        if (task.completed) {
            li.classList.add('completed');
        }
        document.querySelector('#task-list').appendChild(li);
    });
}

function updateLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({ text: li.firstChild.textContent, completed: li.classList.contains('completed') });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
