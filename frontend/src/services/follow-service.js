import {api} from './api';


export const getRecomendedFollow = () =>{
    return api.get(`/follows/recomendado/${window.localStorage.getItem('id')}`);
}
export const createFollow = (follow) =>{
    return api.post('/follows', follow);
}
