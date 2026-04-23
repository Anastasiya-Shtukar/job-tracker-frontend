# AI Job Tracker Frontend

Frontend for the AI Job Tracker portfolio project. It helps track job applications, manage statuses, and use AI to improve job details before saving them.

## Live App

Add your deployed frontend URL here.

## Backend Repository

Add your backend repository link here.

## Features

- Add a new job entry
- Edit existing jobs in a modal
- Delete jobs
- Change application status
- Filter jobs by status
- Search by title or company
- Sort jobs by company name
- Generate improved job details with AI
- Handle loading, submitting, updating, deleting, and AI-generation states
- Show global and local error messages
- Show empty states for different UI cases

## Tech Stack

- React
- Vite
- JavaScript
- Fetch API
- CSS

## How It Works

### Main data flow

jobs  
→ fetch from backend  
→ store in state  
→ filter by status  
→ search by title/company  
→ sort  
→ render list

### AI suggestion flow

raw details input  
→ frontend request  
→ backend validation  
→ OpenAI API  
→ suggestion returned  
→ user accepts, edits, or discards

## Architecture

- `App.jsx` stores main application state and coordinates UI behavior.
- `Api.js` contains all frontend requests to the backend.
- Presentational and form logic are split into reusable components.
- AI suggestion flow is isolated inside the job form.

## Project Structure

```text
src/
  Components/
    EditModal.jsx
    JobForm.jsx
    JobItem.jsx
    JobList.jsx
    JobListControls.jsx
  Api.js
  App.jsx
```

## API Integration

The frontend uses an environment variable for the backend base URL:

```env
VITE_API_URL=your_backend_url
```

Example:

```env
VITE_API_URL=https://your-backend.onrender.com
```

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Create a `.env.local` file in the project root:

```env
VITE_API_URL=http://localhost:3000
```

### 3. Start development server

```bash
npm run dev
```

## Production

The frontend is deployed on Vercel.

For production, set:

```env
VITE_API_URL=https://your-backend.onrender.com
```

## Notes

- The frontend does not access the OpenAI API directly.
- AI requests go through the backend proxy.
- Backend URL is configured through Vite environment variables.

## Portfolio Goal

This project was built as a portfolio-ready fullstack application focused on real product behavior, clear data flow, and practical UX.
