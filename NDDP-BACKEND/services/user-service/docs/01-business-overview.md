# NDDTP User Service

**Database:** `nddtp_user` | **Port:** 3003

## Onboarding Flow

```
1. POST /users          → Create profile (PENDING) → publishes user.user.created
2. POST /auth/register  → Register credentials with returned userId
3. Auth publishes auth.user.registered → User Service marks hasCredentials=true, ACTIVE
4. Authorization Service assigns EMPLOYEE role
```

## Published Events

- `user.user.created`, `user.user.updated`, `user.user.deactivated`, `user.user.reactivated`, `user.user.deleted`

## Consumed Events

- `auth.user.registered` → marks credentials registered, activates user
