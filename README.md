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

- VITE
- REACT
- FIREBASE
- NETLIFY

## 주요 기능 📌

1. Login & Signup 🔐

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
