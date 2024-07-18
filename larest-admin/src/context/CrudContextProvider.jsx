import { createContext, useContext, useReducer, useState } from "react";
import axiosClient from "../service/axios";
import { ACTION } from "../utils/action";

const INITIAL_STATE = {
  data: null,
  message: "",
  loading: false,
  error: null,
  success: false,
  failed: false
}

export function crudReducer(state, action) {
  switch (action.type) {
    case ACTION.CHANGE: {
      return {
        ...state,
        [action.name]: action.value
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
        error: null
      }
    }
    default:
      return state
  }
}

const CrudContext = createContext({
  state: INITIAL_STATE,
  notificationMessage: "",
  setNotificationMessage: () => { },
  dispatch: () => { },
});


export default function CrudContextProvider({ children }) {
  const [state, dispatch] = useReducer(crudReducer, INITIAL_STATE);

  return (
    <CrudContext.Provider value={{
      state,
      dispatch,
    }}>
      {children}
    </CrudContext.Provider>
  )
}


export const useCrudContext = () => useContext(CrudContext)

export const actionCreate = async (url, data, dispatch, contentType) => {
  dispatch({ type: ACTION.START })
  try {
    const response = await axiosClient.post(url, data, {
      headers: {
        'Content-Type': contentType || 'application/json'
      }
    });
    if (response.status === 201) {
      dispatch({ type: ACTION.SUCCESS, data: response.data, message: response.data.message })
    }
  } catch (error) {
    dispatch({
      type: ACTION.FAILED,
      error: error.response.data,
      message: error.response.data.errors.message || 'Sorry! Something went wrong. App server error'
    })
  }
}
export const actionPost = async (url, data, dispatch, contentType) => {
  dispatch({ type: ACTION.START })
  try {
    const response = await axiosClient.post(url, data, {
      headers: {
        'Content-Type': contentType || 'application/json'
      }
    });
    if (response.status === 200) {
      dispatch({ type: ACTION.SUCCESS, data: response.data, message: response.data.message })
    }
  } catch (error) {
    dispatch({
      type: ACTION.FAILED,
      error: error.response.data,
      message: error.response.data.errors.message || 'Sorry! Something went wrong. App server error'
    })
  }
}

export const actionUpdate = async (url, data, dispatch, contentType) => {
  dispatch({ type: ACTION.START })
  try {
    const response = await axiosClient.put(url, data, {
      headers: {
        'Content-Type': contentType || 'application/json'
      }
    });
    if (response.status === 200) {
      dispatch({ type: ACTION.SUCCESS, data: response.data, message: response.data.message })
    }
  } catch (error) {
    dispatch({
      type: ACTION.FAILED,
      error: error.response.data,
      message: error.response.data.errors.message || 'Sorry! Something went wrong. App server error'
    })
  }
}

export const actionDelete = async (url, dispatch) => {
  dispatch({ type: ACTION.START })
  try {
    const response = await axiosClient.delete(url);
    if (response.status === 200) {
      dispatch({ type: ACTION.SUCCESS, data: response.data, message: response.data.message })
    }
  } catch (error) {
    dispatch({
      type: ACTION.FAILED,
      error: error.response.data,
      message: error.response.data?.errors?.message || 'Sorry! Something went wrong. App server error'
    })
  }
}