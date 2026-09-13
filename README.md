# 안진용 포트폴리오

개발 경력, 프로젝트, 기술 스택과 증빙 자료를 소개하는 정적 웹사이트입니다.
한국어·영어·일본어, 다크테마, 스크롤 등장 및 글리치 애니메이션을 지원합니다.

## 로컬 실행

Python 3가 설치된 환경에서 실행합니다. 별도 패키지 설치나 빌드는 필요하지 않습니다.

```sh
./start.sh
```

브라우저에서 <http://127.0.0.1:8000>을 엽니다. 파일 수정 후 새로고침하면 반영됩니다.
종료하려면 서버를 실행한 터미널에서 `Ctrl+C`를 누릅니다.

다른 포트를 사용할 때:

```sh
PORT=8080 ./start.sh
```

## 폴더 구조

```text
ZwLoad.github.io/
├── index.html                  # 한국어 원문과 페이지 구조
├── favicon.svg
├── assets/
│   ├── styles/
│   │   ├── fonts.css           # 언어별 글꼴
│   │   └── style.css           # 테마, 반응형, CSS 애니메이션
│   ├── scripts/
│   │   ├── main.js             # 증명서 창, 다운로드, 내비게이션
│   │   ├── i18n.js             # 언어 전환과 선택 저장
│   │   ├── career.js           # 첫 입사일 기준 경력 연차 자동 계산
│   │   ├── motion.js           # 스크롤 등장 애니메이션
│   │   └── depth.js            # 스크롤 깊이에 따른 배경 효과
│   ├── locales/
│   │   └── translations.js     # 한국어 원문을 키로 한 영어·일본어 번역
│   └── documents/             # 증명서 이미지와 논문 원본
├── graduation-jlpt/            # 기존 JLPT 관련 페이지
├── app-ads.txt                 # 기존 광고 판매자 정보
└── start.sh
```

## 수정 안내

- 경력·프로젝트·기술: `index.html`
- 번역: `assets/locales/translations.js`. 한국어 원문이 바뀌면 해당 번역 키도 함께 수정합니다.
- 소개 문단·매출 숫자의 언어별 서식: `assets/scripts/i18n.js`의 `richTranslations`
- 색상·레이아웃·글리치 주기: `assets/styles/style.css`
- 증명서·논문: `assets/documents/`. 파일 경로는 `index.html`에서 참조합니다.
- 언어 링크: `?lang=ko`, `?lang=en`, `?lang=ja`. URL 선택이 저장된 언어보다 우선합니다.

## 저장소와 배포

로컬 폴더명은 `ZwLoad.github.io`이며, 원격 저장소는 기존
`https://github.com/ZwLoad/ZwLoad.github.io`를 사용합니다.
정적 파일을 저장소 루트에서 제공하며, GitHub Pages 배포 설정은 원격 저장소에서 관리합니다.

상위 폴더의 `ZwLoad`는 별도의 GitHub 프로필 README 저장소입니다.
