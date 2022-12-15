import create from "zustand";

export const useAppSore = create<AppStore>(set => ({
    user: {} as User,
    setUser(u) {
        set(s => ({...s, user: u}))
    },
    removeUser() {
        set(s => ({...s, user: undefined}))
    },
}))

interface AppStore {
    user: User
    setUser: (u: User) => void,
    removeUser: () => void
}

interface User {
    name: string,
    email: string,
    id: number
}