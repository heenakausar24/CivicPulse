# Project - AI Project Context

> Version: 1.0
> Last Updated: June 2026

---

# Project Overview

## Project Name

Public Grievance Management

## Tagline

AI-powered Smart Public Grievance Management Platform.

---

# Vision

This project is a modern, AI-powered Public Grievance Management System that enables citizens to report civic issues while helping authorities manage, prioritize and resolve complaints efficiently.

The objective is to build a production-quality full-stack web application that demonstrates software engineering best practices rather than just completing a college project.

The application should feel like a real product that could be adopted by municipalities, smart cities, colleges or residential societies.

Every feature should be implemented with scalability, maintainability and user experience in mind.

---

# Project Goal

Primary Goal:

Develop a resume-worthy flagship project suitable for software engineering internships and campus placements.

Secondary Goals:

- Demonstrate Full Stack Development
- Demonstrate Database Design
- Demonstrate REST API Design
- Demonstrate Authentication
- Demonstrate File Uploads
- Demonstrate AI Integration
- Demonstrate Real-Time Communication
- Demonstrate Maps Integration
- Demonstrate Dashboard Design

---

# Tech Stack

## Frontend

- React 19
- JavaScript
- Vite
- React Router DOM
- Tailwind CSS
- ShadCN UI
- Axios
- React Hook Form
- Leaflet
- OpenStreetMap
- Socket.io Client
- Recharts

---

## Backend

- Node.js
- Express.js
- JavaScript
- Prisma ORM
- JWT Authentication
- Refresh Tokens
- Socket.io
- Multer
- bcrypt
- Nodemailer

---

## Database

PostgreSQL

---

## AI

Gemini API

Used only for:

- Complaint Categorization
- Complaint Summarization

---

## Storage

Cloudinary

Used for:

- Images
- Videos

---

## Deployment

Frontend

- Vercel

Backend

- Render

Database

- Neon PostgreSQL

Media

- Cloudinary

---

# Users

## Citizen

Citizens can register themselves.

Responsibilities

- Report complaints
- Upload media
- Track complaints
- View public complaints
- Upvote complaints
- Comment on complaints
- Verify complaint resolution
- Report fake complaints

---

## Authority

Authority accounts are NOT created from UI.

Authority users are manually seeded into the database.

Authorities can:

- View all complaints
- Manage complaint lifecycle
- Add complaint categories
- Upload resolution proof
- Update status
- View analytics dashboard

---

# Authentication

Citizen

- Register
- Login

Authority

- Login only

Authentication Method

JWT Access Token

Refresh Token

Passwords

bcrypt hashing

---

# Complaint Categories

Categories are dynamic.

Authorities can create new categories.

Examples:

- Road Damage
- Water Leakage
- Garbage
- Drainage
- Street Light
- Traffic Signal
- Public Property Damage

---

# Complaint Lifecycle

Open

↓

Under Review

↓

In Progress

↓

Resolved

↓

Closed

Only authorities can change complaint status.

---

# Complaint Creation Flow

Citizen creates complaint.

Complaint includes:

Title

Description

Images or Videos

Location

Optional Category

System performs:

AI Categorization

AI Summarization

Duplicate Detection

Complaint is stored.

Authority receives notification.

---

# Duplicate Detection

Before creating a complaint:

System checks

- Similar title
- Similar description
- Same area
- Same category

If duplicate found

User is informed.

User can instead support the existing complaint.

Implementation details are flexible.

---

# Maps

Leaflet + OpenStreetMap

Features

- GPS Location
- Manual Pin
- Search Location
- Nearby Complaints
- Public Complaint Map

---

# Community Features

Citizens can

- Upvote complaints
- Comment
- Report fake complaints

---

# Notifications

Real-time

Socket.io

Email

Nodemailer

Notify users when

- Complaint Submitted
- Status Updated
- Complaint Resolved

---

# Dashboard

Authority Dashboard

Cards

- Total Complaints
- Pending
- Under Review
- In Progress
- Resolved

Charts

- Monthly Trend
- Complaint Categories
- Resolution Rate

Map

- Complaint Distribution

Table

Recent Complaints

---

# Media Upload

Cloudinary

Supported

- Images
- Videos

Store

- Cloudinary URL
- Cloudinary Public ID

---

# Folder Structure

```

root

├── frontend
├── backend
├── README.md
├── PROJECT_CONTEXT.md
└── .gitignore

```

---

# Backend Architecture

Follow MVC Architecture.

```

backend

src/

controllers/
routes/
middleware/
services/
models/
utils/
config/
socket/

```

Never place business logic inside routes.

Controllers should remain thin.

Business logic belongs inside services.

---

# Frontend Architecture

```

frontend

src/

components/
pages/
layouts/
hooks/
services/
context/
routes/
utils/
assets/

```

Create reusable components.

Avoid duplicated UI.

---

# API Design Rules

REST APIs only.

Naming

GET

/api/complaints

POST

/api/complaints

PATCH

/api/complaints/:id

DELETE

/api/complaints/:id

Use meaningful status codes.

Return consistent JSON responses.

---

# Error Handling

Never expose stack traces.

Return

success

message

data

errors

Use centralized error middleware.

---

# Coding Standards

Always

Use meaningful names.

Keep components small.

Keep functions small.

Prefer reusable code.

Avoid duplication.

Separate business logic.

Write readable code.

Use async/await.

Handle errors properly.

Use environment variables.

Never hardcode secrets.

---

# UI Guidelines

Modern SaaS Design

Clean

Minimal

Professional

Rounded cards

Soft shadows

Good spacing

Consistent colors

Fully responsive

Desktop first

Mobile optimized

Dark mode is optional.

---

# AI Usage Rules

Use AI only where it adds value.

Do NOT use AI for unnecessary features.

AI should assist the user, not replace application logic.

---

# Security

Hash passwords.

Use JWT.

Use Refresh Tokens.

Protect private routes.

Validate user permissions.

Only Authorities can

- Update complaints
- Add categories

---

# Git Rules

Commit after every completed feature.

Example

feat(authentication)

feat(cloudinary)

feat(jwt)

feat(complaints)

Never push broken code.

---

# Development Philosophy

This application should be built as if it will be deployed for real users.

Every decision should prioritize

- Scalability
- Maintainability
- Security
- Readability
- User Experience

Avoid shortcuts.

Avoid unnecessary complexity.

Build production-quality code.

---

# AI Instructions

Whenever generating code:

Always follow the existing folder structure.

Never introduce new libraries unless requested.

Never change the selected tech stack.

Maintain consistent naming conventions.

Do not generate placeholder code.

Generate complete working implementations.

Keep components modular.

Keep APIs RESTful.

Always explain architectural decisions when appropriate.

If multiple implementation options exist, choose the simplest production-ready solution.

When extending the project, preserve backward compatibility with existing code.

The goal is to build a clean, maintainable, resume-worthy application that demonstrates professional software engineering practices.
