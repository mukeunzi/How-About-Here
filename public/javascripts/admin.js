window.addEventListener('load', function() {
	const regionButton = document.querySelector('#regionButton');
	const tagButton = document.querySelector('#tagButton');

	regionButton.addEventListener('click', function(event) {
		location.href = '/admin/region';
	});

	tagButton.addEventListener('click', function(event) {
		location.href = '/admin/tag';
	});
});
