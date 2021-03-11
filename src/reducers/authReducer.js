import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        // Login Actions
        case types.loginSuccess:
            return {
                ...state, user: action.payload
            }
        case types.loginFailure:
            return {
                ...state
            }

       // Reset  Actions
        case types.resetPassword1Success:
            return {
                ...state, resetEmail: action.payload
            }
        case types.resetPassword1Failure:
            return {
                ...state
            }

        default:
            return state;
    }
}