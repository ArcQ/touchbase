# Next.js + Firebase Auth Starter

### Development
To get server up locally:
1. Get Nextjs Server up on port 3000
```
cd client
yarn
yarn dev
```
2. Get Django Server up on port 8000
```
cd backend
DJANGO_SETTINGS_MODULE=backend.settings.stg pipenv run python manage.py runserver
OR
. ./run_manage stg runserver
```
Open localhost:3000 on a webbrowser

### Features
- [x] Tailwind with NextJs
- [x] Firebase Auth Wired Up
- [x] Starter Templates Ready To Go
- [x] Deploy to Vercel and GCP
- [x] SEO headers setup
- [x] 404 page
- [x] Error Boundary Catchall
- [x] Google Analytics
- [x] Cookie Consent
- [x] Auto Generate From Django Models To Swagger To Axios Api Client
- [x] Plop generators for components and pages
- [x] Crypto NFT helpers and Components
- [ ] App Name String Replacement on Project Initialization
- [ ] CI/CD from config
- [ ] Tests For Template Functionality
- [ ] YUP form validation

To set up sentry:
Set up a project and then for nextjs:
https://docs.sentry.io/platforms/javascript/guides/nextjs/
