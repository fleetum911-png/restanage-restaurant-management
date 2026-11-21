import { io } from 'socket.io-client'
export const connectRestaurantSocket=()=>{const url=import.meta.env.VITE_SOCKET_URL;if(!url)return null;return io(url,{autoConnect:false})}
