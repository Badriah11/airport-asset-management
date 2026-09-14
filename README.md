# ✈️ Airport Asset Management System

A full-stack web application for managing and monitoring airport equipment and operational assets.

The system provides a dashboard for tracking asset status, managing equipment records, and monitoring assets that require maintenance.

## 🌐 Live Demo

**Frontend:**  
https://badriah11.github.io/airport-asset-management/

**REST API:**  
https://airport-asset-management.onrender.com/api/assets

> The backend is hosted on Render's free tier, so the first request may take a short time while the server wakes up.

## 🚀 Features

- Airport asset management dashboard
- Add new assets
- View all assets
- Edit existing assets
- Delete assets
- Search assets
- Filter maintenance assets
- Asset status tracking:
  - Online
  - Maintenance
  - Offline
- Dashboard statistics
- Persistent PostgreSQL database
- REST API integration
- Responsive web interface

## 🛠️ Technologies

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- REST API

### Database
- PostgreSQL

### Deployment
- GitHub Pages — Frontend
- Render — Backend API
- Render PostgreSQL — Database

## 🏗️ Architecture

```text
GitHub Pages
     │
     │ HTTP / REST API
     ▼
Node.js + Express
     │
     ▼
PostgreSQL
```

The frontend communicates with the Express backend through REST API requests. The backend handles CRUD operations and stores asset information in PostgreSQL.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/assets` | Get all assets |
| POST | `/api/assets` | Create a new asset |
| PUT | `/api/assets/:id` | Update an asset |
| DELETE | `/api/assets/:id` | Delete an asset |

## 📋 CRUD Operations

The application implements complete CRUD functionality:

- **Create** — Add airport assets
- **Read** — Retrieve and display assets
- **Update** — Edit asset information
- **Delete** — Remove assets

## 📁 Project Structure

```text
airport-asset-management/
│
├── index.html
├── server.js
├── package.json
└── README.md
```

## 🎯 Project Purpose

This project demonstrates full-stack web development concepts including frontend development, REST API design, backend development, database integration, CRUD operations, and cloud deployment.

## 👩‍💻 Developer

**Badriah**

GitHub: @Badriah11
