import { useState, useCallback, useEffect } from "react";

export default function CounterInput({ value = 1, onChange }) {
    const [quantity, setQuantity] = useState(value);
    if (quantity < 1) setQuantity(1)

    useEffect(() => {
        onChange(quantity)
    }, [quantity])

    const decrement = () => {
        setQuantity(prevValue => prevValue - 1);
    };

    const increment = () => {
        setQuantity(prevValue => prevValue + 1);
    };

    return (
        <div className="custom-number-input h-10 w-32">
            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent">
                <button onClick={decrement} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none" data-action="decrement">
                    <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700" name="custom-input-number"
                    value={quantity} onChange={(e) => setQuantity(e.target.value)}
                />
                <button onClick={increment} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer" data-action="increment">
                    <span className="m-auto text-2xl font-thin">+</span>
                </button>
            </div>
        </div>
    )
} 