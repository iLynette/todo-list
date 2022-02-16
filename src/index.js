import _ from 'lodash'; //eslint-disable-line
import './style.css';

const todoList = document.getElementById('dynamic-list');
const todos = [
  {
    description: 'Wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'complete To Do list project',
    completed: false,
    index: 1,
  },
];

function allTasks() {
  todoList.innerHTML = '';
  todos.forEach((todos) => {
    todoList.innerHTML += `
    <div class="one">
     <input type="checkbox">
     <p>${todos.description}</p>
      <i class="fas fa-ellipsis-v"></i>
    </div>
    `;
  });
}
window.onload = allTasks();
