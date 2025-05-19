# 🎟️ Events Management Dashboard

![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-%2361DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-%233178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-%2338B2AC?logo=tailwind-css)

Modern web dashboard for managing events, organizers, participants, sponsors, and registrations. Built as the frontend counterpart to the [EventsManagementApp REST API](https://github.com/Gaitan19/EventsMagementApp).


## ✨ Features
- 📅 **Full CRUD Operations** for 5 core entities
- 🎨 **Responsive UI** with Tailwind CSS
- 🔄 **Real-Time Sync** via REST API
- 📱 **Reusable Components** (Data Tables, Modal Forms)
- 📲 **Toast Notifications** with React Hot Toast
- 🛠️ **Type-Safe** with TypeScript
- 🔗 **API Integration** via Axios

## 🛠️ Tech Stack
| **Layer**       | **Technologies**                                                                 | Icons |
|------------------|----------------------------------------------------------------------------------|-------|
| **Frontend**     | Next.js 14, React 18, TypeScript 5                                              | ⚛️🌐 |
| **State**        | React Context, useState/useReducer                                              | 🧩    |
| **API Client**   | Axios, REST Standards                                                           | 🌐🔌 |
| **Styling**      | Tailwind CSS 3, Headless UI, Hero Icons                                         | 🎨✨ |

## 🚀 Getting Started

### Prerequisites
- Node.js ≥18.x
- Running [EventsManagementApp REST API](https://github.com/Gaitan19/EventsMagementApp)

### Installation
```bash
# Clone repository
git clone https://github.com/Gaitan19/Events-management-clientApp.git

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api  # Your backend API URL

# Running the App
npm run dev
```



