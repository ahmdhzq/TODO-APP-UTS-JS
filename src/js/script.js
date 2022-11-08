if(localStorage.getItem ('theme') == 'dark')
    setDarkMode()

function setDarkMode(){
    let log = ''
    let isDark = document.body.classList.toggle('darkmode')

    if(isDark) {
        log = '⚪'
        localStorage.setItem('theme', 'dark')
    } else {
        log = '⚫'
        localStorage.removeItem('theme')
    }
    document.getElementById('darkBtn').innerHTML = log
}

document.addEventListener("DOMContentLoaded", () => {

    const formInput = document.getElementById("inputTodo");
    
    formInput.addEventListener("submit", (e) => {
        e.preventDefault();
        addTodo();

        document.getElementById("inputTodoTitle").value = "";
        document.getElementById("inputTodoYear").value = "";
        document.getElementById("inputTodoIsComplete").checked = false;
    });

    if (isStorageAvailable()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondataloaded", () => {
    renderFromTodos();
});
