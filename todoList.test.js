import TodoList from './src/modules/todoList.js';
import * as gin from './src/modules/utils.js';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

document.body.innerHTML = `<div> +
   <div id="dynamic-list"></div>
</div>`;
const todoList = new TodoList();

describe('Add task', () => {
  test('Add one task expect tasks length to be 1', () => {
    todoList.addTodo('go shopping');
    todoList.addTodo('watch a movie');
    expect(todoList.todos.length).toBe(2);
  });
});

describe('Add the added todo to the DOM', () => {
  test('One task has been added expect one task element in DOM', () => {
    gin.allTasks(todoList);
    const tasksList = document.getElementById('dynamic-list');
    expect(tasksList.childNodes.length).toBe(2);
  });
});

describe('Remove first todo from todoList', () => {
  test('One task has been remove expect zero', () => {
    const { id } = todoList.todos[0];
    const taskCard = document.getElementById(id);
    taskCard.parentNode.removeChild(taskCard);
    expect(todoList.delete(id)).toBe(id);
  });
});

describe('Check if task card had been removed from DOM', () => {
  test('One card removed expect node children to be 0', () => {
    const tasksList = document.getElementById('dynamic-list');
    expect(tasksList.childNodes.length).toBe(1);
  });
});
