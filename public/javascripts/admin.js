const load = () => {
	window.addEventListener('load', function() {
		const regionButton = document.querySelector('#regionButton');
		const categoryButton = document.querySelector('#categoryButton');

		regionButton.addEventListener('click', function(event) {
			location.href = '/admin/region';
		});

		categoryButton.addEventListener('click', function(event) {
			location.href = '/admin/category';
		});
	});
};

load();
