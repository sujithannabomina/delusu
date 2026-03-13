import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC9CSa4JSHpRHPpyKLB1eh9aOg5OeKWmCY",
  authDomain: "delusu.firebaseapp.com",
  projectId: "delusu",
  storageBucket: "delusu.firebasestorage.app",
  messagingSenderId: "1074810786294",
  appId: "1:1074810786294:web:1e9f9f2e6bee043891b7d7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;