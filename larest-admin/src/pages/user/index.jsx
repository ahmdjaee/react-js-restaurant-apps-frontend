import { Button, Checkbox, Chip, CircularProgress, IconButton, Snackbar } from "@mui/joy";
import React, { useState } from "react";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import FloatProgressIndicator from "../../components/Elements/Indicator/FloatProgressIndicator";
import SearchInput from "../../components/Elements/Input/SearchInput";
import Pagination from "../../components/Fragments/Pagination/Pagination";
import Table from "../../components/Fragments/Table/Table";
import { useStateContext } from "../../context/ContextProvider";
import { actionDelete, useCrudContext } from "../../context/CrudContextProvider";
import useFetchData from "../../hooks/useFetch";
import { ACTION } from "../../utils/action";
import { formatDate } from "../../utils/helper";
import EmptyState from "../../components/Elements/Indicator/EmptyState";
import useDebouncedCallback from "../../hooks/useDebounceCallback";
import { SEARCH_TIMEOUT } from "../../utils/settings";

function User() {
  const { state, dispatch } = useCrudContext();
  const [url, setUrl] = useState(`/admin/users`);
  const [loading, error, response] = useFetchData(url, state.data);

  const handleDelete = async (user) => {
    if (!window.confirm(`Are you sure want to delete users: ${user.name}?`)) return;
    await actionDelete(`/admin/users/${user.id}`, dispatch);
  };

  const setSearchParams = useDebouncedCallback((value) => {
    setUrl(`/admin/users?search=${value}`);
  }, SEARCH_TIMEOUT);

  return (
    <>
      {state.loading && <FloatProgressIndicator />}
      <Table
        title="Users"
        description={"List of all users"}
        actions={
          <>
            <SearchInput className={"me-3"} onChange={(val) => setSearchParams(val)} />
            <Button color="danger" variant="outlined" sx={{ mr: 2 }}>Delete Selected</Button>
            <Button>Create User</Button>
          </>
        }
        footer={<Pagination response={response} setUrl={setUrl} />}
      >
        <thead className="align-bottom">
          <tr className="font-semibold text-[0.95rem] text-secondary-dark">
            <th className="pb-2 h-min w-min pe-3 text-start">
              <Checkbox />
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
          {loading ? ( //NOTE - Add loading indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={7}
              >
                <CircularProgress />
              </td>
            </tr>
          ) : error ? ( //NOTE - Add error indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={7}
              >
                <EmptyState text={error} />
              </td>
            </tr>
          ) : response.data.length === 0 ? ( //NOTE - Add no data indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={7}
              >
                <EmptyState text={"No data found"} />
              </td>
            </tr>
          ) : (
            response.data.map((user, index) => (
              <tr
                key={index}
                className="table-row"
              >
                <td className="p-3 pl-0 h-min w-min">
                  <div className="flex flex-col justify-start">
                    <Checkbox />
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex flex-col justify-start">
                    <span className="font-semibold text-light-inverse text-md/normal">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="p-3 text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {user.email}
                  </span>
                </td>
                <td className="p-3 text-start">
                  <Chip variant="solid" color={user?.is_admin ? "primary" : "neutral"}>{user?.is_admin ? "Admin" : "User"}</Chip>
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
                    <BsPencilFill className="primary-with-hover" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user)}>
                    <BsFillTrash3Fill className="danger-with-hover" />
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
