import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;
console.log('API_URL = ', API_URL);
export const API = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

