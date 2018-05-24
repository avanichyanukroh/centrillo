function getUserProfileFromApi(displayUserProfile) {

    const settings = {

        url: "/users",
        type: 'GET',
        success: displayUserProfile
    };

    $.ajax(settings);
}


// this function stays the same when we connect
// to real API later
function displayUserProfile(data) {
    console.log(data);
    //display username
   $("#username").append(
    `

        ${data.users[0].username}

    `
    );
/*
   //display Categories item list
    for (let i = 0; i < data.taskList.length; i ++) {
        $("#categories, #categories-m").append(
        `

            <a class="list-group-item pl-5 bg-light border-0" id="taskList-${i}" href="#">
                <i class="fas fa-circle fa-xs text-info"></i>
                &nbsp;
                ${data.taskList[i].categoryTitle}
            </a>

        `
        );

        //displays category title
        $("#mainContent").append(
        `

            <div class="allTaskList taskList-${i}">
                <h3>${data.taskList[i].categoryTitle}</h3>

                    <ul class="tasks-${i} list-unstyled"></ul>

            </div>

        `
        );        

        //display task information
        for (let j = 0; j < data.taskList[i].tasks.length; j ++) {
            $(`.tasks-${i}`).append(
            `
                <li>
                    <div class="border-bottom">
                        <i class="far fa-circle"></i>
                        <span>${data.taskList[i].tasks[j].taskTitle}</span>
                    </div>
                   
                    <span class="d-none">
                        <span>${data.taskList[i].tasks[j].taskComplete}</span>
                        <span>${data.taskList[i].tasks[j].dateDue}</span>
                        <span>${data.taskList[i].tasks[j].timeDue}</span>
                        <span>${data.taskList[i].tasks[j].note}</span>
                    </span>

                    <ul class="subtasks-${j} list-unstyled"></ul>
                </li>

            `
            );

            for (let k = 0; k < data.taskList[i].tasks[j].subtasks.length; k ++) {
                $(`.subtasks-${j}`).append(
                `
                    <li>


                        <i class="far fa-circle pl-3"></i>
                        <span class="">${data.taskList[i].tasks[j].subtasks[k].subtaskTitle}</span>

                        <span class="d-none">
                            <span>${data.taskList[i].tasks[j].subtasks[k].taskComplete}</span>
                            <span>${data.taskList[i].tasks[j].subtasks[k].dateDue}</span>
                            <span>${data.taskList[i].tasks[j].subtasks[k].timeDue}</span>
                            <span>${data.taskList[i].tasks[j].subtasks[k].note}</span>
                        </span>
                    </li>

                `
                );

            }
        }
    }*/
    $(".allTaskList").css("display", "none");
    $(watchCategoryItemDisplay);
}

//  on page load do this
$(function() {
	getUserProfileFromApi(displayUserProfile);
});