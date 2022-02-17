export default class TodoList {
 todos = [];
  addTodo = (description)=> {
      const todo = {
          description,
          index: this.todos.length + 1,
          completed: false,
          id: Date.now()
      }
      this.todos.push(todo);
      this.save();
  };

   save = () =>{
       localStorage.setItem('todos',JSON.stringify(this.todos));
   };

   delete = (id) => {
       this.todos = this.todos.filter((t) => t.id !== id);
       this.sort();
       this.save();
   };

   sort= () =>{
       this.todos.sort((a,b) => a.index - b.index);
       for(let i = 0; i < this.todos.length; i += 1){
           this.todos[i].index = i +1;
       }
   };

   edit = ( todo = {}) => {
        this.todos[todo.index - 1 ] = todo;
        this.save();
   };

   getTodos = () =>{
       this.todos = JSON.parse(localStorage.getItem('todos'));
   };

   clearComplete = () => {
       this.todos = this.todos.filter((t) => !t.completed);
       this.sort();
       this.save();
   };

}