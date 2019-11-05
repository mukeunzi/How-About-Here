const mapContainer = document.querySelector('.kakao-map'); // 지도를 표시할 div
const mapOption = {
	center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
	level: 3 // 지도의 확대 레벨
};

// 지도를 생성합니다
const map = new kakao.maps.Map(mapContainer, mapOption);

// 주소-좌표 변환 객체를 생성합니다
const geocoder = new kakao.maps.services.Geocoder();

// 주소로 좌표를 검색합니다
const detailAddress = document.querySelector('#detail_address').innerHTML;
geocoder.addressSearch(detailAddress, function(result, status) {
	// 정상적으로 검색이 완료됐으면
	if (status === kakao.maps.services.Status.OK) {
		const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

		// 결과값으로 받은 위치를 마커로 표시합니다
		new kakao.maps.Marker({
			map: map,
			position: coords
		});

		// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
		map.setCenter(coords);
	}
});
