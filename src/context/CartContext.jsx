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

export default function CartProvider({ children }) {
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
    success: false,
    dialog: null
}

function cartReducer(state, action) {
    switch (action.type) {
        case "START":
            return {
                ...state,
                loading: true
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
                dialog: false
            }
        case "ERROR":
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case "RESET":
            return {
                ...state,
                error: null,
                success: false
            }
        default:
            return state
    }
}
