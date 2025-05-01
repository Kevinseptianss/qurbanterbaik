import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

const app = getApps().length === 0
  ? initializeApp({
      credential: cert(serviceAccount),
      projectId: "qurbanterbaik-5957c",
    })
  : getApp();

const db = getFirestore(app);

export { db };