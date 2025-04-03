# DEVELOP TEST

# ReviewDeck

ReviewDeck은 개인 리뷰 사이트로, 블로그의 한계를 넘어 평점 기반의 리뷰 관리를 제공하는 플랫폼입니다.

| 설계된 프로젝트를 보기 좋은 문서로 가공하기 위하여, 해당 README.md는 AI를 통해 가공되었습니다.

## 프로젝트 소개

기존 블로그는 단순 글 작성에 그치고 있어 평점을 남기더라도 이를 한눈에 파악하거나 관리하기 어려웠습니다. ReviewDeck은 이러한 한계를 극복하고자 합니다:

- 대시보드를 통한 평점별 리뷰 관리
- 직관적인 데이터 시각화
- 사용자 친화적인 인터페이스

## 주요 기능

- **리뷰 관리**
  - 평점 기반 리뷰 작성 및 관리
  - 태그 시스템을 통한 리뷰 연결
  - 이미지 업로드 지원

- **사용자 시스템**
  - 일반 사용자/관리자 역할 구분
  - 로그인 기반 댓글 시스템
  - 관리자 전용 리뷰 작성 기능

- **대시보드**
  - 평점별 리뷰 분포 시각화
  - 시간대별 리뷰 추이 분석

## 페이지 구성 및 기능

### 1. 랜딩 페이지 (`/`)
- **내용**: 
  - 사이트 소개
  - 최근 리뷰 하이라이트 (최신순)
  - 인기 태그 클라우드
- **기능**:
  - 로그인/회원가입 링크

### 2. 리뷰 목록 페이지 (`/reviews`)
- **내용**:
  - 최신순 리뷰 카드 (랜딩 페이지에 있는 것과 동일)
  - 전체 리뷰 목록
  - 페이지네이션
- **기능**:
  - 평점별 필터링
  - 태그별 필터링
  - 검색 기능

### 3. 리뷰 상세 페이지 (`/reviews/[id]`)
- **내용**:
  - 리뷰 제목 및 내용
  - 평점 표시 (별점)
  - 이미지 갤러리
  - 작성자 정보
  - 댓글 섹션
- **기능**:
  - 댓글 작성 (로그인 필요)
  - 공유 기능
  - 관련 리뷰 추천

### 4. 로그인/회원가입 페이지 (`/login`, `/register`)
- **내용**:
  - 입력 폼
  - 소셜 로그인 옵션 (선택적)
- **기능**:
  - 사용자 인증
  - 비밀번호 재설정

### 5. 대시보드 페이지 (`/dashboard`)
- **내용**:
  - 평점별 리뷰 분포 차트
  - 시간별 리뷰 추이 그래프
- **기능**:
  - 데이터 필터링
  - 차트 커스터마이징
  - 인사이트 요약

### 6. 관리자 페이지 (`/admin`)
- **내용**:
  - 리뷰 관리 테이블
  - 사용자 관리 테이블
- **기능**:
  - 리뷰 생성/수정/삭제
  - 댓글 모더레이션
  - 사용자 권한 관리

### 7. 리뷰 작성 페이지 (`/admin/reviews/new`, `/admin/reviews/[id]/edit`)
- **내용**:
  - 리뷰 작성 폼
  - 이미지 업로드 영역
  - 마크다운 에디터 및 미리보기
- **기능**:
  - 텍스트 서식 지정
  - 이미지 업로드
  - 태그 추가
  - 평점 지정
  - 임시저장 및 발행

## 기술 스택

- **프론트엔드**
  - SvelteKit 2.16.0
  - TailwindCSS 3.4.1
  - TypeScript 5.0.0

- **백엔드**
  - SvelteKit 서버
  - SQLite (개발용)
  - Prisma ORM

- **개발 도구**
  - Vite 6.0.0
  - ESLint
  - Prettier
  - TypeScript

## 디렉토리 구조

```
review-site/
├── src/
│   ├── lib/
│   │   ├── components/           # 재사용 가능한 UI 컴포넌트
│   │   │   ├── ui/               # 기본 UI 컴포넌트 (버튼, 카드 등)
│   │   │   ├── layout/           # 레이아웃 관련 컴포넌트
│   │   │   ├── dashboard/        # 대시보드 관련 컴포넌트
│   │   │   └── review/           # 리뷰 관련 컴포넌트
│   │   ├── server/               # 서버 로직
│   │   │   ├── auth/             # 인증 관련 로직
│   │   │   ├── db/               # 데이터베이스 연결 및 모델
│   │   │   └── api/              # API 엔드포인트
│   │   ├── utils/                # 유틸리티 함수
│   │   └── stores/               # Svelte 스토어
│   ├── routes/                   # SvelteKit 라우트
│   │   ├── +layout.svelte        # 기본 레이아웃
│   │   ├── +page.svelte          # 랜딩 페이지
│   │   ├── login/                # 로그인/회원가입 페이지
│   │   ├── reviews/              # 리뷰 목록/상세 페이지
│   │   ├── dashboard/            # 대시보드 페이지
│   │   └── admin/                # 관리자 페이지
│   └── app.html                  # HTML 템플릿
├── static/                       # 정적 파일 (이미지, 폰트 등)
├── prisma/                       # Prisma 스키마 및 마이그레이션
│   └── schema.prisma             # 데이터베이스 스키마 정의
├── tests/                        # 테스트 파일
├── package.json                  # 의존성 관리
├── svelte.config.js              # Svelte 설정
├── tailwind.config.js            # Tailwind 설정
└── README.md                     # 프로젝트 문서
```

## 데이터베이스 스키마

### 모델 정의

#### User (사용자)
사용자 정보를 관리하는 모델입니다.
- `id`: UUID 형식의 고유 식별자
- `email`: 사용자 이메일 (유니크)
- `passwordHash`: 암호화된 비밀번호
- `name`: 사용자 이름
- `role`: 사용자 권한 (USER/ADMIN)
- `createdAt`: 계정 생성일
- `updatedAt`: 정보 수정일
- `reviews`: 사용자가 작성한 리뷰 목록
- `comments`: 사용자가 작성한 댓글 목록

```prisma
model User {
  id           String    @id @default(uuid())
  email        String    @unique
  passwordHash String
  name         String
  role         Role      @default(USER)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  reviews      Review[]
  comments     Comment[]
}
```

#### Review (리뷰)
리뷰 게시물을 관리하는 핵심 모델입니다.
- `id`: UUID 형식의 고유 식별자
- `title`: 리뷰 제목
- `content`: 리뷰 내용
- `rating`: 평점 (0.0 ~ 5.0)
- `published`: 발행 여부
- `authorId`: 작성자 ID
- `createdAt`: 작성일
- `updatedAt`: 수정일
- `author`: 작성자 정보 (User 모델과 연결)
- `comments`: 댓글 목록
- `images`: 이미지 목록
- `tags`: 태그 목록

```prisma
model Review {
  id          String    @id @default(uuid())
  title       String
  content     String
  rating      Float     @default(0.0)
  published   Boolean   @default(false)
  authorId    String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  author      User      @relation(fields: [authorId], references: [id])
  comments    Comment[]
  images      Image[]
  tags        Tag[]     @relation("ReviewToTag")
}
```

#### Comment (댓글)
리뷰에 대한 댓글을 관리하는 모델입니다.
- `id`: UUID 형식의 고유 식별자
- `content`: 댓글 내용
- `reviewId`: 리뷰 ID
- `authorId`: 작성자 ID
- `createdAt`: 작성일
- `updatedAt`: 수정일
- `review`: 리뷰 정보 (Review 모델과 연결)
- `author`: 작성자 정보 (User 모델과 연결)

```prisma
model Comment {
  id        String   @id @default(uuid())
  content   String
  reviewId  String
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  review    Review   @relation(fields: [reviewId], references: [id], onDelete: Cascade)
  author    User     @relation(fields: [authorId], references: [id])
}
```

#### Image (이미지)
리뷰에 첨부되는 이미지를 관리하는 모델입니다.
- `id`: UUID 형식의 고유 식별자
- `url`: 이미지 URL
- `reviewId`: 리뷰 ID
- `review`: 리뷰 정보 (Review 모델과 연결)

```prisma
model Image {
  id       String @id @default(uuid())
  url      String
  reviewId String
  review   Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)
}
```

#### Tag (태그)
리뷰를 태그로 분류하는 모델입니다.
- `id`: UUID 형식의 고유 식별자
- `name`: 태그 이름 (유니크)
- `reviews`: 해당 태그가 적용된 리뷰 목록

```prisma
model Tag {
  id      String   @id @default(uuid())
  name    String   @unique
  reviews Review[] @relation("ReviewToTag")
}
```

#### Role (사용자 역할)
사용자의 권한을 정의하는 열거형입니다.
- `USER`: 일반 사용자
- `ADMIN`: 관리자

```prisma
enum Role {
  USER
  ADMIN
}
```

### 관계 설명

1. **User - Review**
   - 한 사용자는 여러 리뷰를 작성할 수 있음 (1:N)
   - 리뷰는 반드시 한 명의 작성자를 가짐 (N:1)

2. **User - Comment**
   - 한 사용자는 여러 댓글을 작성할 수 있음 (1:N)
   - 댓글은 반드시 한 명의 작성자를 가짐 (N:1)

3. **Review - Comment**
   - 한 리뷰는 여러 댓글을 가질 수 있음 (1:N)
   - 댓글은 반드시 하나의 리뷰에 속함 (N:1)
   - 리뷰 삭제 시 관련된 댓글도 자동 삭제 (Cascade)

4. **Review - Image**
   - 한 리뷰는 여러 이미지를 가질 수 있음 (1:N)
   - 이미지는 반드시 하나의 리뷰에 속함 (N:1)
   - 리뷰 삭제 시 관련된 이미지도 자동 삭제 (Cascade)

5. **Review - Tag**
   - 한 리뷰는 여러 태그를 가질 수 있음 (N:N)
   - 한 태그는 여러 리뷰에 사용될 수 있음 (N:N)

### 특징
- 모든 모델은 UUID를 기본 식별자로 사용
- 생성일자(createdAt)와 수정일자(updatedAt) 자동 관리
- 카스케이드 삭제를 통한 데이터 정합성 유지
- 유니크 제약조건을 통한 중복 데이터 방지

## 시작하기

1. 저장소 클론
```bash
git clone [repository-url]
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 데이터베이스 마이그레이션
```bash
npx prisma migrate dev
```

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## UI 디자인

### 색상 팔레트

#### 주요 색상
```css
--primary: #059669;        /* 기본 브랜드 색상 */
--primary-light: #34D399;  /* 밝은 강조 색상 */
--primary-dark: #047857;   /* 어두운 강조 색상 */
```

#### 중립 색상
```css
--darkest: #1F2937;    /* 가장 어두운 텍스트 */
--dark: #4B5563;       /* 어두운 텍스트 */
--medium: #9CA3AF;     /* 중간 톤 (보조 텍스트) */
--light: #E5E7EB;      /* 밝은 배경 */
--lightest: #F9FAFB;   /* 가장 밝은 배경 */
```

### 색상 활용 가이드

#### 텍스트
- 주요 제목: `--darkest`
- 본문 텍스트: `--dark`
- 보조 텍스트: `--medium`
- 링크: `--primary`
- 링크 호버: `--primary-dark`

#### 버튼
- 주요 버튼: `--primary` 배경, 흰색 텍스트
- 보조 버튼: `--light` 배경, `--dark` 텍스트
- 위험 버튼: `#EF4444` 배경, 흰색 텍스트

#### 카드 및 컨테이너
- 기본 배경: `--lightest`
- 카드 배경: 흰색
- 카드 테두리: `--light`
- 구분선: `--light`

#### 상태 표시
- 성공: `--primary`
- 경고: `#F59E0B`
- 에러: `#EF4444`
- 정보: `#3B82F6`

### 레이아웃 구성

#### 랜딩 페이지
- 상단 네비게이션: 흰색 배경, `--primary` 포인트
- 히어로 섹션: `--primary` 그라데이션 배경
- 최근 리뷰 섹션: 흰색 배경, 카드 그리드 레이아웃
- 태그 클라우드: `--lightest` 배경

#### 리뷰 목록
- 필터 바: `--lightest` 배경
- 리뷰 카드:
  - 흰색 배경
  - `--light` 테두리
  - 호버 시 부드러운 그림자 효과

#### 리뷰 상세
- 헤더: 흰색 배경
- 콘텐츠: 흰색 배경
- 사이드바: `--lightest` 배경

#### 대시보드
- 차트 영역: 흰색 배경, `--light` 테두리
- 데이터 카드: 
  - 흰색 배경
  - `--primary` 포인트 색상
  - 그라데이션 효과

### 타이포그래피

#### 글꼴
```css
--font-sans: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
```

#### 크기
- 대제목: 2.25rem (36px)
- 중제목: 1.875rem (30px)
- 소제목: 1.5rem (24px)
- 본문: 1rem (16px)
- 작은 텍스트: 0.875rem (14px)

### 반응형 디자인
- 모바일: 640px 이하
- 태블릿: 768px 이하
- 데스크톱: 1024px 이상
