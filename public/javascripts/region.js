const load = () => {
	window.addEventListener('load', function() {
		const addRegionButton = document.querySelector('#addRegionButton');

		addRegionButton.addEventListener('click', function(event) {
			addRegion();
		});
	});
};

const addRegion = async () => {
	const region_name = isNotEmptyRegion();

	if (!region_name) {
		document.querySelector('#region_name').focus();
		return false;
	}

	try {
		const response = await fetch(`/admin/region`, {
			method: 'POST',
			body: JSON.stringify({ region_name }),
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.ok) {
			const newRegionElement = await response.text();

			const regionList = document.querySelector('#regionList');
			regionList.insertAdjacentHTML('beforeend', newRegionElement);

			document.querySelector('#region_name').value = '';
		}
	} catch (error) {
		console.log(error);
	}
};

const isNotEmptyRegion = () => {
	const region_name = document.querySelector('#region_name').value;

	if (!region_name) {
		alert('지역명을 입력하세요!');
		return false;
	}

	return region_name;
};

load();
