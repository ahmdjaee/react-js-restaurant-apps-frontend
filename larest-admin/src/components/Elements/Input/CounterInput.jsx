import { useEffect, useState } from "react";

export default function CounterInput({ value = 1, onChange, minValue = 1, maxValue = Infinity, name, loading }) {
  const [quantity, setQuantity] = useState(Math.max(minValue, value)); // Ensure initial value is within bounds

  useEffect(() => {
    setQuantity(Math.max(minValue, value));
  }, [value])

  const decrement = () => {
    if (quantity > minValue) {
      setQuantity(prevValue => Math.max(minValue, prevValue - 1)); // Clamp to minimum value
      onChange && onChange(quantity - 1);
    }
  };

  const increment = () => {
    if (quantity < maxValue) {
      setQuantity(prevValue => Math.min(maxValue, prevValue + 1)); // Clamp to maximum value
      onChange && onChange(quantity + 1);
    }
  };

  return (
    <div className="custom-number-input h-10 w-20 sm:w-32">
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent">
        <button disabled={loading} type="button" onClick={decrement} className="bg-zinc-300 text-zinc-600 hover:text-zinc-700 hover:bg-zinc-400 h-full w-20 rounded-l cursor-pointer outline-none" data-action="decrement">
          {loading
            ? <i className="fa-solid fa-spinner animate-spin" />
            : <span className="m-auto text-2xl font-thin">−</span>
          }
        </button>
        <input
          type="text"
          inputMode="numeric"
          //   pattern="\d*"
          className="outline-none focus:outline-none text-center w-full bg-zinc-300 font-semibold text-md hover:text-black focus:text-black text-sm md:text-base cursor-default flex items-center text-zinc-700"
          name={name}
          value={quantity}
          onChange={(e) => {
            const inputValue = e.target.value;
            const parsedValue = parseInt(inputValue, 10);
            if (inputValue === '') {
              setQuantity('');
              onChange && onChange('');
              setTimeout(() => {
                setQuantity(minValue);
                onChange && onChange(minValue);
              }, 500);
            } else if (!isNaN(parsedValue) && parsedValue >= minValue && parsedValue <= maxValue) {
              setQuantity(parsedValue);
              onChange && onChange(parsedValue);
            }
          }}
        />
        <button disabled={loading} type="button" onClick={increment} className="bg-zinc-300 text-zinc-600 hover:text-zinc-700 hover:bg-zinc-400 h-full w-20 rounded-r cursor-pointer" data-action="increment">
          {loading
            ? <i className="fa-solid fa-spinner animate-spin" />
            : <span className="m-auto text-2xl font-thin">+</span>
            }
        </button>
      </div>
    </div>
  );
}