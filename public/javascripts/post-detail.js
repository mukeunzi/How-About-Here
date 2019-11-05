window.addEventListener('load', function() {
	$('.ui.rating').rating('disable');

	const modal = document.querySelector('#modal');

	modal.addEventListener('click', function() {
		$('.ui.basic.modal').modal('show');
	});
});
