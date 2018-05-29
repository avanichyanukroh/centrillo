function postRegisterationDataToApi(user, userSignUpCallback) {

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

function postLoginDataToApi(user, userLoginCallback) {

	const settings = {

		url: "/users/login",
		type: 'POST',
		data: JSON.stringify(user),
		dataType: 'json',
		contentType: 'application/json; charset= utf-8',
		success: userLoginCallback
	};

	$.ajax(settings);
}

function watchSignUpFormSubmit() {

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

	postRegisterationDataToApi(user, userSignUpCallback);

	});
}

function watchLoginFormSubmit() {

	$('#loginForm').submit(function(event) {

	event.preventDefault();

	const usernameInput = $(this).find('#loginUsername');
	const passwordInput = $(this).find('#loginPassword');

	const usernameValue = usernameInput.val();
	const passwordValue = passwordInput.val();
	const user = {username: usernameValue, password: passwordValue};

	usernameInput.val("");
	passwordInput.val("");

	postLoginDataToApi(user, userLoginCallback);

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
	$(watchChangeToLoginForm2);
}

function userLoginCallback(data) {

	localStorage.setItem('user', JSON.stringify(data.user.username));
	let user = JSON.parse(localStorage.getItem('user'));
	window.location.replace("/");
	//need callback for error/failed post
	$('#signUpForm').addClass("d-none");
	$('#signUpUserFeedback').html(

		`
			<p>You are now logging in...<p>
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

	    $('#loginForm').removeClass("d-none");
	    $('#signUpUserFeedback').empty();
    });
}

$(watchSignUpFormSubmit);
$(watchLoginFormSubmit);
$(watchChangeToLoginForm);
$(watchChangeToSignUpForm);
$(watchChangeToLoginForm2);