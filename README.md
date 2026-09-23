# Golden Circle Task Manager V1

Basic multi-company task tracking for Goluxigo, Partyclap, Opexminds, Propertylane, Dmccart, Claimreclaim, Swiftdocgo and Gopolicygo.

## Features
- Phone number + password login
- Admin-authorized users; activate/deactivate
- Admin sees all tasks; members see only assigned tasks
- Task name, company, assignee, admin remarks, start/end dates, status
- Separate user remarks
- Full version history under the same Task ID
- Not Started / In Progress / Completed / Reopened
- Automatic overdue and due-soon indicators
- In-app 2-day due alert
- Admin alert on member task updates
- Basic internal messages
- Responsive web/PWA for Android and iPhone

## Railway
1. Create a new Railway project from this GitHub repo.
2. Add PostgreSQL to the same Railway project.
3. In the app service Variables set `DATABASE_URL=${{Postgres.DATABASE_URL}}`.
4. Add `JWT_SECRET`, `ADMIN_NAME`, `ADMIN_PHONE`, `ADMIN_PASSWORD`, and `NODE_ENV=production`.
5. Deploy. The app automatically creates its tables and seeds the 8 companies plus the initial admin.
6. Generate a Railway public domain for the app service.

## First login
Use the values you set in `ADMIN_PHONE` and `ADMIN_PASSWORD`. Change the admin password after login.

## Notes
This V1 provides in-app alerts. Native push notifications and App Store/Play Store binaries are separate production steps.
