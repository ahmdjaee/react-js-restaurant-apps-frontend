import { createContext, useContext, useReducer } from "react";

const UserContext = createContext({
    state: {},
    dispatch: () => { }
})

export function UserProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)

export const INITIAL_STATE = {
    users: [],
    loading: true,
    error: null,
    success: false
}
export function userReducer(state, action) {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
            }
        case "SET_SUCCESS":
            return {
                ...state,
                success: action.payload
            }
        case "RESET":
            return INITIAL_STATE
        default:
            return state
    }
}