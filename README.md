<h1 align="center">Vote your choice! :checkered_flag: </h1>

> Node.js 의 Express 프레임워크, pug, mongoDB/mongoose 를 이용해 구현하는 Vote Your Choice!

<br>

## :memo: Description

<img src="./docs/images/demo_img.png" alt="DEMO image" align="center">

Node.js 의 Express 프레임워크를 이용한 사이트입니다.  
관리자가 투표(양자택일) 를 개시하면 사용자는 투표를 할 수 있고, **다수의 선택을 맞추는 사용자가 승리하는 게임**입니다.  
사용자는 한 번만 투표할 수 있고, 투표 이후에는 선택을 변경할 수 없습니다. 각 투표의 득표수는 투표한 사용자에게만 실시간으로 득표수가 보입니다. 일정 시간이 지나면(or 일정 득표수가 발생하면) 투표는 종료되고 다수의 선택을 맞춘 사용자 모두에게 베네핏이 주어집니다.

## :gear: Function

**투표**

- 투표 게시물은 관리자만이 등록/수정/삭제 할 수 있습니다.
- 다수의 선택을 맞추는 사용자가 승리하는 게임이기 때문에 투표하기 전에는 선택지의 득표수를 볼 수 없습니다. 투표를 한 후에는 실시간으로 반영되는 득표수를 확인할 수 있고, 선택을 변경할 수 없습니다.

**랭킹**

- 다수의 선택을 맞춘 사용자에게는 베네핏이 주어집니다.
- 베네핏(or 승패) 순으로 랭킹 순위가 매겨집니다.

**댓글**

- 댓글은 1depth 만 허용합니다.
- 로그인 한 회원만 댓글을 작성할 수 있습니다.

**계정**

- 사용자의 계정은 ID/PASSWORD 와 OAuth 방식을 사용합니다.

## :page_with_curl: Page

**계정**

- 로그인 : `GET /auth`
- 회원가입 : `GET /users`

**투표**

- (관리자)투표 등록 : `GET /voting`
- 투표 목록 : `GET /`
- 회원 랭킹 : `GET /ranking`

## :page_facing_up: API

**계정**

- 로그인 요청 : `POST /auth`
- 로그아웃 : `DELETE /users`
- 회원가입 요청 : `POST /users`
- 득표수 권한 : `GET /permission`

**투표**

- (관리자)투표 수정 : `PATCH /voting`
- (관리자)투표 삭제 : `DELETE /voting`
- 투표 : `POST /choice`
- 댓글 등록 : `POST /comment`
- 댓글 수정 : `PATCH /comment`
- 댓글 삭제 : `DELETE /comment`

## :desktop_computer: DataBase Structure

**User Collection**

| 고유값 | 아이디  |   비밀번호    |   권한    |    점수    |     등수     |
| :----: | :-----: | :-----------: | :-------: | :--------: | :----------: |
|  \_id  | user_id | user_password | user_auth | user_score | user_ranking |

**Post Collection**

| 고유값 |    제목    |    선택1     |     선택2     |   득표수1   |   득표수2    |      참여자수      |  작성자   |   작성일    |  수정자   |   수정일    |
| :----: | :--------: | :----------: | :-----------: | :---------: | :----------: | :----------------: | :-------: | :---------: | :-------: | :---------: |
|  \_id  | post_title | first_choice | second_choice | first_count | second_count | voting_participant | create_id | create_date | update_id | update_date |

**Comment Collection**

| 고유값 |      내용       |  작성자   |   작성일    |  수정자   |   수정일    |
| :----: | :-------------: | :-------: | :---------: | :-------: | :---------: |
|  \_id  | comment_content | create_id | create_date | update_id | update_date |
