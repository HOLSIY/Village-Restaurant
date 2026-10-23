export type PriceType = 'custom' | 'sizes' | 'half_full';

export interface SizePrices {
  small: number;
  medium: number;
  large: number;
}

export interface HalfFullPrices {
  half: number;
  full: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'Tacos' | 'Burritos' | 'Bowls' | 'Quesadilla' | 'Nachos' | 'Drinks' | 'Desserts' | 'Specials';
  priceType: PriceType;
  price: number; // Used for custom or base price
  sizes?: SizePrices;
  halfFull?: HalfFullPrices;
  image: string;
  available: boolean;
  featured?: boolean;
}

export interface OrderItem {
  itemId: string;
  itemName: string;
  quantity: number;
  selectedOption?: string; // e.g. "Medium", "Full", "Custom"
  unitPrice: number;
  totalPrice: number;
}

export interface CustomerOrder {
  id: string;
  customerFirstName: string;
  customerLastName: string;
  phone: string;
  items: OrderItem[];
  totalAmount: number;
  notes?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number; // 1 to 5
  comment: string;
  image: string;
  approved: boolean;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category?: string;
}

export interface WebsiteColors {
  primary: string; // Hex color e.g. #D97706 or #E27B13
  secondary: string; // e.g. #111827
  accent: string; // e.g. #F59E0B
  bgLight: string; // e.g. #FAF7F2
}

export interface WebsiteSettings {
  restaurantName: string;
  subtitle: string;
  logoText: string;
  logoSubtext: string;
  logoUrl?: string; // Optional custom uploaded logo image
  phone: string;
  address: string;
  city: string;
  openingHoursWeekday: string;
  openingHoursWeekend: string;
  email: string;
  colors: WebsiteColors;
  adminPasswordHash?: string;
}

export interface WebsiteContent {
  // Hero section
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  heroImage: string;
  heroCtaOrder: string;
  heroCtaMenu: string;

  // Features line in Hero
  feature1: string;
  feature1Sub: string;
  feature2: string;
  feature2Sub: string;
  feature3: string;
  feature3Sub: string;

  // About Section
  aboutBadge: string;
  aboutTitle: string;
  aboutTitleHighlight: string;
  aboutDescription: string;
  aboutStory: string;
  aboutImage: string;
  aboutYearsExperience: string;

  // Menu Section
  menuBadge: string;
  menuTitle: string;
  menuSubtitle: string;

  // Callout banner
  bannerTitle: string;
  bannerSubtitle: string;
  bannerCta: string;

  // Gallery Section
  galleryTitle: string;
  gallerySubtitle: string;

  // Reviews Section
  reviewsTitle: string;
  reviewsSubtitle: string;

  // Contact Section
  contactTitle: string;
  contactSubtitle: string;

  // Footer
  footerDesc: string;
}

export type UserRole = 'public' | 'master' | 'admin';
