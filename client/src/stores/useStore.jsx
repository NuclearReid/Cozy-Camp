import { create } from 'zustand'
import { subscribeWithSelector, persist } from 'zustand/middleware'

// 'create' creates the Zustand store
// 'persist' puts the store into the local storage so it can be used when the user goes to another page

// Look in 'SearchBar.jsx'
const useStore = create(persist(subscribeWithSelector((set) => ({
    // the initial state
    searchedUser: null,
    setSearchedUser: (user) => {
        // updates the state
        set({ 
            // sets 'searchedUser' state to being the searched user
            searchedUser: user
        });
    }
})), {
    // Where the State is saved in the local storage
    name: 'searched-user-storage', 
}))

export default useStore