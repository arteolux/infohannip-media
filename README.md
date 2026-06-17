# infohannip-media

정보한닢(infohannip) 전용 이미지 자산 저장소

## 분리 원칙
- 이 레포는 **정보한닢 전용**입니다.
- AREUMIEUR(Shopify/패션/커머스)와 **완전히 분리**되어야 합니다.
- AREUMIEUR Shopify Files, AREUMIEUR CDN, AREUMIEUR GitHub 경로(`arteolux/sns-media`)를 정보한닢 용도로 사용하지 않습니다.
- 반대로 이 레포의 이미지도 AREUMIEUR 용도로 쓰지 않습니다.

## 용도
- 정보한닢 로고
- 정보한닢 Pinterest 카드 이미지
- 정보한닢 SNS 썸네일
- 정보한닢 외부유입용 이미지 (Naver Blog → Pinterest/Facebook/Band/Cafe)

## 폴더 구조
```
assets/
  pinterest/        # Pinterest 카드 이미지
  logo/             # 정보한닢 로고·프로필 이미지
  sns_thumbnail/     # SNS 썸네일
```

## Public Raw URL 형식
```
https://raw.githubusercontent.com/arteolux/infohannip-media/main/assets/{폴더}/{파일명}
```

예시:
```
https://raw.githubusercontent.com/arteolux/infohannip-media/main/assets/pinterest/infohannip-test-card.png
https://raw.githubusercontent.com/arteolux/infohannip-media/main/assets/logo/infohannip-profile.png
```
