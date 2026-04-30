import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  authUser: { name: "User", _id:123, age: 25 },
  isLoggedIn: false,
  isLoading: false,
  login: () => {
    console.log("You just logged in")
    set({ isLoggedIn: true, isLoading: true })
  }
}));