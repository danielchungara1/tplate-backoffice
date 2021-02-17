import { registerPost } from "../api/authApi";
import { types } from "../types/types"

export const register = (username, password) => {

    return (dispatch) => {
        dispatch(registerInit())
        setTimeout(() => {
            const res = registerPost(username, password)
            res.then(msg => {
                console.log(msg)
                dispatch(registerSuccess())
                dispatch(registerEnd())
            })
        }, 350);
    }
}

export const registerSuccess = () => {
    return {
        type: types.registerSuccess,
    }
}

export const registerInit = () => {
    return {
        type: types.registerInit
    }
}

export const registerEnd = () => {
    return {
        type: types.registerEnd
    }
}