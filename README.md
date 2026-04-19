# AI Job Tracker

A job tracking application with AI-assisted job details generation.

## Features

- Add / edit / delete jobs
- Track application status (applied / interview / rejected)
- Filter, search and sort jobs
- AI-powered job details suggestion

## Tech Stack

- React (Vite)
- Node.js (Express)
- OpenAI API

## AI Feature

Users can generate structured job details from raw input.

Flow:

details input  
→ frontend request  
→ backend validation  
→ OpenAI API  
→ suggestion returned  
→ user can accept or edit

## Architecture

- frontend → Api.js → backend
- backend → OpenAI API (proxy)

## Project Structure

src/
Components/
Api.js
App.jsx

## Setup

### Frontend

```bash
npm install
npm run dev
```
