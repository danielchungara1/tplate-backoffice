import axios from "axios";

export const axiosClient = axios.create({
    //LOCAL
    baseURL: 'https://localhost:8080/api',

    //PRODUCCION
    //baseURL: 'https://tplate.herokuapp.com/api',
})