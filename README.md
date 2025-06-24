# 🎬 Netflix Clone

> TMDB API를 활용한 영화 정보 웹 애플리케이션  
> 인기 영화, 상영 예정작, 최고 평점 영화들을 슬라이더로 탐색하고 상세 정보를 확인할 수 있습니다.


## 🔗 배포 링크

👉 [Suflix 바로가기](https://sh701.github.io/Suflix/)

---

## 📸 주요 기능

- 🎞️ TMDB API 기반의 영화 목록 제공
- 📍 `Popular`, `Top Rated`, `Upcoming` 섹션을 슬라이더로 구성
- 🃏 영화 카드 클릭 시 모달로 상세 정보 확인
- ⚙️ 모달 컴포넌트 분리 및 슬라이더 상태 자동화
- 📱 반응형 디자인 적용

---

## ⚙️ 사용 기술 스택

- **React**
- **React Router DOM**
- **TMDB API**
- **Styled Components**
- **Framer Motion** (애니메이션)
- **GitHub Pages** (정적 배포)

---

## 📂 프로젝트 구조

- Suflix/
- ├── public/                   # 정적 파일 (favicon, index.html 등)- 
- ├── src/
- │   ├── api/                  # TMDB API 호출 관련 함수
- │   ├── components/           # 재사용 가능한 UI 컴포넌트 (슬라이더, 카드, 모달 등)
- │   ├── hooks/                # 커스텀 훅 (필요한 경우)
- │   ├── pages/                # 페이지 단위 컴포넌트 (Home 등)
- │   ├── styles/               # 글로벌 스타일 및 스타일 설정
- │   ├── utils/                # 공통 유틸 함수
- │   ├── App.tsx               # 라우팅 및 전체 앱 구조
- │   └── index.tsx              # 앱 진입점 (ReactDOM 렌더링)
- ├── .gitignore
- ├── package.json
- ├── README.md
- └── package-lock.json


