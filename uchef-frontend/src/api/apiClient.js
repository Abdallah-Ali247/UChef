import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api', // Django backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    
    return config;
});

export default apiClient;