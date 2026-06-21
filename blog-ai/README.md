# 개인용 글감 AI

glgam.com 구조를 참고한 **개인 전용** 블로그 글쓰기 도구입니다.

- 결제/멤버십 없음
- 외부 공개/배포 불필요 (로컬 실행)
- 네이버 검색·데이터랩 API 연동
- OpenAI 호환 API로 AI 글쓰기

## 기능

| 페이지 | 설명 |
|--------|------|
| `/` | 홈 · 3단계 워크플로우 |
| `/discover` | 네이버 블로그 검색 + 검색 트렌드 |
| `/ai` | AI 블로그 초안 생성 · 수정 |
| `/bookmarks` | 키워드 북마크 (로컬 JSON 저장) |

## 설정

```bash
cd blog-ai
cp .env.example .env.local
# .env.local 에 API 키 입력
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속

### 환경변수

```env
NAVER_CLIENT_ID=       # 네이버 개발자센터
NAVER_CLIENT_SECRET=
OPENAI_API_KEY=        # AI 글쓰기
OPENAI_BASE_URL=       # (선택) OpenAI 호환 엔드포인트
OPENAI_MODEL=gpt-4o-mini
```

## 데이터 저장

북마크는 `blog-ai/data/bookmarks.json`에 로컬 저장됩니다. Git에 올리지 않도록 `.gitignore`에 포함되어 있습니다.

## glgam 대비 제외된 기능

- 멤버십 / 결제 (토스페이먼츠)
- 회원가입 / 로그인
- 블로그 순위 크롤링
- 쿠팡 파트너스 URL 변환
- 뉴스레터 / 공지 / FAQ 공개 페이지

필요하면 개인용으로만 추가할 수 있습니다.
