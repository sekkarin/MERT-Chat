import { io } from 'socket.io-client';
const BASE_API_URL = import.meta.env.VITE_API_URL;

export const socket = io(BASE_API_URL);