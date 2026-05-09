# AI Job Tracker Frontend

Frontend for the AI Job Tracker portfolio project. It helps users track job applications, manage statuses, use AI-assisted job parsing, and work with personal job data after authentication.

## Live App

Add your deployed frontend URL here.

## Backend Repository

Add your backend repository link here.

## Main Features

- User login and registration
- Token-based session handling with `localStorage`
- Automatic current-user check on app load
- Logout and session cleanup
- Protected job list: users only see their own jobs
- Add a new job entry
- Edit existing jobs in a modal
- Delete jobs
- Change application status
- Filter jobs by status
- Search by title or company
- Sort jobs by creation date or company name
- Extract job data with AI from pasted text or URL
- Generate improved job details with AI
- Handle loading, submitting, updating, deleting, auth, and AI-generation states
- Show toast notifications, local errors, global errors, and empty states
- Auto-scroll and highlight newly added jobs
- Graceful fallback when URL extraction fails

## Tech Stack

- React
- Vite
- JavaScript
- Fetch API
- CSS
- react-hot-toast

## Authentication Flow

On first load:

```text
localStorage token
→ /auth/me request
→ valid token: user is restored
→ invalid token: token is removed and user is logged out
```

Login flow:

```text
email + password
→ frontend validation
→ POST /auth/login
→ backend returns user + JWT
→ token is stored in localStorage
→ authenticated app is shown
```

Register flow:

```text
email + password
→ POST /auth/register
→ account is created
→ frontend immediately logs the user in
→ token is stored in localStorage
```

Logout flow:

```text
logout click
→ token removed from localStorage
→ user state cleared
→ jobs state cleared
→ auth form is shown
```

## Job Data Flow

```text
authenticated user
→ fetch jobs with Bearer token
→ store jobs in App.jsx state
→ filter by status
→ search by title/company
→ sort
→ render list
```

All job requests include the JWT token in the `Authorization` header.

## AI Extraction Flow

User provides:

- job URL, or
- full job posting text, or
- both

Flow:

```text
job URL or text
→ frontend request
→ backend attempts to fetch and clean page content if URL is provided
→ OpenAI processes the source text
→ structured data is returned
→ frontend fills form fields
→ user reviews and edits before saving
```

AI never saves data automatically.

## AI Suggestion Flow

```text
raw details input
→ frontend request
→ backend validation
→ OpenAI API
→ suggestion returned
→ user accepts, edits, or discards
```

## UX Decisions

- Authentication gates the main app instead of showing empty job data to anonymous users.
- AI-assisted data is always editable before saving.
- Partial AI extraction results are allowed.
- URL extraction has manual fallback because many job boards block scraping.
- Add and edit actions use modals to keep the main job list focused.
- Toasts are used for successful actions and important failures.
- Empty states explain whether there are no jobs, no matching statuses, or no search results.

## Architecture

- `App.jsx` owns authentication state, job state, filtering, sorting, modal state, and main orchestration.
- `Api.js` isolates all backend requests.
- `AuthForm.jsx` handles login/register form UI and submit state.
- `JobForm.jsx` handles job creation and AI-assisted fields.
- `JobList.jsx` renders the list.
- `JobItem.jsx` renders a single job card.
- `JobListControls.jsx` handles filter/search/sort controls.
- `EditModal.jsx` handles job editing.

## Project Structure

```text
src/
  Components/
    AuthForm.jsx
    EditModal.jsx
    JobForm.jsx
    JobItem.jsx
    JobList.jsx
    JobListControls.jsx
  Api.js
  App.jsx
  main.jsx
  styles/
```

## API Integration

The frontend uses an environment variable for the backend base URL:

```env
VITE_API_URL=your_backend_url
```

Local example:

```env
VITE_API_URL=http://localhost:3000
```

Production example:

```env
VITE_API_URL=https://your-backend.onrender.com
```

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Create `.env.local` in the frontend project root:

```env
VITE_API_URL=http://localhost:3000
```

### 3. Start development server

```bash
npm run dev
```

## Production

The frontend is intended to be deployed on Vercel.

Required production environment variable:

```env
VITE_API_URL=https://your-backend-url
```

## Current Limitations

- Password reset is not implemented yet.
- There is no email verification.
- Token is stored in `localStorage`, which is simple but not the strongest production security model.
- No pagination yet.
- AI URL extraction is best-effort and depends on whether the source website allows server-side fetching.

## Portfolio Goal

This project is built as a portfolio-ready fullstack application focused on real product behavior, clean data flow, authentication, practical UX, and useful AI-assisted features.
