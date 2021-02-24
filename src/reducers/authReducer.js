import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.loginSuccess:
            return {
                ...state, user: action.payload
            }
        case types.loginFailure:
            return {
                ...state
            }
        default:
            return state;
    }
}