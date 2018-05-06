// this is mock data, but when we create our API
// we'll have it return data that looks like this
var MOCK_USER = {

    "id": "1111111",
    "username": "alvin",
    "password": "alvin12345",

	"taskList": [
        {

            "categoryTitle": "Groceries",
            "tasks": [
                {

                    "taskTitle": "stop by Ralphs",
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
                        },
                        {
                            "subtaskTitle": "buy mash potato",
                            "taskComplete": false,
                            "dateDue": "date due placeholder",
                            "timeDue": "time due placeholder",
                            "note": "look for deals"
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
                            "note": ""
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
                            "note": ""
                        },
                        {
                            "subtaskTitle": "create prototype",
                            "taskComplete": false,
                            "dateDue": "date due placeholder",
                            "timeDue": "time due placeholder",
                            "note": "assign jobs for this"
                        }
                    ]
                }
            ]
        }
};

// this function's name and argument can stay the
// same after we have a live API, but its internal
// implementation will change. Instead of using a
// timeout function that returns mock data, it will
// use jQuery's AJAX functionality to make a call
// to the server and then run the callbackFn
function getRecentStatusUpdates(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
	setTimeout(function(){ callbackFn(MOCK_USER)}, 1);
}

// this function stays the same when we connect
// to real API later
function displayStatusUpdates(data) {
    for (index in data.taskList) {
	   $('#username').append(
        
        data.username

        );
    }
}

// this function can stay the same even when we
// are connecting to real API
function getAndDisplayStatusUpdates() {
	getRecentStatusUpdates(displayStatusUpdates);
}

//  on page load do this
$(function() {
	getAndDisplayStatusUpdates();
})