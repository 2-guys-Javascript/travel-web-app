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

## 주요 기술 스택 선정 포인트

- VITE <br>
  기존의 Create React App의 방식을 사용하면 Webpack 번들러와 Babel 트랜스파일러를 통해 빌드하는데, VITE를 이용한 방식은 ESbuild 등을 활용하여 속도가 더 빠르고 개발 환경에서 빌드 결과물을 빠르게 확인할 수 있어 선택했습니다.
- REACT
- FIREBASE <br>
  백엔드 서비스의 구축은 express 프레임워크와 mongoDB를 이용하여 진행할 수도 있습니다. 하지만 해당 방식을 따르면 인증을 구현하기 위해 `passport` 모듈 등을 이용하여 시간이 상대적으로 더 소요된다는 점, mongoDB와 firebase firestore가 모두 noSQL 기반의 document 방식이라 큰 차이가 없다는 점을 고려하여 firebase를 이용해 백엔드를 구축하기로 결정했습니다.
- NETLIFY <br>
  netlify 호스팅 서비스를 이용하여 웹 애플리케이션의 배포를 진행하면 Github 레포지토리의 프로젝트를 자동으로 빌드해줄 수 있을 뿐만 아니라, 해당 브랜치에 새롭게 push된 변경 사항까지 자동으로 적용된다는 점은 매우 매력적으로 다가왔습니다.

## 주요 기능 📌

1. Login & Signup 🔐
- 로그인은 크게 비밀번호 인증 방식과 깃허브 계정 연동 방식으로 이루어져 있습니다. 두 방식 모두 로그인된 사용자의 정보를 `localStorage`에 [넣어주고](https://github.com/2-guys-Javascript/travel-web-app/blob/d00d43cdb030e24b68f720e1db93925dc1192bc8/src/components/Login/Login.jsx#L19-L21), 각 페이지에 해당하는 컴포넌트가 마운트 될 때마다 useEffect() 훅을 통해서 이를 불러오는 [방식](https://github.com/2-guys-Javascript/travel-web-app/blob/d00d43cdb030e24b68f720e1db93925dc1192bc8/src/components/Japan/Japan.jsx#L6-L16)을 택했습니다 => 지도, 날씨, 환율, 마이 페이지 탭 모두
- 회원 가입(Sign up)은 html form의 input으로부터 사용자에게 이메일, 비밀 번호 그리고 닉네임을 입력 받아 firebase authentication에 등록해주는 [방식](https://github.com/2-guys-Javascript/travel-web-app/blob/d00d43cdb030e24b68f720e1db93925dc1192bc8/src/components/SignUp/SignUpForm.jsx#L43-L48)을 사용했습니다. 이 과정에서 각 입력 필드가 이메일이 맞는지, 비밀번호의 길이가 적당한지를 정규 표현식 등을 이용하여 검증해주었고, 이미 존재하는 계정인지에 대한 정보는 firebase의 오류 메시지를 통해 나타냈습니다.

2. Map 🗺️

3. Weather 🌦️

4. Currency 💴

## 라우팅 & 컴포넌트 & 상태 관리

### 라우팅

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
