import './style.css';
import more from './images/more.png';
import add from './modules/add.js';
import removeTask from './modules/remove.js';
import { UpdateTask, saveUpdatedTask } from './modules/edit.js';

const list = [];

class Task {
  constructor(value) {
    this.description = value;
    this.completed = false;
    this.index = list.length + 1;
  }
}

// Add to array and Store it in localestorage

const form = document.querySelector('#list_input');
const input = document.querySelector('#input');

// Display //

const addBtn = document.querySelector('.add_btn');
const listTask = document.querySelector('.list');

function SaveAndDisplay() {
  const newTask = new Task(input.value);
  add(list, newTask);

  localStorage.setItem('ToDoList', JSON.stringify(list));

  // add <li>
  const li = document.createElement('li');
  li.classList.add('li', 'd-flex-row');
  listTask.appendChild(li);

  // add <div>
  const div = document.createElement('div');
  div.classList.add('list_task', 'd-flex-row');
  li.appendChild(div);

  // add <input>
  const inputTag = document.createElement('input');
  inputTag.type = 'checkbox';
  inputTag.classList.add('checkbox');
  div.appendChild(inputTag);

  // add <span>
  const span = document.createElement('span');
  span.innerText = input.value;
  div.appendChild(span);

  // add <img>
  const moreBtn = document.createElement('img');
  moreBtn.classList.add('more_btn');
  moreBtn.id = newTask.index;
  moreBtn.src = more;
  moreBtn.alt = 'more icon';
  li.appendChild(moreBtn);

  // Display //

  input.value = '';

  // Edit Task
  span.addEventListener('dblclick', (e) => {
    UpdateTask(e);
    const taskInput = document.querySelector('.edit');
    taskInput.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        newTask.description = taskInput.value;
        localStorage.setItem('ToDoList', JSON.stringify(list));
        saveUpdatedTask(taskInput.value, div, taskInput);
      }
    });
  });

  // remove Task

  moreBtn.addEventListener('click', (e) => {
    const idNumer = (parseInt(e.target.id, 10) - 1);
    e.target.parentNode.remove();
    removeTask(list, idNumer);

    // Update Index

    list.forEach((task, i) => {
      task.index = i + 1;
    });

    // Update id

    const moreBtns = document.querySelectorAll('.more_btn');
    moreBtns.forEach((btn) => {
      if (btn.id > e.target.id) {
        btn.id -= 1;
      }
    });

    localStorage.setItem('ToDoList', JSON.stringify(list));
  });
}

addBtn.addEventListener('click', SaveAndDisplay);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  SaveAndDisplay();
  input.blur();
});
