import { createContext, useContext, useReducer, useState } from "react";
import axiosClient from "../service/axios";
import { ACTION } from "../utils/action";

const INITIAL_KEY_STATE = {
  data: null,
  message: null,
  loading: false,
  error: null,
  success: false,
  failed: false
}

const INITIAL_STATE = {
  list: {
    data: null,
    message: null,
    loading: false,
    error: null,
    success: false,
    failed: false,
    refetch: false,
  },
  data: null,
  action: INITIAL_KEY_STATE,
}


export function crudReducer(state, action) {
  const { keyState } = action;
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
        [keyState]: {
          ...state[keyState],
          loading: true,
        },
      }
    }
    case ACTION.SUCCESS: {
      return {
        ...state,
        [keyState]: {
          loading: false,
          success: true,
          data: action.data,
          message: action.message
        }
      }
    }
    case ACTION.SET_DATA: {
      return {
        ...state,
        data: action.data
      }
    }
    case ACTION.REFETCH: {
      return {
        ...state,
        refetch: !state.refetch
      }
    }
    case ACTION.FAILED: {
      return {
        ...state,
        [keyState]: {
          loading: false,
          success: false,
          failed: true,
          error: action.error,
          message: action.message
        }
      }
    }
    case ACTION.RESET_ACTION: {
      return {
        ...state,
        [keyState]: {
          ...INITIAL_STATE[keyState],
        },
      }
    }
    case ACTION.RESET_STATE: {
      return INITIAL_STATE;
    }
    default:
      return state
  }
}

const CrudContext = createContext({
  state: INITIAL_STATE,
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

export const resetAction = () => ({ type: ACTION.RESET_ACTION, keyState: 'action' });
export const resetState = () => ({ type: ACTION.RESET_STATE });
export const actionSetData = (data) => ({ type: ACTION.SET_DATA, data: data });

export const actionGet = async (url, dispatch) => {
  dispatch({ type: ACTION.START, keyState: 'list' })
  try {
    const response = await axiosClient.get(url);
    if (response.status === 200) {
      dispatch({
        type: ACTION.SUCCESS,
        data: response.data.data,
        keyState: 'list'
      })
    }
  } catch (error) {
    dispatch({
      type: ACTION.FAILED,
      error: error.response.data.errors,
      message: error?.response?.data?.errors?.message || 'Sorry! Something went wrong. App server error',
      keyState: 'list'
    })
  }
}

export const actionCreate = async (url, data, dispatch, contentType) => {
  dispatch({ type: ACTION.START, keyState: 'action' })
  try {
    const response = await axiosClient.post(url, data, {
      headers: {
        'Content-Type': contentType || 'application/json'
      }
    });
    if (response.status === 201) {
      dispatch({
        type: ACTION.SUCCESS,
        data: response.data.data,
        message: response.data.message,
        keyState: 'action'
      })
      dispatch({ type: ACTION.REFETCH })
      return response.data;
    }
  } catch (error) {
    dispatch({
      type: ACTION.FAILED,
      error: error.response.data.errors,
      message: error?.response?.data?.errors?.message || 'Sorry! Something went wrong. App server error',
      keyState: 'action'
    })
  }
}
export const actionPost = async (url, data, dispatch, contentType) => {
  dispatch({ type: ACTION.START, keyState: 'action' })
  try {
    const response = await axiosClient.post(url, data, {
      headers: {
        'Content-Type': contentType || 'application/json'
      }
    });
    if (response.status === 200) {
      dispatch({
        type: ACTION.SUCCESS,
        data: response.data.data,
        message: response.data.message,
        keyState: 'action'
      })
      dispatch({ type: ACTION.REFETCH })
      return response.data;
    }
  } catch (error) {
    dispatch({
      type: ACTION.FAILED,
      error: error.response.data.errors,
      message: error?.response?.data?.errors?.message || 'Sorry! Something went wrong. App server error',
      keyState: 'action'
    })
  }
}

export const actionUpdate = async (url, data, dispatch, contentType) => {
  dispatch({ type: ACTION.START, keyState: 'action' })
  try {
    const response = await axiosClient.put(url, data, {
      headers: {
        'Content-Type': contentType || 'application/json'
      }
    });
    if (response.status === 200) {
      dispatch({
        type: ACTION.SUCCESS,
        data: response.data.data,
        message: response.data.message,
        keyState: 'action'
      })
      dispatch({ type: ACTION.REFETCH })
      return response.data;
    }
  } catch (error) {
    dispatch({
      type: ACTION.FAILED,
      error: error.response.data.errors,
      message: error?.response?.data?.errors?.message || 'Sorry! Something went wrong. App server error',
      keyState: 'action'
    })
  }
}

export const actionDelete = async (url, dispatch) => {
  dispatch({ type: ACTION.START, keyState: 'action' })
  try {
    const response = await axiosClient.delete(url);
    if (response.status === 200) {
      dispatch({
        type: ACTION.SUCCESS,
        data: response.data.data,
        message: response.data.message,
        keyState: 'action'
      })
      dispatch({ type: ACTION.REFETCH })
    }
  } catch (error) {
    dispatch({
      type: ACTION.FAILED,
      error: error.response.data.errors,
      message: error?.response?.data?.errors?.message || 'Sorry! Something went wrong. App server error',
      keyState: 'action'
    })
  }
}