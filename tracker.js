window.addEventListener('load',() =>{
    const form = document.querySelector("#task-form");
    const input = document.querySelector("#task-input");
    const list_el= document.querySelector("#task");
    const dateInput = document.querySelector("#task-date");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = input.value;
    const date = dateInput.value;
    if (!task) {
        alert ("Enter a Task");
        return;

    }

    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");
    
   

    task_el.appendChild(task_content_el);

    const task_date_el = document.createElement("span");
    task_date_el.classList.add("date");
    task_date_el.textContent = date;

    task_content_el.appendChild(task_date_el);

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type ="text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly")

    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");
    

    const edit = document.createElement("button");
    edit.classList.add("edit");
    edit.innerHTML= "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerHTML = "Delete";

    task_actions_el.appendChild(edit);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);


    list_el.appendChild(task_el)

    input.value = "";

    edit.addEventListener("click", () => {
        if(edit.innerText.toLowerCase() == "edit"){
            edit.innerHTML = "save";
            task_input_el.removeAttribute("readonly");
            task_input_el.focuse();
        }else {
            task_input_el.setAttribute("readonly","readonly");
            edit.innerText = "Edit";
        }
    });
task_delete_el.addEventListener("click", ()=> {
    list_el.removeChild(task_el);
});
});
});