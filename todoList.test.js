

import TodoList from './src/modules/todoList';
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

document.body.innerHTML = 
`<div> +
   <div id="dynamic-list"></div>
</div>`;
const todoList = new TodoList();

describe('Add task',() => {
  test('Add one task expect tasks length to be 1',() =>{
    todoList.addTodo('go shopping');
    todoList.addTodo('watch a movie');
    expect(todoList.todos.length).toBe(2);
  });
});

describe('Add the added todo to the DOM',()=>{
  test('One task has been added expect one task element in DOM',()=>{
    gin.allTasks(todoList);
    const tasksList = document.getElementById('dynamic-list');
    expect(tasksList.childNodes.length).toBe(2);
  });
});
