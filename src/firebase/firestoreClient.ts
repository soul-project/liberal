import admin from "firebase-admin";

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
    console.log("Firebase admin initialization error", error);
  }
}
export default admin.firestore();
