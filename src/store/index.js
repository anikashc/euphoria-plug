import create from "zustand";
import { devtools } from 'zustand/middleware'

let store = (set) => ({
    token: null,
    profile: {},
    profiles: [],
    logout: false,
    favourites: [],
    setToken: (value) => {
        set((state) => ({ token: value }));
        set((state) => ({ logout: false }));
        localStorage.setItem("token", value);
    },
    setProfile: (value) => {
        console.log('profile',value)
        set((state) => ({ profile: value }));
    },
    setProfiles: (value) => {
        console.log('profiles',value)
        set((state) => ({ profiles: value }));
    },
    setFavourites: (value) => {
        console.log('favourites',value)
        set((state) => ({ favourites: value }));
    },
    setLogout: (value) => {
        set((state) => ({ logout: value }));
        set((state) => ({ token: null }));
        set((state) => ({ profile: {} }));
        set((state) => ({ profiles: [] }));
        localStorage.removeItem("token");
    }
});


const useStore = create(devtools(store));

export default useStore; 