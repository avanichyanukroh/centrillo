function getDataFromApi(user) {

	const settings = {

		url: "/user-login",
		type: 'POST',
		data: JSON.stringify(user),
		dataType: 'json',
		contentType: 'application/json; charset= utf-8',
		success: function(data) {
			console.log(data);
		}
	};

	$.ajax(settings);
}

function watchSubmit() {
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

	getDataFromApi(user);

	});
}

$(watchSubmit);