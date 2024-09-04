import axiosClient from "@/services/axios";
import { ACTION } from "@/utils/action";
import { createContext, useContext, useEffect, useReducer, useState } from "react";

const INITIAL_STATE = {
  data: {},
  error: [],
  loading: false,
  success: false,
  failed: false,
  message: null
}

function loginReducer(state, action) {
  switch (action.type) {
    case ACTION.CHANGE: {
      return {
        ...state,
        [action.name]: action.value
      }
    }
    case ACTION.SET_DATA: {
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
    case ACTION.RESET_ACTION: {
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
  state: INITIAL_STATE,
  setUser: () => { },
  setToken: () => { },
  dispatch: () => { },
  deleteTokenAndUser: () => { }
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, _setToken] = useState(localStorage.getItem("USER-TOKEN"));
  // const token = localStorage.getItem("USER-TOKEN");
  const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE);

  const setToken = (tokenValue) => {
    if (tokenValue) {
      _setToken(tokenValue)
      localStorage.setItem("USER-TOKEN", tokenValue)
    }
  }

  const getAccessToken = () => {
    return localStorage.getItem("USER-TOKEN");
  }

  const deleteTokenAndUser = () => {
    _setToken(null)
    setUser(null)
    localStorage.removeItem("USER-TOKEN")
    window.location.href = "/"
  }

  // useEffect(() => {
  //   const token = localStorage.getItem("USER-TOKEN");
  //   if (!token) {
  //     deleteTokenAndUser();
  //   }

  //   window.addEventListener("storage", () => {
  //     const token = localStorage.getItem("USER-TOKEN");
  //     if (!token) {
  //       deleteTokenAndUser();
  //     }
  //   });
  // }, [])


  return (
    <StateContext.Provider
      value={{
        user,
        token,
        state,
        setUser,
        setToken,
        dispatch,
        getAccessToken,
        deleteTokenAndUser
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
export const resetAction = () => ({ type: ACTION.RESET_ACTION });

export const actionLogout = async (url, dispatch) => {
  dispatch({ type: ACTION.START })
  try {
    const response = await axiosClient.delete(url);
    if (response.status === 200) {
      dispatch({ type: ACTION.SUCCESS, data: response.data, message: response.data.message })
      return response.data;
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      dispatch({
        type: ACTION.FAILED,
        error: error?.response?.data?.errors,
        message: error?.response?.data?.errors?.message
      })
    } else {
      dispatch({
        type: ACTION.FAILED,
        message: 'Sorry! Something went wrong. App server error'
      })
    }
  }
}

export const actionLogin = async (url, data, dispatch, contentType) => {
  dispatch({ type: ACTION.START })
  try {
    const response = await axiosClient.post(url, data, {
      headers: {
        'Content-Type': contentType || 'application/json'
      }
    });
    if (response.status === 200) {
      dispatch({
        type: ACTION.SUCCESS,
        data: response.data,
        message: response.data.message
      })
      return response.data;
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      dispatch({
        type: ACTION.FAILED,
        error: error?.response?.data?.errors,
        message: error?.response?.data?.errors?.message
      })
    } else {
      dispatch({
        type: ACTION.FAILED,
        message: 'Sorry! Something went wrong. App server error'
      })
    }
  }
}
export const actionUpdateProfile = async (url, data, dispatch, contentType) => {
  dispatch({ type: ACTION.START })
  try {
    const response = await axiosClient.post(url, data, {
      headers: {
        'Content-Type': contentType || 'application/json'
      }
    });
    if (response.status === 200) {
      dispatch({
        type: ACTION.SUCCESS,
        data: response.data,
        message: response.data.message
      })
      return response.data;
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      dispatch({
        type: ACTION.FAILED,
        error: error?.response?.data?.errors,
        message: error?.response?.data?.errors?.message
      })
    } else {
      dispatch({
        type: ACTION.FAILED,
        message: 'Sorry! Something went wrong. App server error'
      })
    }
  }
}

export const actionRegister = async (url, data, dispatch, contentType) => {
  dispatch({ type: ACTION.START })
  try {
    const response = await axiosClient.post(url, data, {
      headers: {
        'Content-Type': contentType || 'application/json'
      }
    });
    if (response.status === 201) {
      dispatch({
        type: ACTION.SUCCESS,
        data: response.data,
        message: response.data.message
      })
      return response.data;
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      dispatch({
        type: ACTION.FAILED,
        error: error?.response?.data?.errors,
        message: error?.response?.data?.errors?.message
      })
    } else {
      dispatch({
        type: ACTION.FAILED,
        message: 'Sorry! Something went wrong. App server error'
      })
    }
  }
}

export { INITIAL_STATE, loginReducer }
