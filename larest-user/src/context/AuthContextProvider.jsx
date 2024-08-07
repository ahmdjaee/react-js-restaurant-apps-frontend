import axiosClient from "@/services/axios";
import { ACTION } from "@/utils/action";
import { createContext, useContext, useReducer, useState } from "react";
const INITIAL_STATE = {
  email: "",
  password: "",
  errors: [],
  loading: false,
}

function loginReducer(state, action) {
  switch (action.type) {
    case ACTION.CHANGE: {
      return {
        ...state,
        [action.name]: action.value
      }
    }
    case ACTION.SET_FORM_DATA: {
      return { ...state, ...action.formData };
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
        data: action.data,
        message: action.message
      }
    }
    case ACTION.FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
        failed: true,
        error: action.error,
        message: action.message
      }
    }
    case ACTION.RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        failed: false,
        error: null,
      }
    }
    default:
      return state
  }
}

const StateContext = createContext({
  user: null,
  token: null,
  state: null,
  setUser: () => { },
  setToken: () => { },
  dispatch: () => { },
  deleteTokenAndUser: () => { }
});

export default function AuthContextProvider({ children }) {
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
    window.location.reload()
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



export const actionLogout = async (url, dispatch) => {
  dispatch({ type: ACTION.START })
  try {
    const response = await axiosClient.delete(url);
    if (response.status === 200) {
      dispatch({ type: ACTION.SUCCESS, data: response.data, message: response.data.message })
      return response.data;
    }
  } catch (error) {
    dispatch({
      type: ACTION.FAILED,
      error: error.response.data.errors,
      message: error.response.data?.errors?.message || 'Sorry! Something went wrong. App server error'
    })
  }
}

export { INITIAL_STATE, loginReducer }
