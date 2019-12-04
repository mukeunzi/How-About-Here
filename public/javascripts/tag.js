import { errorMessage } from './utils/error-message.js';

const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';

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
		<td><input type='checkbox' class='_id' id=${json.newTag._id} value=${json.newTag._id}></td>
		<td>${json.newTag.tag_name}</td>
		<td class='status_code'>${json.newTag.status_code}</td>
		<td>${json.userName}</td>
		<td>${moment(json.newTag.create_date).format('YYYY-MM-DD hh:mm:ss')}</td>
		<td>${json.userName}</td>
		<td>${moment(json.newTag.update_date).format('YYYY-MM-DD hh:mm:ss')}</td>
	</tr>`;

	return newTagElement;
};

const addTag = async () => {
	const tag_name = isNotEmptyTag();

	if (!tag_name) {
		document.querySelector('#tag_name').focus();
		return false;
	}

	try {
		const response = await fetch(`/admin/tag`, {
			method: 'POST',
			body: JSON.stringify({ tag_name }),
			headers: { 'Content-Type': 'application/json' }
		});

		if (response.ok) {
			const result = await response.json();

			if (result.message === 'notLoggedIn') {
				return alert('로그인이 필요합니다!');
			}

			const tagList = document.querySelector('#tagList');
			const newTagElement = makeNewTagElement(result);
			tagList.insertAdjacentHTML('beforeend', newTagElement);

			document.querySelector('#tag_name').value = '';
			return;
		}

		throw new Error(INTERNAL_SERVER_ERROR);
	} catch (error) {
		return alert(errorMessage[error.message]);
	}
};

const isNotEmptyTag = () => {
	const tag_name = document.querySelector('#tag_name').value;

	if (!tag_name) {
		alert('태그명을 입력하세요!');
		return false;
	}

	return tag_name;
};

const deleteTags = async () => {
	const checkedTags = isNotCheckedTag();

	if (!checkedTags) {
		return false;
	}

	try {
		const response = await fetch(`/admin/tag?${checkedTags}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			const result = await response.json();

			if (result.message === 'notLoggedIn') {
				return alert('로그인이 필요합니다!');
			}

			result.checkedTags.map(tag => {
				const tagRow = document.querySelector(`[id='${tag}']`).parentNode.parentNode;

				tagRow.querySelector('.status_code').innerHTML = '0';
				document.querySelector(`[id='${tag}']`).checked = false;
			});
			return;
		}

		throw new Error(INTERNAL_SERVER_ERROR);
	} catch (error) {
		return alert(errorMessage[error.message]);
	}
};

const isNotCheckedTag = () => {
	const tags = document.querySelectorAll('._id:checked');

	if (!tags.length) {
		alert('삭제할 태그를 선택하세요!');
		return false;
	}

	const checkedTagList = Array.prototype.map.call(tags, tag => {
		return `_id[]=${tag.value}&`;
	});
	const checkedTag = checkedTagList.join('');

	return checkedTag;
};
