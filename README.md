<div align="center">
<h2>일단락 프로젝트</h2>
</div>

<p align="center">
  <img src="public/assets/일단락.png" alt="일단락" width="350" height="350">
</p>

## 목차

- [개요](#개요)
- [시작 가이드](#시작-가이드)
- [기술 스택](#기술-스택)
- [주요 기술 스택 선정 포인트](#주요-기술-스택-선정-포인트)
- [주요 기능](#주요-기능-📌)
- [라우팅 & 컴포넌트 & 상태관리](#라우팅--컴포넌트--상태-관리)
- [추가 요구 사항](#추가-요구-사항)

## 개요

- Made by : 이동준, 김승완
- Development Period : From Oct 13, 2023 ~
- Github : https://github.com/2-guys-Javascript/travel-web-app
- Web Page : https://two-guys-travel-project.netlify.app/

## 시작 가이드

**Requirement**

- Node.js 18.16.0
- NPM 9.5.1

**Installation**

참고 사항 : 해당 프로젝트를 로컬 개발환경에서 실행시키기 위해서는 api key들이 필요합니다. 목록은 다음과 같습니다.

.env file

```env
// 환율 관련 api key
VITE_EXCHANGE_API_KEY=
// 날씨 관련 api key
VITE_WEATHER_API_KEY=
// firebase 관련 key:
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_GOOGLE_API_KEY=
```

```zsh
$ git clone https://github.com/2-guys-Javascript/travel-web-app.git
$ cd travel-web-app
```

```zsh
$ npm install // 관련 의존성 패키지 설치
$ npm run dev // 개발 환경에서의 실행

// 혹은

$ npm run build
$ npm run preview // 빌드 후 배포 환경에서의 실행
```

## 기술 스택 ⚒️

### Environment

<div align="left">
<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white">
<img src="https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white">
</div>

### Config

<div align="left">
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
</div>

### Development

<div align="left">
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white">
<img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
<img src="https://img.shields.io/badge/firebase-F7F7F7?style=for-the-badge&logo=firebase&logoColor=FFCA28">
<img src="https://img.shields.io/badge/ESlint-4B32C3?style=for-the-badge&logo=ESlint&logoColor=white">
</div>

### Communication

<div align="left">
<img src="https://img.shields.io/badge/Slack-481549?style=for-the-badge&logo=slack&logoColor=white">
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/KakaoTalk-FFCD00?style=for-the-badge&logo=KakaoTalk&logoColor=white">
<img src="https://img.shields.io/badge/GoogleMeet-00897B?style=for-the-badge&logo=GoogleMeet&logoColor=white">
</div>

### Deployment

<div align="left">
<img src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7">
</div>

## 주요 기술 스택 선정 포인트 📌

- VITE <br>
  기존의 Create React App의 방식을 사용하면 Webpack 번들러와 Babel 트랜스파일러를 통해 빌드하는데, VITE를 이용한 방식은 ESbuild 등을 활용하여 속도가 더 빠르고 개발 환경에서 빌드 결과물을 빠르게 확인할 수 있어 선택했습니다.
- REACT
- FIREBASE <br>
  백엔드 서비스의 구축은 express 프레임워크와 mongoDB를 이용하여 진행할 수도 있습니다. 하지만 해당 방식을 따르면 인증을 구현하기 위해 `passport` 모듈 등을 이용하여 시간이 상대적으로 더 소요된다는 점, mongoDB와 firebase firestore가 모두 noSQL 기반의 document 방식이라 큰 차이가 없다는 점을 고려하여 firebase를 이용해 백엔드를 구축하기로 결정했습니다.
- NETLIFY <br>
  netlify 호스팅 서비스를 이용하여 웹 애플리케이션의 배포를 진행하면 Github 레포지토리의 프로젝트를 자동으로 빌드해줄 수 있을 뿐만 아니라, 해당 브랜치에 새롭게 push된 변경 사항까지 자동으로 적용된다는 점은 매우 매력적으로 다가왔습니다.
- Google API<br>
google의 Javascript Map과 places API는 별개입니다. 하지만 GCP의 기능으로 인해 이를 하나의 api key로 관리하기 편하고, 해당 플랫폼을 통해 제약 사항을 정해줄 수도 있기 때문에 보안성이 높다고 판단했습니다.

## 주요 기능 📌

1. Login & Signup 🔐
> 로그인은 크게 비밀번호 인증 방식과 깃허브 계정 연동 방식으로 이루어져 있습니다. 두 방식 모두 로그인된 사용자의 정보를 `localStorage`에 [넣어주고](https://github.com/2-guys-Javascript/travel-web-app/blob/d00d43cdb030e24b68f720e1db93925dc1192bc8/src/components/Login/Login.jsx#L19-L21), 각 페이지에 해당하는 컴포넌트가 마운트 될 때마다 useEffect() 훅을 통해서 이를 불러오는 [방식](https://github.com/2-guys-Javascript/travel-web-app/blob/d00d43cdb030e24b68f720e1db93925dc1192bc8/src/components/Japan/Japan.jsx#L6-L16)을 택했습니다 => 지도, 날씨, 환율, 마이 페이지 탭 모두
> 회원 가입(Sign up)은 html form의 input으로부터 사용자에게 이메일, 비밀 번호 그리고 닉네임을 입력 받아 firebase authentication에 등록해주는 [방식](https://github.com/2-guys-Javascript/travel-web-app/blob/d00d43cdb030e24b68f720e1db93925dc1192bc8/src/components/SignUp/SignUpForm.jsx#L43-L48)을 사용했습니다. 이 과정에서 각 입력 필드가 이메일이 맞는지, 비밀번호의 길이가 적당한지를 정규 표현식 등을 이용하여 검증해주었고, 이미 존재하는 계정인지에 대한 정보는 firebase의 오류 메시지를 통해 나타냈습니다.

2. Map 🗺️ <br>
   지도는 로그인된 사용자와 그렇지 않은 사용자에게 각각 다른 기능을 제공합니다. 전자는 후자의 기능에 추가적으로 날짜에 맞는 본인의 일정을 생성하고 조회할 수 있으며, 후자는 특정 장소에 대한 검색과 해당 장소 주변의 명소(식당, 카페)에 대한 정보를 제공합니다.
> LoginMap <br>
로그인된 사용자는 버튼을 눌러 자신의 위치로 지도를 위치시킬 수 있으며, 특정 지점을 클릭해 지도 하단의 폼을 사용하여 일정을 생성할 수 있습니다. 또한 자신이 생성한 일정에 대한 마커를 클릭하여 주변의 명소 정보를 얻을 수 있습니다.

> NonLoginMap <br>
비로그인된 사용자는 지도의 자동 완성 검색창에 특정 장소를 검색하여 이동하고, 주변의 명소 정보를 얻을 수 있습니다.

3. Weather 🌦️ <br>
> 사용자는 날씨 탭에서 한국과 일본의 특정 도시에 대한 박스를 클릭하여 오늘, 내일, 모레에 대한 날씨 정보를 얻을 수 있습니다.
5. Currency 💴 <br>
> 사용자는 환율 탭에서 클릭을 통해 당일의 환율 정보를 원화 기준, 엔화 기준으로 얻을 수 있습니다.

## 라우팅 & 컴포넌트 & 상태 관리

### 라우팅
1. Home (url : `/`)
2. 한국 (url : `/korea`) <br>
> 최외곽에는 KrDefaultLayout이 감싸고 있어 상단에는 애플리케이션 헤더가, 하단에는 각 탭으로 이동할 수 있는 네비게이션 바가 위치하고, 세부 url path에 따라서 Outlet 컴포넌트가 달라집니다.
3. 일본 (url : `/japan`) <br>
> 일본 탭도 한국 탭과 마찬가지로 최외곽에는 JpDefaultLayout이 감싸고 있어 상단과 하단에 각각 애플리케이션 헤더와 네비게이션 바가 위치합니다. 하지만 세부 Outlet 컴포넌트가 환율(`Exchange`)이 추가되었다는 특징이 있습니다.
4. 회원 가입 (url : `/signup`) 과 로그인 (url : `/login`) <br>
> 해당 url path만 예외적으로 ApplicationHeader를 이용하지 않고, 개별적인 헤더를 정의하여 UI를 렌더링합니다.
5. 마이페이지 (url : `/mypage`) <br>
> 로그인된 사용자의 계정 정보를 보여주는 탭이므로 ApplicationHeader를 사용하고 나머지 내용은 MyPage 컴포넌트를 사용하여 렌더링합니다.

### 컴포넌트

- App-Header
- Home
- Japan(JapanDefaultLayout)

  - Japan
  - Jpweather
  - Exchange
  - JpNavBar

- Korea(KoreaDefaultLayout)
  - Korea
  - Krweather
  - KrNavBar

### 상태 관리

## 추가 요구 사항
1. 사용자의 일정에 대한 삭제를 넘어 수정 기능
2. 추가적인 소셜 로그인(페이스북, 구글 등) 구현
3. localStorage를 이용한 로그인 정보 저장은 보안상 아쉬운 점이 있으니 cookie를 이용한 방식으로 구현
4. 비로그인된 사용자도 특정 지점을 클릭하고, 해당 장소 주면의 명소 정보를 볼 수 있으면 좋을 것 같음
5. MyPage 컴포넌트에는 따로 footer 컴포넌트를 만들어주진 않을 것인지?
6. login된 사용자가 무단으로 `/login`, `/signup` 페이지로 접근하는 이슈


## 각 페이지에 대한 구현 상세 정리

### 공통
1. App 컴포넌트에서 로그인, 사용자 id, 이름에 대한 상태를 갖습니다. 전역 상태관리 라이브러리를 사용했다면 관련 hook으로 전역 상태로 로그인 여부를 끌어와서 관련 UI를 보여줄 수 있겠지만 프로젝트 구성을 이와 달리 했기 때문에 `header`, `footer`, `content`를 공통적으로 wrapping 하는 App 컴포넌트에서 상태를 선언하고, 특정 페이지에 진압할 때마다 `useEffect()` 훅을 이용해 로컬 스토리지를 검사합니다.

### `/` 페이지
해당 페이즈는 korea와 japan 탭으로 이동할 수 있는 링크가 fadeIn 효과를 통해 나타납니다. 이때 중간의 `opening` 이미지가 탭을 가리는 현상을 `pointer-events : none` 속성으로 해제시켜버림

### `/korea` 페이지
기본적으로 `KoreaDefaultLayout`이 하위 세부 세그먼트들을 감싸며, 이는 `outlet` 컴포넌트를 통해 차별화된다.
- `weather` 세부 경로 : 날씨 api를 받아와서 국내 날씨 정보를 도시 별로 렌더링

### `/japan` 페이지
기본적으로 `JapanDefaultLayout`이 하위 세부 세그먼트들을 감싸며, 이는 `outlet` 컴포넌트를 통해 차별화된다.
- `weather` 세부 경로 : 날씨 api를 받아와서 일본 도시 날씨 정보를 도시 별로 렌더링
- `exchange` 세부 경로 : 한화, 일화 간의 환율 정보를 각각 받아와서 사용자에게 렌더링해준다.

### `/signup` 페이지 🔏
회원 가입은 이메일과 패스워드 기반의 로직으로 진행한다. sns 방식은 따로 회원 가입을 진행할 필요는 없고, 바로 로그인 페이지에서 서비스 이용을 진행하면 된다.<br>
회원 가입의 절차는 다음과 같다.
1. 사용자가 form에 이메일, 패스워드, 사용할 닉네임을 입력한다. 이때 과도한 페이지 리렌더링을 막기 위해 form의 양방향 바인딩은 하지 않고 단지 form이 제출될 때에만 해당 값을 참조하여 유효성 검사를 진행한다.
2. 유효성 검사를 통과한 이메일과 패스워드는 `createUserWithEmailAndPassword` 함수를 통해 credential을 가져오고, `updateProfile` 함수를 통해 displayName까지 닉네임으로 등록해준다.
3. 정상적이라면 로그인 페이지로 이동하여 다음 과정을 진행하고, 그렇지 않다면 붉은 글씨로 에러 메시지를 보여준다.



### `/login` 페이지 🔓
로그인의 로직은 Oauth 2.0 프로토콜을 웹 서버에서 따로 구현하기보다는, firebase에서 제공하는 API를 이용하기로 결정했습니다.<br>
로그인 방식은 크게 facebook, google, gitub, 그리고 이메일 & 패스워드 방식으로 나뉘는데, 기본 원리는 동일합니다. <br>
1. auth모듈과 인증 관련 정보(이메일 & 패스워드 혹은 sns provider) : 관련 설정은 firebaseConfig.js 모듈에서 생성
2. 1의 비동기 함수를 **async ~ await** 방식으로 실행하여 리턴한 credential에서 uid와 displayName을 받아 상태와 로컬 스토리지에 반영하기
3. 2의 과정에서 오류가 있다면 에러 핸들링을 하고, 성공적이라면 루트 랜딩 페이지로 네비게이트