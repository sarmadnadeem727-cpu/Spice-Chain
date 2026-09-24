export type UserRole = 'SME' | 'Exporter' | 'Wholesaler' | 'Admin';
export type UserType = 'Buyer' | 'Seller';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  type: UserType;
  region: string;
  isAuthenticated: boolean;
  onboardingStep: number;
  isBoarded: boolean;
}

export interface CandlestickData {
  time: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

export interface RadarMetric {
  subject: string;
  A: number;
  fullMark: number;
}

export interface LogisticsBreakdown {
  freight: number;
  customs: number;
  insurance: number;
  tax: number;
  total: number;
}

export interface SpicePrice {
  id: string;
  name: string;
  price: number;
  change: number;
  unit: string;
  category: 'Seed' | 'Root' | 'Bark' | 'Flower';
  volume24h?: string;
  marketCap?: string;
}

export interface TrustScore {
  rating: number;
  metrics: RadarMetric[];
  verifications: string[];
}

export interface SpiceListing {
  id: string;
  name: string;
  category: string;
  origin: string;
  daysSinceHarvest: number;
  trustScore: TrustScore;
  quantity: number;
  pricePerUnit: number;
  thumbnail: string;
  description: string;
}

export interface Milestone {
  description: string;
  percentage: number;
  amount: number;
  isCompleted: boolean;
  dueDate?: string;
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

export interface Bid {
  id: string;
  listingId: string;
  bidderId: string;
  amount: number;
  status: 'Pending' | 'Counter' | 'Accepted' | 'Rejected';
  milestones: Milestone[];
  messages: Message[];
}

export interface MarketState {
  prices: SpicePrice[];
  history: Record<string, CandlestickData[]>;
  lastUpdated: string;
}
