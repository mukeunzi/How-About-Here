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

		const postList = document.querySelector('#postList');
		postList.innerHTML = searchResultElement;
	} catch (error) {
		console.log(error);
	}
};

const makeSearchResult = searchResultJSON => {
	let searchResultElement = '';

	searchResultJSON.forEach(json => {
		searchResultElement += `<div style='background-color:#e9e9e9; width:500px; height:100px; margin-bottom:10px;'>
															<div><a href=/post/${json._id}>${json.business_name}</a></div>
														<div>지역 : ${json.region_name.region_name}</div>`;

		if (json.tag_list.length) {
			searchResultElement += `<span>태그 : </span>`;

			json.tag_list.forEach(tag => {
				searchResultElement += `<span>${tag.tag_name}</span>`;
			});
		}
		searchResultElement += `<div>작성자 : ${json.create_id.user_name}</div>
														<div>작성일 : ${json.create_date}</div>`;
	});

	return searchResultElement;
};

const redirectIndexPage = () => {
	return (location.href = '/');
};

loadPost();
