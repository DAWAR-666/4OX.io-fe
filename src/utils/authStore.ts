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
type Room={
    roomId:string,
    players:string[],
    gameState:string,
    winner:string|null
}

type AuthStore={
    user:User|null,
    setUser:(user:User|null)=>void
}
type RoomStore={
    room:Room|null,
    setRoom:(room:Room|null)=>void
}
export const useAuthStore=create<AuthStore>((set)=>({
    user:null,
    setUser:(user)=>set({user})
}))
export const useRoomStore=create<RoomStore>((set)=>({
    room:null,
    setRoom:(room)=>set({room})
}))