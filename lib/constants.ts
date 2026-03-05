import { LucideIcon, Cpu, BookOpen, Plane, Dumbbell, Tv, Users, Gamepad2, Newspaper } from 'lucide-react';

export type BucketType = 'money' | 'soul' | 'curiosity';

export interface SubActivity {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  subActivities?: SubActivity[];
}

export interface Bucket {
  id: BucketType;
  name: string;
  description: string;
  accentColor: string;
  activities: Activity[];
}

export interface RoutineDay {
  type: 'college' | 'deepwork';
  schedule: {
    time: string;
    activity: string;
    bucket: BucketType | 'general';
    duration: string;
    goal?: string;
  }[];
}

export interface ProgressItem {
  id: string;
  name: string;
  current: number;
  total: number;
  unit: string;
  bucket: BucketType;
}

// ===== BUCKET DATA =====
export const BUCKETS: Bucket[] = [
  {
    id: 'money',
    name: 'The Money Maker',
    description: 'Skills that build my career and open global opportunities',
    accentColor: 'emerald',
    activities: [
      {
        id: 'tech',
        name: 'Tech Skills',
        description: 'AI/ML, SQL, App Development',
        icon: Cpu,
        subActivities: [
          { id: 'ai-ml', name: 'AI/ML', description: 'Machine Learning & AI fundamentals', icon: Cpu },
          { id: 'sql', name: 'SQL', description: 'Database querying & optimization', icon: Cpu },
          { id: 'app-dev', name: 'App Dev', description: 'Full-stack development', icon: Cpu },
        ]
      },
      {
        id: 'placement',
        name: 'Placement Prep',
        description: 'TCS NQT preparation',
        icon: BookOpen,
      },
      {
        id: 'mobility',
        name: 'Global Mobility',
        description: 'IELTS & German A1',
        icon: Plane,
        subActivities: [
          { id: 'ielts', name: 'IELTS', description: 'English proficiency test', icon: Plane },
          { id: 'german', name: 'German A1', description: 'German language basics', icon: Plane },
        ]
      },
    ],
  },
  {
    id: 'soul',
    name: 'The Soul Stuff',
    description: 'Physical, mental & social well-being',
    accentColor: 'rose',
    activities: [
      {
        id: 'physical',
        name: 'Physical',
        description: 'Calisthenics & Gym',
        icon: Dumbbell,
      },
      {
        id: 'mental',
        name: 'Mental',
        description: 'Anime & Entertainment',
        icon: Tv,
      },
      {
        id: 'social',
        name: 'Social',
        description: 'Friends & Connections',
        icon: Users,
      },
    ],
  },
  {
    id: 'curiosity',
    name: 'The Curiosity Shelf',
    description: 'Creative projects and intellectual exploration',
    accentColor: 'violet',
    activities: [
      {
        id: 'gamedev',
        name: 'Game Dev Studio',
        description: 'Business & Creative Projects',
        icon: Gamepad2,
      },
      {
        id: 'current-affairs',
        name: 'Current Affairs',
        description: 'R&D & staying informed',
        icon: Newspaper,
      },
    ],
  },
];

// ===== PROGRESS DATA =====
export const PROGRESS_ITEMS: ProgressItem[] = [
  {
    id: 'german-a1',
    name: 'German A1 Completion',
    current: 45,
    total: 100,
    unit: '%',
    bucket: 'money',
  },
  {
    id: 'ielts-prep',
    name: 'IELTS Prep',
    current: 30,
    total: 100,
    unit: '%',
    bucket: 'money',
  },
  {
    id: 'tcs-nqt',
    name: 'TCS NQT Prep',
    current: 65,
    total: 100,
    unit: '%',
    bucket: 'money',
  },
];

// ===== ROUTINE DATA =====
export const ROUTINES: Record<'college' | 'deepwork', RoutineDay> = {
  college: {
    type: 'college',
    schedule: [
      { time: '06:00', activity: 'Morning Workout', bucket: 'soul', duration: '1.5h', goal: 'Calisthenics/Gym to wake up the brain.' },
      { time: '07:30', activity: 'Commute / Prep', bucket: 'money', duration: '1.5h', goal: 'Listen to German A1 audio or IELTS vocab.' },
      { time: '09:00', activity: 'College Classes', bucket: 'money', duration: '8h', goal: 'Focus on AI/ML labs; use gaps for SQL practice.' },
      { time: '17:00', activity: 'Social Battery', bucket: 'soul', duration: '1.5h', goal: 'Decompress with friends before the evening shift.' },
      { time: '18:30', activity: 'Placement Prep', bucket: 'money', duration: '2h', goal: 'TCS NQT aptitude or coding problems.' },
      { time: '20:30', activity: 'Anime Time', bucket: 'soul', duration: '1h', goal: 'Dinner + 2 episodes of your favorite series.' },
      { time: '21:30', activity: 'German A1 Study', bucket: 'money', duration: '1h', goal: '1 hour of active grammar/vocab study.' },
      { time: '22:30', activity: 'Wind Down', bucket: 'general', duration: '30m', goal: 'No screens, sleep by 23:00.' },
    ],
  },
  deepwork: {
    type: 'deepwork',
    schedule: [
      { time: '06:30', activity: 'Morning Workout', bucket: 'soul', duration: '2h', goal: 'Longer, focused Calisthenics session.' },
      { time: '08:30', activity: 'Language Power Hour', bucket: 'money', duration: '1.5h', goal: '45m German + 45m IELTS (Writing/Speaking).' },
      { time: '10:00', activity: 'The Tech Sprint', bucket: 'money', duration: '3h', goal: 'Deep Work: AI/ML projects or App Dev.' },
      { time: '13:00', activity: 'Lunch & Reset', bucket: 'soul', duration: '1h', goal: 'Eat away from the screen; quick walk.' },
      { time: '14:00', activity: 'Game Dev Studio', bucket: 'curiosity', duration: '3h', goal: 'Build your studio/game logic (Apply AI skills here).' },
      { time: '17:00', activity: 'Professional Edge', bucket: 'money', duration: '1.5h', goal: 'SQL Advanced modules or TCS Mock Tests.' },
      { time: '18:30', activity: 'Current Affairs', bucket: 'curiosity', duration: '1h', goal: 'Read tech/global news (IELTS Reading practice).' },
      { time: '19:30', activity: 'Social / Free', bucket: 'soul', duration: '2.5h', goal: 'Hangout with friends or watch Anime.' },
      { time: '22:00', activity: 'Review & Plan', bucket: 'general', duration: '1h', goal: 'Update your Next.js Dashboard; plan tomorrow.' },
    ],
  },
};
