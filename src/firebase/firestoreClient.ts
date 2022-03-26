import admin from "firebase-admin";

import Logger from "../utils/logger";

const logger = Logger("firestoreClient");

// Initialize Firebase
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      }),
    });
  } catch (error) {
    logger.error(error);
  }
}
export default admin.firestore();
