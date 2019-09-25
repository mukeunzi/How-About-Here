const load = () => {
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
			const newTagElement = await response.text();

			const tagList = document.querySelector('#tagList');
			tagList.insertAdjacentHTML('beforeend', newTagElement);

			document.querySelector('#tag_name').value = '';
		}
	} catch (error) {
		console.log(error);
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
		let params = '';

		checkedTags.forEach(tag => {
			params += `_id[]=${tag.value}&`;
		});

		const response = await fetch(`/admin/tag?${params}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			const deletedTags = JSON.parse(await response.text());

			deletedTags.map(tag => {
				const tagRow = document.querySelector(`[id='${tag}']`).parentNode.parentNode;

				tagRow.querySelector('.status_code').innerHTML = '0';
				document.querySelector(`[id='${tag}']`).checked = false;
			});
		}
	} catch (error) {
		console.log(error);
	}
};

const isNotCheckedTag = () => {
	const tags = document.querySelectorAll('._id');

	const checkedTags = Array.prototype.filter.call(tags, tag => {
		return tag.checked;
	});

	if (!checkedTags.length) {
		alert('삭제할 태그를 선택하세요!');
		return false;
	}

	return checkedTags;
};

load();
