// Drag and Drop Functionality
const allBoxes = document.querySelectorAll('.box');
const allTaskes = document.querySelectorAll('.task');

allTaskes.forEach(task => {
    task.addEventListener("dragstart", () => {
        task.classList.add('is-draging');
    });
    task.addEventListener("dragend", () => {
        task.classList.remove('is-draging');
    });
});

allBoxes.forEach(box => {
    box.addEventListener('dragover', (e) => {
        e.preventDefault();
        const curTask = document.querySelector('.is-draging');
        box.appendChild(curTask);
    });
});

// Adding New Task
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input'); 
const todoBox = document.querySelector('#to-do');

form.addEventListener('submit', e => {
    e.preventDefault();

    const newTaskText = input.value;
    if (!newTaskText) return;

    // Create new task element
    const newTask = document.createElement('p');
    newTask.classList.add('task');
    newTask.setAttribute('draggable', 'true');
    newTask.innerHTML = `${newTaskText} <button class="delete-btn">X</button>`;

    // Add drag events to the new task
    newTask.addEventListener("dragstart", () => {
        newTask.classList.add('is-draging');
    });
    newTask.addEventListener("dragend", () => {
        newTask.classList.remove('is-draging');
    });

    // Add delete functionality
    const deleteBtn = newTask.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        newTask.remove();
    });

    // Append the new task to the TODO box
    todoBox.appendChild(newTask);

    // Clear the input field
    input.value = '';
});

// Add delete functionality to existing tasks
document.querySelectorAll('.task').forEach(task => {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerText = 'X';
    task.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => {
        task.remove();
    });
});

allBoxes.forEach(box => {
    box.addEventListener('dragover', (e) => {
        e.preventDefault();
        const curTask = document.querySelector('.is-draging');
        box.appendChild(curTask);

        // Check if the task is dropped in the "DONE" box
        if (box.id === "done") {
            // Trigger confetti effect
            confetti({
                particleCount: 100, 
                spread: 70,        
                origin: { y: 0.6 },
            });
        }
    });
});
