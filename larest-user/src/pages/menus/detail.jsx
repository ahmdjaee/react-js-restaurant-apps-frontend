import CounterInput from "@/components/Elements/Input/CounterInput";
import TextCurrency from "@/components/Elements/Text/TextCurrency";
import axiosClient from "@/services/axios";
import { Button, Snackbar } from "@mui/joy";
import { useEffect, useState } from "react";
import { Form, Link, useActionData, useLoaderData, useNavigation } from "react-router-dom";

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
  const action = useActionData();
  const navigation = useNavigation();
  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    if (action?.success || action?.error) setSnackbar(true);
  }, [action]);

  return (
    <div className="container flex flex-col sm:flex-row sm:justify-center items-center h-full sm:gap-10 ">
      <Snackbar
        open={snackbar}
        color={action?.success ? "success" : action?.error ? "danger" : null}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => setSnackbar(false)}
      >
        {action?.success ? "Successfully added to cart" : action?.error.message}
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
        <Form className="flex sticky bottom-0 gap-5 sm:mt-5" method="post">
          <input type="hidden" name="menu_id" value={menu.id} />
          <CounterInput name={"quantity"} />
          <Button
            size="sm"
            disabled={false}
            color="dark"
            fullWidth
            loading={navigation.state === "submitting"}
            loadingPosition="start"
            type="submit"
          >
            Add To Cart
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Detail