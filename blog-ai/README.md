# 개인용 글감 AI

glgam.com 구조를 참고한 **개인 전용** 블로그 글쓰기 도구입니다.

- 결제/멤버십 없음
- **Vercel 웹 배포** 지원 (로컬 실행 불필요)
- 접근 토큰으로 본인만 사용
- 네이버 검색·데이터랩 API 연동
- OpenAI 호환 API로 AI 글쓰기

## 기능

| 페이지 | 설명 |
|--------|------|
| `/` | 홈 · 3단계 워크플로우 |
| `/discover` | 네이버 블로그 검색 + 검색 트렌드 |
| `/ai` | AI 블로그 초안 생성 · 수정 |
| `/bookmarks` | 키워드 북마크 (브라우저 localStorage) |
| `/login` | 접근 토큰 입력 (배포 시) |

---

## Vercel 웹 배포 (권장)

### 1. GitHub 연결

1. [vercel.com](https://vercel.com) 로그인
2. **Add New Project** → `infohannip-media` 레포 선택
3. **Root Directory** → `blog-ai` 로 설정
4. Framework: Next.js (자동 감지)

### 2. 환경변수 설정 (Vercel Dashboard → Settings → Environment Variables)

| 변수 | 설명 |
|------|------|
| `NAVER_CLIENT_ID` | 네이버 개발자센터 Client ID |
| `NAVER_CLIENT_SECRET` | 네이버 Client Secret |
| `OPENAI_API_KEY` | AI 글쓰기 API 키 |
| `ACCESS_TOKEN` | **본인만 아는 비밀번호** (아무나 못 들어오게) |
| `OPENAI_MODEL` | (선택) 기본 `gpt-4o-mini` |

### 3. Deploy

Deploy 버튼 클릭 → 몇 분 후 `https://your-app.vercel.app` URL 생성

### 4. 사용

1. 배포 URL 접속
2. `/login` 에서 `ACCESS_TOKEN` 입력
3. 글감 발견 → AI 글쓰기

> 북마크는 브라우저에 저장됩니다. 다른 기기에서는 따로 저장됩니다.

---

## 로컬 실행 (선택)

```bash
cd blog-ai
cp .env.example .env.local
# .env.local 에 API 키 입력
npm install
npm run dev
```

---

## glgam 대비 제외된 기능

- 멤버십 / 결제
- 회원가입 (접근 토큰 1개로 대체)
- 블로그 순위 크롤링
- 쿠팡 파트너스 URL 변환
