import { Button, Checkbox, Chip, CircularProgress, IconButton, Snackbar } from "@mui/joy";
import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import FloatProgressIndicator from "../../components/Elements/Indicator/FloatProgressIndicator";
import Pagination from "../../components/Fragments/Pagination/Pagination";
import Table from "../../components/Fragments/Table/Table";
import { useStateContext } from "../../context/ContextProvider";
import { actionDelete, useCrudContext } from "../../context/CrudContextProvider";
import useFetchData from "../../hooks/useFetch";
import { ACTION } from "../../utils/action";
import { formatDate } from "../../utils/helper";

function User() {
  const { search } = useStateContext();
  const { state, dispatch } = useCrudContext();
  const [url, setUrl] = useState(`/admin/users?search=${search}&per_page=10&page=1`);
  const [loading, _, response] = useFetchData(url, state.data);

  const handleDelete = async (user) => {
    if (!window.confirm(`Are you sure want to delete users: ${user.name}?`)) return;
    await actionDelete(`/admin/users/${user.id}`, dispatch);
  };

  return (
    <>
      {state.loading && <FloatProgressIndicator />}
      <Table
        title="Users"
        description={"List of all users"}
        actions={
          <>
            <Button color="danger" variant="outlined" sx={{ mr: 2 }}>Delete Selected</Button>
            <Button>Create User</Button>
          </>
        }
        footer={<Pagination response={response} setUrl={setUrl} />}
      >
        <thead className="align-bottom">
          <tr className="font-semibold text-[0.95rem] text-secondary-dark">
            <th className="pb-2 h-min w-min pe-3 text-start">
              <Checkbox sx={{ m: 0 }} />
            </th>
            <th className="pb-3 min-w-24 px-3 text-start">NAME</th>
            <th className="pb-3 min-w-24 px-3 text-start">EMAIL</th>
            <th className="pb-3 min-w-24 px-3 text-start">ROLE</th>
            <th className="pb-3 min-w-24 px-3 text-end "> CREATED AT</th>
            <th className="pb-3 min-w-24 px-3 text-end ">UPDATED AT</th>
            <th className="pb-3 min-w-24 ps-3 text-end ">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={6}
              >
                <CircularProgress />
              </td>
            </tr>
          ) : (
            response.data.map((user, index) => (
              <tr
                key={index}
                className="border-b border-dashed last:border-b-0"
              >
                <td className="p-3 pl-0">
                  <Checkbox />
                </td>
                <td className="p-3">
                  <div className="flex flex-col justify-start">
                    <span className="font-semibold text-light-inverse text-md/normal">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="p-3  text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {user.email}
                  </span>
                </td>
                <td className="p-3 text-start">
                  <Chip variant="solid" color="primary">Admin</Chip>
                </td>
                <td className="p-3 text-end">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {formatDate(user.created_at)}
                  </span>
                </td>
                <td className="p-3 text-end">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {formatDate(user.updated_at)}
                  </span>
                </td>
                <td className="p-3 pr-0 flex items-center justify-end">
                  <IconButton>
                    <BsPencilFill className="text-blue-600 text-lg" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user)}>
                    <BsFillTrash3Fill className="text-red-600 text-lg" />
                  </IconButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Snackbar
        open={state.success || state.failed}
        color={state.success ? "success" : "danger"}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch({ type: ACTION.RESET })}
      >
        {state.message}
      </Snackbar >
    </>
  );
}
export default User;
