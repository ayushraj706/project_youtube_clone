import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      watchedCategories: [], // User ne kaunsi category dekhi hai
      lastVideoId: null,

      // Jab user koi video dekhe, ye function call karo
      addWatchedCategory: (category) => set((state) => ({
        watchedCategories: Array.from(new Set([...state.watchedCategories, category])).slice(-5) // Sirf last 5 categories yaad rakhega
      })),
      
      setLastVideo: (id) => set({ lastVideoId: id }),
    }),
    { name: 'user-preferences' } // Ye data LocalStorage mein save ho jayega
  )
);
