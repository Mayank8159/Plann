# 🎯 3-Bucket Life Formula Dashboard

A modern, elegant dashboard built with Next.js 14 and Tailwind CSS to track and balance your life across three essential buckets.

## 🪣 The Three Buckets

### 1️⃣ **The Money Maker** (Emerald)
Skills that build your career and open global opportunities:
- **Tech Skills**: AI/ML, SQL, App Development
- **Placement Prep**: TCS NQT preparation
- **Global Mobility**: IELTS & German A1

### 2️⃣ **The Soul Stuff** (Rose)
Physical, mental & social well-being:
- **Physical**: Calisthenics & Gym
- **Mental**: Anime & Entertainment
- **Social**: Friends & Connections

### 3️⃣ **The Curiosity Shelf** (Violet)
Creative projects and intellectual exploration:
- **Game Dev Studio**: Business & Creative Projects
- **Current Affairs**: R&D & staying informed

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Features

### ✨ Core Features
- **Dark Mode Professional Theme**: Slate-900 background with high-contrast accents
- **Fully Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Mobile-First Navigation**: Bottom tab bar on mobile, sidebar on desktop
- **Weekly Routine Toggle**: Switch between "College Day" (3x/week) and "Deep Work Day" (4x/week)
- **Progress Tracking**: Visual progress bars for German A1, IELTS, and TCS NQT prep
- **Daily Stack Timeline**: Vertical timeline showing your day's schedule
- **Glassmorphism Effects**: Subtle backdrop-blur and smooth transitions
- **Touch-Optimized**: Larger tap targets and smooth scrolling on mobile

### 🎯 UI Components
- **Sidebar Navigation** (Desktop): Clean navigation with active states
- **Bottom Tab Bar** (Mobile): Fixed bottom navigation for easy thumb access
- **Bucket Cards**: Color-coded cards for each life bucket
- **Progress Cards**: Real-time progress tracking with animated bars
- **Daily Stack**: Interactive timeline view of your schedule
- **Routine Toggle**: Seamless switching between day types

## 📁 Project Structure

```
Plann/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Dashboard.tsx       # Main dashboard com (desktop)
│   ├── BottomNav.tsx       # Bottom navigation (mobile)ponent
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── BucketCard.tsx      # Individual bucket display
│   ├── ProgressCard.tsx    # Progress tracking card
│   ├── DailyStack.tsx      # Daily schedule timeline
│   └── RoutineToggle.tsx   # College/Deep work toggle
├── lib/
│   └── constants.ts        # Data structure & constants
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript
- **UI Pattern**: Glassmorphism with dark mode

## 🎨 Color Palette

- **Background**: Slate-900 (#0f172a)
- **Money Maker**: Emerald-500 (#10b981)
- **Soul Stuff**: Rose-500 (#f43f5e)
- **Curiosity Shelf**: Violet-500 (#8b5cf6)

## 📊 Customization

### Updating Your Buckets
Edit `lib/constants.ts` to customize:
- Bucket activities and sub-activities
- Progress tracking items
- Daily routines for both modes

### Modifying Colors
Update `tailwind.config.ts` to change accent colors or add new themes.

### Adding New Features
The component architecture is modular - add new components in the `components/` directory and import them into `Dashboard.tsx`.

## 🚢 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Build for Production
```bash
npm run build
npm start
```

## 📝 License

This project is open source and available for personal use.

## 🙌 Credits

Built with inspiration from Linear and Vercel's minimalist design philosophy.

---

**Made with 💚💗💜 for balanced living**
