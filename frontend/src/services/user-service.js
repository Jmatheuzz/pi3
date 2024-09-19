import {api} from './api';

export const createUser = (user) =>{
    return api.post('/users', user);
}
export const login = (user) =>{
    return api.post('/auth/login', user);
}
export const updateInfo = (info) =>{
    return api.put(`/users/${window.localStorage.getItem('id')}`, info);
}

export const getUserInfo = () =>{
    return api.get(`/users/${window.localStorage.getItem('id')}`);
}

export const deleteAccount = (payload) =>{
    return api.post(`/users/delete/${window.localStorage.getItem('id')}`, payload);
}

