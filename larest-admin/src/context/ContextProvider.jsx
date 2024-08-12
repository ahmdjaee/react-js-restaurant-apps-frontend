import { createContext, useContext, useReducer, useState } from "react";
import { ACTION } from "../utils/action";

const StateContext = createContext({
    user: null,
    token: null,
    state: null,
    search: null,
    setUser: () => { },
    setToken: () => { },
    dispatch: () => { },
    setSearch: () => { }
});

export default function ContextProvider({ children }) {

    const [user, setUser] = useState(null)
    const [token, _setToken] = useState(localStorage.getItem("ADMIN-TOKEN"))
    const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE)
    const [search, setSearch] = useState("")

    const setToken = (token) => {
        if (token) {
            _setToken(token)
            localStorage.setItem("ADMIN-TOKEN", token)
        } else {
            localStorage.removeItem("ADMIN-TOKEN")
            _setToken(null)
        }
    }

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                state,
                search,
                setUser,
                setToken,
                dispatch,
                setSearch
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
    errors: null,
    loading: false,
    failed: false
}

function loginReducer(state, action) {
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
                email: action.email,
                password: action.password
            }
        }
        case ACTION.FAILED: {
            return {
                ...state,
                loading: false,
                errors: action.payload.errors,
                failed: true
            }
        }
        case ACTION.RESET_ACTION: {
            return {
                ...state,
                loading: false,
                failed: false
            }
        }
        default:
            state
    }
}

export { INITIAL_STATE, loginReducer };

