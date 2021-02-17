import { types } from "../types/types"
import { loginPost } from '../api/authApi'

export const login = (username, password) => {

    return (dispatch) => {
        dispatch(loginInit())
        setTimeout(() => {
            const res = loginPost(username, password)
            res.then(user => {
                try {
                    const userJson = JSON.parse(user);
                    console.log('Usuario logueado.' , userJson.username)
                    dispatch(loginSuccess(userJson))
                } catch(err) {
                    console.log(user)
                    dispatch(loginFailure())
                }finally{
                    dispatch(loginEnd())
                }
                
            })
        }, 350);
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