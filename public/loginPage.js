function postDataToApi(user, userSignUpCallback) {

	const settings = {

		url: "/user-login",
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

	const usernameInput = $(this).find('#username');
	const passwordInput = $(this).find('#password');
	const confirmPasswordInput = $(this).find('#confirmPassword');

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
	$('#signUpForm').empty();
	$('#signUpForm').html(

		`
			<p>Thank you for signing up with Circle.it! Please continue to the <a class="text-info" href="#">login page</a>.<p>
		`
		);


}

$(watchSignUpSubmit);