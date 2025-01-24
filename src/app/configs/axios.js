import originalAxios from 'axios';

export const axios = originalAxios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL, 
});

export const setupInterceptor = () => {
    axios.interceptors.request.use(
        async (config) => {
            if (typeof window !== 'undefined') {
                const token = await localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};
