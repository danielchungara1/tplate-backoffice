import { URL_BASE } from "./config";

const LOGIN_POST = URL_BASE + '/login';

export const loginPost = async (username, password) => {
    const resp = await fetch(LOGIN_POST, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'username': username, 'password': password })
    });    
    return await resp.json();    
}
