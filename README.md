# Snap-URL 🔗

Snap-URL is a modern **URL Shortener Web Application** built with React and Supabase.  
It allows users to shorten long URLs, track clicks, and analyze device/location statistics in real time.  
The app also includes **authentication**, a personalized dashboard, data visualisation, and clean UI components.

---

## ✨ Features

- 🔒 **User Authentication** – Secure login & signup using Supabase Auth  
- ✂️ **URL Shortening** – Generate short, shareable links instantly
- 📱 **QR Code** - Generate a QR code for the original URL
- 📊 **Analytics Dashboard** – Track:
  - Total click counts
  - Device statistics
  - Location-based insights
- 🗂 **Link Management** – View, copy, and manage all shortened links  
- ⚡ **Responsive Design** – Built with React + Tailwind for a clean, mobile-friendly UI  

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, TailwindCSS, ShadCN UI  
- **State Management & Hooks:** React Context, Custom Hooks (`use-fetch`)  
- **Backend / Database:** Supabase (Auth, Database, Multimedia Storage, Row Level Security)  
- **Analytics:** Supabase Row Tables (`url`, `clicks`) for storing URL mappings and click data  
- **Deployment:** Vercel  
- **Other Tools:** 

---

---

## 🚀 Installation

### 1. Clone the repo
```bash
git clone https://github.com/chetanckKala/Snap-URL.git
cd Snap-URL 
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
```

### 4. Run locally
```bash
npm run dev
```

## 📂 Folder Structure
```bash
|
├── src/
│   ├── components/     # Reusable UI and feature components
│   ├── db/             # Supabase API integration and methods (auth, urls, clicks)
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # App-wide layout wrapper
│   ├── pages/          # Route pages (Landing, Dashboard, Auth, Redirect, etc.)
│   └── context.jsx     # Global context provider
└── ...
```
