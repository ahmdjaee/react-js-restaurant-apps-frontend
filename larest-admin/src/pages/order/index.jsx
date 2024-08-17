import { Button, Chip, CircularProgress, IconButton, Snackbar } from '@mui/joy';
import QRCode from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import { BsFillTrash3Fill, BsPencilFill, BsPrinter } from 'react-icons/bs';
import { MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../../components/Elements/Indicator/EmptyState';
import FloatProgressIndicator from '../../components/Elements/Indicator/FloatProgressIndicator';
import SearchInput from '../../components/Elements/Input/SearchInput';
import Pagination from '../../components/Fragments/Pagination/Pagination';
import Table from '../../components/Fragments/Table/Table';
import { actionGet, resetState, useCrudContext } from '../../context/CrudContextProvider';
import useDebounced from '../../hooks/useDebounce';
import useFetchData from '../../hooks/useFetch';
import { ACTION } from '../../utils/action';
import { formatDate } from '../../utils/helper';
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
  const navigate = useNavigate();
  const { state, dispatch } = useCrudContext();
  const { list, action, refetch } = state;
  const [url, setUrl] = useState(`admin/orders`);

  useEffect(() => {
    const controller = new AbortController();
    actionGet(url, dispatch, controller.signal);
    return () => { controller.abort() };
  }, [url, refetch]);

  useEffect(() => {
    return () => dispatch(resetState())
  }, [])

  const handleDelete = async (event) => {
    // if (!window.confirm(`Are you sure want to delete event: ${event.title}?`)) return;
    // await actionDelete(`/admin/events/${event.id}`, dispatch);
  };

  const handleUpdateModal = (event) => {
    // dispatch({ type: ACTION.SET_FORM_DATA, formData: event });
    // setUpdateModal(true);
  }

  const debouncedSetUrl = useDebounced((value) => {
    setUrl(`${url}?search=${value}`);
  }, SEARCH_TIMEOUT);

  return (
    <>
      <FloatProgressIndicator loading={action.loading} />
      <Table
        title="Orders"
        description={"List of all orders"}
        loading={list.loading}
        actions={
          <>
            <Button variant='outlined' color='neutral' sx={{ mr: 1 }} onClick={() => window.print()}>
              <BsPrinter className='me-2' />
              Print
            </Button>
            <SearchInput className={"me-2"} onChange={debouncedSetUrl} />
            <Button onClick={() => { }}>Create Event</Button>
          </>
        }
        footer={<Pagination response={list} setUrl={setUrl} />}
      >
        <thead className="align-bottom">
          <tr className="font-semibold text-[0.95rem] text-secondary-dark">
            <th className="pb-3 pe-3 text-nowrap text-center">ID</th>
            <th className="pb-3 px-3 text-nowrap text-start">QR</th>
            <th className="pb-3 px-3 text-nowrap text-start">USER</th>
            <th className="pb-3 px-3 text-nowrap text-center">RESERVATION ID</th>
            <th className="pb-3 px-3 text-nowrap text-start">STATUS</th>
            <th className="pb-3 px-3 text-nowrap text-end">TOTAL PAYMENT</th>
            <th className="pb-3 px-3 text-nowrap text-end">CREATED AT</th>
            <th className="pb-3 ps-3 text-nowrap text-end">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {list.error ? ( //NOTE - Add error indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={8}
              >
                <EmptyState text={error} />
              </td>
            </tr>
          ) : list.data.length === 0 ? ( //NOTE - Add no data indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={8}
              >
                <EmptyState text={"No data found"} />
              </td>
            </tr>
          ) : (list.data.map((order, index) => ( //NOTE - Add table rows
            <tr
              key={index}
              className="table-row"
              to={`/orders/${order.id}`}
              onClick={() => navigate(`/orders/${order.id}`)}
            >
              <td className="p-3 pl-0 text-center">
                <span className="font-medium text-light-inverse text-md/normal">
                  {order.id}
                </span>
              </td>
              <td className="p-3 ">
                <QRCode value={order.id} size={50} />
              </td>
              <td className="p-3 text-start">
                <span className="font-medium text-light-inverse text-md/normal">
                  {order.user?.name}
                </span>
              </td>
              <td className="p-3 text-center">
                <span className="font-medium text-light-inverse text-md/normal">
                  {order.reservation?.id}
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
                {/* <IconButton onClick={() => handleUpdateModal(order)}>
                    <BsPencilFill className="primary-with-hover" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(order)}>
                    <BsFillTrash3Fill className="danger-with-hover" />
                  </IconButton> */}
                <IconButton >
                  <MdArrowForwardIos className="secondary-with-hover" />
                </IconButton>
              </td>
            </tr>
          ))
          )}
        </tbody>
      </Table>
      <Snackbar
        open={action.success || action.failed}
        color={action.success ? "success" : action.failed ? "danger" : null}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch({ type: ACTION.RESET_ACTION })}
      >
        {action.message}
      </Snackbar >
    </>
  );
}

export default Order