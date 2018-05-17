function postDataToApi(user, userSignUpCallback) {

	const settings = {

		url: "/users/register",
		type: 'POST',
		data: JSON.stringify(user),
		dataType: 'json',
		contentType: 'application/json; charset= utf-8',
		success: userSignUpCallback
	};

	$.ajax(settings);
}

function watchSignUpSubmit() {

	$('#signUpForm').submit(function(event) {

	event.preventDefault();

	const usernameInput = $(this).find('#registerUsername');
	const passwordInput = $(this).find('#registerPassword');
	const confirmPasswordInput = $(this).find('#confirmRegisterPassword');

	const usernameValue = usernameInput.val();
	const passwordValue = passwordInput.val();
	const confirmPassword = confirmPasswordInput.val();
	const user = {username: usernameValue, password: passwordValue};

	usernameInput.val("");
	passwordInput.val("");
	confirmPasswordInput.val("");

	postDataToApi(user, userSignUpCallback);

	});
}

function userSignUpCallback(data) {

	console.log(data);
	//need callback for error/failed post
	$('#signUpForm').addClass("d-none");
	$('#signUpUserFeedback').html(

		`
			<p>Thank you for signing up with Circle.it! Please continue to the <a class="text-info" id="changeToLoginForm2" href="#">login page</a>.<p>
		`
		);
}

function watchChangeToSignUpForm() {

    $('#changeToSignUpForm').click(function() {

    	event.preventDefault();

	    $('#loginForm').addClass("d-none");
	    $('#signUpForm').removeClass("d-none");
    });
}

function watchChangeToLoginForm() {

    $('#changeToLoginForm').click(function() {

    	event.preventDefault();

	    $('#signUpForm').addClass("d-none");
	    $('#loginForm').removeClass("d-none");
	    $('signUpUserFeedback').empty();
    });
}

function watchChangeToLoginForm2() {

    $('#changeToLoginForm2').click(function() {

    	event.preventDefault();

	    $('#signUpForm').addClass("d-none");
	    $('#loginForm').removeClass("d-none");
	    $('signUpUserFeedback').empty();
    });
}

$(watchSignUpSubmit);
$(watchChangeToLoginForm);
$(watchChangeToSignUpForm);
$(watchChangeToLoginForm2);