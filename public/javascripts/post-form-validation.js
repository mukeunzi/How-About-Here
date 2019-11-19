const notCheckedTag = tag_list => {
	if (!tag_list) {
		return true;
	}
	return false;
};

const isEmptyTitle = place_name => {
	if (!place_name) {
		return true;
	}
	return false;
};

const notCheckedStarRating = star_rating => {
	if (!star_rating) {
		return true;
	}
	return false;
};

const isEmptyPhoto = photo_link => {
	if (!photo_link) {
		return true;
	}
	return false;
};

const isEmptyContents = post_contents => {
	if (!post_contents) {
		return true;
	}
	return false;
};

export { notCheckedTag, isEmptyTitle, notCheckedStarRating, isEmptyPhoto, isEmptyContents };
