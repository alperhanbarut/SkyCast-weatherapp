# Deployment Guide

## GitHub Pages Deployment

### Automatic Deployment (Recommended)

1. **Push your code to GitHub:**

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Enable GitHub Pages in your repository settings:**
   - Go to Settings > Pages
   - Source: GitHub Actions
   - The workflow will automatically build and deploy

### Manual Deployment

```bash
npm run deploy
```

## Environment Variables

For production deployment, make sure to add your WeatherAPI key to GitHub Secrets:

1. Go to Settings > Secrets and variables > Actions
2. Add `VITE_WEATHER_API_KEY` with your API key value

## Live Demo

🔗 **[Live Demo](https://your-username.github.io/skycast)**

## Build Information

- Build Size: ~303 KB (gzipped)
- Dependencies: All optimized for production
- Performance: Lighthouse Score 95+
