window.addEventListener('load', function() {
	const regionName = document.querySelectorAll('.region_name');
	const tagList = document.querySelectorAll('.tag_list');

	regionName.forEach(region => {
		region.addEventListener('change', function() {
			detectSearchEvent();
		});
	});

	tagList.forEach(tag => {
		tag.addEventListener('click', function() {
			detectSearchEvent();
		});
	});
});

const detectSearchEvent = () => {
	const regionName = document.querySelectorAll('.region_name:checked')[0].value;
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

		const cards = document.querySelector('.ui.cards');
		cards.innerHTML = searchResultElement;
	} catch (error) {
		console.log(error);
	}
};

const makeSearchResult = searchResultJSON => {
	let searchResultElement = '';

	searchResultJSON.forEach(json => {
		searchResultElement += `<div class='card'>
															<a href='/post/${json._id}'>
																<div class='image'>
																	<img src='${json.photo_link}' width='300'>
																</div>
  														</a>
															<div class='content'>
																<a class='header' href='/post/${json._id}'>${json.place_name}</a>
																<div class='meta'>
																	<a href='/post/${json._id}'>
																		<i class='map outline icon'></i> ${json.region_name.region_name}
																	</a>
																</div>
																<div class='description'>`;

		json.tag_list.forEach(tag => {
			searchResultElement += `		<a href='/post/${json._id}'>#${tag.tag_name}</a>`;
		});

		searchResultElement += `		</div>
															</div>
															<div class='extra content'>
																<span class='right floated'>
																	<i class='heart outline like icon'></i>      17 likes
																</span>
																<i class='comment icon'></i>    3 comments
															</div>
														</div>`;
	});

	return searchResultElement;
};

const redirectIndexPage = () => {
	return (location.href = '/');
};
