const INCOMPLETE_TODO = "incompleteTodoList";
const COMPLETE_TODO = "completeTodoList";

function addTodo() {
    const idTodo = +new Date();
    const inputTodoTitle = document.getElementById("inputTodoTitle").value;
    const inputTodoYear = document.getElementById("inputTodoYear").value;
    const inputTodoIsComplete = document.getElementById("inputTodoIsComplete").checked;

    const todo = createTodo(idTodo, inputTodoTitle, inputTodoYear, inputTodoIsComplete);
    const todoObject = composeTodoObject(idTodo, inputTodoTitle, inputTodoYear, inputTodoIsComplete);

    todos.push(todoObject);

    if (inputTodoIsComplete) {
        document.getElementById(COMPLETE_TODO).append(todo);
    } else {
        document.getElementById(INCOMPLETE_TODO).append(todo);
    }

    updateDataFromStorage();
}

function createTodo(idTodo, inputTodoTitle, inputTodoYear, inputTodoIsComplete) {
    const todo = document.createElement("article");
    todo.setAttribute("id", idTodo)
    todo.classList.add("card", "my-3", "rounded-xl", "shadow-bar");

    const todoTitle = document.createElement("h5");
    todoTitle.classList.add("text-truncate", "todoTitle");
    todoTitle.style.maxWidth = "202px";
    todoTitle.innerText = inputTodoTitle;

    const todoYear = document.createElement("span");
    todoYear.classList.add("todoYear");
    todoYear.innerText = inputTodoYear;

    const br = document.createElement("br");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-body", "d-flex", "justify-content-between");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const cardAction = addAction(inputTodoIsComplete, idTodo);

    cardContent.append(todoTitle, br, todoYear);
    cardContainer.append(cardContent);
    cardContainer.append(cardAction);
    todo.append(cardContainer);

    return todo;
}

function addAction(inputTodoIsComplete, idTodo) {
    const cardActions = document.createElement("div");

    const actionDelete = createActionDelete(idTodo);
    const actionRead = createActionRead(idTodo);
    const actionUndo = createActionUndo(idTodo);

    cardActions.append(actionDelete);

    if (inputTodoIsComplete) {
        cardActions.append(actionUndo);
    } else {
        cardActions.append(actionRead);
    }

    return cardActions;
}

function createActionDelete(idTodo) {
    const actionDelete = document.createElement("button");
    actionDelete.classList.add("btn", "btn-sm", "btn-outline-danger", "mx-1");
    actionDelete.innerHTML = '<i class="bi bi-x"></i>';

    actionDelete.addEventListener("click", function () {
        let confirmation = confirm("Are you sure to delete this todo?");

        if (confirmation) {
            const cardParent = document.getElementById(idTodo);
            cardParent.addEventListener("eventToDelete", function (event) {
                event.target.remove();
            });
            cardParent.dispatchEvent(new Event("eventToDelete"));

            deleteTodoFromStorage(idTodo);
            updateDataFromStorage();
        }
    });

    return actionDelete;
}

function createActionRead(idTodo) {
    const action = document.createElement("button");
    action.classList.add("btn", "btn-sm", "btn-outline-primary");
    action.innerHTML = '<i class="bi bi-check"></i>';

    action.addEventListener("click", function () {
        const cardParent = document.getElementById(idTodo);

        const todoTitle = cardParent.querySelector(".card-content > h5").innerText;
        const todoYear = cardParent.querySelectorAll(".card-content > span")[0].innerText;

        cardParent.remove();

        const todo = createTodo(idTodo, todoTitle, todoYear, true);
        document.getElementById(COMPLETE_TODO).append(todo);

        deleteTodoFromStorage(idTodo);
        const todoObject = composeTodoObject(idTodo, todoTitle, todoYear, true);

        todos.push(todoObject);
        updateDataFromStorage();
    })

    return action;
}

function createActionUndo(idTodo) {
    const action = document.createElement("button");
    action.classList.add("btn", "btn-sm", "btn-outline-secondary");
    action.innerHTML = '<i class="bi bi-arrow-counterclockwise"></i>';

    action.addEventListener("click", function () {
        const cardParent = document.getElementById(idTodo);

        const todoTitle = cardParent.querySelector(".card-content > h5").innerText;
        const todoYear = cardParent.querySelectorAll(".card-content > span")[0].innerText;

        cardParent.remove();

        const todo = createTodo(idTodo, todoTitle, todoYear, false);
        document.getElementById(INCOMPLETE_TODO).append(todo);

        deleteTodoFromStorage(idTodo);
        const todoObject = composeTodoObject(idTodo, todoTitle, todoYear, false);

        todos.push(todoObject);
        updateDataFromStorage();
    })

    return action;
}