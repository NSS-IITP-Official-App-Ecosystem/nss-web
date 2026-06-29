# NSS IIT Patna Web Portal

A premium, dynamic web application designed for the **National Service Scheme (NSS)** at the **Indian Institute of Technology Patna (IIT Patna)**. This portal serves as a public-facing hub for community outreach, collaborations, team directory, wings/units showcase, and a specialized volunteer portal for logging and approving service hours.

---

## 🌟 Key Features

1. **Interactive Landing Page**:
   - Dynamic impact tracking widgets showing key statistics (e.g., student outreach, nutritious meals packed, blood units collected).
   - Testimonials slider and partner/collaborator carousels built with **Embla Carousel**.
   - Recent events timeline displaying dynamic media with visual cues.
2. **Volunteer Hours Management**:
   - Automated role assignment: Users signing up with an `@iitp.ac.in` email domain are automatically assigned the `volunteer` role.
   - Volunteers can log service hours linked to specific events, which are subject to administrative review.
   - Comprehensive admin approvals workspace for PIC, General Secretary, and Cell Secretaries to approve/reject hours with reason logs.
3. **Blood Requests & Donor Registry**:
   - Public portal for submitting urgent blood requests.
   - Authenticated student portal for registering as active blood donors.
   - Strict data privacy controlled by **Supabase Row-Level Security (RLS)**.
4. **Outreach & Collaboration Portal**:
   - Integration for organizations/NGOs to submit partnership requests.
   - Admin management panel to review and archive requests.
5. **Robust Database & Audit Trail**:
   - Secure PostgreSQL schema with row-level security enabled on all tables.
   - Integrated audit logger using Postgres triggers to capture all inserts, updates, and deletes for tracking admin actions.

---

## 🛠️ Technology Stack

- **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Engine**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS for custom animations and components
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid transitions, glowing borders, and entry states
- **Database & Auth**: [Supabase](https://supabase.com/) (`@supabase/supabase-js` & `@supabase/ssr`)
- **Carousel & Sliders**: [Embla Carousel](https://www.embla-carousel.com/)

---

## 📂 Project Directory Structure

```text
nss-web/
├── app/                      # Next.js App Router pages and layouts
│   ├── collaborate/          # Collaboration request portal
│   ├── gallery/              # Gallery and event media display
│   ├── our-team/             # Academic-year-wise team directory
│   ├── request-blood/        # Blood request & donor registration page
│   ├── units/                # Directory for NSS units (1, 2, 3)
│   ├── wings/                # Individual NSS cell/wing portals (Teaching, Chetna, etc.)
│   ├── globals.css           # Global stylesheets & Tailwind CSS custom directives
│   └── page.js               # Landing page component
├── components/               # Reusable React components
│   ├── AuthForm.jsx          # Login, Sign Up, and Password recovery component
│   ├── AuthProvider.jsx      # Session provider for Supabase auth status
│   ├── Navbar.js             # Navigation header
│   └── Slider.js             # Hero slider component
├── data/                     # Local static configuration files (JSON)
├── supabase/                 # Database schema and seed queries
│   └── schema.sql            # Main database schema and RLS policies
├── utils/                    # Utility files and Supabase client creators
│   └── supabase/             # Client, server, and middleware Supabase wrappers
└── package.json              # Dependency manifests and script configurations
```

---

## 💾 Database Schema Overview

The database utilizes Supabase and a secure PostgreSQL schema consisting of the following key tables:
- [`profiles`](file:///c:/Projects/nss-web/supabase/schema.sql#L47-L58): Contains user-specific details (linked to `auth.users`).
- [`wings`](file:///c:/Projects/nss-web/supabase/schema.sql#L134-L141) & [`units`](file:///c:/Projects/nss-web/supabase/schema.sql#L154-L160): Data stores for NSS administrative wings (e.g. Adhyayan, Chetna) and units.
- [`team_members`](file:///c:/Projects/nss-web/supabase/schema.sql#L173-L188): NSS leaders, PIC, and student team directory.
- [`events`](file:///c:/Projects/nss-web/supabase/schema.sql#L200-L209) & [`event_media`](file:///c:/Projects/nss-web/supabase/schema.sql#L239-L246): Records of activities and their visual gallery.
- [`hours_logs`](file:///c:/Projects/nss-web/supabase/schema.sql#L259-L271): Volunteer service logs pending approval.
- [`blood_requests`](file:///c:/Projects/nss-web/supabase/schema.sql#L293-L304) & [`blood_donors`](file:///c:/Projects/nss-web/supabase/schema.sql#L322-L330): Blood request board and active donor directories.
- [`audit_logs`](file:///c:/Projects/nss-web/supabase/schema.sql#L75-L84): Trigger-backed history logs for secure auditing.

---

## 🚀 Setup & Installation

### 1. Clone & Install Dependencies
Navigate to the project directory and install the packages:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anonymous_key
```

### 3. Deploy Database Schema
Execute the SQL statements present in [`supabase/schema.sql`](file:///c:/Projects/nss-web/supabase/schema.sql) directly within your Supabase SQL Editor. This will configure the required tables, triggers, enum types, security helper functions, and RLS policies.

### 4. Run Development Server
Start the local server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔒 Security & Roles

Row Level Security is enabled on all tables in Supabase. The platform distinguishes between roles:
- `public`: General viewers of the website.
- `volunteer`: Students who can log hours and register as donors.
- `cell_secretary` / `general_secretary` / `pic` / `super_admin`: Authorized users with approval rights and audit visibility.
