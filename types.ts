
export interface CropPrice {
  id: string;
  name: string;
  mandi: string;
  price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface DiseaseAnalysis {
  diseaseName: string;
  severity: 'Low' | 'Medium' | 'High';
  confidence: number;
  description: string;
  treatment: string[];
  preventiveMeasures: string[];
}

export type FungicideType = 'Contact' | 'Systemic' | 'Combination';

export interface PesticideLog {
  id: string;
  date: string;
  chemicalName: string;
  type: FungicideType;
  notes?: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  orchardName: string;
  location: string;
  crops: string[];
  lastLogin: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'critical';
  timestamp: string;
  isRead: boolean;
}

export interface ForumComment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface ForumPost {
  id: string;
  author: string;
  location: string;
  content: string;
  image?: string;
  category: 'General' | 'Disease' | 'Market' | 'Machinery';
  likes: number;
  comments: ForumComment[];
  timestamp: string;
}
