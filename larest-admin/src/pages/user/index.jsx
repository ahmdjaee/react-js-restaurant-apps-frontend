import EmptyState from "@/components/Elements/Indicator/EmptyState";
import FloatProgressIndicator from "@/components/Elements/Indicator/FloatProgressIndicator";
import SearchInput from "@/components/Elements/Input/SearchInput";
import Pagination from "@/components/Fragments/Pagination/Pagination";
import Table from "@/components/Fragments/Table/Table";
import { actionDelete, actionGet, actionSetData, resetAction, resetState, useCrudContext } from "@/context/CrudContextProvider";
import useDebounced from "@/hooks/useDebounce";
import { formatDate } from "@/utils/helper";
import { SEARCH_TIMEOUT } from "@/utils/settings";
import { Avatar, Button, Checkbox, Chip, IconButton, Snackbar } from "@mui/joy";
import { useEffect, useState } from "react";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import UpdateUserForm from "./components/UpdateUserForm";

function User() {
  const { state, dispatch } = useCrudContext();
  const [url, setUrl] = useState(`/admin/users`);
  const { list, action, refetch } = state;
  const [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    actionGet(url, dispatch, controller.signal);
    return () => { controller.abort() };
  }, [url, refetch]);

  useEffect(() => {
    return () => dispatch(resetState())
  }, [])

  const handleDelete = async (user) => {
    if (!window.confirm(`Are you sure want to delete users: ${user.name}?`)) return;
    await actionDelete(`/admin/users/${user.id}`, dispatch);
  };

  const handleUpdateModal = (user) => {
    dispatch(actionSetData(user));
    setUpdateModal(true);
  }

  const setSearchParams = useDebounced((value) => {
    setUrl(`/admin/users?search=${value}`);
  }, SEARCH_TIMEOUT);

  return (
    <>
      <FloatProgressIndicator loading={action.loading} />
      <Table
        title="Users"
        description={"List of all users"}
        loading={list.loading}
        actions={
          <>
            <SearchInput className={"me-3"} onChange={(val) => setSearchParams(val)} />
            <Button color="danger" variant="outlined" sx={{ mr: 2 }}>Delete Selected</Button>
            <Button>Create User</Button>
          </>
        }
        footer={<Pagination response={list} setUrl={setUrl} />}
      >
        <thead className="align-bottom">
          <tr className="table-row-header">
            <th className="h-min w-min text-start">
              <div className="flex flex-col justify-start">
                <Checkbox />
              </div>
            </th>
            <th className="min-w-24 text-start">NAME</th>
            <th className="min-w-24 text-start">EMAIL</th>
            <th className="min-w-24 text-start">ROLE</th>
            <th className="min-w-24 text-end "> CREATED AT</th>
            <th className="min-w-24 text-end ">UPDATED AT</th>
            <th className="min-w-24 text-end ">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {list.error ? ( //NOTE - Add error indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={7}
              >
                <EmptyState text={error} />
              </td>
            </tr>
          ) : list.data.length === 0 ? ( //NOTE - Add no data indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={7}
              >
                <EmptyState text={"No data found"} />
              </td>
            </tr>
          ) : (list.data.map((user, index) => (
            <tr
              key={index}
              className="table-row"
              onClick={() => handleUpdateModal(user)}
            >
              <td className="p-3 h-min w-min">
                <div className="flex flex-col justify-start">
                  <Checkbox />
                </div>
              </td>
              <td className="p-3 max-w-64 ">
                <div className="flex items-center">
                  <div className="relative inline-block shrink-0 rounded-2xl me-3">
                    <Avatar src={user.photo} />
                  </div>
                  <span className="font-medium text-light-inverse text-md/normal">
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
              <td className="p-3 flex items-center justify-end" onClick={(event) => event.stopPropagation()}>
                <IconButton onClick={() => handleUpdateModal(user)}>
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
      <UpdateUserForm
        open={updateModal}
        onClose={() => setUpdateModal(false)}
      />
      <Snackbar
        open={action.success || action.failed}
        color={action.success ? "success" : action.failed ? "danger" : null}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch(resetAction())}
      >
        {action.message}
      </Snackbar >
    </>
  );
}
export default User;
