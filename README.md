# ReviewDeck

ReviewDeck은 리뷰를 효과적으로 관리하고 공유할 수 있는 웹 애플리케이션입니다. 사용자들은 다양한 제품이나 서비스에 대한 리뷰를 작성하고, 평점과 태그를 통해 체계적으로 관리할 수 있습니다.

## 📋 목차

- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [시스템 요구사항](#시스템-요구사항)
- [설치 및 실행](#설치-및-실행)
- [데이터베이스 설정](#데이터베이스-설정)
- [환경 변수 설정](#환경-변수-설정)
- [개발 명령어](#개발-명령어)
- [프로젝트 구조](#프로젝트-구조)
- [문제 해결](#문제-해결)

## 🚀 주요 기능

- **리뷰 관리**: 제품이나 서비스에 대한 리뷰 작성 및 관리
- **평점**: 별점을 통한 리뷰 평가
- **태그**: 리뷰를 카테고리별로 분류
- **댓글**: 리뷰에 대한 댓글 작성
- **좋아요**: 리뷰에 대한 좋아요/싫어요
- **사용자 인증**: 세션 기반 회원가입 및 로그인 시스템
- **관리자**: 관리자 전용 대시보드 및 관리 기능
- **반응형 디자인**: 모바일과 데스크톱 모두 지원

## 🛠 기술 스택

### Frontend
- **SvelteKit**: 풀스택 프레임워크
- **TypeScript**: 타입 안정성을 위한 언어
- **Tailwind CSS**: 유틸리티 CSS 프레임워크
- **Vite**: 빌드 도구

### Backend
- **SvelteKit**: 서버사이드 렌더링 및 API
- **Prisma**: ORM 및 데이터베이스 툴킷
- **SQLite**: 개발용 데이터베이스
- **bcrypt**: 비밀번호 해싱
- **세션 기반 인증**: 메모리 기반 세션 관리

### 개발 도구
- **ESLint**: 코드 린팅
- **Prettier**: 코드 포맷팅
- **TypeScript**: 타입 체킹

## 💻 시스템 요구사항

다음 소프트웨어가 시스템에 설치되어 있어야 합니다:

- **Node.js**: 18.0.0 이상 (권장: 20.x LTS)
- **npm**: 8.0.0 이상 (Node.js와 함께 설치됨)
- **Git**: 버전 관리 시스템

### Node.js 설치 확인
```bash
node --version
npm --version
```

Node.js가 설치되어 있지 않다면 [Node.js 공식 웹사이트](https://nodejs.org/)에서 다운로드하세요.

## 🔧 설치 및 실행

### 1. 프로젝트 클론
```bash
git clone https://github.com/DoDAON/ReviewDeck.git
cd ReviewDeck
```

### 2. 의존성 설치
```bash
npm install
```

이 명령어는 `package.json`에 정의된 모든 의존성을 설치하고, `postinstall` 스크립트를 통해 Prisma 클라이언트를 자동으로 생성합니다.

### 3. 환경 변수 설정
프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 데이터베이스 URL (SQLite 사용)
# 프로젝트 루트 기준으로 ./dev.db 파일이 생성됩니다
DATABASE_URL="file:./dev.db"

# 기타 환경 변수 (선택사항)
NODE_ENV="development"
```

### 4. 데이터베이스 초기화
```bash
# Prisma 클라이언트 생성
npx prisma generate

# 데이터베이스 마이그레이션 적용
npx prisma migrate dev

# 시드 데이터 삽입 (선택사항 - 관리자, 사용자 계정과 샘플 리뷰 생성)
npm run db:seed
```

### 5. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5173`에 접속하면 애플리케이션을 확인할 수 있습니다.

### 6. 테스트 계정 (시드 데이터 실행 시)
시드 데이터를 실행했다면 다음 계정으로 로그인할 수 있습니다:

**관리자 계정:**
- 이메일: `root@testtest.test`
- 비밀번호: `admin123!`

**일반 사용자 계정:**
- 이메일: `test@example.com`  
- 비밀번호: `test123!`

## 🗄 데이터베이스 설정

이 프로젝트는 개발 환경에서 SQLite를 사용합니다. SQLite는 별도의 설치나 설정이 필요 없으며, 파일 기반 데이터베이스입니다.

### 데이터베이스 스키마
주요 테이블:
- `User`: 사용자 정보
- `Review`: 리뷰 데이터
- `Comment`: 댓글
- `Like`: 좋아요
- `Image`: 이미지 정보
- `Tag`: 태그

### Prisma 관련 명령어
```bash
# 데이터베이스 스키마 변경 후 마이그레이션
npx prisma migrate dev

# Prisma Studio로 데이터베이스 GUI 접근
npx prisma studio

# 데이터베이스 초기화 (주의: 모든 데이터가 삭제됩니다)
npx prisma migrate reset
```

## ⚙️ 환경 변수 설정

`.env` 파일에 설정해야 할 환경 변수들:

| 변수명 | 설명 | 필수 | 예시값 |
|--------|------|------|--------|
| `DATABASE_URL` | 데이터베이스 연결 URL | ✅ | `file:./dev.db` |

**보안 주의사항**: `.env` 파일은 절대 버전 관리에 포함하지 마세요. 이미 `.gitignore`에 포함되어 있습니다.

## 📜 개발 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드된 앱 미리보기 |
| `npm run lint` | 코드 린팅 검사 |
| `npm run format` | 코드 포맷팅 |
| `npm run check` | TypeScript 타입 검사 |
| `npm run db:seed` | 시드 데이터 삽입 |

## 📁 프로젝트 구조

```
ReviewDeck/
├── prisma/                 # 데이터베이스 스키마 및 마이그레이션
│   ├── schema.prisma       # Prisma 스키마 정의
│   ├── dev.db             # SQLite 데이터베이스 파일
│   └── seed.ts            # 시드 데이터
├── src/
│   ├── routes/            # SvelteKit 라우트
│   │   ├── (app)/         # 메인 애플리케이션 라우트
│   │   │   ├── about/     # 소개 페이지
│   │   │   ├── api/       # 앱 내 API 엔드포인트
│   │   │   ├── login/     # 로그인 페이지
│   │   │   ├── profile/   # 프로필 페이지
│   │   │   ├── register/  # 회원가입 페이지
│   │   │   └── reviews/   # 리뷰 페이지들
│   │   └── (admin)/       # 관리자 전용 라우트
│   │       └── admin/     # 관리자 대시보드
│   │           ├── posts/ # 게시글 관리
│   │           ├── tags/  # 태그 관리
│   │           └── users/ # 사용자 관리
│   ├── lib/               # 공통 컴포넌트 및 유틸리티
│   │   ├── components/    # 재사용 가능한 컴포넌트
│   │   └── server/        # 서버 사이드 유틸리티 (인증, 세션 등)
│   ├── data/              # 데이터 관련 파일 (더미 데이터 등)
│   ├── app.html           # HTML 템플릿
│   ├── app.css            # 글로벌 스타일
│   └── app.d.ts           # TypeScript 타입 정의
├── static/                # 정적 파일 (이미지, 아이콘 등)
├── package.json           # 프로젝트 설정 및 의존성
├── svelte.config.js       # SvelteKit 설정
├── vite.config.ts         # Vite 빌드 설정
├── tailwind.config.js     # Tailwind CSS 설정
├── tsconfig.json          # TypeScript 설정
└── README.md              # 프로젝트 문서
```

## 🔧 문제 해결

### 자주 발생하는 문제들

#### 1. `npm install` 실패
```bash
# npm 캐시 클리어 후 재시도
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 2. 데이터베이스 연결 오류
- `.env` 파일이 존재하는지 확인
- `DATABASE_URL`이 올바르게 설정되었는지 확인
- Prisma 클라이언트 재생성: `npx prisma generate`

#### 3. TypeScript 오류
```bash
# TypeScript 캐시 클리어
rm -rf .svelte-kit
npm run check
```

#### 4. 포트 5173이 이미 사용 중
다른 포트로 실행:
```bash
npm run dev -- --port 3000
```

#### 5. 로그인 상태 동기화 문제
로그인 상태에서 브라우저의 뒤로가기/앞으로가기 버튼을 사용한 후 로그인 버튼이 다시 표시되는 경우:
- **해결 방법**: 브라우저에서 `F5` 키를 누르거나 새로고침 버튼을 클릭하세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.
