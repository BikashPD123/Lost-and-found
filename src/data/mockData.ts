export type ItemType = 'Lost' | 'Found' | 'Claim';
export type ItemStatus = 'Pending' | 'Claimed' | 'Expired' | 'Assigned' | 'Under Review' | 'Resolved';

export interface Item {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string; // ISO string
  studentName: string;
  studentId: string;
  type: ItemType;
  status: ItemStatus;
  image?: string;
  reportedBy: string; // Email of the user who reported it
  assignedTo?: string; // Name of the admin assigned to it
}

export const initialItems: Item[] = [
  {
    id: 'LR-1256',
    name: 'MacBook Pro',
    description: 'Space Gray MacBook Pro 14-inch with stickers on the cover.',
    location: 'Library',
    date: '2025-05-12T10:00:00.000Z',
    studentName: 'Alice Johnson',
    studentId: 'STU-101',
    type: 'Lost',
    status: 'Pending',
    reportedBy: 'alice.j@university.edu'
  },
  {
    id: 'FI-0987',
    name: 'iPhone 14',
    description: 'Blue iPhone 14 found near the main bus stand benches.',
    location: 'Bus Stand',
    date: '2025-05-12T09:15:00.000Z',
    studentName: 'Rahul Sharma',
    studentId: 'STU-102',
    type: 'Found',
    status: 'Pending',
    reportedBy: 'rahul.s@university.edu'
  },
  {
    id: 'CL-0456',
    name: 'Wallet',
    description: 'Black leather wallet containing ID cards and cash.',
    location: 'Engineering Block',
    date: '2025-05-11T14:30:00.000Z',
    studentName: 'Michael Brown',
    studentId: 'STU-103',
    type: 'Claim',
    status: 'Under Review',
    reportedBy: 'michael.b@university.edu'
  },
  {
    id: 'LR-1255',
    name: 'Backpack',
    description: 'Nike blue backpack containing textbooks and notebooks.',
    location: 'Cafeteria',
    date: '2025-05-11T11:20:00.000Z',
    studentName: 'Sophia Lee',
    studentId: 'STU-104',
    type: 'Lost',
    status: 'Resolved',
    reportedBy: 'sophia.l@university.edu'
  },
  {
    id: 'FI-0986',
    name: 'ID Card',
    description: 'Student ID card belonging to Arjun Patel.',
    location: 'Admin Block',
    date: '2025-05-11T08:45:00.000Z',
    studentName: 'Arjun Patel',
    studentId: 'STU-105',
    type: 'Found',
    status: 'Pending',
    reportedBy: 'arjun.p@university.edu'
  }
];
