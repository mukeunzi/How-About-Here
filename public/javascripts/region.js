const load = () => {
	window.addEventListener('load', function() {
		const addRegionButton = document.querySelector('#addRegionButton');
		const deleteRegionButton = document.querySelector('#deleteRegionButton');

		addRegionButton.addEventListener('click', function(event) {
			addRegion();
		});

		deleteRegionButton.addEventListener('click', function(event) {
			deleteRegions();
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

const deleteRegions = async () => {
	const checkedRegions = isNotCheckedRegion();

	if (!checkedRegions) {
		return false;
	}

	try {
		let params = '';

		checkedRegions.forEach(region => {
			params += `_id[]=${region.value}&`;
		});

		const response = await fetch(`/admin/region?${params}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			const deletedRegions = JSON.parse(await response.text());

			deletedRegions.map(region => {
				const regionRow = document.querySelector(`[id='${region}']`).parentNode.parentNode;

				regionRow.querySelector('.status_code').innerHTML = '0';
				document.querySelector(`[id='${region}']`).checked = false;
			});
		}
	} catch (error) {
		console.log(error);
	}
};

const isNotCheckedRegion = () => {
	const regions = document.querySelectorAll('._id');

	const checkedRegions = Array.prototype.filter.call(regions, region => {
		return region.checked;
	});

	if (!checkedRegions.length) {
		alert('삭제할 지역을 선택하세요!');
		return false;
	}

	return checkedRegions;
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
