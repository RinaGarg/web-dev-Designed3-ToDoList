document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button onclick="editTask(${index})">✏️</button>
                    <button onclick="deleteTask(${index})">❌</button>
                    <button onclick="toggleComplete(${index})">${task.completed ? '✔️' : '⏳'}</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    addTaskBtn.addEventListener('click', () => {
        const newTaskText = taskInput.value.trim();
        if (newTaskText) {
            tasks.push({ text: newTaskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    window.editTask = (index) => {
        const newTaskText = prompt('Edit task:', tasks[index].text);
        if (newTaskText !== null) {
            tasks[index].text = newTaskText.trim();
            saveTasks();
            renderTasks();
        }
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    renderTasks();
});
