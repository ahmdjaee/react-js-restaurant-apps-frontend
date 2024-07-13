import { Button, CircularProgress, IconButton, Snackbar } from "@mui/joy";
import { useState } from "react";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import Table from "../../components/Fragments/Table/Table";
import useFetchData from "../../hooks/useFetch";
import CreateMenuForm from "./components/CreateMenuForm";
import { actionDelete, useCrudContext } from "../../context/CrudContextProvider";
import FloatProgressIndicator from "../../components/Elements/Indicator/FloatProgressIndicator";
import { ACTION } from "../../utils/action";

function Menu() {
  const { state, dispatch } = useCrudContext();
  const [loading, _, response] = useFetchData("/menus", state.data);
  const [dialogCreate, setDialogCreate] = useState(false);

  const handleDelete = async (menu) => {
    if (!window.confirm(`Are you sure want to delete menu: ${menu.name}?`)) return;
    await actionDelete(`/admin/menus/${menu.id}`, dispatch);
  };
  return (
    <>
      {state.loading && <FloatProgressIndicator />}
      <Table
        title="Menu"
        description="List of all menu"
        actions={<Button onClick={() => setDialogCreate(true)} >Create Menu</Button>}
      >
        <thead className="align-bottom">
          <tr className="font-semibold text-[0.95rem] text-secondary-dark">
            <th className="pb-3 max-w-64 pe-3 text-start">NAME</th>
            <th className="pb-3 max-w-64 px-3 text-start ">DESCRIPTION</th>
            <th className="pb-3 max-w-64 px-3 text-end">PRICE</th>
            <th className="pb-3 max-w-64 px-3 text-end ">CATEGORY</th>
            <th className="pb-3 max-w-64 ps-3 text-end ">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={6}
              >
                <CircularProgress />
              </td>
            </tr>
            : response.data.map((menu) => (
              <tr key={menu.id} className="border-b border-dashed last:border-b-0">
                <td className="p-3 max-w-64 pl-0">
                  <div className="flex items-center">
                    <div className="relative inline-block shrink-0 rounded-2xl me-3">
                      <img src={menu.image} className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt="" />
                    </div>
                    <div className="flex flex-col justify-start">
                      <a className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">{menu.name}</a>
                    </div>
                  </div>
                </td>
                <td className="p-3 max-w-64 text-start">
                  <span className="line-clamp-2 font-semibold text-light-inverse text-md/normal">
                  {menu.description}
                  </span>
                </td>
                <td className="p-3 max-w-64 text-end">
                  <span className="line-clamp-2 font-semibold text-light-inverse text-md/normal">
                    Rp {menu.price}
                  </span>
                </td>
                <td className="p-3 max-w-64 text-end">
                  <span className="line-clamp-2 font-semibold text-light-inverse text-md/normal">
                    {menu.category.name}
                  </span>
                </td>
                <td className="p-3 pr-0 max-w-64 flex items-center justify-end">
                  <IconButton>
                    <BsPencilFill className="text-blue-600 text-lg" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(menu)}>
                    <BsFillTrash3Fill className="text-red-600 text-lg" />
                  </IconButton>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <CreateMenuForm
        open={dialogCreate}
        onClose={() => setDialogCreate(false)}
        onSuccess={() => setDialogCreate(false)}
      />
      <Snackbar
        open={state.success}
        color="success"
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch({type : ACTION.RESET})}
      >
        Menu has been deleted
      </Snackbar >
    </>
  );
}

export default Menu;
