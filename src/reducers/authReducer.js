import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.loginInit:
            return {
                ...state, loading: true
            }
        case types.loginSuccess:
            return {
                ...state, user: action.payload.user
            }
        case types.loginFailure:
            return {
                ...state
            }
        case types.loginEnd:
            return {
                ...state, loading: false
            }
        case types.logout:
            return {}
        default:
            return state;
    }
}