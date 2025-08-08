import { Profile, Experience, Education } from '../../types';

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

export interface ActivityItem {
  id: string;
  type: 'post' | 'like' | 'comment' | 'connection';
  content: string;
  created_at: string;
}

export interface UserSummary {
  id: number;
  name: string;
  title: string;
  location: string;
  avatarUrl?: string;
  social: SocialLinks;
  connections: number;
  mutualConnections: number;
  phone?: string;
}

export interface ProfileBundle {
  user: UserSummary;
  profile: Profile;
  activities: ActivityItem[];
}

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Acme Corp',
    start_date: '2022-01-01',
    end_date: '2024-06-01',
    description: 'Built and maintained web apps with React and TypeScript.'
  }
];

const education: Education[] = [
  {
    id: 1,
    school: 'Tech University',
    degree: 'BE.ELECTRONICS AND COMMUNICATION ENGINEERING',
    field: 'Electronics and Communication Engineering',
    start_date: '2022-01-01',
    end_date: '2026-05-01'
  }
];

export const mockProfile: ProfileBundle = {
  user: {
    id: 1,
    name: 'daghtfel parvez',
    title: 'electronics enginner',
    location: 'erode tamilnadu',
    avatarUrl: undefined,
    social: {
      linkedin: 'https://linkedin.com/in/janedoe',
      twitter: 'https://twitter.com/janedoe',
      github: 'https://github.com/janedoe',
      website: 'https://janedoe.dev'
    },
    connections: 512,
    mutualConnections: 12,
    phone: '8248295556'
  },
  profile: {
    id: 1,
    user_id: 1,
    bio: 'Passionate about building delightful user experiences and design systems.',
    location: 'erode tamilnadu',
    skills: ['PCB Designing', 'C', 'Python'],
    experience: experiences,
    education
  },
  activities: Array.from({ length: 25 }).map((_, i) => ({
    id: `a-${i + 1}`,
    type: i % 4 === 0 ? 'post' : i % 4 === 1 ? 'like' : i % 4 === 2 ? 'comment' : 'connection',
    content:
      i % 4 === 0
        ? 'Published a new article on state management patterns.'
        : i % 4 === 1
        ? 'Liked a post about React performance.'
        : i % 4 === 2
        ? 'Commented on a discussion about CSS strategies.'
        : 'Connected with John Smith.',
    created_at: new Date(Date.now() - i * 86400000).toISOString()
  }))
};