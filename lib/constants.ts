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
      { time: '06:00', activity: 'Morning Workout', bucket: 'soul', duration: '1h' },
      { time: '07:30', activity: 'College Classes', bucket: 'general', duration: '6h' },
      { time: '14:00', activity: 'Lunch & Rest', bucket: 'general', duration: '1.5h' },
      { time: '15:30', activity: 'TCS NQT Prep', bucket: 'money', duration: '2h' },
      { time: '17:30', activity: 'SQL Practice', bucket: 'money', duration: '1.5h' },
      { time: '19:00', activity: 'Dinner', bucket: 'general', duration: '1h' },
      { time: '20:00', activity: 'Anime Time', bucket: 'soul', duration: '1.5h' },
      { time: '21:30', activity: 'German A1 Study', bucket: 'money', duration: '1h' },
      { time: '22:30', activity: 'Wind Down', bucket: 'general', duration: '30m' },
    ],
  },
  deepwork: {
    type: 'deepwork',
    schedule: [
      { time: '06:00', activity: 'Morning Workout', bucket: 'soul', duration: '1.5h' },
      { time: '08:00', activity: 'Deep Work: AI/ML', bucket: 'money', duration: '3h' },
      { time: '11:00', activity: 'Break & Brunch', bucket: 'general', duration: '1h' },
      { time: '12:00', activity: 'App Development', bucket: 'money', duration: '3h' },
      { time: '15:00', activity: 'IELTS Practice', bucket: 'money', duration: '2h' },
      { time: '17:00', activity: 'Game Dev Studio', bucket: 'curiosity', duration: '2h' },
      { time: '19:00', activity: 'Dinner', bucket: 'general', duration: '1h' },
      { time: '20:00', activity: 'Social Time / Friends', bucket: 'soul', duration: '2h' },
      { time: '22:00', activity: 'Current Affairs Reading', bucket: 'curiosity', duration: '1h' },
      { time: '23:00', activity: 'Wind Down', bucket: 'general', duration: '30m' },
    ],
  },
};
