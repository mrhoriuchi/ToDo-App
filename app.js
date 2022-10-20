const addForm = document.getElementById("addItem");
const todoList = document.getElementById("taskList");

//Recreates the form based on the local storage
let savedTodos = JSON.parse(localStorage.getItem("todo")) || [];
for (let i = 0; i < savedTodos.length; i++) {
    const newTodo = document.createElement("li");
    //Need to recreate the remove button.
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    //The Button's inner text keeps getting shown when I refresh, so I updated the inner text here.
    newTodo.innerText = savedTodos[i].task.substring(0, savedTodos[i].task.length - 6);
    newTodo.isCompleted = savedTodos[i].isCompleted ? true : false;
    //Used to make sure that the task is marked or not.
    if (newTodo.isCompleted) {
        newTodo.classList.toggle('done-task');
    }
    newTodo.appendChild(removeBtn);
    todoList.appendChild(newTodo);
}

//Creates a new task and updates the local storage.
addForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const newTodo = document.createElement("li");
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    const taskValue = document.getElementById("item").value;
    newTodo.innerText = taskValue;
    newTodo.isCompleted = false;
    newTodo.appendChild(removeBtn);
    //Found out that reset works the same as clearing what's in the text. So reset looks cleaner.
    addForm.reset();
    todoList.appendChild(newTodo);
    //Saves to the local storage.
    savedTodos.push({task: newTodo.innerText, isCompleted: false});
    localStorage.setItem("todo", JSON.stringify(savedTodos));
});

todoList.addEventListener("click", function(e) {
    //This will remove the task when you click the button and also update local storage.
    //I remember that the button has to be in caps because of a previous video.
    if (e.target.tagName === 'BUTTON') {
        //need a const for the parent's index because Button's parent is in the array.
        const indexOfParent = savedTodos.findIndex(object => {
            return object.task === e.target.parentElement.innerText;
        });
        savedTodos.splice(indexOfParent, 1);
		e.target.parentElement.remove();
        localStorage.setItem("todo", JSON.stringify(savedTodos));
    }
    //Made a new const for the actual Object index instead of the parent.
    const indexOfObject = savedTodos.findIndex(object => {
        return object.task === e.target.innerText;
    });
    //Need to check if it was completed or not and update the local storage.
    if (!e.target.isCompleted) {
        e.target.isCompleted = true;
        e.target.classList.toggle('done-task')
        savedTodos[indexOfObject] = {task: e.target.innerText, isCompleted: true };
        localStorage.setItem("todo", JSON.stringify(savedTodos));
    } else {
        e.target.isCompleted = false;
        e.target.classList.toggle('done-task')
        savedTodos[indexOfObject] = {task: e.target.innerText, isCompleted: false};
        localStorage.setItem("todo", JSON.stringify(savedTodos));
    }
});