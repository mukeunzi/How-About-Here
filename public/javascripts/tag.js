import { errorMessage } from './utils/error-message.js';
import { isLoggedInUser, sendRequest, sendData } from './utils/fetch-api.js';

window.addEventListener('load', function() {
	const addTagButton = document.querySelector('#addTagButton');
	const deleteTagButton = document.querySelector('#deleteTagButton');

	addTagButton.addEventListener('click', function(event) {
		addTag();
	});

	deleteTagButton.addEventListener('click', function(event) {
		deleteTags();
	});
});

const makeNewTagElement = json => {
	const newTagElement = `<tr>
		<td><input type='checkbox' class='id' id=${json.newTag.id} value=${json.newTag.id}></td>
		<td>${json.newTag.tagName}</td>
		<td class='isDeleted'>N</td>
		<td>${json.userName}</td>
		<td>${moment(json.newTag.createdAt).format('YYYY-MM-DD hh:mm:ss')}</td>
		<td>${json.userName}</td>
		<td>${moment(json.newTag.updatedAt).format('YYYY-MM-DD hh:mm:ss')}</td>
	</tr>`;

	return newTagElement;
};

const addTag = async () => {
	const tagName = isNotEmptyTag();

	if (!tagName) {
		document.querySelector('#tagName').focus();
		return false;
	}

	try {
		const result = await sendData(`/admin/tag`, 'POST', { tagName });

		if (!isLoggedInUser(result.message)) {
			return alert('로그인이 필요합니다!');
		}

		const newTagElement = makeNewTagElement(result);
		const tagList = document.querySelector('#tagList');
		tagList.insertAdjacentHTML('beforeend', newTagElement);

		document.querySelector('#tagName').value = '';
	} catch (error) {
		return alert(errorMessage[error.message]);
	}
};

const isNotEmptyTag = () => {
	const tagName = document.querySelector('#tagName').value;

	if (!tagName) {
		alert('태그명을 입력하세요!');
		return false;
	}

	return tagName;
};

const deleteTags = async () => {
	const checkedTags = isNotCheckedTag();

	if (!checkedTags) {
		return false;
	}

	try {
		const result = await sendRequest(`/admin/tag?${checkedTags}`, 'DELETE');

		if (!isLoggedInUser(result.message)) {
			return alert('로그인이 필요합니다!');
		}

		result.checkedTags.map(tag => {
			const tagRow = document.querySelector(`[id='${tag}']`).parentNode.parentNode;

			tagRow.querySelector('.isDeleted').innerHTML = 'Y';
			tagRow.querySelector('.modifier').innerHTML = result.userName;
			document.querySelector(`[id='${tag}']`).checked = false;
		});
	} catch (error) {
		return alert(errorMessage[error.message]);
	}
};

const isNotCheckedTag = () => {
	const tags = document.querySelectorAll('.id:checked');

	if (!tags.length) {
		alert('삭제할 태그를 선택하세요!');
		return false;
	}

	const checkedTagList = Array.prototype.map.call(tags, tag => {
		return `id[]=${tag.value}&`;
	});
	const checkedTag = checkedTagList.join('');

	return checkedTag;
};
