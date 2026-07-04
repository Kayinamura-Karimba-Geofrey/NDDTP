# NDDTP Recruitment Service — Database Design

## Database: `nddtp_recruitment`

| Table | Purpose |
|-------|---------|
| `job_postings` | Vacancy definitions with status lifecycle |
| `candidates` | Applicant profiles |
| `applications` | Candidate applications to postings |
| `application_status_history` | Append-only status change audit |
| `interviews` | Scheduled interviews with feedback |

### Events Published

- `recruitment.posting.created/published/closed`
- `recruitment.application.submitted/status.changed/hired`
- `recruitment.interview.scheduled/completed`
