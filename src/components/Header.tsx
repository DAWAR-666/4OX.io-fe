import toast from "react-hot-toast"
import { useAuthStore } from "../utils/authStore"
import axios from "axios"

const Header = () => {
    const setUser = useAuthStore(state => state.setUser)
    const user = useAuthStore(state => state.user)
    const apiUrl = import.meta.env.VITE_BASE_URL

    const handleLogout = async () => {
        // Clear local state first for better UX
        setUser(null)
        try {
            await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true })
        } catch (error:any) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <header className="fixed top-0 left-0 z-50 font-['Press_Start_2P'] w-full bg-black/50  border-b-8 border-double border-zinc-800 p-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Left: Branding & User */}
                <div className="flex items-center gap-4">
                    <div className="bg-indigo-600 p-2 shadow-[4px_4px_0_0_#4338ca] border-2 border-white flex items-center justify-center">
                        <span className="text-white text-xs"></span>
                    </div>
                    <div>
                        <h1 className="text-zinc-500 text-[8px] mb-1 italic uppercase tracking-tighter">Player_Profile</h1>
                        <h2 className="text-white text-sm tracking-wider ">
                            {user?.userName || "Guest"}
                        </h2>
                    </div>
                </div>

                {/* Center: Stat Cards */}
                <div className="flex flex-wrap justify-center gap-4">
                    <div className="bg-zinc-900 border-2 border-yellow-500 p-2 flex flex-col items-center min-w-25">
                        <span className="text-yellow-500 text-[7px] mb-1">WIN_RATE</span>
                        <span className="text-white text-sm">{user?.stats?.winRate?? 0}%</span>
                    </div>

                    <div className="bg-zinc-900 border-2 border-zinc-700 p-2 flex gap-4">
                        <div className="flex flex-col items-center">
                            <span className="text-emerald-500 text-[7px] mb-1">WINS</span>
                            <span className="text-white text-xs">{user?.stats?.wins ?? 0}</span>
                        </div>
                        <div className="w-px bg-zinc-700 h-full"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-rose-500 text-[7px] mb-1">LOSS</span>
                            <span className="text-white text-xs">{user?.stats?.losses ?? 0}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center">
                    <button 
                        onClick={handleLogout}
                        className="group relative px-4 py-2 bg-rose-600 border-2 border-white shadow-[4px_4px_0_0_#991b1b] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                        <span className="text-white text-[10px] group-hover:text-zinc-200">
                            LOGOUT
                        </span>
                    </button>
                </div>

            </div>
        </header>
    )
}

export default Header