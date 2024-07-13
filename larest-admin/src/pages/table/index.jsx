import React, { useState } from 'react'
import { actionDelete, useCrudContext } from '../../context/CrudContextProvider';
import useFetchData from '../../hooks/useFetch';
import { Button, Chip, CircularProgress, IconButton, Snackbar } from '@mui/joy';
import FloatProgressIndicator from '../../components/Elements/Indicator/FloatProgressIndicator';
import Table from '../../components/Fragments/Table/Table';
import Pagination from '../../components/Fragments/Pagination/Pagination';
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs';
import { ACTION } from '../../utils/action';
import { formatDate } from '../../utils/helper';

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
  const [url, setUrl] = useState(`/tables`);
  const [loading, _, response] = useFetchData(url, state.data);

  const handleDelete = async (table) => {
    if (!window.confirm(`Are you sure want to delete table: ${table.no}?`)) return;
    await actionDelete(`/admin/tables/${table.id}`, dispatch);
  };

  return (
    <>
      {state.loading && <FloatProgressIndicator />}
      <Table
        title="Tables"
        description={"List of all tables"}
        actions={<Button>Create User</Button>}
        footer={<Pagination response={response} setUrl={setUrl} />}
      >
        <thead className="align-bottom">
          <tr className="font-semibold text-[0.95rem] text-secondary-dark">
            <th className="pb-3 pe-3 text-start">NUMBER TABLE</th>
            <th className="pb-3 px-3 text-start">CAPACITY</th>
            <th className="pb-3 px-3 text-start">STATUS</th>
            <th className="pb-3 px-3 text-end "> CREATED AT</th>
            <th className="pb-3 px-3 text-end ">UPDATED AT</th>
            <th className="pb-3 ps-3 text-end ">ACTIONS</th>
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
            response.data.map((table, index) => (
              <tr
                key={index}
                className="border-b border-dashed last:border-b-0"
              >
                <td className="p-3 pl-0">
                  <div className="flex flex-col justify-start">
                    <span className="font-semibold text-light-inverse text-md/normal">
                      {table.no}
                    </span>
                  </div>
                </td>
                <td className="p-3  text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {table.capacity} person
                  </span>
                </td>
                <td className="p-3  text-start">
                  <Chip
                    color={getChipColor(table.status)}
                    onClick={function () { }}
                    size="sm"
                    variant="outlined"
                  >
                    {table.status}
                  </Chip>
                </td>
                <td className="p-3 text-end">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {formatDate(table.created_at)}
                  </span>
                </td>
                <td className="p-3 text-end">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {formatDate(table.updated_at)}
                  </span>
                </td>
                <td className="p-3 pr-0 flex items-center justify-end">
                  <IconButton>
                    <BsPencilFill className="text-blue-600 text-lg" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(table)}>
                    <BsFillTrash3Fill className="text-red-600 text-lg" />
                  </IconButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Snackbar
        open={state.success}
        color="success"
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch({ type: ACTION.RESET })}
      >
        Table has been deleted
      </Snackbar >
    </>
  );
}

export default Tables