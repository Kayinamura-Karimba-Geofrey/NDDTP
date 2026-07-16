# NDDTP Frontend Architecture

## Overview

Production-ready React 19 enterprise frontend for the **National Defence Digital Transformation Platform**, branded for the **Ministry of Defence / Rwanda Defence Force**.

## Official Branding Sources

- [Ministry of Defence Rwanda](https://mod.gov.rw)
- [RDF Flickr Logos](https://www.flickr.com/photos/rwandadefenceforce/albums/72177720315005780/)

## Incremental Delivery Status

| Phase | Module | Status |
|-------|--------|--------|
| 1 | Project Initialization | ✅ Complete |
| 2 | Folder Structure | ✅ Complete |
| 3 | Design System | ✅ Complete |
| 4 | Authentication | ✅ Complete |
| 5 | Dashboard | ✅ Complete |
| 6 | Layout Components | ✅ Complete |
| 7+ | Domain Modules | 🔲 Scaffolded (routes + placeholders) |

## Folder Structure

```
src/
├── app/           # Router, route guards
├── assets/        # Static images, fonts
├── components/    # Shared UI (design system)
├── constants/     # App config, navigation, branding
├── hooks/         # usePermissions, useTheme
├── layouts/       # MainLayout, Sidebar, Header, CommandPalette
├── modules/       # Feature modules (one per microservice)
├── services/      # Axios + RTK Query base API
├── store/         # Redux slices
├── types/         # Global TypeScript types
└── utils/         # cn(), formatters
```

## Next Modules (in order)

1. User Management
2. Personnel
3. Recruitment
4. … remaining domain modules per master prompt
