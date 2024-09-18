import CounterInput from "@/components/Elements/Input/CounterInput";
import OptionWithState from "@/components/Elements/Input/Option";
import useFetchData from "@/hooks/useFetch";
import { ACTION } from "@/utils/action";
import { formatCurrency } from "@/utils/helper";
import { Button, FormControl, FormLabel, IconButton, Input, Select } from "@mui/joy";
import PropTypes from "prop-types";
import { useReducer } from "react";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

OrderItemCard.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

const INITIAL_STATE = {
  items: [
    {
      id: Date.now(),
      menu: null,
      price: 0,
      quantity: 1,
    },
  ], // Inisialisasi dengan array kosong
};

export default function OrderItemCard() {
  const [loading, error, response] = useFetchData("/menus");
  const [state, dispatch] = useReducer(orderReducer, INITIAL_STATE);

  return (
    <div className="flex flex-col">
      {state.items.map((item, index) => (
        <div
          key={item.id}
          className="flex items-center gap-5 rounded-lg border bg-white px-2 py-6 sm:px-6 mb-4"
        >
          <FormControl sx={{ flex: 1 }}>
            <FormLabel>Menu</FormLabel>
            <Select
              value={item.menu}
              onChange={(_, value) =>
                dispatch(updateOrderItem(index, "menu", value))
              }
              required
              name="reservation_id"
              placeholder="Select menu"
            >
              <OptionWithState
                loading={loading}
                error={error}
                data={response?.data}
              />
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input value={formatCurrency(item.price)} disabled name="price" />
          </FormControl>

          <FormControl>
            <FormLabel>Quantity</FormLabel>
            <CounterInput
              name={"quantity"}
              value={item.quantity}
              onChange={(value) =>
                dispatch(updateOrderItem(index, "quantity", value))
              }
            />
          </FormControl>

          <IconButton onClick={() => dispatch(deleteOrderItem(index))}>
            <FaTrash className="text-gray-600" />
          </IconButton>
        </div>
      ))}
      <Button
        sx={{ marginInline: "auto" }}
        variant="outlined"
        color="neutral"
        onClick={() => dispatch(addOrderItem())}
        startDecorator={<BsPlus className="size-5" />}
      >
        Add to items
      </Button>
    </div>
  );
}

function orderReducer(state, action) {
  switch (action.type) {
    case ACTION.CREATE:
      return {
        ...state,
        items: [
          ...state.items,
          { id: Date.now(), menu: null, price: 0, quantity: 1 },
        ],
      };
    case ACTION.UPDATE:
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.payload.index
            ? { ...item, [action.payload.field]: action.payload.value }
            : item
        ),
      };
    case ACTION.DELETE:
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      };
    default:
      return state;
  }
}

const addOrderItem = () => ({ type: ACTION.CREATE });
const updateOrderItem = (index, field, value) => ({
  type: ACTION.UPDATE,
  payload: { index, field, value },
});
const deleteOrderItem = (index) => ({ type: ACTION.DELETE, payload: index });
