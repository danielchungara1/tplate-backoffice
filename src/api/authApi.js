import { URL_BASE } from "./config";

const URL_SECURITY = URL_BASE + '/security';

const URL_LOGIN = URL_SECURITY + '/login';
const URL_REGISTER = URL_SECURITY + '/sign-up';


export const loginPost = async (username, password) => {
    const resp = await fetch(URL_LOGIN, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'username': username, 'password': password })
    });
    // return await resp.text();    
    // await resp.json().then(res => console.log(res));  
    const {ok, status} = resp;   
    if (!ok) {      
        let message = '';
        await resp.json().then(body => message = body.message);        
        throw message
    }
    return await resp.text();      
}

export const registerPost = async (username, password) => {
    const resp = await fetch(URL_REGISTER, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'username': username, 'password': password })
    });        
    return await resp.text();    
}
