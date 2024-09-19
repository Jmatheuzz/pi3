import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:8080'})

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 403) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('id');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export { api }