export type GameCategory = 
  | 'all'
  | 'strategy' 
  | 'party' 
  | 'family' 
  | 'card' 
  | 'two_player' 
  | 'mystery' 
  | 'kids' 
  | 'complex';

export interface BoardGame {
  id: string;
  titleFa: string;
  titleEn: string;
  category: GameCategory;
  categoryLabelFa: string;
  minPlayers: number;
  maxPlayers: number;
  recommendedPlayers: string;
  playTimeMinutes: number;
  minAge: number;
  difficulty: number; // 1 to 5 scale
  priceToman: number;
  rentalPricePerDay: number;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  gallery: string[];
  shortDescription: string;
  fullDescription: string;
  publisher: string;
  designer: string;
  mechanics: string[];
  videoUrl?: string;
  rulesPdfUrl?: string;
  isPopular?: boolean;
  isNew?: boolean;
  discountPercent?: number;
}

export type PurchaseType = 'buy' | 'rent';

export interface CartItem {
  id: string; // unique ID combining gameId and purchaseType
  game: BoardGame;
  quantity: number;
  purchaseType: PurchaseType;
  rentalDays: number; // default 3 days
}

export interface GameCafe {
  id: string;
  name: string;
  city: string;
  neighborhood: string;
  address: string;
  phone: string;
  hourlyPriceToman: number;
  gamesCount: number;
  rating: number;
  imageUrl: string;
  capacity: number;
  features: string[];
  openingHours: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  readTime: string;
  category: string;
  date: string;
  imageUrl: string;
  summary: string;
  author: string;
  content?: string[];
}

export interface FilterState {
  searchQuery: string;
  category: GameCategory;
  playersCount: number | null;
  maxPlayTime: number | null;
  minAge: number | null;
  selectedMechanic: string;
  purchaseMode: 'all' | 'buy' | 'rent';
  sortBy: 'popular' | 'rating' | 'price_asc' | 'price_desc' | 'newest';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  recommendedGames?: BoardGame[];
}

export interface CafeReservation {
  cafeId: string;
  cafeName: string;
  customerName: string;
  phone: string;
  date: string;
  timeSlot: string;
  guestsCount: number;
  totalPriceToman: number;
  status: 'pending' | 'confirmed';
}
