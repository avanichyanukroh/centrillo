// this is mock data, but when we create our API
// we'll have it return data that looks like this
let MOCK_USER_PROFILE = {

    "id": "1111111",
    "username": "alvin",
    "password": "alvin12345",
    "taskList": [
        {
            "categoryTitle": "Groceries",
            "tasks": [
                {

                    "taskTitle": "stop by Ralphs",
                    //add category: , then filter by category, 
                    "taskComplete": false,
                    "dateDue": "date due placeholder",
                    "timeDue": "time due placeholder",
                    "note": "on PCH",
                    "subtasks": [
                        {
                            "subtaskTitle": "buy apples",
                            "taskComplete": false,
                            "dateDue": "date due placeholder",
                            "timeDue": "time due placeholder",
                            "note": "green"
                        },
                        {
                            "subtaskTitle": "buy chicken noodle soup",
                            "taskComplete": false,
                            "dateDue": "date due placeholder",
                            "timeDue": "time due placeholder",
                            "note": "prefer Campbells"
                        }
                    ]
                },
                {
                    "taskTitle": "stop by Vons",
                    "taskComplete": false,
                    "dateDue": "date due placeholder",
                    "timeDue": "time due placeholder",
                    "note": "on the way back from work",
                    "subtasks": [
                        {
                            "subtaskTitle": "buy steak",
                            "taskComplete": false,
                            "dateDue": "date due placeholder",
                            "timeDue": "time due placeholder",
                            "note": "new york strip or ribeye"
                        }
                    ]
                }
            ]

        },
        {
            "categoryTitle": "School",
            "tasks": [
                {
                    "taskTitle": "run org meeting",
                    "taskComplete": false,
                    "dateDue": "date due placeholder",
                    "timeDue": "time due placeholder",
                    "note": "at student union center",
                    "subtasks": [
                        {
                        "subtaskTitle": "decide who runs meeting",
                        "taskComplete": false,
                        "dateDue": "date due placeholder",
                        "timeDue": "time due placeholder",
                        "note": "choose good public speakers"
                        },
                        {
                        "subtaskTitle": "plan fundraiser",
                        "taskComplete": false,
                        "dateDue": "date due placeholder",
                        "timeDue": "time due placeholder",
                        "note": "#"
                        }
                    ]
                },
                {
                    "taskTitle": "finish engineering project",
                    "taskComplete": false,
                    "dateDue": "date due placeholder",
                    "timeDue": "time due placeholder",
                    "note": "due in 2 months",
                    "subtasks": [
                        {
                            "subtaskTitle": "create initial design",
                            "taskComplete": false,
                            "dateDue": "date due placeholder",
                            "timeDue": "time due placeholder",
                            "note": "#"

                        }
                    ]
                }
            ]
        }
    ]   
};

// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn
function getUserProfile(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
	setTimeout(function(){ callbackFn(MOCK_USER_PROFILE)}, 1);
}

console.log(MOCK_USER_PROFILE);

// this function stays the same when we connect
// to real API later
function displayUserProfile(data) {

    //display username
   $("#username").append(
    `

        ${data.username}

    `
    );

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
    }
    $(".allTaskList").css("display", "none");
    $(watchCategoryItemDisplay);
}


// this function can stay the same even when we
// are connecting to real API
function getAndDisplayUserProfile() {
	getUserProfile(displayUserProfile);
}

//  on page load do this
$(function() {
	getAndDisplayUserProfile();
});