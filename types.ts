
export enum AppScreen {
  SPLASH = 'SPLASH',
  FOUNDER = 'FOUNDER',
  HUB = 'HUB',
  MAP = 'MAP',
  SCANNER = 'SCANNER',
  LIBRARY = 'LIBRARY',
  SUPPORT = 'SUPPORT',
  CHAT = 'CHAT'
}

export interface UserStats {
  xp: number;
  seedCoins: number;
  streak: number;
  lastWatered: number | null; // Global last action
}

export interface Tree {
  id: string;
  type: 'Oak' | 'Maple' | 'Fruit' | 'Native';
  lat: number;
  lng: number;
  name: string;
  status: 'healthy' | 'thirsty' | 'critical';
  plantedAt: number;
  lastWateredAt: number;
  isUserPlanted: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  cost: number;
}
