import { MenuItem, WebsiteSettings, WebsiteContent, Review, GalleryItem } from './types';

export const defaultSettings: WebsiteSettings = {
  restaurantName: "VILLAGE CAFE",
  subtitle: "Mexican Torta Restaurant & Cafe",
  logoText: "VILLAGE",
  logoSubtext: "CAFE • ADDIS ABABA",
  phone: "093 862 5858",
  address: "Menelik II Ave, Addis Ababa, Ethiopia",
  city: "Addis Ababa",
  openingHoursWeekday: "Monday - Friday: 8:00 AM - 10:00 PM",
  openingHoursWeekend: "Saturday - Sunday: 9:00 AM - 11:00 PM",
  email: "info@villagecafeaddis.com",
  colors: {
    primary: "#D97706", // Warm golden amber
    secondary: "#1F2937", // Deep charcoal
    accent: "#EA580C", // Rich Mexican terracotta orange
    bgLight: "#FAF7F2" // Cream warm neutral
  },
  adminPasswordHash: "@VILLAGE21admin"
};

export const defaultContent: WebsiteContent = {
  // Hero section
  heroBadge: "Good Food, Good Mood 🌮",
  heroTitleLine1: "Authentic Mexican Tortas",
  heroTitleLine2: "Made with Love in Addis",
  heroDescription: "Experience the vibrant flavors of artisan Mexican street tortas, hand-pressed corn tacos, and freshly brewed coffees right on Menelik II Ave.",
  heroImage: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=1200", // High quality Mexican Tacos platter matching Image 3 style
  heroCtaOrder: "Order Online Now",
  heroCtaMenu: "Explore Full Menu",

  // Features line in Hero
  feature1: "Fresh Ingredients",
  feature1Sub: "100% Fresh & Authentic",
  feature2: "Master Chefs",
  feature2Sub: "Traditional Mexican Recipes",
  feature3: "Great Ambience",
  feature3Sub: "Feel Like Home in Addis",

  // About Section
  aboutBadge: "About Village Cafe",
  aboutTitle: "We Serve",
  aboutTitleHighlight: "Authentic Happiness",
  aboutDescription: "Village Cafe brings the rich culinary traditions of Mexico City torterías to the heart of Ethiopia. Founded on Menelik II Avenue, we craft signature pressed Mexican tortas, loaded tacos, cheesy quesadillas, and specialty drinks using locally sourced fresh ingredients and traditional spices.",
  aboutStory: "From our signature Carne Asada Torta to our freshly made guac and house-brewed Horchata, every bite is a celebration of flavor and togetherness.",
  aboutImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000",
  aboutYearsExperience: "Authentic Mexican Taste",

  // Menu Section
  menuBadge: "Our Special Menu",
  menuTitle: "Popular Dishes & Specialties",
  menuSubtitle: "Handcrafted Mexican tortas, tacos, bowls, and beverages prepared fresh daily.",

  // Callout banner
  bannerTitle: "Planning a Feast or Group Lunch?",
  bannerSubtitle: "Reserve your table or order fresh Mexican tortas direct to your office on Menelik II Ave.",
  bannerCta: "Order Now: 093 862 5858",

  // Gallery Section
  galleryTitle: "Restaurant Atmosphere & Creations",
  gallerySubtitle: "Take a peek at our vibrant dishes and cozy warm cafe interior in Addis Ababa.",

  // Reviews Section
  reviewsTitle: "Loved by Foodies in Addis",
  reviewsSubtitle: "Read real reviews from our valued guests and food lovers.",

  // Contact Section
  contactTitle: "Visit Us in Addis Ababa",
  contactSubtitle: "Drop by our cafe on Menelik II Ave or place your phone order for fast pickup.",

  // Footer
  footerDesc: "Village Cafe is Addis Ababa's premier destination for authentic Mexican tortas, street tacos, loaded nachos, and artisanal coffees."
};

export const defaultMenuItems: MenuItem[] = [
  {
    id: "m1",
    name: "Classic Carne Asada Torta",
    description: "Fluffy toasted bolillo roll stuffed with grilled marinated steak, refried beans, melted cheese, avocado, fresh tomato, and chipotle mayo.",
    category: "Tacos", // Category or Torta
    priceType: "custom",
    price: 450,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800",
    available: true,
    featured: true
  },
  {
    id: "m2",
    name: "Street Tacos Platter (3 Pcs)",
    description: "Handmade warm corn tortillas filled with tender slow-cooked beef birria or grilled chicken, cilantro, diced onions, and lime.",
    category: "Tacos",
    priceType: "sizes",
    price: 650,
    sizes: {
      small: 650,   // 3 Tacos
      medium: 950,  // 5 Tacos
      large: 1300   // 8 Tacos Platter
    },
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=800",
    available: true,
    featured: true
  },
  {
    id: "m3",
    name: "Village Loaded Burrito",
    description: "Giant flour tortilla wrapped with seasoned rice, pinto beans, grilled chicken or steak, melted jack cheese, pico de gallo, and crema.",
    category: "Burritos",
    priceType: "half_full",
    price: 250,
    halfFull: {
      half: 250,
      full: 450
    },
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800",
    available: true,
    featured: true
  },
  {
    id: "m4",
    name: "Mexican Fiesta Burrito Bowl",
    description: "Fresh cilantro lime rice topped with black beans, roasted corn salsa, guacamole, grilled peppers, pico de gallo, and house dressing.",
    category: "Bowls",
    priceType: "sizes",
    price: 550,
    sizes: {
      small: 550,
      medium: 800,
      large: 1100
    },
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800",
    available: true,
    featured: true
  },
  {
    id: "m5",
    name: "Cheesy Steak Quesadilla",
    description: "Large toasted tortilla grilled to golden perfection, filled with melted Oaxaca cheese, seasoned steak, cilantro, and served with salsa verde.",
    category: "Quesadilla",
    priceType: "half_full",
    price: 280,
    halfFull: {
      half: 280,
      full: 480
    },
    image: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&q=80&w=800",
    available: true,
    featured: false
  },
  {
    id: "m6",
    name: "Ultimate Supreme Nachos",
    description: "Crispy house-made tortilla chips layered with warm melted queso, black beans, jalapenos, sour cream, guacamole, and fresh pico de gallo.",
    category: "Nachos",
    priceType: "half_full",
    price: 320,
    halfFull: {
      half: 320,
      full: 550
    },
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=800",
    available: true,
    featured: false
  },
  {
    id: "m7",
    name: "Fresh Mexican Horchata",
    description: "Traditional sweet cinnamon rice milk beverage brewed in-house daily, served over ice with a dusting of cinnamon.",
    category: "Drinks",
    priceType: "sizes",
    price: 120,
    sizes: {
      small: 120,
      medium: 180,
      large: 240
    },
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
    available: true,
    featured: false
  },
  {
    id: "m8",
    name: "Golden Cinnamon Churros",
    description: "Warm fried Mexican pastry sticks tossed in cinnamon sugar, served with rich hot chocolate dipping sauce and dulce de leche.",
    category: "Desserts",
    priceType: "custom",
    price: 350,
    image: "https://images.unsplash.com/photo-1624371414361-e670edf4898d?auto=format&fit=crop&q=80&w=800",
    available: true,
    featured: true
  },
  {
    id: "m9",
    name: "Village Chef Special Torta Cubana",
    description: "The king of Mexican tortas: grilled steak, smoked ham, fried egg, chorizo, queso fresco, avocado, and pickled jalapenos on a toasted bolillo.",
    category: "Specials",
    priceType: "custom",
    price: 580,
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=800",
    available: true,
    featured: true
  }
];

export const defaultReviews: Review[] = [
  {
    id: "r1",
    name: "Abebe Tadesse",
    rating: 5,
    comment: "The best Mexican tortas in Addis Ababa! The Carne Asada Torta is insanely flavor-packed and authentic. Excellent atmosphere on Menelik II Ave.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    approved: true,
    createdAt: "2026-07-15"
  },
  {
    id: "r2",
    name: "Sofia Martinez",
    rating: 5,
    comment: "As someone who lived in Mexico, I was skeptical — but Village Cafe hit every single note! Their birria tacos and homemade Horchata are 10/10.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    approved: true,
    createdAt: "2026-07-18"
  },
  {
    id: "r3",
    name: "Yonas Mekonnen",
    rating: 5,
    comment: "Fast ordering, friendly staff, and incredible portions! We ordered lunch for our team and the food arrived hot and fresh. Highly recommended!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    approved: true,
    createdAt: "2026-07-20"
  }
];

export const defaultGallery: GalleryItem[] = [
  {
    id: "g1",
    imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800",
    title: "Signature Mexican Tacos",
    category: "Food"
  },
  {
    id: "g2",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
    title: "Warm Village Cafe Interior",
    category: "Ambiance"
  },
  {
    id: "g3",
    imageUrl: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=800",
    title: "Fresh Hand-pressed Tortillas",
    category: "Food"
  },
  {
    id: "g4",
    imageUrl: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=800",
    title: "Artisan Torta Preparation",
    category: "Food"
  },
  {
    id: "g5",
    imageUrl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=800",
    title: "Supreme Loaded Nachos",
    category: "Food"
  },
  {
    id: "g6",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    title: "Addis Ababa Dining Vibes",
    category: "Ambiance"
  }
];
