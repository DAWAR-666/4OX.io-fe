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
export const useAuthStore=create((set)=>({
    user:null,
    setUser:(user:User)=>set({user})
}))