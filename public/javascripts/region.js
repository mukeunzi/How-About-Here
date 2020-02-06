import { errorMessage } from './utils/error-message.js';
import { isLoggedInUser, sendRequest, sendData } from './utils/fetch-api.js';

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
		<td><input type='checkbox' class='id' id=${json.newRegion.id} value=${json.newRegion.id}></td>
		<td>${json.newRegion.regionName}</td>
		<td class='isDeleted'>N</td>
		<td>${json.userName}</td>
		<td>${moment(json.newRegion.createdAt).format('YYYY-MM-DD hh:mm:ss')}</td>
		<td class='modifier'>${json.userName}</td>
		<td>${moment(json.newRegion.updatedAt).format('YYYY-MM-DD hh:mm:ss')}</td>
		</tr>`;

	return newRegionElement;
};

const addRegion = async () => {
	const regionName = isNotEmptyRegion();

	if (!regionName) {
		document.querySelector('#regionName').focus();
		return false;
	}

	try {
		const result = await sendData(`/admin/region`, 'POST', { regionName });

		if (!isLoggedInUser(result.message)) {
			return alert('로그인이 필요합니다!');
		}

		const newRegionElement = makeNewRegionElement(result);
		const regionList = document.querySelector('#regionList');
		regionList.insertAdjacentHTML('beforeend', newRegionElement);

		document.querySelector('#regionName').value = '';
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
		const result = await sendRequest(`/admin/region?${checkedRegions}`, 'DELETE');

		if (!isLoggedInUser(result.message)) {
			return alert('로그인이 필요합니다!');
		}

		result.checkedRegions.map(region => {
			const regionRow = document.querySelector(`[id='${region}']`).parentNode.parentNode;

			regionRow.querySelector('.isDeleted').innerHTML = 'Y';
			regionRow.querySelector('.modifier').innerHTML = result.userName;
			document.querySelector(`[id='${region}']`).checked = false;
		});
	} catch (error) {
		return alert(errorMessage[error.message]);
	}
};

const isNotCheckedRegion = () => {
	const regions = document.querySelectorAll('.id:checked');

	if (!regions.length) {
		alert('삭제할 지역을 선택하세요!');
		return false;
	}

	const checkedRegionList = Array.prototype.map.call(regions, region => {
		return `id[]=${region.value}&`;
	});
	const checkedRegion = checkedRegionList.join('');

	return checkedRegion;
};

const isNotEmptyRegion = () => {
	const regionName = document.querySelector('#regionName').value;

	if (!regionName) {
		alert('지역명을 입력하세요!');
		return false;
	}

	return regionName;
};
