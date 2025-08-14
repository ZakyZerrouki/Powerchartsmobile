
# Power Chart — PWA Build
Generated: 2025-08-14T19:43:27.907836Z

## Use
1) Unzip this folder.
2) Open `index.html` in a browser to run locally, or host the folder on any static host.
3) On Android/Chrome or iOS/Safari, open the site and choose **Add to Home Screen** to install.

## Files added
- `manifest.webmanifest` — PWA metadata
- `service-worker.js` — offline cache & installability
- `assets/icons/*` — app icons

## Next steps (optional)
- For Play/App Store binaries, wrap this PWA with Capacitor:
  - `npm init -y && npm i @capacitor/core @capacitor/cli`
  - `npx cap init "Power Chart" "app.powerchart"`
  - Put these PWA files into `./public/` (or set `server.url`) and run:
  - `npx cap add android` / `npx cap add ios`
  - `npx cap copy && npx cap open android` (or ios) to build.
