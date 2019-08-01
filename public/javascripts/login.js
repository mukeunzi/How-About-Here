const googleLogin = () => {
	window.addEventListener('load', function() {
		const googleLoginButton = document.querySelector('#googleLoginButton');

		googleLoginButton.addEventListener('click', function(event) {
			location.href = '/auth/google-login';
		});
	});
};

googleLogin();
