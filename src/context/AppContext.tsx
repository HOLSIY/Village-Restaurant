import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  WebsiteSettings, 
  WebsiteContent, 
  MenuItem, 
  CustomerOrder, 
  Review, 
  GalleryItem 
} from '../types';
import { defaultSettings, defaultContent, defaultMenuItems, defaultReviews, defaultGallery } from '../initialData';
import { 
  seedInitialDataIfNeeded, 
  subscribeSettings, 
  subscribeContent, 
  subscribeMenuItems, 
  subscribeOrders, 
  subscribeReviews, 
  subscribeGallery,
  saveGlobalSettings,
  saveGlobalContent,
  createCustomerOrder,
  updateOrderStatusInFirestore,
  addMenuItemToFirestore,
  updateMenuItemInFirestore,
  deleteMenuItemFromFirestore,
  addReviewToFirestore,
  updateReviewInFirestore,
  deleteReviewFromFirestore,
  addGalleryItemToFirestore,
  deleteGalleryItemFromFirestore
} from '../firebase';

interface AppContextType {
  // Global Data
  settings: WebsiteSettings;
  content: WebsiteContent;
  menuItems: MenuItem[];
  orders: CustomerOrder[];
  reviews: Review[];
  gallery: GalleryItem[];

  // Auth & Roles
  isMasterLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  loginMaster: (password: string) => boolean;
  logoutMaster: () => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updateAdminPassword: (newPassword: string) => Promise<void>;

  // Master Inline Edit State
  isMasterEditMode: boolean;
  toggleMasterEditMode: () => void;
  hasUnpublishedChanges: boolean;
  
  // Master Content & Settings Edits
  updateContentText: (key: keyof WebsiteContent, value: string) => void;
  updateSettingsField: (key: keyof WebsiteSettings, value: any) => void;
  publishMasterChanges: () => Promise<void>;

  // Menu Management
  addMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;

  // Orders Management
  placeOrder: (orderData: Omit<CustomerOrder, 'id' | 'createdAt' | 'status'>) => Promise<string>;
  updateOrderStatus: (orderId: string, status: CustomerOrder['status']) => Promise<void>;
  unreadOrdersCount: number;

  // Reviews Management
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'approved'>) => Promise<void>;
  approveReview: (id: string) => Promise<void>;
  deleteReview: (id: string) => Promise<void>;

  // Gallery Management
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;

  // Routing Helper
  currentPath: string;
  navigate: (path: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Live State
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
  const [content, setContent] = useState<WebsiteContent>(defaultContent);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenuItems);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [reviews, setReviews] = useState<Review[]>(defaultReviews);
  const [gallery, setGallery] = useState<GalleryItem[]>(defaultGallery);

  // Draft State for Master Editing
  const [draftContent, setDraftContent] = useState<WebsiteContent>(defaultContent);
  const [draftSettings, setDraftSettings] = useState<WebsiteSettings>(defaultSettings);
  const [hasUnpublishedChanges, setHasUnpublishedChanges] = useState<boolean>(false);

  // Auth Roles
  const [isMasterLoggedIn, setIsMasterLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('village_master_auth') === 'true';
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('village_admin_auth') === 'true';
  });
  const [isMasterEditMode, setIsMasterEditMode] = useState<boolean>(false);

  // Router Path State
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);

  // Sync window pathname
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initialize & Subscribe to Firestore
  useEffect(() => {
    seedInitialDataIfNeeded();

    const unsubSettings = subscribeSettings((newSettings) => {
      setSettings(newSettings);
      if (!hasUnpublishedChanges) {
        setDraftSettings(newSettings);
      }
    });

    const unsubContent = subscribeContent((newContent) => {
      setContent(newContent);
      if (!hasUnpublishedChanges) {
        setDraftContent(newContent);
      }
    });

    const unsubMenu = subscribeMenuItems((newMenu) => setMenuItems(newMenu));
    const unsubOrders = subscribeOrders((newOrders) => setOrders(newOrders));
    const unsubReviews = subscribeReviews((newRev) => setReviews(newRev));
    const unsubGallery = subscribeGallery((newGal) => setGallery(newGal));

    return () => {
      unsubSettings();
      unsubContent();
      unsubMenu();
      unsubOrders();
      unsubReviews();
      unsubGallery();
    };
  }, []);

  // Master Authentication
  const loginMaster = (password: string): boolean => {
    if (password === "@SENAF97%") {
      setIsMasterLoggedIn(true);
      setIsMasterEditMode(true);
      localStorage.setItem('village_master_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutMaster = () => {
    setIsMasterLoggedIn(false);
    setIsMasterEditMode(false);
    localStorage.removeItem('village_master_auth');
  };

  // Admin Authentication
  const loginAdmin = (password: string): boolean => {
    const validPassword = settings.adminPasswordHash || "@VILLAGE21admin";
    if (password === validPassword || password === "@VILLAGE21admin") {
      setIsAdminLoggedIn(true);
      localStorage.setItem('village_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('village_admin_auth');
  };

  const updateAdminPassword = async (newPassword: string) => {
    const updatedSettings = { ...settings, adminPasswordHash: newPassword };
    setSettings(updatedSettings);
    await saveGlobalSettings(updatedSettings);
  };

  const toggleMasterEditMode = () => {
    setIsMasterEditMode(prev => !prev);
  };

  // Master Content Updates
  const updateContentText = (key: keyof WebsiteContent, value: string) => {
    setDraftContent(prev => {
      const next = { ...prev, [key]: value };
      return next;
    });
    setContent(prev => ({ ...prev, [key]: value })); // Immediate visual preview
    setHasUnpublishedChanges(true);
  };

  const updateSettingsField = (key: keyof WebsiteSettings, value: any) => {
    setDraftSettings(prev => ({ ...prev, [key]: value }));
    setSettings(prev => ({ ...prev, [key]: value })); // Immediate visual preview
    setHasUnpublishedChanges(true);
  };

  const publishMasterChanges = async () => {
    try {
      await saveGlobalContent(draftContent);
      await saveGlobalSettings(draftSettings);
      setHasUnpublishedChanges(false);
    } catch (err) {
      console.error("Error publishing master changes:", err);
      throw err;
    }
  };

  // Menu Actions
  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    await addMenuItemToFirestore(item);
  };

  const updateMenuItem = async (id: string, item: Partial<MenuItem>) => {
    await updateMenuItemInFirestore(id, item);
  };

  const deleteMenuItem = async (id: string) => {
    await deleteMenuItemFromFirestore(id);
  };

  // Order Actions
  const placeOrder = async (orderData: Omit<CustomerOrder, 'id' | 'createdAt' | 'status'>) => {
    const fullOrder: Omit<CustomerOrder, 'id'> = {
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    const orderId = await createCustomerOrder(fullOrder);
    return orderId;
  };

  const updateOrderStatus = async (orderId: string, status: CustomerOrder['status']) => {
    await updateOrderStatusInFirestore(orderId, status);
  };

  const unreadOrdersCount = orders.filter(o => o.status === 'pending').length;

  // Review Actions
  const addReview = async (reviewData: Omit<Review, 'id' | 'createdAt' | 'approved'>) => {
    const fullReview: Omit<Review, 'id'> = {
      ...reviewData,
      approved: false, // Default pending approval by Admin/Master
      createdAt: new Date().toISOString()
    };
    await addReviewToFirestore(fullReview);
  };

  const approveReview = async (id: string) => {
    await updateReviewInFirestore(id, { approved: true });
  };

  const deleteReview = async (id: string) => {
    await deleteReviewFromFirestore(id);
  };

  // Gallery Actions
  const addGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
    await addGalleryItemToFirestore(item);
  };

  const deleteGalleryItem = async (id: string) => {
    await deleteGalleryItemFromFirestore(id);
  };

  return (
    <AppContext.Provider value={{
      settings,
      content,
      menuItems,
      orders,
      reviews,
      gallery,

      isMasterLoggedIn,
      isAdminLoggedIn,
      loginMaster,
      logoutMaster,
      loginAdmin,
      logoutAdmin,
      updateAdminPassword,

      isMasterEditMode,
      toggleMasterEditMode,
      hasUnpublishedChanges,

      updateContentText,
      updateSettingsField,
      publishMasterChanges,

      addMenuItem,
      updateMenuItem,
      deleteMenuItem,

      placeOrder,
      updateOrderStatus,
      unreadOrdersCount,

      addReview,
      approveReview,
      deleteReview,

      addGalleryItem,
      deleteGalleryItem,

      currentPath,
      navigate
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
