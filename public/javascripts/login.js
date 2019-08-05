const googleLogIn = () => {
	window.addEventListener('load', function() {
		const googleLogInButton = document.querySelector('#googleLogInButton');

		googleLogInButton.addEventListener('click', function(event) {
			location.href = '/auth/google-login';
		});
	});
};

googleLogIn();
