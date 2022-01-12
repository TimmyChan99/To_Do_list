import './style.css';
import more from './images/more.png';

const list = [
  {
    description: 'Task 1',
    completed: true,
    index: 1,
  },
  {
    description: 'Task 4',
    completed: true,
    index: 4,
  },
  {
    description: 'Task 2',
    completed: false,
    index: 2,
  },
  {
    description: 'Task 3',
    completed: true,
    index: 3,
  },
];

const listTask = document.querySelector('.list');

window.addEventListener('load', () => {
  list.sort((a, b) => a.index - b.index);

  for (let i = 0; i < list.length; i += 1) {
    listTask.innerHTML += `
         <li class="d-flex-row">
             <div class="list_task d-flex-row">
                <input type="checkbox" name="task" class="checkbox">
                <span>${list[i].description}</span>
             </div>
             <img src=${more} alt="more icon">
            </li>
            <li class="break_line_list"><hr></li>
         `;
  }
});
