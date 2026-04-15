import {create} from 'zustand'
type User={
    _id:string,
    userName: string;
    email: string;
    password: string;
    stats: {
        wins: number;
        losses: number;
        totalGames: number;
        winRate: number;
    }
}
type AuthStore={
    user:User|null,
    setUser:(user:User|null)=>void
}
export const useAuthStore=create<AuthStore>((set)=>({
    user:null,
    setUser:(user)=>set({user})
}))