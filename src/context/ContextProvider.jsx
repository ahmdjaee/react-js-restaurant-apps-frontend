import { createContext, useContext, useReducer, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    state: null,
    setUser: () => {},
    setToken: () => {},
    dispatch : () => {}
});

export default function ContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, _setToken] = useState(localStorage.getItem("token"))
    const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE)

    const setToken = (token) => {
        if (token) {
            _setToken(token)
            localStorage.setItem("token", token)
        } else {
            localStorage.removeItem("token")
        }
    }

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                state,
                setUser,
                setToken,
                dispatch
            }}
        >
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);

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
