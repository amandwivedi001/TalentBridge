# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# TalentBridge Frontend Development Notes

# 🚀 Phase 6 – Day 1: Frontend Foundation & Architecture

## Overview

Today, I started frontend development for TalentBridge.

Unlike backend development where the primary focus was functionality, the frontend phase is focused on building a professional SaaS-style user experience with clean architecture, consistent design, scalability, and maintainability.

The objective is to make TalentBridge feel like a real recruitment platform rather than a college project.

---

## Frontend Vision

### Goal

Build a frontend that looks and feels like a modern SaaS product.

### Inspiration

* Linear
* Ashby
* Greenhouse
* Notion
* Clerk
* Vercel

---

## Tech Stack Finalized

### Core

* React
* Vite
* JavaScript

### Styling

* Tailwind CSS v4
* Inter Font

### State Management

* Redux Toolkit
* React Redux

### Routing

* React Router DOM

### API Handling

* Axios

### Realtime Communication

* Socket.io Client

### UI Utilities

* Lucide React
* React Hot Toast
* Clsx

---

## Project Structure Setup

Created scalable folder structure.

```text
src/

├── app/
├── assets/
├── components/
├── features/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── store/
├── styles/
└── utils/
```

---

## Feature Structure

Created:

```text
features/
└── auth/
    └── authSlice.js
```

---

## Pages Structure

Created:

```text
pages/

├── auth/
├── student/
├── recruiter/
├── resume/
├── jobs/
├── interview/
└── notifications/
```

---

## Layout System

Created layout architecture.

### Auth Layout

**AuthLayout.jsx**

Used for:

* Login
* Register

### Student Layout

**StudentLayout.jsx**

Used for:

* Dashboard
* Jobs
* Resume
* Interview
* Notifications

### Recruiter Layout

**RecruiterLayout.jsx**

Used for:

* Dashboard
* Jobs
* Candidates
* Pipeline

---

## Theme System

Created centralized theme configuration.

### Primary Color

```css
#2563EB
```

Professional Blue

### Secondary Color

```css
#0F172A
```

Dark Slate

### Accent Color

```css
#14B8A6
```

Teal

Used for:

* ATS Score
* Match Score
* Success States

### Additional Colors

| Purpose    | Color   |
| ---------- | ------- |
| Background | #F8FAFC |
| Card       | #FFFFFF |
| Success    | #22C55E |
| Warning    | #F59E0B |
| Danger     | #EF4444 |

---

## Redux Setup

Configured Redux Store.

### Initial Slice

#### Auth Slice

Stores:

* User
* Role
* Authentication Data

Prepared for future expansion.

---

## Axios Configuration

Created:

```text
services/api.js
```

Configured:

* Base URL
* withCredentials = true

Supports cookie-based authentication used by backend.

---

## Routing Foundation

Created routing structure.

### Files

```text
AppRoutes.jsx
ProtectedRoute.jsx
RoleRoute.jsx
```

Prepared for:

* Protected Routes
* Role Based Access

---

## Global Setup

### Browser Router

Configured:

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

For SPA navigation.

---

### Toast Notifications

Configured:

```text
React Hot Toast
```

Global notification support.

---

### Font

Configured:

```text
Inter
```

For consistent professional typography.

---

## Architecture Decisions

### Decision 1

Use Layout-Based Routing.

* Auth Layout
* Student Layout
* Recruiter Layout

### Decision 2

Use centralized Theme System.

Avoid hardcoded colors throughout project.

### Decision 3

Establish complete architecture before building screens.

**Reason:**

* Consistency
* Scalability
* Maintainability

---

## UI/UX Standards Defined

Every page must include:

### Loading State

* Skeleton Loaders

### Empty State

* No Data Available

### Error State

* Retry Actions
* Error Messages

### Success State

* Toast Notifications
* Success Feedback

---

## Architecture

| Component        | Status |
| ---------------- | ------ |
| Folder Structure | ✅      |
| Redux Setup      | ✅      |
| Axios Setup      | ✅      |
| Theme System     | ✅      |
| Tailwind Setup   | ✅      |
| Inter Font       | ✅      |
| Layouts          | ✅      |
| Browser Router   | ✅      |
| Toast System     | ✅      |

---

## Key Learnings

* SaaS frontend architecture
* Layout-driven design
* Theme management
* Redux initialization
* React Router foundation
* Scalable folder organization
* Frontend project planning

---

## Current Progress

### Phase 5 Backend

✅ Completed

### Phase 6 Frontend

#### Day 1

✅ Completed

# Phase 6 – Day 2: Authentication UI & Design System

## Overview

Today, I built the **Authentication UI** for TalentBridge.

The focus was not only functionality but also creating a **professional SaaS-style user experience** that feels like a modern recruitment platform.

The authentication screens establish the visual identity of TalentBridge and serve as the first impression for both students and recruiters.

---

# Authentication Screens Created

## Login Page

**File:**

```bash
pages/auth/Login.jsx
```

### Features

* Email Input
* Password Input
* Login Button
* Navigation to Register Page

---

## Register Page

**File:**

```bash
pages/auth/Register.jsx
```

### Features

* Full Name Input
* Email Input
* Password Input
* Role Selection
* Create Account Button
* Navigation to Login Page

---

# Reusable Components

## Auth Hero Section

**File:**

```bash
components/auth/AuthHero.jsx
```

### Purpose

* Branding
* Product Identity
* Feature Highlights
* Marketing Content

### Displays

* TalentBridge
* AI Powered Career Platform
* Core Features Showcase

### Highlighted Features

* AI Resume Analysis
* Smart Candidate Matching
* Mock Interviews
* Placement Tracking

---

## Auth Card

**File:**

```bash
components/auth/AuthCard.jsx
```

### Purpose

* Reusable Form Wrapper
* Consistent Styling
* Shared Authentication Layout

---

# Layout Design

Implemented a professional **split-screen authentication layout**.

## Left Section – Branding Area

Contains:

* Logo
* Platform Name
* Tagline
* Feature Highlights

### Theme

* Dark Navy Background
* Teal Accent Colors
* Gradient Effects

---

## Right Section – Authentication Area

Contains:

* Login Form
* Register Form
* Action Buttons
* Navigation Links

### Styling

* White Card Layout
* Rounded Corners
* Shadow Effects
* Spacious Form Design

---

# Role Selection UI

Implemented a custom role selector.

### Available Roles

* Student
* Recruiter

### Design Decision

Used:

```text
Toggle Buttons
```

Instead of:

```text
Dropdown Menu
```

### Benefits

* Better User Experience
* Faster Selection
* Cleaner Interface
* More Visible Choices

---

# Design System

## Primary Color

```css
#2563EB
```

Used for:

* Primary Buttons
* Active States
* Links
* Interactive Elements

---

## Secondary Color

```css
#0F172A
```

Used for:

* Hero Background
* Branding Section
* Dark Surfaces

---

## Accent Color

```css
#14B8A6
```

Used for:

* Feature Highlights
* Visual Emphasis
* Supporting Elements

---

# Typography

Using:

```text
Inter Font
```

### Benefits

* Modern Appearance
* Clean Design
* Professional Feel
* Excellent Readability

---

# Responsive Design

Authentication screens are designed with responsiveness in mind.

## Desktop Layout

```text
Branding Section | Authentication Form
```

Two-column split-screen experience.

---

## Mobile Layout (Planned)

```text
Hero Section
      ↓
Authentication Form
```

Stacked layout for smaller screens.

---

# User Experience Improvements

Implemented:

* Clear Visual Hierarchy
* Consistent Spacing
* Modern Card Design
* Readable Form Fields
* Strong Call-To-Action Buttons
* Reusable Component Architecture

---

# Design Review

## Strengths

* Professional SaaS Feel
* Strong Branding
* Modern Color Palette
* Clean Layout Structure
* Effective Role Selection UI
* Reusable Components

---

## Planned Improvements

* Improve Input Focus States
* Add Password Visibility Toggle
* Add Loading Button States
* Reduce Hero Text Size Slightly
* Add Social Proof Metrics

### Example Metrics

* 10,000+ Resume Analyses
* 2,000+ Mock Interviews
* 500+ Students Placed

---

# Routing

Prepared authentication routes:

```bash
/login
/register
```

Integrated into the application's routing system.

---

# Component Reusability

Authentication UI was built using reusable components to support future scalability and maintainability.

Reusable architecture will allow:

* Faster feature development
* Consistent styling
* Easier maintenance
* Better code organization

---

# Current Frontend Progress

## Phase 6 – Day 1 ✅

Frontend Foundation

---

## Phase 6 – Day 2 ✅

Authentication UI & Design System

### Features Completed

| Feature               | Status |
| --------------------- | ------ |
| Auth Hero Component   | ✅      |
| Auth Card Component   | ✅      |
| Login UI              | ✅      |
| Register UI           | ✅      |
| Role Selection UI     | ✅      |
| Responsive Foundation | ✅      |
| Branding Section      | ✅      |
| Professional Styling  | ✅      |
| Routing Integration   | ✅      |

---

# Summary

Phase 6 Day 2 focused on building a polished and scalable authentication experience for TalentBridge. The foundation now includes professional branding, reusable authentication components, responsive layouts, and a modern SaaS-inspired design system that will be reused throughout the platform.
