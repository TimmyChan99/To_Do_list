import './style.css';
import more from './images/bin.png';
import add from './modules/add.js';
import removeTask from './modules/remove.js';
import { UpdateTask, saveUpdatedTask } from './modules/edit.js';
import UpdateStorage from './modules/localStorage.js';
import UpdateStatus from './modules/status.js';

let list = JSON.parse(localStorage.getItem('ToDoList')) || [];
const input = document.querySelector('#input');
const addBtn = document.querySelector('.add_btn');
const form = document.querySelector('#list_input');
const listTasks = document.querySelector('.list');

class Task {
  constructor(value) {
    this.description = value;
    this.completed = false;
    this.index = list.length + 1;
  }
}

// display function

const displayTasks = (tasks) => {
  listTasks.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList.add('li', 'd-flex-row');
    listTasks.appendChild(li);

    // add <div>
    const div = document.createElement('div');
    div.classList.add('list_task', 'd-flex-row');
    li.appendChild(div);

    // add <input>
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.id = `box-${task.index}`;
    checkbox.checked = task.completed;
    div.appendChild(checkbox);

    // add <span>
    const span = document.createElement('span');
    span.innerText = task.description;
    if (task.completed === true) {
      span.classList.add('span', 'done');
    } else { span.classList.add('span'); }
    div.appendChild(span);

    // add <img>
    const moreBtn = document.createElement('img');
    moreBtn.classList.add('more_btn');
    moreBtn.src = more;
    moreBtn.alt = 'more icon';
    moreBtn.id = task.index;
    li.appendChild(moreBtn);
  });
};

// Add function
const addTask = () => {
  const newTask = new Task(input.value);
  add(list, newTask);
  UpdateStorage(list);
  displayTasks(list);
  input.value = '';
};

addBtn.addEventListener('click', addTask);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
  input.blur();
});

// remove function
const deleteTask = (idNumer, e) => {
  removeTask(list, idNumer - 1);

  // Update Index
  list.forEach((task, i) => {
    task.index = i + 1;
  });

  // Update id
  const binBtns = document.querySelectorAll('.more_btn');
  binBtns.forEach((btn) => {
    if (btn.id > e.target.id) {
      btn.id -= 1;
    }
  });
  UpdateStorage(list);
};

listTasks.addEventListener('click', (e) => {
  if (e.target.classList.contains('more_btn')) {
    const idNumer = e.target.id;
    e.target.parentNode.remove();
    deleteTask(idNumer, e);
  }
});

// editing Tasks

const editTask = (e) => {
  UpdateTask(e);
};

listTasks.addEventListener('dblclick', (e) => {
  if (e.target.classList.contains('span')) {
    editTask(e);
    list.forEach((task) => {
      if (task.description === e.target.innerText) {
        const taskInput = document.querySelector('.edit');
        taskInput.addEventListener('keypress', (e) => {
          if (e.keyCode === 13) {
            task.description = taskInput.value;
            UpdateStorage(list);
            saveUpdatedTask(taskInput.value, e.target.parentNode, taskInput);
            displayTasks(list);
          }
        });
      }
    });
  }
});

// Update Status

listTasks.addEventListener('change', (e) => {
  if (e.target.classList.contains('checkbox')) {
    UpdateStatus(e, list);
    UpdateStorage(list);
  }
});

// Clear all completed Tasks
const clearBtn = document.querySelector('#clearBtn');

clearBtn.addEventListener('click', () => {
  const UncompeledTasks = list.filter((task) => task.completed === false);
  UncompeledTasks.forEach((task, i) => { (task.index = i + 1); });
  list = UncompeledTasks;
  displayTasks(list);
  UpdateStorage(list);
});

// Load to do list

window.onload = () => {
  displayTasks(list);
};
