import OptionWithState from "@/components/Elements/Input/OptionWithState";
import CustomMainCard from "@/components/Fragments/Card/CustomMainCard";
import OrderItemCart from "@/components/Fragments/Card/OrderItemCard";
import useFetchData from "@/hooks/useFetch";
import {
  Breadcrumbs,
  FormControl,
  FormLabel,
  Option,
  Select,
  Tab,
  tabClasses,
  TabList,
  Tabs,
} from "@mui/joy";
import { Link } from "react-router-dom";

function CreateOrder() {
  const [userLoading, userError, userResponse] = useFetchData("/admin/users");
  const [reservationLoading, reservationError, reservationResponse] =
    useFetchData("/admin/reservations");

  return (
    <CustomMainCard
      header={
        <Breadcrumbs sx={{ p: 0, m: 0 }}>
          <Link className=" text-xl/tight text-primary hover:underline" to={-1}>
            Orders
          </Link>
          <Link className="font-medium text-xl/tight cursor-auto">Create</Link>
        </Breadcrumbs>
      }
      className="flex flex-col gap-3"
    >
      <FormControl>
        <FormLabel required>Customer</FormLabel>
        <Select required name="user_id" placeholder="Select customer">
          <OptionWithState
            loading={userLoading}
            error={userError}
            data={userResponse?.data}
          />
        </Select>
      </FormControl>

      <FormControl required>
        <FormLabel>Status</FormLabel>
        <Tabs
          aria-label="tabs"
          defaultValue={0}
          sx={{ bgcolor: "transparent", display: "inline" }}
        >
          <TabList
            disableUnderline
            sx={{
              display: "inline-flex",
              p: 0.5,
              gap: 0.5,
              borderRadius: "xl",
              bgcolor: "background.level1",
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: "sm",
                bgcolor: "background.surface",
              },
            }}
          >
            <Tab disableIndicator>new</Tab>
            <Tab disableIndicator>checkout</Tab>
            <Tab disableIndicator>paid</Tab>
            <Tab disableIndicator>failed</Tab>
            <Tab disableIndicator>completed</Tab>
          </TabList>
        </Tabs>
      </FormControl>

      <FormControl required>
        <FormLabel>Reservation</FormLabel>
        <Select required name="reservation_id" placeholder="Select a reservation">
          <OptionWithState
            loading={reservationLoading}
            error={reservationError}
            data={reservationResponse?.data}
            renderOption={(item) => (
              <Option key={item.id} value={item.id}>
                {`#${item.id} - ${item.user?.name}`}
              </Option>
            )}
          />
        </Select>
      </FormControl>

      <FormControl required>
        <FormLabel>Order Items</FormLabel>
        <OrderItemCart />
      </FormControl>
    </CustomMainCard>
  );
}

export default CreateOrder;
