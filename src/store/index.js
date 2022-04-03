import create from "zustand";
import { devtools } from 'zustand/middleware'

let store = (set) => ({
    token: null,
    user: {},
    setToken: (value) => {
        set((state) => ({ token: value }));
        localStorage.setItem("token", value);
    },
    setUser: (value) => {
        set((state) => ({ 
            user: value
        }));
    }
})

const useStore = create(devtools(store));

// use dev tools
export default useStore; 