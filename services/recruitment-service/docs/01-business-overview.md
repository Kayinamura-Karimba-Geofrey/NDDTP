# NDDTP Recruitment Service — Business Overview

## Purpose

The Recruitment Service manages the end-to-end hiring pipeline for the National Defence Digital Transformation Platform — from job postings through applications, interviews, and hiring decisions.

## Responsibilities

- Job posting lifecycle (draft → published → closed)
- Public application submission for open positions
- Candidate profile management
- Application pipeline with status workflow
- Interview scheduling and feedback
- Recruitment pipeline analytics
- Event publishing for audit and downstream onboarding

## Key Business Rules

- Only PUBLISHED postings accept applications
- One application per candidate per job posting
- Application status follows defined transition rules
- Interviews schedulable only for SCREENING/INTERVIEW applications
- Hiring auto-increments `positionsFilled` and closes posting when full
- Public endpoints: published listings and application submission

## Dependencies

- PostgreSQL (`nddtp_recruitment`)
- Redis (DB 6)
- RabbitMQ
- Auth Service (JWT for recruiter endpoints)
