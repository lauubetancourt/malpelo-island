import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { create } from 'zustand';
import { auth } from "../../firebase.config";
import User from "../daos/User";
const provider = new GoogleAuthProvider();
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: true,

      loginGoogleWithPopUp: async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;

          const userExists = await User.getUserById(user.uid);

          if (!userExists.success) {
            await User.createUser({
              id: user.uid,
              email: user.email,
              name: user.displayName,
              photo: user.photoURL,
            });
          }

          set({ user }); // Guarda el usuario en Zustand
        } catch (error) {
          console.log(error);
        }
      },

      logout: async () => {
        await signOut(auth)
          .then(() => {
            set({ user: null });
          })
          .catch((error) => {
            console.log(error);
          });
      },

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
    }),
    {
      name: "auth-storage", 
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;