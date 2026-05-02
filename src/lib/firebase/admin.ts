import { getApp, getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
  : undefined;

const app = getApps().length
  ? getApp()
  : initializeApp(serviceAccount ? { credential: cert(serviceAccount) } : undefined);

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
