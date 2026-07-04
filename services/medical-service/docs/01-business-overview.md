# NDDTP Medical Service — Business Overview

## Purpose

The Medical Service manages healthcare operations for National Defence personnel — facilities, appointments, medical records, fitness assessments, and certificates.

## Responsibilities

- Medical facility catalog (clinics, hospitals, field units, dental, mental health)
- Appointment scheduling and workflow management
- Medical record keeping (consultations, lab results, diagnoses, prescriptions)
- Fitness-for-duty assessments (fit, temporarily unfit, permanently unfit, limited duty)
- Medical certificate issuance (sick leave, fitness, clearance, travel)
- Event publishing for notifications, leave integration, and audit

## Key Business Rules

- Appointments must be scheduled in the future at active facilities
- Facility daily capacity is enforced
- Only medical staff can create records and assess fitness
- New fitness assessment revokes previous active assessment
- Certificates follow draft → issued → revoked/expired workflow
- Approved amount and fitness status are cached in Redis

## Permissions

- `medical:read:facilities` / `medical:manage:facilities`
- `medical:read:appointments` / `medical:manage:appointments`
- `medical:read:records` / `medical:manage:records`
- `medical:read:fitness` / `medical:manage:fitness`
- `medical:read:certificates` / `medical:manage:certificates`

## Dependencies

PostgreSQL (`nddtp_medical`), Redis (DB 9), RabbitMQ, Auth Service (JWT)
