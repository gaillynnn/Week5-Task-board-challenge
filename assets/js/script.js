// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || []
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return Math.floor(Math.random() * 1000000)
}

// Todo: create a function to create a task card
function createTaskCard(task,color) {
  if(task.status === "todo"){ 
    $("#todo-cards").append(`
    <div class="row row-cols-1 draggable row-cols-md-11 g-4" id="${task.id}">
      <div class="col">
        <div class="card h-100 ${color} text-white">
       
          <div class="card-body">
          <h5 class="card-title">${dayjs(task.dueDate).format("MM/DD/YYYY")}</h5>
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text"-> ${task.description} </p>
          </div>
          <button id="${task.id}" type="button" class="btn btn-danger"onclick="handleDeleteTask(event)">Delete</button>
        </div>
      </div>
    </div>
    
    `)

  }else if(task.status === "in-progress"){  
    $("#in-progress-cards").append(`
    <div class="row row-cols-1 draggable row-cols-md-11 g-4" id="${task.id}">
      <div class="col">
        <div class="card h-100 ${color} text-white">
       
          <div class="card-body">
          <h5 class="card-title">${dayjs(task.dueDate).format("MM/DD/YYYY")}</h5>
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text"-> ${task.description} </p>
          </div>
          button id="${task.id}" type="button" class="btn btn-danger" onclick="handleDeleteTask(event)">Delete</button>
        </div>
      </div>
    </div>
    
    `)
  }else{
    $("#done-cards").append(`
    <div class="row row-cols-1 draggable row-cols-md-11 g-4"  id="${task.id}">
      <div class="col">
        <div class="card h-100 ${color} text-white">
       
          <div class="card-body">
          <h5 class="card-title">${dayjs(task.dueDate).format("MM/DD/YYYY")}</h5>
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text"-> ${task.description} </p>
          </div>
          button id="${task.id}" type="button" class="btn btn-danger" onclick="handleDeleteTask(event)">Delete</button>
        </div>
      </div>
    </div>
    
    `)
  }
  
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    for (var i = 0; i < taskList.length; i++) {
        var today = dayjs()
        var taskDate = dayjs(taskList[i].dueDate,"DD/MM/YYYY")
        var color =""
        if(today.isAfter(taskDate)){
          color = "bg-danger"
        }else if(today.isBefore(taskDate)){
          color = "bg-success"
        }else{
          color = "bg-warning"
        }
        createTaskCard(taskList[i],color)
    }
    // make task cards draggable
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // function to clone the card being dragged so that the original card remains in place
    helper: function (e) {
      // check of the target of the drag event is the card itself or a child element if it is the card itself, clone it, otherwise find the parent card and clone that
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      return original.clone().css({
        maxWidth: original.outerWidth(),
      });
    },
  });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault()
    var task = {
        id: generateTaskId(),
        title: $("#title").val(),
        description: $("#description").val(),
        dueDate: $("#duedate").val(),
        status:"todo"
    }
    console.log(task, "TASK", taskList)
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    createTaskCard(task)
    $("#title").val(" ")
    $("#description").val(" ")
    $("#duedate").val("")
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  event.preventDefault()
  const taskId = event.target.id
  let tempTaskList = []
  console.log("delete",taskId)
  for(let i = 0; i < taskList.length; i++){
    if(taskList[i].id != taskId){
      tempTaskList.push(taskList[i])
    }
  }
  taskList = tempTaskList
  console.log(taskList)
  localStorage.setItem("tasks", JSON.stringify(taskList))
  $(`#${taskId}`).remove()
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskId = ui.draggable[0].dataset.id
  const newStatus = event.target.id
 for(let task of taskList){
   if(task.id == taskId){
     task.status = newStatus
   }
 }
  localStorage.setItem("tasks", JSON.stringify(taskList))

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $("#savetask").on("click", handleAddTask);
    renderTaskList();
});
