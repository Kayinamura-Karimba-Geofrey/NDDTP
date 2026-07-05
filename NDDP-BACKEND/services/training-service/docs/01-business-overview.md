# NDDTP Training Service — Business Overview

## Purpose

The Training Service manages professional development and skills training for National Defence personnel — courses, sessions, enrollments, attendance, and certifications.

## Responsibilities

- Training course catalog (combat, leadership, technical, compliance, specialized)
- Session scheduling with instructor and capacity management
- Enrollment request and approval workflow
- Daily attendance tracking during sessions
- Certification issuance upon course completion
- Event publishing for notifications, personnel records, and audit

## Key Business Rules

- Enrollments require approval before seat assignment
- Session capacity is enforced at enrollment time
- Attendance only for enrolled/in-progress/completed enrollments
- Certifications issued only for completed enrollments
- One active enrollment per user per session

## Permissions

- `training:read:courses` / `training:manage:courses`
- `training:read:sessions` / `training:manage:sessions`
- `training:read:enrollments` / `training:manage:enrollments`
- `training:read:certifications` / `training:manage:certifications`

## Dependencies

PostgreSQL (`nddtp_training`), Redis (DB 10), RabbitMQ, Auth Service (JWT)
