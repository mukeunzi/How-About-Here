const loadPost = () => {
	window.addEventListener('load', function() {
		const regionName = document.querySelector('#region_name');
		const tagList = document.querySelectorAll('.tag_list');

		regionName.addEventListener('change', () => {
			detectSearchEvent();
		});

		tagList.forEach(tag => {
			tag.addEventListener('click', () => {
				detectSearchEvent();
			});
		});
	});
};

const detectSearchEvent = () => {
	const regionName = document.querySelector('#region_name').value;
	const tagList = document.querySelectorAll('.tag_list:checked');

	if (regionName.length || tagList.length) {
		searchRegionAndTag(regionName, tagList);
	} else {
		redirectIndexPage();
	}
};

const searchRegionAndTag = async (regionName, tagList) => {
	const checkedTagList = Array.prototype.map.call(tagList, tag => {
		return `&tag_list[]=${tag.value}`;
	});
	const searchTagCondition = checkedTagList.join('');

	try {
		const response = await fetch(`/search?region_name=${regionName}${searchTagCondition}`);
		const searchResultJSON = await response.json();
		const searchResultElement = makeSearchResult(searchResultJSON);

		const postList = document.querySelector('.postList');
		postList.innerHTML = searchResultElement;
	} catch (error) {
		console.log(error);
	}
};

const makeSearchResult = searchResultJSON => {
	let searchResultElement = '<ul>';

	searchResultJSON.forEach(json => {
		searchResultElement += `<li>
															<a href=/post/${json._id}><img src=/images/example.jpg></a>
															<div>지역 : ${json.region_name.region_name}</div>`;

		if (json.tag_list.length) {
			searchResultElement += `<span>태그 : </span>`;

			json.tag_list.forEach(tag => {
				searchResultElement += `<span>${tag.tag_name}</span>`;
			});
		}
		searchResultElement += `</li>`;
	});

	return searchResultElement;
};

const redirectIndexPage = () => {
	return (location.href = '/');
};

loadPost();
