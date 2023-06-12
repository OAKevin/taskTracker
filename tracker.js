window.addEventListener('load', () => {
    const form = document.querySelector("#task-form");
    const input = document.querySelector("#task-input");
    const taskList = document.querySelector("#task");
    const dateInput = document.querySelector("#task-date");
    fetch('/tasks')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch tasks');
      }
    })
    .then(tasks => {
      // Handle the response data (tasks) and update the UI
      for (const task of tasks) {
        createTaskElement(task);
      }
    })
    .catch(error => {
      console.error(error);
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const task = input.value;
      const date = dateInput.value;
      if (!task) {
        alert("Don't forget to add a task");
        return;
      }
      const newTask = {
        task: task,
        date: date
      };
      
    
      fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      })
      
      .then(response => {
        if (response.ok) {
          // Task added successfully
          return response.json();
        } else {
          throw new Error('Failed to add task');
        }
      })
      .then(data => {
        // Handle the response data, if needed
        console.log(data);
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
      
    
      const taskElement = document.createElement("div");
      taskElement.classList.add("task");
  
      const taskContent = document.createElement("div");
      taskContent.classList.add("content");
  
      taskElement.appendChild(taskContent);
  
      const taskDate = document.createElement("span");
      taskDate.classList.add("date");
      taskDate.textContent = date;
  
      taskContent.appendChild(taskDate);
  
      const taskInput = document.createElement("input");
      taskInput.classList.add("text");
      taskInput.type = "text";
      taskInput.value = task;
      taskInput.setAttribute("readonly", "readonly");
  
      taskContent.appendChild(taskInput);
  
      const taskActions = document.createElement("div");
      taskActions.classList.add("actions");
  
      const editButton = document.createElement("button");
      editButton.classList.add("edit");
      editButton.innerHTML = "Edit";
  
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete");
      deleteButton.innerHTML = "Finished";
  
      taskActions.appendChild(editButton);
      taskActions.appendChild(deleteButton);
  
      taskElement.appendChild(taskActions);
  
      taskList.appendChild(taskElement);
  
      input.value = "";
  
      editButton.addEventListener("click", () => {
        if (editButton.innerText.toLowerCase() === "edit") {
          editButton.innerHTML = "Save";
          taskInput.removeAttribute("readonly");
          taskInput.focus();
        } else {
          taskInput.setAttribute("readonly", "readonly");
          editButton.innerText = "Edit";
        }
      });
  
      deleteButton.addEventListener("click", () => {
        taskList.removeChild(taskElement);
      });
    });
  });