//Global Variables
let CATEGORYLIST = [];
let CATEGORYMAP = {};
let USERPROFILE;
let SELECTEDCATEGORY;
let CURRENTDATEANDTIME;
let CURRENTDATE;


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
            console.log(data);
            $('#mainContent').empty();
            $('.modal').modal('hide');

            createDateAndTime();

            USERPROFILE = data;
            displayUserProfile(data);
            if(SELECTEDCATEGORY) {
            displayCategoryAndTask(SELECTEDCATEGORY);
            };
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
    success: function(data) {

      getUserProfileFromApi(displayUserProfile);
    }
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
    success: function(data) {

      getUserProfileFromApi(displayUserProfile);
    }
  };

  $.ajax(settings);
}

function deleteTaskToApi(deleteTask) {

  const settings = {

    url: "/users/deleteTask",
    type: 'DELETE',
    data: JSON.stringify(deleteTask),
    dataType: 'json',
    contentType: 'application/json; charset= utf-8',
    success: function(data) {

      getUserProfileFromApi(displayUserProfile);
    }
  };

  $.ajax(settings);
}

function editTaskToggleToApi(editTask) {

  const settings = {

    url: "/users/editTaskToggle",
    type: 'PUT',
    data: JSON.stringify(editTask),
    dataType: 'json',
    contentType: 'application/json; charset= utf-8',
    success: function(data) {

      getUserProfileFromApi(displayUserProfile);
    }
  };

  $.ajax(settings);
}

function createDateAndTime() {

  //defaults date and time to current date and time and sets to min as well
  let createCurrentDateAndTime = new Date();
  let currentDate = createCurrentDateAndTime.toISOString().slice(0, 10);
  let currentTime = createCurrentDateAndTime.toISOString().slice(10, 16);
  let currentDateAndTime = currentDate + currentTime;

  currentDay = parseInt(currentDate.slice(8, 10));

  next7Days = [];
  
  for (i = 0; i < 7; i ++) {

    let nextDay = currentDay + i;

    if (nextDay < 10 ) {

      next7Days.push(currentDate.slice(0, 8) + "0" + nextDay.toString());
    }
    else {
      next7Days.push(currentDate.slice(0, 8) + nextDay.toString());
    }
  }

  console.log(next7Days);
  CURRENTDATE = currentDate;
  CURRENTDATEANDTIME = currentDateAndTime;

  $('#taskDateDue').attr("min",currentDateAndTime);
  $('#taskDateDue').attr("value",currentDateAndTime);

};

//initial display after logging in, should land on Today's filter first
function displayUserProfile(data) {
    
  $("#categories, #categories-m").empty();
  CATEGORYMAP = {};
  CATEGORYLIST = [];

  //navbar category filter
  data.tasks.forEach(obj => {

    if (!(obj.category in CATEGORYMAP)) {

      CATEGORYMAP[obj.category] = 1;

      CATEGORYLIST.push(obj.category);
    };
  });

$('#today, #today-m').empty();
  $('#today, #today-m').append(
    `
    <a class="list-group-item pl-4 border-0 bg-light" href="#" value="Today">
      <i class="far fa-calendar fa-lg"></i>
      &nbsp;
      Today
      &nbsp;
      <span class="badge badge-info badge-pill"><span class="todayCount"></span></span>
    </a>
    `

    );

  $('.todayCount').text(`${USERPROFILE.tasks.length}`);

  $('#7Days, #7Days-m').empty();
  $('#7Days, #7Days-m').append(
    `
    <a class="list-group-item pl-4 border-0 bg-light" href="#" value="Next 7 days">
      <i class="far fa-calendar-alt fa-lg"></i>
      &nbsp;
      Next 7 days
      &nbsp;
      <span class="badge badge-info badge-pill"><span class="7DayCount"></span></span>
    </a>
    `

    );

  $('.7DayCount').text(`${USERPROFILE.tasks.length}`);



  $('#overview, #overview-m').empty();
  $('#overview, #overview-m').append(
    `
    <a class="list-group-item pl-4 border-0 bg-light" href="#" value="Overview">
      <i class="far fa-clipboard fa-lg"></i>
      &nbsp;
      Overview
      &nbsp;
      <span class="badge badge-info badge-pill"><span class="overviewCount"></span></span>
    </a>
    `

    );

  $('.overviewCount').text(`${USERPROFILE.tasks.length}`);

  for (let i = 0; i < CATEGORYLIST.length; i ++) {

      $('#categories, #categories-m').append(
      `

          <a class="list-group-item pl-5 bg-light border-0" id="navCategory-${i}" value="${CATEGORYLIST[i]}" href="#">
              <i class="fas fa-circle fa-xs text-info"></i>
              &nbsp;
              ${CATEGORYLIST[i]}
          </a>

      `
      );
  }

  $('#addTaskModal').html(
        `
        <div class="modal" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addModalLabel">Add task</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form class="" id="addTaskForm" role="form">

                  <div class="form-group">
                          <input type="text" class="form-control" id="taskTitle" name="taskTitle" placeholder="Task" required="required">
                      </div>    
                      <div class="form-group">
                        <input type="text" class="form-control" id="category" name="categoryName" placeholder="Category" required="required">
                      </div>
                      <div class="form-group">
                          <input class="form-control" type="datetime-local" id="taskDateDue" value="${CURRENTDATEANDTIME}" required="required">
                      </div>
                      <div class="form-group">
                          <input type="text" class="form-control" id="taskNote" name="note" placeholder="Note">
                      </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary formSubmit" id="addSubmit">Add task</button>
                  </div>                  
                  </form>
              </div>
            </div>
          </div>
        </div>
        `
  );
  $(watchAddTaskForm);
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

  $('#addModal').modal('hide');

  updateTaskToApi(addTask);
  });
}

function watchEditTaskForm() {

  $('.editTaskForm').submit(function(event) {

  event.preventDefault();

  let form = event.target; 
  let currentId = form.getAttribute('id');

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

  $('#editTaskModal-' + currentId).modal('hide');

  editTaskToApi(editTask);

  $('#title-' + currentId).text(taskValue);


  });
}

function watchDeleteTaskForm() {

  $('.deleteTaskForm').submit(function(event) {

  event.preventDefault();

  let form = event.target; 
  let currentId = form.getAttribute('id');
  let idArray = currentId.split("-");
  let taskId = idArray[1];


  const deleteTask = {
    _id: taskId,
    username: JSON.parse(localStorage.getItem('user'))
  };

  $('#deleteTaskModal-' + taskId).modal('hide');

  deleteTaskToApi(deleteTask);
  });
}

function watchTaskCompleteToggle() {

    $('.taskCompleteToggle').click(function() {

        $(this).toggleClass("fa-circle fa-check-circle");
        $(this).parent().children('span').toggleClass("strikeThrough");

        let currentId = $(this).attr('id');
        let idArray = currentId.split("-");
        let taskId = idArray[1];

        const editTask = {
          _id: taskId,
          username: JSON.parse(localStorage.getItem('user'))
        };
        console.log(editTask);
        editTaskToggleToApi(editTask);
    });
};



function watchCategoryItemDisplay() {
  $(".list-group-item").click(function() {
    event.preventDefault();

    let selectedCategory = $(this).attr("value");
    SELECTEDCATEGORY = selectedCategory;

    if (!(selectedCategory === undefined)) {
      $('#mainContent').empty();
      displayCategoryAndTask(selectedCategory);
    }

  });
};

function displayCategoryAndTask(selectedCategory) {

  USERPROFILE.tasks.sort(function(a,b) {
    
    return new Date(a.taskDateDue) - new Date(b.taskDateDue);
  });
  

  $('#mainContent').append(
    `
    <div class="allTaskList m-3">
        <h3 class="pt-2 pb-1 font-weight-bold">${selectedCategory}</h3>
        <div id="tasks"></div>
    </div>
    `
  );

  if (selectedCategory === "Today")  {

    for (let i = 0; i < USERPROFILE.tasks.length; i ++) {

      if (CURRENTDATE == USERPROFILE.tasks[i].taskDateDue.slice(0, 10)) {

        displaySelectedCategory(i);

      };
    }
  }

  if (selectedCategory === "Next 7 days")  {

    for (let i = 0; i < USERPROFILE.tasks.length; i ++) {

      if (CURRENTDATE == USERPROFILE.tasks[i].taskDateDue.slice(0, 10)) {

        displaySelectedCategory(i);

      };
    }
  }

  if (selectedCategory === "Overview") {

    for (let i = 0; i < USERPROFILE.tasks.length; i ++) {

      displaySelectedCategory(i);
    }
  };

  if (!(selectedCategory === "Overview" || "Today" || "Next 7 days")) {

    for (let i = 0; i < USERPROFILE.tasks.length; i ++) {

      if (USERPROFILE.tasks[i].category === selectedCategory) {

        displaySelectedCategory(i);
      };
    }
  }
  $(watchEditTaskForm);
  $(watchDeleteTaskForm);
  $(watchTaskCompleteToggle);
};

function displaySelectedCategory(i) {


  let newDate = new Date(USERPROFILE.tasks[i].taskDateDue);

  let dateTimeArray = newDate.toLocaleString().split(",");

  let date = dateTimeArray[0] + ", ";
  let time = dateTimeArray[1].slice(0,5) + dateTimeArray[1].slice(8,12);

  let taskHTML =  `
        <ul class="list-unstyled">
            <li>
                <div class="m-0 p-0">
                    <span>`;
  if (USERPROFILE.tasks[i].taskComplete) {

    taskHTML +=  `
                <i class="far fa-lg pr-2 taskCompleteToggle fa-check-circle" id="toggle-${USERPROFILE.tasks[i]._id}"></i>
                <span class="taskTitle strikeThrough" id="title-${USERPROFILE.tasks[i]._id}">${USERPROFILE.tasks[i].taskTitle}</span>
                </span>
                `;
  }
  else {

    taskHTML += `
                <i class="far fa-circle fa-lg pr-2 taskCompleteToggle" id="toggle-${USERPROFILE.tasks[i]._id}"></i>
                <span class="taskTitle" id="title-${USERPROFILE.tasks[i]._id}">${USERPROFILE.tasks[i].taskTitle}</span>
                </span>
                `;
  }

  $('#tasks').append(
    taskHTML += 
                  `
                  <i class="far fa-sticky-note ml-2" type="button" data-toggle="modal" data-target="#noteModal-${i}"></i>

                  <i class="far fa-edit float-right" id="taskDropDownMenu" id="dropdownMenuButton" aria-hidden="true" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>

                  <span class="pr-2 font-weight-light float-right newDateFontSize">${date + time}</span>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">

                      
                      <a class="dropdown-item border-bottom border-white" data-toggle="modal" data-target="#editTaskModal-${USERPROFILE.tasks[i]._id}" href="#">
                          <i class="fas fa-pencil-alt"></i>
                          &nbsp;
                          Edit task
                      </a>

                      <a class="dropdown-item d-none" id="createSubTask" href="#">
                          <i class="fas fa-plus"></i>
                          &nbsp;
                          Create subtask
                      </a>

                      <a class="dropdown-item" id="deleteTask" data-toggle="modal" data-target="#deleteTaskModal-${USERPROFILE.tasks[i]._id}" href="#">
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

      <div class="modal" id="noteModal-${i}" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
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

      <div class="modal" id="editTaskModal-${USERPROFILE.tasks[i]._id}" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
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

      <div class="modal" id="deleteTaskModal-${USERPROFILE.tasks[i]._id}" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body m-2">
                      <form class="deleteTaskForm" id="delete-${USERPROFILE.tasks[i]._id}">
                      <i class="fas fa-exclamation-triangle fa-2x pr-2"></i>
                      <span class="modal-title h5">Are you sure you want to delete "${USERPROFILE.tasks[i].taskTitle}"</span>
                          <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              <button type="submit" class="btn btn-primary formSubmit" id="deleteSubmit">Delete</button>
                          </div>                          
                      </form>
                  </div>
              </div>
          </div>
      </div>

      `
  );
};

  //on page load, if not logged in, redirect to login page.
$(function() {

    if (localStorage.getItem("user") === null) {
    window.location.replace("/users/login");
    }

    else {

      //display username in cog dropdown menu

      let usernameDisplay = localStorage.getItem('user');
      let usernameDisplayEsc = usernameDisplay.replace(/"/g,"");
      $("#username").append(
        `

        ${usernameDisplayEsc}

        `
  );
      getUserProfileFromApi(displayUserProfile);
    };
});

$(watchCategoryItemDisplay);
