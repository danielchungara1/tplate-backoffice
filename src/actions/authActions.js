import { types } from "../types/types"

const userExample = {
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYW5pZWxjaHVuZ2FyYTFAZ21haWwuY29tIiwiQ0xBSU1fSUQiOjEsIkNMQUlNX1RPS0VOIjpbeyJhdXRob3JpdHkiOiJWSVNVQUxJWkFSX1BFUkZJTCJ9LHsiYXV0aG9yaXR5IjoiRURJVEFSX1BFUkZJTCJ9XSwiZXhwIjoxNjQ1MTAwOTQ5LCJpYXQiOjE2MTM1NjQ5NDl9.WA6fYpBmZcRLnAPeo3b2-V36mpKq007Gx_Vvj6xQpqf8Wzv2KFeVMSotC_PDP4ShTLkUQwtfW3MdyxZdz4Vccg",
    "username": "danielchungara1@gmail.com",
    "name": "Daniel",
    "lastname": "Chungara",
    "email": "danielchungara1@gmail.com",
    "telefono": "11-32652399"
}

export const login = (username, password) => {

    return (dispatch) => {
        dispatch(loginInit())
        setTimeout(() => {
            dispatch(loginSuccess(userExample))
            dispatch(loginEnd())            
        }, 1500);
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