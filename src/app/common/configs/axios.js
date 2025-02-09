import originalAxios from 'axios';

export const axios = originalAxios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL, 
    maxRedirects: 5
});

export const setupInterceptor = () => {
    axios.interceptors.request.use(
        async (config) => {
            if (typeof window !== 'undefined') {
                const token = await localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                config.headers['ngrok-skip-browser-warning'] = 'true';
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};
