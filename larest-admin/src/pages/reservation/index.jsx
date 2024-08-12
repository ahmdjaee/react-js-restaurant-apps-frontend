import { Chip, CircularProgress, IconButton, Snackbar } from '@mui/joy';
import React, { useState } from 'react';
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs';
import EmptyState from '@/components/Elements/Indicator/EmptyState';
import FloatProgressIndicator from '@/components/Elements/Indicator/FloatProgressIndicator';
import SearchInput from '@/components/Elements/Input/SearchInput';
import Pagination from '@/components/Fragments/Pagination/Pagination';
import Table from '@/components/Fragments/Table/Table';
import { actionDelete, useCrudContext } from '@/context/CrudContextProvider';
import useFetchData from '@/hooks/useFetch';
import { ACTION } from '@/utils/action';
import { formatDate, formateTime } from '@/utils/helper';
import useDebounced from '@/hooks/useDebounce';
import { SEARCH_TIMEOUT } from '@/utils/settings';

function getChipColor(status) {
  switch (status) {
    case "new":
      return "primary";
    case "checkout":
      return "warning";
    case "paid":
      return "success";
    case "failed":
      return "danger";
    case "completed":
      return "success";
    default:
      return "primary";
  }
}

function Reservation() {
  const { state, dispatch } = useCrudContext();
  const [url, setUrl] = useState(`/admin/reservations`);
  const [loading, error, response] = useFetchData(url, state.data);

  const handleDelete = async (event) => {
    // if (!window.confirm(`Are you sure want to delete event: ${event.title}?`)) return;
    // await actionDelete(`/admin/events/${event.id}`, dispatch);
  };

  const handleUpdateModal = (event) => {
    // dispatch({ type: ACTION.SET_FORM_DATA, formData: event });
    // setUpdateModal(true);
  }

  const debouncedSetUrl = useDebounced((value) => {
    setUrl(`admin/reservations?search=${value}`);
  }, SEARCH_TIMEOUT);

  return (
    <>
      {state.loading ? <FloatProgressIndicator /> : null}
      <Table
        title="Reservations"
        description={"List of all reservation"}
        actions={<SearchInput onChange={debouncedSetUrl} />}
        footer={<Pagination response={response} setUrl={setUrl} />}
      >
        <thead className="align-bottom">
          <tr className="font-semibold text-[0.95rem] text-secondary-dark">
            <th className="pb-3 pe-3 text-nowrap text-start">ID</th>
            <th className="pb-3 px-3 text-nowrap text-start">USER</th>
            <th className="pb-3 px-3 text-nowrap text-start">NUMBER TABLE</th>
            <th className="pb-3 px-3 text-nowrap text-start">DATE</th>
            <th className="pb-3 px-3 text-nowrap text-start">TIME</th>
            <th className="pb-3 px-3 text-nowrap text-end">PERSON</th>
            <th className="pb-3 px-3 text-nowrap text-center">STATUS</th>
            <th className="pb-3 ps-3 text-nowrap text-start">NOTES</th>
            <th className="pb-3 ps-3 text-nowrap text-end">ACTIONS</th>
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
            response.data.map((reservation, index) => ( //NOTE - Add table rows
              <tr
                key={index}
                className="table-row"
              // onClick={() => handleUpdateModal(reservation)}
              >
                <td className="p-3 pl-0 text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {reservation.id}
                  </span>
                </td>
                <td className="p-3 text-start">
                  <span className="font-medium text-nowrap text-light-inverse text-md/normal">
                    {reservation.user.name}
                  </span>
                </td>
                <td className="p-3 text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {reservation.table.no}
                  </span>
                </td>

                <td className="p-3 text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {formatDate(reservation.date)}
                  </span>
                </td>
                <td className="p-3 text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {formateTime(reservation.time)}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {reservation.persons}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span className="font-medium text-light-inverse text-md/normal">
                    <Chip
                      variant='solid'
                      color={getChipColor(reservation.status)}
                    >
                      {reservation.status}
                    </Chip>
                  </span>
                </td>
                <td className="p-3 text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {reservation.notes}
                  </span>
                </td>
                <td className="p-3 pr-0 text-nowrap text-end">
                  <IconButton onClick={() => handleUpdateModal(reservation)}>
                    <BsPencilFill className="primary-with-hover" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(reservation)}>
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
        color={state.success ? "success" : state.failed ? "danger" : null}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch({ type: ACTION.RESET_ACTION })}
      >
        {state.message}
      </Snackbar >
    </>
  );
}

export default Reservation