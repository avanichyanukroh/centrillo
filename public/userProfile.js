//Global Variables
let CATEGORYLIST = [];
let CATEGORYMAP = {};
let USERPROFILE;
let SELECTEDCATEGORY;

let currentDateAndTime = new Date($.now());
$('#dateTimeDue')

console.log(currentDateAndTime);


function getUserProfileFromApi(displayUserProfile) {
    let username = JSON.parse(localStorage.getItem('user'));
    let user = {username: username}
    const settings = {

        url: "/users",
        type: 'POST',
        data: JSON.stringify(user),
        dataType: 'json',
        contentType: 'application/json; charset= utf-8',
        success: function(data) {

            USERPROFILE = data;
            displayUserProfile(data);
        }
    };

    $.ajax(settings);
}


function updateTaskToApi(addTask) {

  const settings = {

    url: "/users/addTask",
    type: 'PUT',
    data: JSON.stringify(addTask),
    dataType: 'json',
    contentType: 'application/json; charset= utf-8',
    success: function(data){console.log(data)}
  };

  $.ajax(settings);
}

function editTaskToApi(editTask) {

  const settings = {

    url: "/users/editTask",
    type: 'PUT',
    data: JSON.stringify(editTask),
    dataType: 'json',
    contentType: 'application/json; charset= utf-8',
    success: function(data){console.log(data)}
  };

  $.ajax(settings);
}

//initial display after logging in, should land on Today's filter first
function displayUserProfile(data) {
    
    $("#categories, #categories-m").empty();
    CATEGORYMAP = {};
    CATEGORYLIST = [];
    console.log(data);

    //navbar category filter
    data.tasks.forEach(obj => {
    console.log(obj.category);
      if (!(obj.category in CATEGORYMAP)) {
        CATEGORYMAP[obj.category] = 1;
      CATEGORYLIST.push(obj.category)
      }
      
    });

    for (let i = 0; i < CATEGORYLIST.length; i ++) {
        $("#categories, #categories-m").append(
        `

            <a class="list-group-item pl-5 bg-light border-0" id="navCategory-${i}" value="${CATEGORYLIST[i]}" href="#">
                <i class="fas fa-circle fa-xs text-info"></i>
                &nbsp;
                ${CATEGORYLIST[i]}
            </a>

        `
        );
    }

    //display username
   $("#username").append(
    `

        ${data.username}

    `
    );

    $(watchCategoryItemDisplay);
}

function watchAddTaskForm() {

  $('#addTaskForm').submit(function(event) {

  event.preventDefault();

  const taskInput = $(this).find('#taskTitle');
  const categoryInput = $(this).find('#category');
  const dateInput = $(this).find('#taskDateDue');
  const noteInput = $(this).find('#taskNote');

  const taskValue = taskInput.val();
  const categoryValue = categoryInput.val();
  const dateInputValue = dateInput.val();
  const noteInputValue = noteInput.val();

  const addTask = {
    taskTitle: taskValue,
    category: categoryValue,
    taskComplete: false,
    taskDateDue: dateInputValue,
    taskNote: noteInputValue,
    username: JSON.parse(localStorage.getItem('user'))
  };

  taskInput.val("");
  categoryInput.val("");
  dateInput.val("");
  noteInput.val("");

  console.log(dateInputValue);
  console.log(addTask);

  updateTaskToApi(addTask);

  $('#addModal').modal('hide');

  getUserProfileFromApi(displayUserProfile);

  displayCategoryAndTask(SELECTEDCATEGORY);

  });
}

function watchEditTaskForm() {

  $('.editTaskForm').submit(function(event) {

  event.preventDefault();

  let form = event.target; 
  let currentId = form.getAttribute('id');
  console.log(currentId);

  const taskInput = $(this).find('#editTaskTitle-' + currentId);
  const categoryInput = $(this).find('#editCategory-' + currentId);
  const dateInput = $(this).find('#editTaskDateDue-' + currentId);
  const noteInput = $(this).find('#editTaskNote-' + currentId);

  const taskValue = taskInput.val();
  const categoryValue = categoryInput.val();
  const dateInputValue = dateInput.val();
  const noteInputValue = noteInput.val();

  const editTask = {
    taskTitle: taskValue,
    category: categoryValue,
    taskComplete: false,
    taskDateDue: dateInputValue,
    taskNote: noteInputValue,
    _id: currentId,
    username: JSON.parse(localStorage.getItem('user'))
  };

  taskInput.val("");
  categoryInput.val("");
  dateInput.val("");
  noteInput.val("");

  console.log(editTask);

  editTaskToApi(editTask);
  $('#editTaskModal-' + currentId).modal('hide');
  $('#title-' + currentId).text(taskValue);

  getUserProfileFromApi(displayUserProfile);
  });
}

function watchTaskCompleteToggle() {

    $(".taskCompleteToggle").click(function() {

        $(this).toggleClass("fa-circle fa-check-circle");
        $(this).parent().children('span').toggleClass("strikeThrough");

    })

};



function watchCategoryItemDisplay() {
  $(".list-group-item").click(function() {
    event.preventDefault();

    let selectedCategory = $(this).attr("value");
    SELECTEDCATEGORY = selectedCategory;

    console.log(selectedCategory);

    displayCategoryAndTask(selectedCategory);

    });
            $(watchTaskCompleteToggle);
            $(watchEditTaskForm);

};

function displayCategoryAndTask(selectedCategory) {

    $('#mainContent').empty();

    $('#mainContent').append(
                `
                <div class="allTaskList m-3">
                    <h3 class="pt-2 pb-1 font-weight-bold">${selectedCategory}</h3>
                    <div id="tasks"></div>
                </div>
                `
    );

    for (let i = 0; i < USERPROFILE.tasks.length; i ++) {

        if (USERPROFILE.tasks[i].category === selectedCategory) {

            $('#tasks').append(
                `
                <ul class="list-unstyled">
                    <li>
                        <div class="m-0 p-0">
                            <span>
                            <i class="far fa-circle fa-lg pr-2 taskCompleteToggle" id="taskCompleteToggle-${i}"></i>
                            <span class="" id="title-${USERPROFILE.tasks[i]._id}">${USERPROFILE.tasks[i].taskTitle}</span>
                            </span>
                            <i class="far fa-sticky-note ml-2" type="button" data-toggle="modal" data-target="#noteModal-${i}"></i>

                            <i class="far fa-edit float-right" id="taskDropDownMenu" id="dropdownMenuButton" aria-hidden="true" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>

                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">

                                
                                <a class="dropdown-item border-bottom border-white" id="editTask" data-toggle="modal" data-target="#editTaskModal-${USERPROFILE.tasks[i]._id}" href="#">
                                    <i class="fas fa-pencil-alt"></i>
                                    &nbsp;
                                    Edit task
                                </a>

                                <a class="dropdown-item" id="createSubTask" href="#">
                                    <i class="fas fa-plus"></i>
                                    &nbsp;
                                    Create subtask
                                </a>

                                <a class="dropdown-item" id="deleteTask" href="#">
                                    <i class="fas fa-minus-circle"></i>
                                    &nbsp;
                                    Delete task
                                </a>

                            </div>

                        </div>
                       <hr>
                        <span class="d-none">
                            <span>${USERPROFILE.tasks[i].taskComplete}</span>
                            <span>${USERPROFILE.tasks[i].taskDateDue}</span>
                        </span>
                        <div id="subTasks"></div>
                    </li>
                </ul>

                <div class="modal fade" id="noteModal-${i}" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Note</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body m-2">
                                <span>${USERPROFILE.tasks[i].taskNote}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="editTaskModal-${USERPROFILE.tasks[i]._id}" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Edit task</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body m-2">
                                <form class="editTaskForm" id="${USERPROFILE.tasks[i]._id}">

                                    <div class="form-group">
                                        <input type="text" class="form-control" id="editTaskTitle-${USERPROFILE.tasks[i]._id}" name="editTaskTitle" value="${USERPROFILE.tasks[i].taskTitle}" required="required">
                                    </div>    
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="editCategory-${USERPROFILE.tasks[i]._id}" name="editTategoryName" value="${USERPROFILE.tasks[i].category}" required="required">
                                    </div>
                                    <div class="form-group">
                                        <input class="form-control" type="datetime-local" id="editTaskDateDue-${USERPROFILE.tasks[i]._id}" value="${USERPROFILE.tasks[i].taskDateDue}"  required="required">
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" id="editTaskNote-${USERPROFILE.tasks[i]._id}" name="editNote" value="${USERPROFILE.tasks[i].taskNote}">
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary formSubmit" id="editSubmit">Save task</button>
                                    </div>                          
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                `

            );



            for (let j = 0; j < USERPROFILE.tasks[i].subTasks.length; j ++) {

                $('#subTasks').append(
                    `
                        <ul class="list-unstyled">
                            <li>
                                <i class="far fa-circle pl-3"></i>
                                <span class="">${USERPROFILE.tasks[0].subTasks[j].subTaskTitle}</span>

                                <span class="d-none">
                                    <span>${USERPROFILE.tasks[0].subTasks[j].subTaskComplete}</span>
                                    <span>${USERPROFILE.tasks[0].subTasks[j].subTaskDateDue}</span>
                                    <span>${USERPROFILE.tasks[0].subTasks[j].subTaskNote}</span>
                                </span>
                            </li>
                        </ul>
                    `
            )}
        }
    }
};

/*function watchLoginButton() {

  $('#taskDropDownMenu').click(function() {

    event.preventDefault();


  });
};*/


  //on page load, if not logged in, redirect to login page.
$(function() {

    console.log(localStorage.getItem("user"));

    if (localStorage.getItem("user") === null) {
    window.location.replace("/users/login");
    }

    else {
	getUserProfileFromApi(displayUserProfile);
    };
});

$(watchAddTaskForm);
$(watchCategoryItemDisplay);


/*array.sort(function(a,b){
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return new Date(b.date) - new Date(a.date);
});*/