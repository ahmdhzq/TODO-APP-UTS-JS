const TODOS_STORAGE_KEY = "TODOS_APPS";

let todos = [];

function isStorageAvailable() {
    if (typeof Storage === "undefined") {
        alert("Your browser not supported web storage!");
        return false;
    } else {
        return true;
    }
}

function updateDataFromStorage() {
    if (isStorageAvailable()) {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    }
}

function loadDataFromStorage() {
    let data = JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY));

    if (data !== null) {
        todos = data;
    }

    document.dispatchEvent(new Event("ondataloaded"));
}

function composeTodoObject(id, title, year, isComplete) {
    return {
        id, title, year, isComplete,
    };
}

function renderFromTodos() {
    for (todo of todos) {
        const newTodo = createTodo(todo.id, todo.title, todo.year, todo.isComplete);

        if (todo.isComplete) {
            document.getElementById(COMPLETE_TODO).append(newTodo);
        } else {
            document.getElementById(INCOMPLETE_TODO).append(newTodo);
        }
    }
}

function deleteTodoFromStorage(idTodo) {
    for (let array = 0; array < todos.length; array++) {
        if (todos[array].id == idTodo) {
            todos.splice(array, 1);
            break;
        }
    }
}