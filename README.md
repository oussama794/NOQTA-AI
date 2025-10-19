# NOQTA-AI
# 🧠 NOQTA-AI — AI-Powered Notes App

## 📄 Overview
NOQTA is a minimalist, AI-powered notes app built with **React + Vite**. It helps users write, organize, and enhance their notes using AI actions: **summarize, rephrase, or complete text instantly**.  
The app runs fully on the frontend (no backend) and uses **LocalStorage** for persistence. It’s fully responsive.

## 🎯 Problem
People start writing notes but often struggle to finish or refine them. Existing apps are feature-heavy but lack **quick AI assistance** to improve raw thoughts.

## 💡 Solution
NOQTA offers a **clean, distraction-free interface** with built-in AI tools to improve, complete, or summarize text **instantly** — lightweight, fast, and focused.

## 🎨 Design Direction
- **Color Palette:** Periwinkle gradient  
  - Nova (Purple): #6366F1  
  - Azure (Lavender): #8B5CF6  
  - Serene (Light Blue): #A78BFA  
  - Zenith (Mint): #C4B5FD  
- **Principles:** Minimalist, Gradient-driven, Responsive, AI-centric, Calm

## ⚙️ Tech Stack
- Framework: React + Vite  
- Styling: Tailwind CSS (custom Periwinkle palette)  
- State Management: Zustand  
- AI API: Hugging Face Inference API (frontend only)  
- Storage: LocalStorage  
- Icons: Lucide Icons  
- Hosting: Vercel / Netlify  
- Dev Environment: Cursor

## ✨ Key Features
- Welcome Page with gradient hero  
- Create, edit, delete notes (CRUD)  
- AI Actions: Summarize / Rephrase / Complete  
- Auto-save with LocalStorage  
- Search & Filter notes  
- Dark / Light mode  
- Floating Action Buttons (FABs)  
- Fully responsive across devices

## 📂 Project Structure
src/
├── components/
├── pages/
├── store/
├── services/
├── styles/
├── App.jsx
└── main.jsx



## 🚀 Future Additions
- Markdown support with live preview  
- Firebase/Supabase sync  
- PWA & offline mode  
- Voice input  
- Export/import notes (PDF, Markdown, JSON)  
- Collaborative editing  
- Advanced AI (sentiment analysis, key extraction)  
- Note templates & prompts

## ⚡ Installation
```bash
git clone https://github.com/oussama794/NOQTA-AI
cd NOQTA-AI
npm install
npm run dev
