import axios from 'axios';

export const productsApi = axios.create({
    baseURL: '/api' //Como sale del mismo servidor no hace falta colocar el http://localhost:3000
});


export default productsApi;


