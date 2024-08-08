import { createContext, useContext, useReducer, useState } from "react";

const CartContext = createContext({
    state: {},
    dispatch: () => { },
    openDialog: false,
    setOpenDialog: () => { },
    quantity: null,
    setQuantity: () => { },
    item: {},
    setItem: () => { }
});

export default function CartContextProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const [openDialog, setOpenDialog] = useState(false)
    const [quantity, setQuantity] = useState(null)
    const [item, setItem] = useState({})

    return (
        <CartContext.Provider value={{
            openDialog,
            setOpenDialog,
            quantity,
            setQuantity,
            state,
            dispatch,
            item,
            setItem
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext)

const INITIAL_STATE = {
    carts: null,
    error: null,
    loading: true,
    submitting: false,
    success: false,
    dialog: null,
    message: null
}

function cartReducer(state, action) {
    switch (action.type) {
        case "START":
            return {
                ...state,
                loading: true,
            }
        case "SUBMIT":
            return {
                ...state,
                submitting: true,
            }
        case "ADD":
            return {
                ...state,
                carts: [...state.carts, action.payload]
            }
        case "SET_CART":
            return {
                ...state,
                carts: action.payload,
                loading: false
            }
        case "UPDATE":
            return {
                ...state,
                success: true,
                submitting: false,
                message: action.message,
                carts: state.carts.map(cart => {
                    if (cart.id === action.payload.id) {
                        return action.payload
                    }
                    return cart
                })
            }
        case "DELETE":
            return {
                ...state,
                carts: state.carts.filter(cart => cart.id !== action.payload),
                success: true,
                dialog: false,
                message: action.message

            }
        case "ERROR":
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case "SUCCESS":
            return {
                ...state,
                success: true,
                loading: false
            }
        case "RESET":
            return {
                ...state,
                submitting: false,
                success: false,
            }
        default:
            return state
    }
}
