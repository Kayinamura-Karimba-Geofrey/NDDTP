# NDDTP Enterprise Services Reference Manual

This document provides a comprehensive overview of all operational services and modules configured on the **National Defence Digital Transformation Platform (NDDTP)** sidebar navigation. Each service is listed below with its purpose, module name, and individual component endpoints.

---

## 📦 Administration
* **Module Key:** `admin`
* **Description:** Manages global settings, namespaces, revisions, master entries, system health, and system-wide configurations.

### Service Components:

* **Dashboard** (Path: `/administration/dashboard`)
  Defines the component views and actions for managing dashboard within the administration module.

---

## 📦 AI Assistant
* **Module Key:** `ai-assistant`
* **Description:** Integrates natural language processing and platform intelligence to assist users with commands, queries, log reviews, and smart actions.

### Service Components:

* **Dashboard** (Path: `/ai-assistant/dashboard`)
  Defines the component views and actions for managing dashboard within the ai assistant module.

* **Agents** (Path: `/ai-assistant/agents`)
  Defines the component views and actions for managing agents within the ai assistant module.

* **Conversations** (Path: `/ai-assistant/conversations`)
  Defines the component views and actions for managing conversations within the ai assistant module.

* **My Chats** (Path: `/ai-assistant/conversations/mine`)
  Defines the component views and actions for managing my chats within the ai assistant module.

* **Reports** (Path: `/ai-assistant/reports`)
  Defines the component views and actions for managing reports within the ai assistant module.

* **Settings** (Path: `/ai-assistant/settings`)
  Defines the component views and actions for managing settings within the ai assistant module.

---

## 📦 Asset Management
* **Module Key:** `assets`
* **Description:** Tracks physical and digital assets, including asset registries, lifecycle phases, transfers, depreciation, audits, and configuration settings.

### Service Components:

* **Dashboard** (Path: `/assets/dashboard`)
  Defines the component views and actions for managing dashboard within the asset management module.

* **Registry** (Path: `/assets/registry`)
  Defines the component views and actions for managing registry within the asset management module.

* **Categories** (Path: `/assets/categories`)
  Defines the component views and actions for managing categories within the asset management module.

* **Assignment** (Path: `/assets/assignment`)
  Defines the component views and actions for managing assignment within the asset management module.

* **Maintenance** (Path: `/assets/maintenance`)
  Defines the component views and actions for managing maintenance within the asset management module.

* **Inspections** (Path: `/assets/inspections`)
  Defines the component views and actions for managing inspections within the asset management module.

* **Reservations** (Path: `/assets/reservations`)
  Defines the component views and actions for managing reservations within the asset management module.

* **Audit** (Path: `/assets/audit`)
  Defines the component views and actions for managing audit within the asset management module.

* **Reports** (Path: `/assets/reports`)
  Defines the component views and actions for managing reports within the asset management module.

* **Settings** (Path: `/assets/settings`)
  Defines the component views and actions for managing settings within the asset management module.

---

## 📦 Audit & Compliance
* **Module Key:** `audit`
* **Description:** Provides a comprehensive view of the platform's security posture, tracking immutable logs, trace spans (Jaeger/Zipkin style), alerts, and compliance standards.

### Service Components:

* **Dashboard** (Path: `/audit/dashboard`)
  Defines the component views and actions for managing dashboard within the audit & compliance module.

* **Audit Logs** (Path: `/audit/logs`)
  Defines the component views and actions for managing audit logs within the audit & compliance module.

* **Security Events** (Path: `/audit/security-events`)
  Defines the component views and actions for managing security events within the audit & compliance module.

* **Compliance** (Path: `/audit/compliance`)
  Defines the component views and actions for managing compliance within the audit & compliance module.

* **Alert Center** (Path: `/audit/alerts`)
  Defines the component views and actions for managing alert center within the audit & compliance module.

* **Tracing** (Path: `/audit/tracing`)
  Defines the component views and actions for managing tracing within the audit & compliance module.

* **System Health** (Path: `/audit/system-monitoring`)
  Defines the component views and actions for managing system health within the audit & compliance module.

* **Log Explorer** (Path: `/audit/log-explorer`)
  Defines the component views and actions for managing log explorer within the audit & compliance module.

* **Reports** (Path: `/audit/reports`)
  Defines the component views and actions for managing reports within the audit & compliance module.

* **Settings** (Path: `/audit/settings`)
  Defines the component views and actions for managing settings within the audit & compliance module.

---

## 📦 Calendar
* **Module Key:** `calendar`
* **Description:** Handles calendar-based scheduling for individuals, units, and departments, including event tracking and integrations.

### Service Components:

* **Dashboard** (Path: `/calendar/dashboard`)
  Defines the component views and actions for managing dashboard within the calendar module.

* **Calendar View** (Path: `/calendar/view`)
  Defines the component views and actions for managing calendar view within the calendar module.

* **My Events** (Path: `/calendar/my-events`)
  Defines the component views and actions for managing my events within the calendar module.

* **All Events** (Path: `/calendar/events`)
  Defines the component views and actions for managing all events within the calendar module.

* **Calendars** (Path: `/calendar/calendars`)
  Defines the component views and actions for managing calendars within the calendar module.

* **Invitations** (Path: `/calendar/invitations`)
  Defines the component views and actions for managing invitations within the calendar module.

* **Rooms** (Path: `/calendar/rooms`)
  Defines the component views and actions for managing rooms within the calendar module.

* **Holidays** (Path: `/calendar/holidays`)
  Defines the component views and actions for managing holidays within the calendar module.

* **Reports** (Path: `/calendar/reports`)
  Defines the component views and actions for managing reports within the calendar module.

* **Settings** (Path: `/calendar/settings`)
  Defines the component views and actions for managing settings within the calendar module.

---

## 📦 Notification & Communication
* **Module Key:** `communication`
* **Description:** Manages communication broadcasts, surveys, general announcements, templates, and feedback portals.

### Service Components:

* **Dashboard** (Path: `/notifications/dashboard`)
  Defines the component views and actions for managing dashboard within the notification & communication module.

* **Notification Center** (Path: `/notifications/center`)
  Defines the component views and actions for managing notification center within the notification & communication module.

* **My Notifications** (Path: `/notifications/my`)
  Defines the component views and actions for managing my notifications within the notification & communication module.

* **Announcements** (Path: `/notifications/announcements`)
  Defines the component views and actions for managing announcements within the notification & communication module.

* **Broadcast** (Path: `/notifications/broadcast`)
  Defines the component views and actions for managing broadcast within the notification & communication module.

* **Templates** (Path: `/notifications/templates`)
  Defines the component views and actions for managing templates within the notification & communication module.

* **Delivery** (Path: `/notifications/delivery`)
  Defines the component views and actions for managing delivery within the notification & communication module.

* **Reports** (Path: `/notifications/reports`)
  Defines the component views and actions for managing reports within the notification & communication module.

* **Settings** (Path: `/notifications/settings`)
  Defines the component views and actions for managing settings within the notification & communication module.

---

## 📦 Dashboard
* **Module Key:** `dashboard`
* **Description:** Provides primary operational overviews, key metrics widgets, interactive reports, and personalized workspace dashboards.

### Service Components:

* **Home Dashboard** (Path: `/dashboard`)
  Defines the component views and actions for managing home dashboard within the dashboard module.

---

## 📦 Documents & Records
* **Module Key:** `dms`
* **Description:** A full Document Management System supporting hierarchical folders, tag-based taxonomy, versioning, access control lists, and content indexing.

### Service Components:

* **Dashboard** (Path: `/dms/dashboard`)
  Defines the component views and actions for managing dashboard within the documents & records module.

* **Library** (Path: `/dms/library`)
  Defines the component views and actions for managing library within the documents & records module.

* **My Documents** (Path: `/dms/my-documents`)
  Defines the component views and actions for managing my documents within the documents & records module.

* **Shared** (Path: `/dms/shared`)
  Defines the component views and actions for managing shared within the documents & records module.

* **Folders** (Path: `/dms/folders`)
  Defines the component views and actions for managing folders within the documents & records module.

* **Upload** (Path: `/dms/upload`)
  Defines the component views and actions for managing upload within the documents & records module.

* **Approvals** (Path: `/dms/approvals`)
  Defines the component views and actions for managing approvals within the documents & records module.

* **Signatures** (Path: `/dms/signatures`)
  Defines the component views and actions for managing signatures within the documents & records module.

* **Retention** (Path: `/dms/retention`)
  Defines the component views and actions for managing retention within the documents & records module.

* **Search** (Path: `/dms/search`)
  Defines the component views and actions for managing search within the documents & records module.

* **Reports** (Path: `/dms/reports`)
  Defines the component views and actions for managing reports within the documents & records module.

* **Settings** (Path: `/dms/settings`)
  Defines the component views and actions for managing settings within the documents & records module.

---

## 📦 Facilities
* **Module Key:** `facilities`
* **Description:** Oversees physical locations, room reservations, building maps, access controls, keycard registries, and occupancy logs.

### Service Components:

* **Dashboard** (Path: `/facilities/dashboard`)
  Defines the component views and actions for managing dashboard within the facilities module.

* **Directory** (Path: `/facilities/directory`)
  Defines the component views and actions for managing directory within the facilities module.

* **Types** (Path: `/facilities/types`)
  Defines the component views and actions for managing types within the facilities module.

* **Spaces** (Path: `/facilities/spaces`)
  Defines the component views and actions for managing spaces within the facilities module.

* **Available** (Path: `/facilities/spaces/available`)
  Defines the component views and actions for managing available within the facilities module.

* **Bookings** (Path: `/facilities/bookings`)
  Defines the component views and actions for managing bookings within the facilities module.

* **Occupancy** (Path: `/facilities/occupancy`)
  Defines the component views and actions for managing occupancy within the facilities module.

* **Utilities** (Path: `/facilities/utilities`)
  Defines the component views and actions for managing utilities within the facilities module.

* **Inspections** (Path: `/facilities/inspections`)
  Defines the component views and actions for managing inspections within the facilities module.

* **Access** (Path: `/facilities/access`)
  Defines the component views and actions for managing access within the facilities module.

* **Reports** (Path: `/facilities/reports`)
  Defines the component views and actions for managing reports within the facilities module.

* **Settings** (Path: `/facilities/settings`)
  Defines the component views and actions for managing settings within the facilities module.

---

## 📦 Finance & Budget
* **Module Key:** `finance`
* **Description:** Tracks budgets, general ledgers, invoices, expense reports, billing approvals, financial audits, and regulatory reporting.

### Service Components:

* **Dashboard** (Path: `/finance/dashboard`)
  Defines the component views and actions for managing dashboard within the finance & budget module.

* **Budget Allocation** (Path: `/finance/budget-allocation`)
  Defines the component views and actions for managing budget allocation within the finance & budget module.

* **Budget Monitoring** (Path: `/finance/budget-monitoring`)
  Defines the component views and actions for managing budget monitoring within the finance & budget module.

* **Cost Centers** (Path: `/finance/cost-centers`)
  Defines the component views and actions for managing cost centers within the finance & budget module.

* **Expenditures** (Path: `/finance/expenditures`)
  Defines the component views and actions for managing expenditures within the finance & budget module.

* **Invoices** (Path: `/finance/invoices`)
  Defines the component views and actions for managing invoices within the finance & budget module.

* **Payments** (Path: `/finance/payments`)
  Defines the component views and actions for managing payments within the finance & budget module.

* **Approvals** (Path: `/finance/approvals`)
  Defines the component views and actions for managing approvals within the finance & budget module.

* **Reports** (Path: `/finance/reports`)
  Defines the component views and actions for managing reports within the finance & budget module.

* **Settings** (Path: `/finance/settings`)
  Defines the component views and actions for managing settings within the finance & budget module.

---

## 📦 Logistics & Fleet
* **Module Key:** `fleet`
* **Description:** Manages vehicles, driver assignments, fuel consumption logs, maintenance histories, dispatch requests, and real-time GPS telemetry.

### Service Components:

* **Dashboard** (Path: `/fleet/dashboard`)
  Defines the component views and actions for managing dashboard within the logistics & fleet module.

* **Fleet Registry** (Path: `/fleet/registry`)
  Defines the component views and actions for managing fleet registry within the logistics & fleet module.

* **Drivers** (Path: `/fleet/drivers`)
  Defines the component views and actions for managing drivers within the logistics & fleet module.

* **Assignments** (Path: `/fleet/assignments`)
  Defines the component views and actions for managing assignments within the logistics & fleet module.

* **Trip Requests** (Path: `/fleet/trip-requests`)
  Defines the component views and actions for managing trip requests within the logistics & fleet module.

* **Dispatch** (Path: `/fleet/dispatch`)
  Defines the component views and actions for managing dispatch within the logistics & fleet module.

* **Fuel** (Path: `/fleet/fuel`)
  Defines the component views and actions for managing fuel within the logistics & fleet module.

* **Maintenance** (Path: `/fleet/maintenance`)
  Defines the component views and actions for managing maintenance within the logistics & fleet module.

* **Approvals** (Path: `/fleet/approvals`)
  Defines the component views and actions for managing approvals within the logistics & fleet module.

* **Reports** (Path: `/fleet/reports`)
  Defines the component views and actions for managing reports within the logistics & fleet module.

* **Settings** (Path: `/fleet/settings`)
  Defines the component views and actions for managing settings within the logistics & fleet module.

---

## 📦 Reporting & Analytics
* **Module Key:** `insights`
* **Description:** Advanced analytics platform offering custom dashboards, predictive modelling, business intelligence (BI) reports, and automated exports.

### Service Components:

* **Executive Dashboard** (Path: `/reports/dashboard`)
  Defines the component views and actions for managing executive dashboard within the reporting & analytics module.

* **Operational** (Path: `/reports/operational`)
  Defines the component views and actions for managing operational within the reporting & analytics module.

* **KPI Management** (Path: `/reports/kpis`)
  Defines the component views and actions for managing kpi management within the reporting & analytics module.

* **Report Library** (Path: `/reports/library`)
  Defines the component views and actions for managing report library within the reporting & analytics module.

* **Report Builder** (Path: `/reports/builder`)
  Defines the component views and actions for managing report builder within the reporting & analytics module.

* **Analytics** (Path: `/reports/analytics`)
  Defines the component views and actions for managing analytics within the reporting & analytics module.

* **Forecasting** (Path: `/reports/forecasting`)
  Defines the component views and actions for managing forecasting within the reporting & analytics module.

* **Data Exports** (Path: `/reports/exports`)
  Defines the component views and actions for managing data exports within the reporting & analytics module.

* **BI Integrations** (Path: `/reports/integrations`)
  Defines the component views and actions for managing bi integrations within the reporting & analytics module.

* **Settings** (Path: `/reports/settings`)
  Defines the component views and actions for managing settings within the reporting & analytics module.

---

## 📦 Inventory & Warehouse
* **Module Key:** `inventory`
* **Description:** Tracks warehouses, inventory item registers, real-time stock balances, goods receipts (GRN), goods issues, and internal transfers.

### Service Components:

* **Dashboard** (Path: `/inventory/dashboard`)
  Defines the component views and actions for managing dashboard within the inventory & warehouse module.

* **Warehouses** (Path: `/inventory/warehouses`)
  Defines the component views and actions for managing warehouses within the inventory & warehouse module.

* **Items** (Path: `/inventory/items`)
  Defines the component views and actions for managing items within the inventory & warehouse module.

* **Stock Levels** (Path: `/inventory/stock-levels`)
  Defines the component views and actions for managing stock levels within the inventory & warehouse module.

* **Goods Receipt** (Path: `/inventory/goods-receipt`)
  Defines the component views and actions for managing goods receipt within the inventory & warehouse module.

* **Goods Issue** (Path: `/inventory/goods-issue`)
  Defines the component views and actions for managing goods issue within the inventory & warehouse module.

* **Requests** (Path: `/inventory/requests`)
  Defines the component views and actions for managing requests within the inventory & warehouse module.

* **Transfers** (Path: `/inventory/transfers`)
  Defines the component views and actions for managing transfers within the inventory & warehouse module.

* **Expiry** (Path: `/inventory/expiry`)
  Defines the component views and actions for managing expiry within the inventory & warehouse module.

* **Reports** (Path: `/inventory/reports`)
  Defines the component views and actions for managing reports within the inventory & warehouse module.

* **Settings** (Path: `/inventory/settings`)
  Defines the component views and actions for managing settings within the inventory & warehouse module.

---

## 📦 Leave Management
* **Module Key:** `leave`
* **Description:** Controls employee leave balances, requests submission, team calendars, public holiday configurations, and multi-tier approval flows.

### Service Components:

* **Dashboard** (Path: `/leave/dashboard`)
  Defines the component views and actions for managing dashboard within the leave management module.

* **My Leave** (Path: `/leave/my-leave`)
  Defines the component views and actions for managing my leave within the leave management module.

* **Requests** (Path: `/leave/requests`)
  Defines the component views and actions for managing requests within the leave management module.

* **Calendar** (Path: `/leave/calendar`)
  Defines the component views and actions for managing calendar within the leave management module.

* **Team Calendar** (Path: `/leave/team-calendar`)
  Defines the component views and actions for managing team calendar within the leave management module.

* **Balances** (Path: `/leave/balances`)
  Defines the component views and actions for managing balances within the leave management module.

* **Leave Types** (Path: `/leave/types`)
  Defines the component views and actions for managing leave types within the leave management module.

* **Holidays** (Path: `/leave/holidays`)
  Defines the component views and actions for managing holidays within the leave management module.

* **Approvals** (Path: `/leave/approvals`)
  Defines the component views and actions for managing approvals within the leave management module.

---

## 📦 Logistics
* **Module Key:** `logistics`
* **Description:** Coordinates shipments, delivery routing, geographic tracking, cargo manifests, logistics partners, and performance metrics.

### Service Components:

* **Dashboard** (Path: `/logistics/dashboard`)
  Defines the component views and actions for managing dashboard within the logistics module.

* **Shipments** (Path: `/logistics/shipments`)
  Defines the component views and actions for managing shipments within the logistics module.

* **My Shipments** (Path: `/logistics/shipments/mine`)
  Defines the component views and actions for managing my shipments within the logistics module.

* **Locations** (Path: `/logistics/locations`)
  Defines the component views and actions for managing locations within the logistics module.

* **Routes** (Path: `/logistics/routes`)
  Defines the component views and actions for managing routes within the logistics module.

* **Tracking** (Path: `/logistics/tracking`)
  Defines the component views and actions for managing tracking within the logistics module.

* **Reports** (Path: `/logistics/reports`)
  Defines the component views and actions for managing reports within the logistics module.

* **Settings** (Path: `/logistics/settings`)
  Defines the component views and actions for managing settings within the logistics module.

---

## 📦 Maintenance
* **Module Key:** `maintenance`
* **Description:** Manages corrective work orders, preventive maintenance programs, technicians tracking, parts inventory, and SLA agreements.

### Service Components:

* **Dashboard** (Path: `/maintenance/dashboard`)
  Defines the component views and actions for managing dashboard within the maintenance module.

* **Work Orders** (Path: `/maintenance/work-orders`)
  Defines the component views and actions for managing work orders within the maintenance module.

* **Requests** (Path: `/maintenance/requests`)
  Defines the component views and actions for managing requests within the maintenance module.

* **Pending** (Path: `/maintenance/requests/pending`)
  Defines the component views and actions for managing pending within the maintenance module.

* **Preventive** (Path: `/maintenance/preventive`)
  Defines the component views and actions for managing preventive within the maintenance module.

* **Technicians** (Path: `/maintenance/technicians`)
  Defines the component views and actions for managing technicians within the maintenance module.

* **Parts** (Path: `/maintenance/parts`)
  Defines the component views and actions for managing parts within the maintenance module.

* **SLA** (Path: `/maintenance/sla`)
  Defines the component views and actions for managing sla within the maintenance module.

* **Reports** (Path: `/maintenance/reports`)
  Defines the component views and actions for managing reports within the maintenance module.

* **Settings** (Path: `/maintenance/settings`)
  Defines the component views and actions for managing settings within the maintenance module.

---

## 📦 Medical
* **Module Key:** `medical`
* **Description:** Manages personnel health records, periodic check-ups, medical clearance certificates, appointment scheduling, and referrals.

### Service Components:

* **Dashboard** (Path: `/medical/dashboard`)
  Defines the component views and actions for managing dashboard within the medical module.

* **My Medical** (Path: `/medical/my-medical`)
  Defines the component views and actions for managing my medical within the medical module.

* **Profiles** (Path: `/medical/profiles`)
  Defines the component views and actions for managing profiles within the medical module.

---

## 📦 Messaging
* **Module Key:** `messaging`
* **Description:** Real-time communication framework offering private chats, topic-based channels, group conversations, file uploads, and delivery receipts.

### Service Components:

* **Dashboard** (Path: `/messaging/dashboard`)
  Defines the component views and actions for managing dashboard within the messaging module.

* **Inbox** (Path: `/messaging/inbox`)
  Defines the component views and actions for managing inbox within the messaging module.

* **Channels** (Path: `/messaging/channels`)
  Defines the component views and actions for managing channels within the messaging module.

* **Direct** (Path: `/messaging/direct`)
  Defines the component views and actions for managing direct within the messaging module.

* **Groups** (Path: `/messaging/groups`)
  Defines the component views and actions for managing groups within the messaging module.

* **Compose** (Path: `/messaging/compose`)
  Defines the component views and actions for managing compose within the messaging module.

* **Receipts** (Path: `/messaging/receipts`)
  Defines the component views and actions for managing receipts within the messaging module.

* **Search** (Path: `/messaging/search`)
  Defines the component views and actions for managing search within the messaging module.

* **Settings** (Path: `/messaging/settings`)
  Defines the component views and actions for managing settings within the messaging module.

---

## 📦 Performance Management
* **Module Key:** `performance`
* **Description:** Oversees employee objectives (KPIs/OKRs), review cycles, peer feedback sessions, career development plans, and approvals.

### Service Components:

* **Dashboard** (Path: `/performance/dashboard`)
  Defines the component views and actions for managing dashboard within the performance management module.

* **My Performance** (Path: `/performance/my-performance`)
  Defines the component views and actions for managing my performance within the performance management module.

* **Objectives** (Path: `/performance/objectives`)
  Defines the component views and actions for managing objectives within the performance management module.

* **Reviews** (Path: `/performance/reviews`)
  Defines the component views and actions for managing reviews within the performance management module.

* **Feedback** (Path: `/performance/feedback`)
  Defines the component views and actions for managing feedback within the performance management module.

* **Recognition** (Path: `/performance/recognition`)
  Defines the component views and actions for managing recognition within the performance management module.

* **Development Plans** (Path: `/performance/development-plans`)
  Defines the component views and actions for managing development plans within the performance management module.

* **Review Cycles** (Path: `/performance/review-cycles`)
  Defines the component views and actions for managing review cycles within the performance management module.

* **Approvals** (Path: `/performance/approvals`)
  Defines the component views and actions for managing approvals within the performance management module.

* **Reports** (Path: `/performance/reports`)
  Defines the component views and actions for managing reports within the performance management module.

* **Settings** (Path: `/performance/settings`)
  Defines the component views and actions for managing settings within the performance management module.

---

## 📦 Personnel
* **Module Key:** `personnel`
* **Description:** Maintains the official workforce registry, organizational structures, transfers, promotion histories, qualifications, and department mapping.

### Service Components:

* **Dashboard** (Path: `/personnel/dashboard`)
  Defines the component views and actions for managing dashboard within the personnel module.

* **Directory** (Path: `/personnel/directory`)
  Defines the component views and actions for managing directory within the personnel module.

* **Organization** (Path: `/personnel/organization`)
  Defines the component views and actions for managing organization within the personnel module.

* **Departments** (Path: `/personnel/departments`)
  Defines the component views and actions for managing departments within the personnel module.

* **Units** (Path: `/personnel/units`)
  Defines the component views and actions for managing units within the personnel module.

* **Positions** (Path: `/personnel/positions`)
  Defines the component views and actions for managing positions within the personnel module.

* **Transfers** (Path: `/personnel/transfers`)
  Defines the component views and actions for managing transfers within the personnel module.

* **Promotions** (Path: `/personnel/promotions`)
  Defines the component views and actions for managing promotions within the personnel module.

* **Qualifications** (Path: `/personnel/qualifications`)
  Defines the component views and actions for managing qualifications within the personnel module.

* **Skills** (Path: `/personnel/skills`)
  Defines the component views and actions for managing skills within the personnel module.

* **Documents** (Path: `/personnel/documents`)
  Defines the component views and actions for managing documents within the personnel module.

* **Import** (Path: `/personnel/import`)
  Defines the component views and actions for managing import within the personnel module.

* **Export** (Path: `/personnel/export`)
  Defines the component views and actions for managing export within the personnel module.

* **Reports** (Path: `/personnel/reports`)
  Defines the component views and actions for managing reports within the personnel module.

---

## 📦 Procurement
* **Module Key:** `procurement`
* **Description:** Manages the purchase lifecycle, from requisitions and RFPs/tenders to purchase orders (POs) and supplier databases.

### Service Components:

* **Dashboard** (Path: `/procurement/dashboard`)
  Defines the component views and actions for managing dashboard within the procurement module.

* **Requisitions** (Path: `/procurement/requisitions`)
  Defines the component views and actions for managing requisitions within the procurement module.

* **Purchase Orders** (Path: `/procurement/orders`)
  Defines the component views and actions for managing purchase orders within the procurement module.

* **Suppliers** (Path: `/procurement/suppliers`)
  Defines the component views and actions for managing suppliers within the procurement module.

* **Tenders** (Path: `/procurement/tenders`)
  Defines the component views and actions for managing tenders within the procurement module.

* **Approvals** (Path: `/procurement/approvals`)
  Defines the component views and actions for managing approvals within the procurement module.

* **Calendar** (Path: `/procurement/calendar`)
  Defines the component views and actions for managing calendar within the procurement module.

* **Reports** (Path: `/procurement/reports`)
  Defines the component views and actions for managing reports within the procurement module.

* **Settings** (Path: `/procurement/settings`)
  Defines the component views and actions for managing settings within the procurement module.

---

## 📦 My Profile
* **Module Key:** `profile`
* **Description:** Enables individual users to view and update emergency contacts, addresses, preference logs, and personal activity audit histories.

### Service Components:

* **Overview** (Path: `/profile`)
  Defines the component views and actions for managing overview within the my profile module.

* **Edit** (Path: `/profile/edit`)
  Defines the component views and actions for managing edit within the my profile module.

* **Addresses** (Path: `/profile/addresses`)
  Defines the component views and actions for managing addresses within the my profile module.

* **Emergency** (Path: `/profile/emergency-contacts`)
  Defines the component views and actions for managing emergency within the my profile module.

* **Preferences** (Path: `/profile/preferences`)
  Defines the component views and actions for managing preferences within the my profile module.

* **Activity** (Path: `/profile/activity`)
  Defines the component views and actions for managing activity within the my profile module.

---

## 📦 Recruitment
* **Module Key:** `recruitment`
* **Description:** Manages the talent acquisition lifecycle from workforce requests, job vacancy postings, applicant tracking, to screening, interviews, and onboarding.

### Service Components:

* **Dashboard** (Path: `/recruitment/dashboard`)
  Defines the component views and actions for managing dashboard within the recruitment module.

* **Workforce Requests** (Path: `/recruitment/workforce-requests`)
  Defines the component views and actions for managing workforce requests within the recruitment module.

* **Requisitions** (Path: `/recruitment/requisitions`)
  Defines the component views and actions for managing requisitions within the recruitment module.

* **Vacancies** (Path: `/recruitment/vacancies`)
  Defines the component views and actions for managing vacancies within the recruitment module.

* **Applications** (Path: `/recruitment/applications`)
  Defines the component views and actions for managing applications within the recruitment module.

* **Screening** (Path: `/recruitment/screening`)
  Defines the component views and actions for managing screening within the recruitment module.

* **Interviews** (Path: `/recruitment/interviews`)
  Defines the component views and actions for managing interviews within the recruitment module.

* **Offers** (Path: `/recruitment/offers`)
  Defines the component views and actions for managing offers within the recruitment module.

* **Onboarding** (Path: `/recruitment/onboarding`)
  Defines the component views and actions for managing onboarding within the recruitment module.

* **Talent Pool** (Path: `/recruitment/talent-pool`)
  Defines the component views and actions for managing talent pool within the recruitment module.

* **Calendar** (Path: `/recruitment/calendar`)
  Defines the component views and actions for managing calendar within the recruitment module.

* **Reports** (Path: `/recruitment/reports`)
  Defines the component views and actions for managing reports within the recruitment module.

* **Settings** (Path: `/recruitment/settings`)
  Defines the component views and actions for managing settings within the recruitment module.

---

## 📦 Search
* **Module Key:** `search`
* **Description:** Unified search utility enabling full-text keyword search across documents, database rows, indexes, and logs.

### Service Components:

* **Dashboard** (Path: `/search/dashboard`)
  Defines the component views and actions for managing dashboard within the search module.

* **Query** (Path: `/search/query`)
  Defines the component views and actions for managing query within the search module.

* **My Queries** (Path: `/search/queries/mine`)
  Defines the component views and actions for managing my queries within the search module.

* **All Queries** (Path: `/search/queries`)
  Defines the component views and actions for managing all queries within the search module.

* **Indexes** (Path: `/search/indexes`)
  Defines the component views and actions for managing indexes within the search module.

* **Documents** (Path: `/search/documents`)
  Defines the component views and actions for managing documents within the search module.

* **Reports** (Path: `/search/reports`)
  Defines the component views and actions for managing reports within the search module.

* **Settings** (Path: `/search/settings`)
  Defines the component views and actions for managing settings within the search module.

---

## 📦 Settings
* **Module Key:** `settings`
* **Description:** Allows users to customize application themes, locales, notification channels, and active security rules.

### Service Components:

* **Overview** (Path: `/settings/overview`)
  Defines the component views and actions for managing overview within the settings module.

* **Appearance** (Path: `/settings/appearance`)
  Defines the component views and actions for managing appearance within the settings module.

* **Language** (Path: `/settings/language`)
  Defines the component views and actions for managing language within the settings module.

* **Notifications** (Path: `/settings/notifications`)
  Defines the component views and actions for managing notifications within the settings module.

* **Security** (Path: `/settings/security`)
  Defines the component views and actions for managing security within the settings module.

---

## 📦 Training
* **Module Key:** `training`
* **Description:** Administers training catalogs, learning paths, enrollments, professional certifications, competency standards, and supervisor approvals.

### Service Components:

* **Dashboard** (Path: `/training/dashboard`)
  Defines the component views and actions for managing dashboard within the training module.

* **My Learning** (Path: `/training/my-learning`)
  Defines the component views and actions for managing my learning within the training module.

* **Catalog** (Path: `/training/catalog`)
  Defines the component views and actions for managing catalog within the training module.

* **Programs** (Path: `/training/programs`)
  Defines the component views and actions for managing programs within the training module.

* **Courses** (Path: `/training/courses`)
  Defines the component views and actions for managing courses within the training module.

* **Learning Paths** (Path: `/training/learning-paths`)
  Defines the component views and actions for managing learning paths within the training module.

* **Calendar** (Path: `/training/calendar`)
  Defines the component views and actions for managing calendar within the training module.

* **Enrollments** (Path: `/training/enrollments`)
  Defines the component views and actions for managing enrollments within the training module.

* **Certifications** (Path: `/training/certifications`)
  Defines the component views and actions for managing certifications within the training module.

* **Competencies** (Path: `/training/competencies`)
  Defines the component views and actions for managing competencies within the training module.

* **Approvals** (Path: `/training/approvals`)
  Defines the component views and actions for managing approvals within the training module.

---

## 📦 User Management
* **Module Key:** `users`
* **Description:** Tracks active user accounts, role allocations, account creation forms, and directory states.

### Service Components:

* **Dashboard** (Path: `/users/dashboard`)
  Defines the component views and actions for managing dashboard within the user management module.

---

## 📦 Visitors
* **Module Key:** `visitors`
* **Description:** Manages visit requests, front-desk check-ins, site occupancy logs, visitor badges, and access blacklists.

### Service Components:

* **Dashboard** (Path: `/visitors/dashboard`)
  Defines the component views and actions for managing dashboard within the visitors module.

* **Directory** (Path: `/visitors/directory`)
  Defines the component views and actions for managing directory within the visitors module.

* **Visit Requests** (Path: `/visitors/requests`)
  Defines the component views and actions for managing visit requests within the visitors module.

* **Pending Approvals** (Path: `/visitors/requests/pending`)
  Defines the component views and actions for managing pending approvals within the visitors module.

* **Check-In Desk** (Path: `/visitors/check-in`)
  Defines the component views and actions for managing check-in desk within the visitors module.

* **On Site** (Path: `/visitors/on-site`)
  Defines the component views and actions for managing on site within the visitors module.

* **Sites** (Path: `/visitors/sites`)
  Defines the component views and actions for managing sites within the visitors module.

* **Blacklist** (Path: `/visitors/blacklist`)
  Defines the component views and actions for managing blacklist within the visitors module.

* **Reports** (Path: `/visitors/reports`)
  Defines the component views and actions for managing reports within the visitors module.

* **Settings** (Path: `/visitors/settings`)
  Defines the component views and actions for managing settings within the visitors module.

---

## 📦 Welfare
* **Module Key:** `welfare`
* **Description:** Provides support programs, employee benefits tracking, financial/emergency assistance, wellness programs, and application workflows.

### Service Components:

* **Dashboard** (Path: `/welfare/dashboard`)
  Defines the component views and actions for managing dashboard within the welfare module.

* **My Welfare** (Path: `/welfare/my-welfare`)
  Defines the component views and actions for managing my welfare within the welfare module.

* **Programs** (Path: `/welfare/programs`)
  Defines the component views and actions for managing programs within the welfare module.

* **Benefits** (Path: `/welfare/benefits`)
  Defines the component views and actions for managing benefits within the welfare module.

* **Assistance** (Path: `/welfare/assistance`)
  Defines the component views and actions for managing assistance within the welfare module.

* **Emergency** (Path: `/welfare/emergency`)
  Defines the component views and actions for managing emergency within the welfare module.

* **Wellness** (Path: `/welfare/wellness`)
  Defines the component views and actions for managing wellness within the welfare module.

* **Events** (Path: `/welfare/events`)
  Defines the component views and actions for managing events within the welfare module.

* **Applications** (Path: `/welfare/applications`)
  Defines the component views and actions for managing applications within the welfare module.

* **Approvals** (Path: `/welfare/approvals`)
  Defines the component views and actions for managing approvals within the welfare module.

---

## 📦 Workflow & BPM
* **Module Key:** `workflow`
* **Description:** A Business Process Management (BPM) engine providing visual process designers, templates, running workflow monitors, and rules engines.

### Service Components:

* **Dashboard** (Path: `/workflow/dashboard`)
  Defines the component views and actions for managing dashboard within the workflow & bpm module.

* **Templates** (Path: `/workflow/templates`)
  Defines the component views and actions for managing templates within the workflow & bpm module.

* **Designer** (Path: `/workflow/designer`)
  Defines the component views and actions for managing designer within the workflow & bpm module.

* **Pending Tasks** (Path: `/workflow/tasks`)
  Defines the component views and actions for managing pending tasks within the workflow & bpm module.

* **My Approvals** (Path: `/workflow/my-approvals`)
  Defines the component views and actions for managing my approvals within the workflow & bpm module.

* **Running** (Path: `/workflow/running`)
  Defines the component views and actions for managing running within the workflow & bpm module.

* **Business Rules** (Path: `/workflow/rules`)
  Defines the component views and actions for managing business rules within the workflow & bpm module.

* **SLA** (Path: `/workflow/sla`)
  Defines the component views and actions for managing sla within the workflow & bpm module.

* **Analytics** (Path: `/workflow/analytics`)
  Defines the component views and actions for managing analytics within the workflow & bpm module.

* **Reports** (Path: `/workflow/reports`)
  Defines the component views and actions for managing reports within the workflow & bpm module.

* **Settings** (Path: `/workflow/settings`)
  Defines the component views and actions for managing settings within the workflow & bpm module.

---

