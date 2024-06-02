
const INITIAL_STATE = {
    email: "",
    password: "",
    errors: [],
    loading: false,
}

function loginReducer(state, action) {
    switch (action.type) {
        case "CHANGE": {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        }
        case "ACTION_START": {
            return {
                ...state,
                loading: true,
            }
        }
        case "ACTION_SUCCESS": {
            return {
                ...state,
                email: action.email,
                password: action.password
            }
        }
        case "ACTION_ERROR": {
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

export { INITIAL_STATE, loginReducer }