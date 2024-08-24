import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { create } from 'zustand';
import { auth } from "../../firebase.config";
import UserDao from "../daos/UserDao"; 
const provider = new GoogleAuthProvider();

/**
 * Zustand store for handling user authentication state.
 * 
 * This store provides methods for logging in with Google, logging out, and observing
 * authentication state changes. It also manages the user state and a loading state.
 * 
 * @typedef {Object} AuthStore
 * @property {Object|null} user - The authenticated user object or null if not authenticated.
 * @property {boolean} loading - Indicates whether the authentication state is loading.
 * @property {function(): Promise<void>} loginGoogleWithPopUp - Function to log in with Google using a pop-up window.
 * @property {function(): Promise<void>} logout - Function to log out the current user.
 * @property {function(): void} observeAuthState - Function to observe changes in the authentication state.
 */

/**
 * Creates and returns the authentication store using Zustand.
 * 
 * @function
 * @returns {AuthStore} The Zustand store managing authentication.
 */
const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  /**
   * Logs in the user with Google using a pop-up window.
   * If the user doesn't exist in the database, they are created using the ⁠ UserDAO ⁠.
   * 
   * @async
   * @function
   * @returns {Promise<void>}
   */
  loginGoogleWithPopUp: async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userExists = await UserDao.getUserById(user.uid);

      if (!userExists.success) {
        await UserDao.createUser({
          id: user.uid, 
          email: user.email,
          name: user.displayName,
          photo: user.photoURL,
        });
      }

    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Logs out the current user.
   * 
   * @async
   * @function
   * @returns {Promise<void>}
   */
  logout: async () => {
    await signOut(auth)
      .then(() => {
        set({ user: null });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  /**
   * Observes changes in the authentication state and updates the store accordingly.
   * Sets the ⁠ loading ⁠ state to true while checking the authentication state.
   * 
   * @function
   * @returns {void}
   */
  observeAuthState: () => {
    set({ loading: true });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    });
  },
}));

export default useAuthStore;