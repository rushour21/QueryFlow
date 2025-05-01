# 🧾 QueryFlow – Hubly

**QueryFlow – Hubly** is a full-stack web-based support and query management system built to streamline team-based customer service operations. It empowers admins and support teams to manage queries efficiently with real-time chat, analytics, team collaboration, and chatbot customization 

---

## 📌 Features Overview

### 🚪 Landing Page (Desktop)
- Public-facing homepage designed for desktop view.
- Embedded chatbot allows users to raise queries without signing up.

### 📝 User & Team Onboarding
- Separate sign-up/registration for admins.
- Admins will logIn using emails as username and team members admin given username

### 📊 Dashboard & Query Management
- **All Queries:** View all submitted queries.
- **Resolved Queries:** Track completed queries.
- **Unresolved Queries:** Focus on pending issues.
- **Search Queries:** Filter/search across query fields.
- **Assign Queries:** Admins can delegate queries to team members.
- **Toggle Status:** Mark queries as resolved/unresolved.
- **Auto-Assignment:** New queries are automatically assigned to the admin.

### 👥 Team Management
- Admins can add, remove, and manage team members.

### 📈 Analytics Dashboard
- Visual insights into performance and query resolution time.

### 💬 Live Chat Window
- Real-time support chat for users and team members.
- Optimized with efficient polling to reduce API calls.

### 🤖 Chatbot Widget Customization
- Admins can personalize chatbot UI and behavior from a dedicated page.

### 🌐 Embedded Chatbot (Dummy chatbot)
- The static bot is showcasing a customization in action.
- Mobile responsive design with the chatbot always visible.

### ⏳ Missed Chat Timer
- Queries are auto-tagged as “missed” if no response is recorded in a set timeframe.

### 🧑‍💼 Edit Profile
- Users can update their personal details like name, email, etc.

### 👨‍👩‍👧‍👦 Multi-Team Support
- Platform supports multiple admins, each with their respective teams and queries.

---

## ⚙️ Frontend Architecture

- **Lazy Loading**: Components are loaded only when required.
- **Protected Routes**: Pages secured for authenticated users.
- **Nested Routing**: Modular route handling for maintainability.
- **Chatbot Component**: Persistent across all views for query intake.

---

## 🛠 Tech Stack

- **Frontend:** React.js, Vanilla CSS  
- **Backend:** Node.js, Express.js, JWT Middleware (for authentication)  
- **Database:** MongoDB

---


