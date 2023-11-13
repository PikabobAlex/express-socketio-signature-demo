import { ReactNode, createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  ref,
  uploadString,
  getStorage,
  getDownloadURL,
} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

export type FirebaseFunctions = {
  UploadString: (data: string) => Promise<string>;
};

// Create a context for Firebase
export const FirebaseContext = createContext<FirebaseFunctions | null>(null);
const app = initializeApp({
  apiKey: "AIzaSyBhdsQNnmEGxDi8EpVBKKEigg61UaTyqpA",
  authDomain: "pikabobalex-0414.firebaseapp.com",
  databaseURL:
    "https://pikabobalex-0414-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pikabobalex-0414",
  storageBucket: "pikabobalex-0414.appspot.com",
  messagingSenderId: "319169295391",
  appId: "1:319169295391:web:8c57ceb2de618a88c9512a",
  measurementId: "G-TSZ74HESQ0",
});
getAnalytics(app);
const storage = getStorage(app);
const UploadString = async (data: string) => {
  const hash =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const storageRef = ref(storage, "signature/" + hash);
  const snapshot = await uploadString(storageRef, data, "data_url");
  return getDownloadURL(snapshot.ref);
};
// Create a hook to use Firebase
// Create a provider for Firebase
export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [functions, setFunctions] = useState<FirebaseFunctions | null>(null);

  useEffect(() => {
    setFunctions({ UploadString });
  }, []);

  return (
    <FirebaseContext.Provider value={functions}>
      {children}
    </FirebaseContext.Provider>
  );
};
