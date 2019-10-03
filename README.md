# :eyes: 여기어땠!

> Node.js 의 Express 프레임워크, pug, mongoDB/mongoose 를 이용해 구현하는 여기어땠(다)!

## :memo: Description

여기어땠은 **데이트 장소 후기를 공유할 수 있는 서비스**입니다.

:one: 연인과의 데이트 장소를 고민하는 사람들  
:two: 반복되는 데이트 코스에 변화를 필요로하는 사람들

을 위해 만들어졌으며, 만족했던 데이트 장소를 공유함으로서 데이트 장소에 대한 후기와 다양한 정보를 얻을 수 있는 서비스입니다.  
사용자는 연인과의 데이트 장소 후기를 남길 수 있고, 이를 통해 사용자들은 지역별/해시태그 별로 데이트 장소를 공유할 수 있습니다.

## :gear: Function

**계정**

- 계정 관한은 관리자, 사용자가 있습니다.
- 계정은 ID/PASSWORD 와 OAuth 방식을 사용합니다.

**카테고리**

- 관리자만이 지역, 태그 목록을 관리할 수 있습니다.

**게시물**

- 모든 사용자는 게시물을 읽을 수 있고, 로그인 한 사용자는 게시물 업로드 및 댓글을 달 수 있습니다.

**댓글**

- 댓글은 1depth 만 허용합니다.
- 로그인 한 사용자는 댓글을 작성할 수 있습니다.

## :page_with_curl: Page

**계정**

- 로그인 : `GET /auth`
- 회원가입 : `GET /users`

**태그(관리자)**

- 태그 등록 : `GET /admin/tag`
- 태그 목록 : `GET /admin/tag/list`

**게시물**

- 게시물 목록 : `GET /post/list`
- 게시물 상세 : `GET /post/:post_id`

## :page_facing_up: API

**계정**

- 로그인 요청 : `POST /auth`
- 로그아웃 : `DELETE /users`
- 회원가입 요청 : `POST /users`

**태그(관리자)**

- 태그 등록 : `POST /admin/tag`
- 태그 수정 : `PATCH /admin/tag`
- 태그 삭제 : `DELETE /admin/tag`

**게시물**

- 게시물 등록 : `POST /post`
- 게시물 수정 : `PATCH /post`
- 게시물 삭제 : `DELETE /post`

**댓글**

- 댓글 등록 : `POST /comment`
- 댓글 수정 : `PATCH /comment`
- 댓글 삭제 : `DELETE /comment`

**검색**

- 지역 검색 : `GET /search/:region_name`
- 태그 검색 : `GET /search/:tag_name`

## :desktop_computer: DataBase Structure

**User Collection**

| 고유값 | 아이디  |   이름    |   비밀번호    |   권한    |   가입경로    |  상태코드   |
| :----: | :-----: | :-------: | :-----------: | :-------: | :-----------: | :---------: |
|  \_id  | user_id | user_name | user_password | user_auth | auth_provider | status_code |

**Tag Collection**

| 고유값 |  태그명  |  상태코드   |  작성자   |   작성일    |  수정자   |   수정일    |
| :----: | :------: | :---------: | :-------: | :---------: | :-------: | :---------: |
|  \_id  | tag_name | status_code | create_id | create_date | update_id | update_date |

**Region Collection**

| 고유값 |   지역명    |  상태코드   |  작성자   |   작성일    |  수정자   |   수정일    |
| :----: | :---------: | :---------: | :-------: | :---------: | :-------: | :---------: |
|  \_id  | region_name | status_code | create_id | create_date | update_id | update_date |

**Post Collection**

| 고유값 |    상호명     |    지역     |    상세주소    |     내용      |    별점     |   태그   |  상태코드   |  작성자   |   작성일    |  수정자   | 수정일      |
| :----: | :-----------: | :---------: | :------------: | :-----------: | :---------: | :------: | :---------: | :-------: | :---------: | :-------: | ----------- |
|  \_id  | business_name | region_name | detail_address | post_contents | star_rating | tag_list | status_code | create_id | create_date | update_id | update_date |

**Comment Collection**

| 고유값 |      내용       |  상태코드   |  작성자   |   작성일    |  수정자   |   수정일    |
| :----: | :-------------: | :---------: | :-------: | :---------: | :-------: | :---------: |
|  \_id  | comment_content | status_code | create_id | create_date | update_id | update_date |
