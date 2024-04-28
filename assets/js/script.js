// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || []
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    $("#todo-cards").append(`
<div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card h-100">
   
      <div class="card-body">
      <h5 class="card-title">${dayjs(task.dueDate).format("MM/DD/YYYY")}</h5>
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text"-> ${task.description} </p>
      </div>
    </div>
  </div>
</div>

`)
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault()
    var task = {
        title: $("#title").val(),
        description: $("#description").val(),
        dueDate: $("#duedate").val(),
        status:"todo"
    }
    console.log(task, "TASK", taskList)
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    createTaskCard(task)
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $("#savetask").on("click", handleAddTask);
});
