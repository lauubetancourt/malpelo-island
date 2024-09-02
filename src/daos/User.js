/**
 * UserDAO class handles CRUD operations for users in the Firestore database.
 * It interacts with the Firestore collection named "users".
 */

import { addDoc, collection, getDoc, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

class User {
  /**
   * Constructor initializes the Firestore collection reference for the "users" collection.
   */
  constructor() {
    this.collectionRef = collection(db, "users");
  }

  /**
   * Retrieves a user document by its ID from the Firestore database.
   * 
   * @param {string} id - The ID of the user to be retrieved.
   * @returns {Object} - An object containing a success flag and the user data if found.
   *                     If the user does not exist, the data is null.
   *                     If an error occurs, it returns the error object.
   */
  async getUserById(id) {
    try {
      const userDoc = await getDoc(doc(this.collectionRef, id));
      if (userDoc.exists()) {
        return { success: true, data: userDoc.data() };
      } else {
        return { success: false, data: null };
      }
    } catch (error) {
      console.log("Error getting document:", error);
      return { success: false, error };
    }
  }

  /**
   * Creates a new user document in the Firestore database.
   * 
   * @param {Object} userData - The data of the user to be created. It must include an ID.
   * @returns {void}
   * 
   * If the userData object does not contain an ID, it logs a message indicating that
   * the user is already registered and does not proceed with the creation.
   */
  async createUser(userData) {
    if (!userData.id) {
      console.log("The user is already registered.");
      return;
    }
    
    try {
      await setDoc(doc(this.collectionRef, userData.id), userData);
      console.log("Document written with ID: ", userData.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  /**
   * Updates an existing user document in the Firestore database.
   * 
   * @param {string} id - The ID of the user to be updated.
   * @param {Object} userData - The updated user data.
   * @returns {void}
   * 
   * If an error occurs during the update process, it logs the error.
   */
  async updateUser(id, userData) {
    try {
      const userRef = doc(this.collectionRef, id);
      await updateDoc(userRef, userData);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  /**
   * Deletes a user document from the Firestore database by its ID.
   * 
   * @param {string} id - The ID of the user to be deleted.
   * @returns {void}
   * 
   * If an error occurs during the deletion process, it logs the error.
   */
  async deleteUser(id) {
    try {
      await deleteDoc(doc(this.collectionRef, id));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  }
}

export default new User();