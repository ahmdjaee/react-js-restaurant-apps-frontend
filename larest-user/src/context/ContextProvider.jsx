import { createContext, useContext, useReducer, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  state: null,
  setUser: () => { },
  setToken: () => { },
  dispatch: () => { },
  deleteTokenAndUser: () => { }
});

export default function ContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, _setToken] = useState(localStorage.getItem("USER-TOKEN"))
  const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE)

  const setToken = (tokenValue) => {
    if (tokenValue) {
      _setToken(tokenValue)
      localStorage.setItem("USER-TOKEN", tokenValue)
    }
  }

  const deleteTokenAndUser = () => {
    _setToken(null)
    setUser(null)
    localStorage.removeItem("USER-TOKEN")
  }

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        state,
        setUser,
        setToken,
        dispatch,
        deleteTokenAndUser
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
        password: action.password,
        loading: false,
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
