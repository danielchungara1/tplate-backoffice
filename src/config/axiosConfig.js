import axios from "axios";

export const axiosClient = axios.create({
    baseURL: 'https://tplate.herokuapp.com/api',
})