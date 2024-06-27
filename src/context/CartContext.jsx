import { createContext, useContext } from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
    return (
        <CartContext.Provider value={{}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext)

const INITIAL_STATE = {
    cart: [],
    total: 0,
    loading: false,
    error: null
}

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        case "UPDATE":
            return {
                ...state,
                cart: state.cart.map(cart => {
                    if (cart.id === action.payload.id) {
                        return action.payload
                    }
                    return cart
                })
            }
        case "DELETE":
            return {
                ...state,
                cart: state.cart.filter(cart => cart.id !== action.payload)
            }
        default:
            return state
    }
}
