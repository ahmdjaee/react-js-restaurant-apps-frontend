import { Button, Chip, CircularProgress, IconButton, Snackbar } from '@mui/joy';
import React, { useState } from 'react';
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs';
import EmptyState from '../../components/Elements/Indicator/EmptyState';
import FloatProgressIndicator from '../../components/Elements/Indicator/FloatProgressIndicator';
import Table from '../../components/Fragments/Table/Table';
import { actionDelete, useCrudContext } from '../../context/CrudContextProvider';
import useFetchData from '../../hooks/useFetch';
import { ACTION } from '../../utils/action';
import CreateTableForm from './components/CreateTableForm';
import UpdateTableForm from './components/UpdateTableForm';
import SearchInput from '../../components/Elements/Input/SearchInput';

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
  const [loading, error, response] = useFetchData(`/tables`, state.data);
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [search, setSearch] = useState('');

  const filteredTables = response?.data?.filter((table) => {
    return (
      table.no.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleDelete = async (table) => {
    if (!window.confirm(`Are you sure want to delete table: ${table.no}?`)) return;
    await actionDelete(`/admin/tables/${table.id}`, dispatch);
  };
  
  const handleUpdateModal = (event) => {
    dispatch({ type: ACTION.SET_FORM_DATA, formData: event });
    setUpdateModal(true);
  };

  return (
    <>
      {state.loading && <FloatProgressIndicator />}
      <Table
        title="Tables"
        description={"List of all tables"}
        actions={
          <>
            <SearchInput className={"me-3"} value={search} onChange={(val) => setSearch(val)} />
            <Button onClick={() => setCreateModal(true)}>Create Table</Button>
          </>
        }
      >
        <thead className="align-bottom">
          <tr className="font-semibold text-[0.95rem] text-secondary-dark">
            <th className="pb-3 pe-3 text-start">NUMBER TABLE</th>
            <th className="pb-3 px-3 text-start">CAPACITY</th>
            <th className="pb-3 px-3 text-start">STATUS</th>
            <th className="pb-3 ps-3 text-end ">ACTIONS</th>
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
            filteredTables.map((table, index) => (
              <tr
                key={index}
                className="table-row"
              >
                <td className="p-3 pl-0">
                  <div className="flex flex-col justify-start">
                    <span className="font-semibold text-light-inverse text-md/normal">
                      {table.no}
                    </span>
                  </div>
                </td>
                <td className="p-3 text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {table.capacity} person
                  </span>
                </td>
                <td className="p-3 text-start">
                  <Chip
                    color={getChipColor(table.status)}
                    onClick={function () { }}
                    variant="outlined"
                  >
                    {table.status}
                  </Chip>
                </td>
                <td className="p-3 pr-0 flex items-center justify-end">
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
        open={state.success || state.failed}
        color={state.success ? "success" : state.failed && "danger"}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch({ type: ACTION.RESET })}
      >
        {state.message}
      </Snackbar >
      <CreateTableForm
        open={createModal}
        onClose={() => setCreateModal(false)}
      />
      <UpdateTableForm
        open={updateModal}
        onClose={() => setUpdateModal(false)}
      />
    </>
  );
}

export default Tables