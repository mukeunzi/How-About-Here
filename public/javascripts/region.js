const load = () => {
	window.addEventListener('load', function() {
		const addRegionButton = document.querySelector('#addRegionButton');

		addRegionButton.addEventListener('click', function(event) {
			addRegion();
		});
	});
};

const addRegion = () => {};

load();
