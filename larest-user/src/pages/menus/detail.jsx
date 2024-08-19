import CounterInput from "@/components/Elements/Input/CounterInput";
import TextCurrency from "@/components/Elements/Text/TextCurrency";
import { actionAddToCart, resetAction, useCartContext } from "@/context/CartContextProvider";
import axiosClient from "@/services/axios";
import { Button, Snackbar } from "@mui/joy";
import { Link, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const menu = await axiosClient.get(`/menus/${params.id}`);
  return { menu: menu?.data?.data };
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await axiosClient.post('/carts', data);
    if (response.status !== 201) return { success: false };
    return { success: true };
  } catch (error) {
    return { error: error.response.data.errors }
  }
}
function Detail() {
  const { menu } = useLoaderData();
  const { state, dispatch } = useCartContext();
  const { action } = state;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formJson = Object.fromEntries(formData.entries());
    await actionAddToCart(`/carts`, formJson, dispatch);
  }

  return (
    <div className="container flex flex-col sm:flex-row sm:justify-center items-center h-full sm:gap-10 ">
      <Snackbar
        open={action?.success || action?.failed}
        color={action?.success ? "success" : action?.failed ? "danger" : null}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch(resetAction())}
      >
        {action?.message}
      </Snackbar>

      <Link
        to={-1}
        className="hidden sm:block absolute top-24 left-56 cursor-pointer text-primary font-semibold"
      >
        &#x2B9C; Menu
      </Link>
      <img className="sm:w-5/12 xl:h-[26rem] sm:rounded-lg object-cover" src={menu.image_large} alt="" />
      <div className="p-3 w-full sm:w-5/12 flex flex-col flex-1">
        <h1 className="text-lg sm:text-5xl font-semibold">{menu.name}</h1>
        <p className="text-base sm:my-4">{menu.description}</p>
        <TextCurrency
          fontWeight={"font-bold"}
          className="flex-1"
          style="mb-12"
          text={menu.price}
        />
        <form className="flex sticky bottom-0 gap-5 sm:mt-5" onSubmit={handleSubmit}>
          <input type="hidden" name="menu_id" value={menu.id} />
          <CounterInput name={"quantity"} />
          <Button
            size="sm"
            disabled={false}
            color="dark"
            fullWidth
            loading={action.loading}
            loadingPosition="start"
            type="submit"
          >
            Add To Cart
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Detail