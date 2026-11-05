# DevOps Feedback Hub

A small full-stack feedback application created for DevOps practice.

## Stack
- Frontend: HTML, CSS, JavaScript
- Web server: Nginx (you will containerize it)
- Backend: Node.js + Express
- Database: MongoDB
- DevOps: Docker, Docker Compose, GitHub Actions, Trivy, Amazon ECR

## Your DevOps tasks
Create these yourself:
- `frontend/Dockerfile`
- `backend/Dockerfile`
- `docker-compose.yml`
- `.github/workflows/ci-cd.yml`

The application code is already provided. Do not change the application unless you need to fix an issue you discover during testing.

## Backend
The backend listens on port 5000 and expects `MONGO_URL` as an environment variable.

Endpoints:
- GET `/`
- GET `/health`
- GET `/api/feedback`
- POST `/api/feedback`

## Tests
Tests are in `backend/test/server.test.js`.

After installing dependencies, run:

```bash
npm test
```

## Goal
Containerize frontend and backend separately, run them with MongoDB using Compose, then build/tag/publish both application images to ECR through GitHub Actions.
