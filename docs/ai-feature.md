# AI Feature: Job Details Suggestion

## Goal

Help users generate clean job details from raw input.

## Flow

User input  
→ frontend request  
→ backend validation  
→ OpenAI API  
→ suggestion returned  
→ user accepts or edits

## Design Decisions

- AI is assistive, not automatic
- user controls final data
- backend protects API key
- simple and focused use case

## UX

- loading state
- error handling
- editable suggestion
