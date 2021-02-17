import { types } from "../types/types"
import { loginPost } from '../api/authApi'

export const login = (username, password) => {

    return (dispatch) => {
        dispatch(loginInit())
        setTimeout(() => {
            const res = loginPost(username, password)
            res.then(user => {
                dispatch(loginSuccess(user))
                dispatch(loginEnd())
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