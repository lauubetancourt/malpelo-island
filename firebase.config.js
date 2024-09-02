import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/**
 * Configuration object for your Firebase web application.
 * Contains API keys and other identifiers for connecting to Firebase services.
 * 
 * @constant
 * @type {Object}
 * @property {string} apiKey - API key for your Firebase project.
 * @property {string} authDomain - Auth domain for Firebase Authentication.
 * @property {string} projectId - Project ID for Firebase Firestore.
 * @property {string} storageBucket - Cloud Storage bucket for Firebase.
 * @property {string} messagingSenderId - Sender ID for Firebase Cloud Messaging.
 * @property {string} appId - App ID for the Firebase project.
 */
const firebaseConfig = {
  apiKey: "AIzaSyDcsbbyMIX-7ZKsLgyi3diiCA7GnGAPXrM",
  authDomain: "malpelo-island.firebaseapp.com",
  projectId: "malpelo-island",
  storageBucket: "malpelo-island.appspot.com",
  messagingSenderId: "202082258276",
  appId: "1:202082258276:web:09aeb35e47991ed6ec7e71",
};

/**
 * Initializes the Firebase app with the provided configuration.
 * 
 * @constant
 * @type {FirebaseApp}
 */
const app = initializeApp(firebaseConfig);

/**
 * Firebase Authentication service instance.
 * Provides methods for user authentication.
 * 
 * @constant
 * @type {Auth}
 */
const auth = getAuth(app);

/**
 * Firestore database instance.
 * Provides methods to interact with Firestore database.
 * 
 * @constant
 * @type {Firestore}
 */
const db = getFirestore(app);

export { auth, db };