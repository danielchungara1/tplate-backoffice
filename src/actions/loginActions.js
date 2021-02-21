import { types } from "../types/types"
import { loginPost } from '../api/authApi'
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";

export const login = (username, password, addToast, history) => {    
    return (dispatch) => {        
        dispatch(loginInit())
        setTimeout(() => {
            const res = loginPost(username, password)
            res.then(user => {
                try {
                    const userJson = JSON.parse(user);
                    addToast(userJson.message, { appearance: 'success' });
                    dispatch(loginSuccess(userJson.data))
                    history.push("/home")
                } catch(err) {
                    console.log(user)
                    dispatch(loginFailure())
                }finally{
                    dispatch(loginEnd())
                }
                
            })
        }, 0);
    }
}

export const loginSuccess = (user) => {
    return {
        type: types.loginSuccess,
        payload: {
            user
        }
    }
}

export const loginFailure = () => {
    return {
        type: types.loginFailure        
    }
}

export const loginInit = () => {
    return {
        type: types.loginInit
    }
}

export const loginEnd = () => {
    return {
        type: types.loginEnd
    }
}