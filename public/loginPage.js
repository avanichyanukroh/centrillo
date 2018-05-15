function watchSubmit() {
	$('#signUpForm').submit(function(event) {
	event.preventDefault();

	const usernameInput = $(this).find('#username');
	const passwordInput = $(this).find('#password');
	const confirmPasswordInput = $(this).find('#confirmPassword');

	const username = usernameInput.val();
	const password = passwordInput.val();
	const confirmPassword = confirmPasswordInput.val();

	const settings = {

		url: "localhost:8080/user-login",
		type: 'POST',
		dataType: 'json',
		success: function(data) {
			console.log(data);
		}
	};

	$.ajax(settings);

	});

console.log(username);
}

$(watchSubmit);