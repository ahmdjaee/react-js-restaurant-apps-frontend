import { ACTION } from "../utils/action"

export function postReducer(state, action) {

    switch (action.type) {
        case ACTION.CHANGE: {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        }
        case ACTION.START: {
            return {
                ...state,
                loading: true,
            }
        }
        case ACTION.SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true,
                data: action.payload.data
            }
        }
        case ACTION.ERROR: {
            return {
                ...state,
                loading: false,
                errors: action.payload.errors,
            }
        }
        default:
            state
    }
}
