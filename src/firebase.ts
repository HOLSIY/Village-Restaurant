import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../firebase-applet-config.json';
import { WebsiteSettings, WebsiteContent, MenuItem, CustomerOrder, Review, GalleryItem } from './types';
import { defaultSettings, defaultContent, defaultMenuItems, defaultReviews, defaultGallery } from './initialData';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Firestore database instance using explicit database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Firebase Storage instance
export const storage = getStorage(app);

// Helper to seed initial documents if they don't exist in Firestore
export async function seedInitialDataIfNeeded() {
  try {
    const settingsDoc = await getDoc(doc(db, 'websiteSettings', 'main'));
    if (!settingsDoc.exists()) {
      await setDoc(doc(db, 'websiteSettings', 'main'), defaultSettings);
    }

    const contentDoc = await getDoc(doc(db, 'content', 'home'));
    if (!contentDoc.exists()) {
      await setDoc(doc(db, 'content', 'home'), defaultContent);
    }

    // Seed menu items if empty
    const menuItemsSnap = await getDoc(doc(db, 'menuItems', 'm1'));
    if (!menuItemsSnap.exists()) {
      for (const item of defaultMenuItems) {
        await setDoc(doc(db, 'menuItems', item.id), item);
      }
    }

    // Seed reviews if empty
    const reviewSnap = await getDoc(doc(db, 'reviews', 'r1'));
    if (!reviewSnap.exists()) {
      for (const rev of defaultReviews) {
        await setDoc(doc(db, 'reviews', rev.id), rev);
      }
    }

    // Seed gallery if empty
    const gallerySnap = await getDoc(doc(db, 'gallery', 'g1'));
    if (!gallerySnap.exists()) {
      for (const item of defaultGallery) {
        await setDoc(doc(db, 'gallery', item.id), item);
      }
    }
  } catch (err) {
    console.warn("Firestore auto-seed notice (using local default fallback):", err);
  }
}

// Live Subscriptions
export function subscribeSettings(callback: (settings: WebsiteSettings) => void) {
  return onSnapshot(
    doc(db, 'websiteSettings', 'main'),
    (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as WebsiteSettings);
      } else {
        callback(defaultSettings);
      }
    },
    (err) => {
      console.warn("Settings snapshot listener warning:", err);
      callback(defaultSettings);
    }
  );
}

export function subscribeContent(callback: (content: WebsiteContent) => void) {
  return onSnapshot(
    doc(db, 'content', 'home'),
    (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data() as WebsiteContent);
      } else {
        callback(defaultContent);
      }
    },
    (err) => {
      console.warn("Content snapshot listener warning:", err);
      callback(defaultContent);
    }
  );
}

export function subscribeMenuItems(callback: (items: MenuItem[]) => void) {
  return onSnapshot(
    collection(db, 'menuItems'),
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as MenuItem));
        callback(items);
      } else {
        callback(defaultMenuItems);
      }
    },
    (err) => {
      console.warn("Menu items snapshot listener warning:", err);
      callback(defaultMenuItems);
    }
  );
}

export function subscribeOrders(callback: (orders: CustomerOrder[]) => void) {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const orders = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CustomerOrder));
      callback(orders);
    },
    (err) => {
      console.warn("Orders snapshot listener warning:", err);
      callback([]);
    }
  );
}

export function subscribeReviews(callback: (reviews: Review[]) => void) {
  return onSnapshot(
    collection(db, 'reviews'),
    (snapshot) => {
      if (!snapshot.empty) {
        const reviews = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Review));
        callback(reviews);
      } else {
        callback(defaultReviews);
      }
    },
    (err) => {
      console.warn("Reviews snapshot listener warning:", err);
      callback(defaultReviews);
    }
  );
}

export function subscribeGallery(callback: (gallery: GalleryItem[]) => void) {
  return onSnapshot(
    collection(db, 'gallery'),
    (snapshot) => {
      if (!snapshot.empty) {
        const gallery = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as GalleryItem));
        callback(gallery);
      } else {
        callback(defaultGallery);
      }
    },
    (err) => {
      console.warn("Gallery snapshot listener warning:", err);
      callback(defaultGallery);
    }
  );
}

// Global Publishers & Actions
export async function saveGlobalSettings(settings: WebsiteSettings) {
  await setDoc(doc(db, 'websiteSettings', 'main'), settings, { merge: true });
}

export async function saveGlobalContent(content: WebsiteContent) {
  await setDoc(doc(db, 'content', 'home'), content, { merge: true });
}

export async function addMenuItemToFirestore(item: Omit<MenuItem, 'id'>) {
  const docRef = await addDoc(collection(db, 'menuItems'), item);
  return docRef.id;
}

export async function updateMenuItemInFirestore(id: string, item: Partial<MenuItem>) {
  await updateDoc(doc(db, 'menuItems', id), item);
}

export async function deleteMenuItemFromFirestore(id: string) {
  await deleteDoc(doc(db, 'menuItems', id));
}

export async function createCustomerOrder(order: Omit<CustomerOrder, 'id'>) {
  const docRef = await addDoc(collection(db, 'orders'), order);
  return docRef.id;
}

export async function updateOrderStatusInFirestore(orderId: string, status: CustomerOrder['status']) {
  await updateDoc(doc(db, 'orders', orderId), { status });
}

export async function addReviewToFirestore(review: Omit<Review, 'id'>) {
  const docRef = await addDoc(collection(db, 'reviews'), review);
  return docRef.id;
}

export async function updateReviewInFirestore(id: string, review: Partial<Review>) {
  await updateDoc(doc(db, 'reviews', id), review);
}

export async function deleteReviewFromFirestore(id: string) {
  await deleteDoc(doc(db, 'reviews', id));
}

export async function addGalleryItemToFirestore(item: Omit<GalleryItem, 'id'>) {
  const docRef = await addDoc(collection(db, 'gallery'), item);
  return docRef.id;
}

export async function deleteGalleryItemFromFirestore(id: string) {
  await deleteDoc(doc(db, 'gallery', id));
}

// Image upload helper (Firebase Storage + base64 fallback)
export async function uploadImageFile(file: File, folder: string = 'uploads'): Promise<string> {
  try {
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storageRef = ref(storage, `${folder}/${timestamp}_${cleanFileName}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (err) {
    console.warn("Firebase Storage upload failed, falling back to data URL encoding:", err);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsDataURL(file);
    });
  }
}
