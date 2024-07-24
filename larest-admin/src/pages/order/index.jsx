import { Chip, CircularProgress, IconButton, Snackbar } from '@mui/joy';
import React, { useState } from 'react';
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs';
import EmptyState from '../../components/Elements/Indicator/EmptyState';
import FloatProgressIndicator from '../../components/Elements/Indicator/FloatProgressIndicator';
import SearchInput from '../../components/Elements/Input/SearchInput';
import Pagination from '../../components/Fragments/Pagination/Pagination';
import Table from '../../components/Fragments/Table/Table';
import { actionDelete, useCrudContext } from '../../context/CrudContextProvider';
import useFetchData from '../../hooks/useFetch';
import { ACTION } from '../../utils/action';
import { formatDate } from '../../utils/helper';
import useDebouncedCallback from '../../hooks/useDebounceCallback';
import { SEARCH_TIMEOUT } from '../../utils/settings';

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

function Order() {
  const { state, dispatch } = useCrudContext();
  const [url, setUrl] = useState(`admin/orders`);
  const [loading, error, response] = useFetchData(url, state.data);

  const handleDelete = async (event) => {
    if (!window.confirm(`Are you sure want to delete event: ${event.title}?`)) return;
    await actionDelete(`/admin/events/${event.id}`, dispatch);
  };

  const handleUpdateModal = (event) => {
    dispatch({ type: ACTION.SET_FORM_DATA, formData: event });
    setUpdateModal(true);
  }

  const debouncedSetUrl = useDebouncedCallback((value) => {
    setUrl(`admin/orders?search=${value}`);
  }, SEARCH_TIMEOUT);

  return (
    <>
      {state.loading ? <FloatProgressIndicator /> : null}
      <Table
        title="Orders"
        description={"List of all orders"}
        actions={<SearchInput onChange={debouncedSetUrl} />}
        footer={<Pagination response={response} setUrl={setUrl} />}
      >
        <thead className="align-bottom">
          <tr className="font-semibold text-[0.95rem] text-secondary-dark">
            <th className="pb-3 pe-3 text-nowrap text-start">ORDER ID</th>
            <th className="pb-3 px-3 text-nowrap text-start">USER</th>
            <th className="pb-3 px-3 text-nowrap text-start">RESERVATION ID</th>
            <th className="pb-3 px-3 text-nowrap text-start">STATUS</th>
            <th className="pb-3 px-3 text-nowrap text-end">TOTAL PAYMENT</th>
            <th className="pb-3 px-3 text-nowrap text-end">CREATED AT</th>
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
            response.data.map((order, index) => ( //NOTE - Add table rows
              <tr
                key={index}
                className="table-row"
              // onClick={() => handleUpdateModal(order)}
              >
                <td className="p-3 pl-0 text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {order.id}
                  </span>
                </td>
                <td className="p-3 text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {order.user.name}
                  </span>
                </td>
                <td className="p-3 text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {order.reservation.id}
                  </span>
                </td>
                <td className="p-3 text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    <Chip
                      variant='solid'
                      color={getChipColor(order.status)}
                    >
                      {order.status}
                    </Chip>
                  </span>
                </td>
                <td className="p-3 text-end">
                  <span className="font-medium text-light-inverse text-md/normal">
                    Rp {order.total_payment}
                  </span>
                </td>
                <td className="p-3 text-end">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {formatDate(order.created_at)}
                  </span>
                </td>
                <td className="p-3 pr-0 text-nowrap text-end">
                  <IconButton onClick={() => handleUpdateModal(order)}>
                    <BsPencilFill className="primary-with-hover" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(order)}>
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
        onClose={() => dispatch({ type: ACTION.RESET })}
      >
        {state.message}
      </Snackbar >
    </>
  );
}

export default Order