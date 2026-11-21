# Molala

모바일 웹 기반 메신저형 비주얼 노벨 프로젝트입니다.

## 로컬 실행

```bash
npm ci
npm run dev
```

## GitHub Pages

`main` 브랜치에 푸시하면 `.github/workflows/deploy.yml`에서 Vite 빌드 후 `dist`를 배포합니다.

GitHub 저장소의 **Settings → Pages → Source**를 **GitHub Actions**로 설정하세요.

배포 주소: https://dnsgk4983.github.io/molala/

`vite.config.js`의 `base: '/molala/'` 설정을 유지해야 합니다.

이전 버전에서 사용하던 `morara_*` localStorage 키는 기존 저장 기록 복구를 위해서만 코드에 남겨두었습니다.
