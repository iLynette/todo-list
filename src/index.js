import _ from 'lodash'; //eslint-disable-line
import './style.css';

const todoList = document.getElementById('dynamic-list');
const todos = [
  {
    description: 'Wash the dishes',
    completed: false,
    index: 1,
  },
  {
    description: 'complete To Do list project',
    completed: true,
    index: 0,
  },
];

function allTasks() {
  todoList.innerHTML = '';
  todos.sort((a, b) => a.index - b.index).forEach((todos) => {
    todoList.innerHTML += `
    <form class="one">
      <input type="checkbox" ${todos.completed ? 'checked' : ''}>
      <p>${todos.description}.index</p>
      <i class="fas fa-ellipsis-v"></i>
    </form>
    `;
  });
}
window.onload = allTasks();
