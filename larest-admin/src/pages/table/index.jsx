import { SNACKBAR_TIMEOUT } from "@/utils/settings";
import { Button, Chip, IconButton, Snackbar } from "@mui/joy";
import { useEffect, useLayoutEffect, useState } from "react";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import EmptyState from "../../components/Elements/Indicator/EmptyState";
import FloatProgressIndicator from "../../components/Elements/Indicator/FloatProgressIndicator";
import SearchInput from "../../components/Elements/Input/SearchInput";
import Table from "../../components/Fragments/Table/Table";
import {
  actionDelete,
  actionGet,
  actionSetData,
  resetAction,
  resetState,
  useCrudContext,
} from "../../context/CrudContextProvider";
import CreateTableForm from "./components/CreateTableForm";
import UpdateTableForm from "./components/UpdateTableForm";

function getChipColor(status) {
  switch (status) {
    case "available":
      return "success";
    case "booked":
      return "warning";
    case "used":
      return "danger";
    default:
      return "primary";
  }
}
function Tables() {
  const { state, dispatch } = useCrudContext();
  const { list, action, refetch } = state;
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    actionGet("/tables", dispatch, controller.signal);
    return () => {
      controller.abort();
    };
  }, [dispatch, refetch]);

  useLayoutEffect(() => {
    return () => dispatch(resetState());
  }, [dispatch]);

  const filteredTables = list?.data?.filter((table) => {
    return table?.no?.toLowerCase().includes(search.toLowerCase());
  });

  const handleDelete = async (table) => {
    if (!window.confirm(`Are you sure want to delete table: ${table.no}?`)) return;
    await actionDelete(`/admin/tables/${table.id}`, dispatch);
  };

  const handleUpdateModal = (table) => {
    dispatch(actionSetData(table));
    setUpdateModal(true);
  };

  return (
    <>
      <FloatProgressIndicator loading={action.loading} />
      <Table
        title="Tables"
        description={"List of all tables"}
        loading={list.loading}
        actions={
          <>
            <SearchInput
              className={"me-3"}
              value={search}
              onChange={(val) => setSearch(val)}
            />
            <Button onClick={() => setCreateModal(true)}>Create Table</Button>
          </>
        }
      >
        <thead className="align-bottom">
          <tr className="table-row-header">
            <th className="text-start">NUMBER TABLE</th>
            <th className="text-start">CAPACITY</th>
            <th className="text-start">STATUS</th>
            <th className="text-end">ACTIVE</th>
            <th className="text-end ">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {list.error ? ( //NOTE - Add error indicator
            <tr>
              <td className="text-xl text-center overflow-hidden" colSpan={7}>
                <EmptyState text={list.message} />
              </td>
            </tr>
          ) : filteredTables.length === 0 ? ( //NOTE - Add no data indicator
            <tr>
              <td className="text-xl text-center overflow-hidden" colSpan={7}>
                <EmptyState text={"No data found"} />
              </td>
            </tr>
          ) : (
            filteredTables.map((table, index) => (
              <tr key={index} className="table-row-body">
                <td className="">
                  <div className="flex flex-col justify-start">
                    <span>{table.no}</span>
                  </div>
                </td>
                <td className=" text-start">
                  <span>{table.capacity} person</span>
                </td>
                <td className="text-start">
                  <Chip
                    color={getChipColor(table.status)}
                    onClick={function () {}}
                    variant="soft"
                    fullWidth
                  >
                    {table.status}
                  </Chip>
                </td>
                <td className="text-end">
                  <Chip color={table.active ? "primary" : "danger"} variant="solid">
                    {table.active ? "Active" : "Inactive"}
                  </Chip>
                </td>
                <td className="text-end w-24">
                  <IconButton onClick={() => handleUpdateModal(table)}>
                    <BsPencilFill className="primary-with-hover" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(table)}>
                    <BsFillTrash3Fill className="danger-with-hover" />
                  </IconButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Snackbar
        open={action.success || action.failed}
        color={action.success ? "success" : action.failed && "danger"}
        variant="solid"
        autoHideDuration={SNACKBAR_TIMEOUT}
        onClose={() => dispatch(resetAction())}
      >
        {action.message}
      </Snackbar>
      <CreateTableForm open={createModal} onClose={() => setCreateModal(false)} />
      <UpdateTableForm open={updateModal} onClose={() => setUpdateModal(false)} />
    </>
  );
}

export default Tables;
