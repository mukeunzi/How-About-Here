const load = () => {
	window.addEventListener('load', function() {
		const addTagButton = document.querySelector('#addTagButton');

		addTagButton.addEventListener('click', function(event) {
			addTag();
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

load();
