import { createContext, useContext, useReducer, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    state: null,
    search:null,
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

export { INITIAL_STATE, loginReducer };

