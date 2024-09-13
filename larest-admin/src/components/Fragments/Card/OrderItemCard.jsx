import CounterInput from "@/components/Elements/Input/CounterInput";
import OptionWithState from "@/components/Elements/Input/OptionWithState";
import useFetchData from "@/hooks/useFetch";
import { formatCurrency } from "@/utils/helper";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Select
} from "@mui/joy";
import PropTypes from "prop-types";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

OrderItemCart.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default function OrderItemCart() {
  const [loading, error, response] = useFetchData("/menus");

  const onDelete = () => {};

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-5  rounded-lg border bg-white px-2 py-6 sm:px-6 mb-4">
        <FormControl sx={{ flex: 1 }}>
          <FormLabel>Menu</FormLabel>
          <Select
            onChange={() => {}}
            required
            name="reservation_id"
            placeholder="Select menu"
          >
            <OptionWithState loading={loading} error={error} data={response?.data} />
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input value={formatCurrency()} disabled />
        </FormControl>

        <FormControl>
          <FormLabel>Quantity</FormLabel>
          <CounterInput name={"quantity"} />
        </FormControl>

        <IconButton onClick={onDelete}>
          <FaTrash className="text-gray-600" />
        </IconButton>
      </div>
      <Button
        sx={{ marginInline: "auto" }}
        startDecorator={<BsPlus className="size-5" />}
      >
        Add to items
      </Button>
    </div>
  );
}
