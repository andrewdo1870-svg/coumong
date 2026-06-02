# Coumong WebView App - 디자인 문서

## 개요

coumong.com 웹사이트를 전체 화면 웹뷰로 표시하는 모바일 앱입니다. 맥 없이도 Expo를 통해 개발 및 배포가 가능합니다.

## Screen List

| 화면 | 설명 |
|------|------|
| WebView (Home) | coumong.com을 전체 화면으로 표시하는 메인 화면 |

## Primary Content and Functionality

### WebView 화면
- **콘텐츠**: coumong.com 웹사이트 전체를 WebView로 로드
- **기능**:
  - 전체 화면 웹뷰 (탭 바 없음, 상태바만 표시)
  - 뒤로 가기 제스처/버튼 지원
  - 로딩 인디케이터 표시
  - 네트워크 오류 시 재시도 화면
  - Pull-to-refresh 지원

## Key User Flows

1. **앱 실행** → 스플래시 화면 → coumong.com 로드 → 웹뷰 표시
2. **페이지 탐색** → 웹뷰 내 링크 클릭 → 페이지 이동 → 뒤로 가기로 복귀
3. **네트워크 오류** → 오류 화면 표시 → 재시도 버튼 → 재로드

## Color Choices

| 용도 | 색상 | 코드 |
|------|------|------|
| Primary (브랜드) | 블루 | #2563EB |
| Background | 화이트 | #FFFFFF |
| Foreground (텍스트) | 다크 그레이 | #1F2937 |
| Error | 레드 | #EF4444 |
| Loading Indicator | Primary Blue | #2563EB |

## 레이아웃

- 탭 바 없이 단일 화면 구성
- 상태바는 표시하되 웹뷰가 나머지 전체 영역을 차지
- SafeArea 적용하여 노치/홈 인디케이터 영역 보호
