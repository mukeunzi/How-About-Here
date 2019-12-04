import { errorMessage } from './utils/error-message.js';

const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';

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

const makeNewRegionElement = json => {
	const newRegionElement = `<tr>
		<td><input type='checkbox' class='_id' id=${json.newRegion._id} value=${json.newRegion._id}></td>
		<td>${json.newRegion.region_name}</td>
		<td class='status_code'>${json.newRegion.status_code}</td>
		<td>${json.userName}</td>
		<td>${moment(json.newRegion.create_date).format('YYYY-MM-DD hh:mm:ss')}</td>
		<td>${json.userName}</td>
		<td>${moment(json.newRegion.update_date).format('YYYY-MM-DD hh:mm:ss')}</td>
		</tr>`;

	return newRegionElement;
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
			const result = await response.json();

			if (result.message === 'notLoggedIn') {
				return alert('로그인이 필요합니다!');
			}

			const regionList = document.querySelector('#regionList');
			const newRegionElement = makeNewRegionElement(result);
			regionList.insertAdjacentHTML('beforeend', newRegionElement);

			document.querySelector('#region_name').value = '';
			return;
		}

		throw new Error(INTERNAL_SERVER_ERROR);
	} catch (error) {
		return alert(errorMessage[error.message]);
	}
};

const deleteRegions = async () => {
	const checkedRegions = isNotCheckedRegion();

	if (!checkedRegions) {
		return false;
	}

	try {
		const response = await fetch(`/admin/region?${checkedRegions}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			const result = await response.json();

			if (result.message === 'notLoggedIn') {
				return alert('로그인이 필요합니다!');
			}

			result.checkedRegions.map(region => {
				const regionRow = document.querySelector(`[id='${region}']`).parentNode.parentNode;

				regionRow.querySelector('.status_code').innerHTML = '0';
				document.querySelector(`[id='${region}']`).checked = false;
			});
			return;
		}

		throw new Error(INTERNAL_SERVER_ERROR);
	} catch (error) {
		return alert(errorMessage[error.message]);
	}
};

const isNotCheckedRegion = () => {
	const regions = document.querySelectorAll('._id:checked');

	if (!regions.length) {
		alert('삭제할 지역을 선택하세요!');
		return false;
	}

	const checkedRegionList = Array.prototype.map.call(regions, region => {
		return `_id[]=${region.value}&`;
	});
	const checkedRegion = checkedRegionList.join('');

	return checkedRegion;
};

const isNotEmptyRegion = () => {
	const region_name = document.querySelector('#region_name').value;

	if (!region_name) {
		alert('지역명을 입력하세요!');
		return false;
	}

	return region_name;
};
