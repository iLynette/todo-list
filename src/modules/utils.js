import TodoList from './todoList.js';

const todo = new TodoList();
const todoList = document.getElementById('dynamic-list');
const form = document.getElementById('form');
const allTasks = () => {
  todoList.innerHTML = '';
  todo.todos
    .sort((a, b) => a.index - b.index)
    .map((todos) => {
      const todoCard = document.createElement('form');
      todoCard.classList.add('one');
      todoCard.setAttribute('id', todos.id);
      const checkBox = document.createElement('input');
      checkBox.setAttribute('type', 'checkbox');
      if (todos.completed) {
        checkBox.setAttribute('checked', 'checked');
      }
      checkBox.addEventListener('change', () => onchange(todos));
      todoCard.appendChild(checkBox);
      const description = document.createElement('p');
      if (todos.completed) {
        description.style.textDecoration = 'line-through';
      }
      description.innerHTML = todos.description;
      todoCard.appendChild(description);
      const button = document.createElement('button');
      button.onclick = () => editDescription(todos);
      const icon = document.createElement('i');
      icon.classList.add('fas', 'fa-ellipsis-v');
      button.appendChild(icon);
      todoCard.appendChild(button);
      todoList.appendChild(todoCard);

      return todoCard;
    });
};
const editDescription = (todos = {}) => {
  const todoCard = document.getElementById(todos.id);
  todoCard.replaceChildren();
  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  if (todos.completed) {
    checkBox.setAttribute('checked', 'checked');
  }
  checkBox.addEventListener('change', () => onchange(todos));
  todoCard.appendChild(checkBox);
  const editField = document.createElement('input');
  editField.style.padding = '20px';
  editField.style.width = '100%';
  editField.style.border = 'none';
  editField.value = todos.description;
  todoCard.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const edit = editField.value;
      if (edit.trim().length > 0) {
        todos.description = edit;
        todo.edit(todos);
        allTasks();
      }
    }
  });
  todoCard.appendChild(editField);
  const button = document.createElement('button');
  button.onclick = () => {
    todo.delete(todos.id);
    allTasks();
  };
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-trash');
  button.appendChild(icon);
  todoCard.appendChild(button);
};
const onchange = (todos = {}) => {
  todos.completed = !todos.completed;
  todo.edit(todos);
  allTasks();
};
const checkDb = () => {
  if (localStorage.getItem('todos')) {
    todo.getTodos();
    allTasks();
  } else {
    // show use no todos
  }
};

const addNewToDo = () => {
  const todoTask = document.getElementById('list-activity').value;
  if (todoTask.trim().length > 0) {
    todo.addTodo(todoTask);
    form.reset();
    allTasks();
  }
};
const genesis = () => {
  checkDb();
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addNewToDo();
    }
  });
  document.getElementById('remove').onclick = () => {
    todo.clearComplete();
    allTasks();
  };
};

export default genesis;
