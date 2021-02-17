import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.loginInit:
            return {
                loading: true
            }
        case types.loginSuccess:
            return {
                user: action.payload.user
            }
        case types.loginEnd:
            return {
                loading: false
            }
        case types.logout:
            return {}
        default:
            return state;
    }
}