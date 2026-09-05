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

// Strictly empty array - ALL data must come from real user submissions!
export const initialItems: Item[] = [];
