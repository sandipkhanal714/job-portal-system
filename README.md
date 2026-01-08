# Job Portal - Modern React Frontend Application

A complete, production-ready frontend application for a modern Job Portal System built with **React (Vite)** and **Tailwind CSS**.

## 🚀 Features

### Multi-Role System
- **Job Seekers**: Browse jobs, apply, track applications, manage profile
- **Recruiters**: Post jobs, manage applications, review candidates
- **Admins**: System overview, user management, analytics

### Core Functionality
- ✅ User Authentication & Authorization
- ✅ Role-based Access Control (Protected Routes)
- ✅ Job Search & Advanced Filtering
- ✅ Job Application Management
- ✅ Real-time Application Status Tracking
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Context API for State Management
- ✅ React Router v6 for Navigation

## 📁 Project Structure

```
src/
├── assets/           # Images, icons, logos
├── components/       # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── JobCard.jsx
│   ├── SearchBar.jsx
│   ├── FilterPanel.jsx
│   ├── Button.jsx
│   ├── Modal.jsx
│   ├── Badge.jsx
│   └── ProtectedRoute.jsx
├── pages/            # Page-level components
│   ├── Home.jsx
│   ├── Jobs.jsx
│   ├── JobDetails.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Profile.jsx
│   ├── AppliedJobs.jsx
│   ├── RecruiterDashboard.jsx
│   ├── PostJob.jsx
│   ├── ManageApplications.jsx
│   ├── AdminDashboard.jsx
│   └── UserManagement.jsx
├── hooks/            # Custom React hooks
│   ├── useAuth.jsx
│   └── useJobs.jsx
├── context/          # Global state management
│   ├── AuthContext.jsx
│   └── JobContext.jsx
├── utils/            # Helper functions
│   ├── helpers.js
│   └── mockData.js
├── App.jsx           # Main app component with routing
└── main.jsx          # Entry point
```

## 🛠️ Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Utility-first CSS Framework
- **React Router v6** - Client-side Routing
- **Context API** - State Management
- **LocalStorage** - Data Persistence

## 📦 Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 🔐 Demo Credentials

### Job Seeker Account
- **Email**: john@example.com
- **Password**: password123

### Recruiter Account
- **Email**: jane@company.com
- **Password**: recruiter123

### Admin Account
- **Email**: admin@jobportal.com
- **Password**: admin123

## 🎨 Key Components

### Reusable Components
- **Button**: Customizable button with multiple variants (primary, secondary, outline, danger, success)
- **Badge**: Status badges for job types and application statuses
- **Modal**: Flexible modal component for forms and confirmations
- **JobCard**: Preview card for job listings
- **SearchBar**: Search input with submit functionality
- **FilterPanel**: Advanced filtering for jobs

### Pages

#### Public Pages
- **Home**: Hero section, featured jobs, search functionality
- **Jobs**: Browse all jobs with search, filters, and pagination
- **Job Details**: Full job information with apply functionality
- **Login/Register**: Authentication pages

#### Job Seeker Pages
- **Profile**: View and edit personal information, skills, experience
- **Applied Jobs**: Track application status

#### Recruiter Pages
- **Dashboard**: Overview of posted jobs and applicants
- **Post Job**: Form to create new job listings
- **Manage Applications**: Review and update application statuses

#### Admin Pages
- **Admin Dashboard**: System analytics and statistics
- **User Management**: View and manage all users

## 🔄 State Management

### AuthContext
- User authentication state
- Login/Logout functionality
- Profile management
- Role-based access control

### JobContext
- Jobs data management
- Application tracking
- Job posting and updates
- Application status management

## 🎯 Features in Detail

### Authentication & Authorization
- JWT-like session management using localStorage
- Role-based route protection
- Automatic redirection based on user role
- Persistent login sessions

### Job Search & Filtering
- Real-time search by job title or company
- Filter by location, job type, and skills
- Pagination for large datasets
- Responsive grid layout

### Application Management
- One-click application submission
- Cover letter support
- Application status tracking (Applied, Shortlisted, Rejected)
- Resume attachment

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly UI elements
- Optimized for all screen sizes

## 🚦 Routing Structure

```
/ - Home page (public)
/jobs - Browse jobs (public)
/jobs/:id - Job details (public)
/login - Login page (public)
/register - Registration page (public)

/profile - User profile (job seeker only)
/applied-jobs - Applied jobs list (job seeker only)

/recruiter/dashboard - Recruiter overview (recruiter only)
/recruiter/post-job - Post new job (recruiter only)
/recruiter/applications/:jobId - Manage applications (recruiter only)

/admin/dashboard - Admin overview (admin only)
/admin/users - User management (admin only)
```

## 📝 Mock Data

The application includes comprehensive mock data:
- **8 Sample Jobs** with various job types and skills
- **5 Sample Users** (job seekers, recruiters, admin)
- **5 Sample Applications** with different statuses

Data is stored in localStorage for persistence across sessions.

## 🎨 Tailwind Configuration

Custom color scheme with primary blue palette:
- Primary colors: 50-900 shades
- Responsive utilities
- Custom components and utilities

## 🔧 Utility Functions

### helpers.js
- `formatDate()` - Human-readable date formatting
- `filterJobs()` - Advanced job filtering logic
- `paginate()` - Array pagination
- `validateEmail()` - Email validation
- `validateJobForm()` - Form validation
- `truncateText()` - Text truncation

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are fully responsive and optimized for touch interactions.

## 🚀 Performance Optimizations

- Lazy loading for routes
- Optimized re-renders with Context API
- Efficient filtering and pagination
- Minimal bundle size with Vite

## 🔮 Future Enhancements

- Backend API integration
- Real-time notifications
- Advanced analytics dashboard
- Email notifications
- File upload for resumes
- Chat functionality between recruiters and candidates
- Salary range filters
- Company profiles
- Job recommendations based on skills

## 📄 License

MIT License - Feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Built as a demonstration of modern React development practices with functional components, hooks, and Context API.

---

**Happy Coding! 🎉**
