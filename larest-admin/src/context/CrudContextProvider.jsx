import { createContext, useContext, useReducer } from "react";
import axiosClient from "../service/axios";
import { ACTION } from "../utils/action";

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  success: false
}

export function crudReducer(state, action) {
  switch (action.type) {
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
        data: action.data
      }
    }
    case ACTION.FAILED: {
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      }
    }
    case ACTION.RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        error: null
      }
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
    <CrudContext.Provider value={{ state, dispatch }}>
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
      dispatch({ type: ACTION.SUCCESS, data: response.data })
    }
  } catch (error) {
    dispatch({ type: ACTION.FAILED, error: error.response.data })
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
      dispatch({ type: ACTION.SUCCESS, data: response.data })
    }
  } catch (error) {
    dispatch({ type: ACTION.FAILED, error: error.response.data })
  }
}

export const actionDelete = async (url, dispatch) => {
  dispatch({ type: ACTION.START })
  try {
    const response = await axiosClient.delete(url);
    if (response.status === 200) {
      dispatch({ type: ACTION.SUCCESS, data: response.data })
    }
  } catch (error) {
    dispatch({ type: ACTION.FAILED, error: error.response.data })
  }
}