import { Button, Snackbar } from "@mui/joy";
import { useEffect, useState } from "react";
import { Form, Link, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import CounterInput from "@/components/Elements/Input/CounterInput";
import TextCurrency from "@/components/Elements/Text/TextCurrency";
import axiosClient from "@/services/axios";

export async function loader({ params }) {
  const menu = await axiosClient.get(`/menus/${params.id}`);
  return { menu: menu?.data?.data };
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const response = await axiosClient.post('/carts', data);
  if (response.status !== 201) return { success: false };
  return { success: true };
}
function Detail() {
  const { menu } = useLoaderData();
  const action = useActionData();
  const navigation = useNavigation();
  const [snackbar, setSnackbar] = useState(false);

  useEffect(() => {
    if (action?.success) setSnackbar(true);
  }, [action]);

  return (
    <div className="container flex flex-col sm:flex-row justify-center items-center gap-10 sm:pt-14">
      <Snackbar
        open={snackbar}
        color="success"
        variant="solid"
        autoHideDuration={1500}
        onClose={() => setSnackbar(false)}
      >
        {action?.success ? "Successfully added to cart" : "Sorry! Something went wrong. App server error"}
      </Snackbar>

      <Link
        to={-1}
        className="absolute top-24 left-56 cursor-pointer text-primary font-semibold"
      >
        &#x2B9C; Menu
      </Link>
      <img className="sm:w-5/12 xl:h-[26rem] rounded-lg object-cover" src={menu.image_large} alt="" />
      <div className="sm:w-5/12">
        <h1 className="text-5xl font-semibold">{menu.name}</h1>
        <p className="text-base my-4">{menu.description}</p>
        <TextCurrency fontWeight={"font-bold"} style="mb-12" text={menu.price} />
        <Form className="flex gap-5 mt-5" method="post">
          <input type="hidden" name="menu_id" value={menu.id} />
          <CounterInput name={"quantity"} />
          <Button
            size="sm"
            disabled={false}
            color="dark"
            sx={{ width: "20rem" }}
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