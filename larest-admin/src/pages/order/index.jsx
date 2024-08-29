import { Button, Chip, IconButton, Snackbar } from '@mui/joy';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import { BsChevronRight, BsPencilFill, BsPrinter } from 'react-icons/bs';
import { MdArrowForwardIos } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import EmptyState from '@/components/Elements/Indicator/EmptyState';
import FloatProgressIndicator from '@/components/Elements/Indicator/FloatProgressIndicator';
import SearchInput from '@/components/Elements/Input/SearchInput';
import Pagination from '@/components/Fragments/Pagination/Pagination';
import Table from '@/components/Fragments/Table/Table';
import { actionGet, actionSetData, resetState, useCrudContext } from '@/context/CrudContextProvider';
import useDebounced from '@/hooks/useDebounce';
import { ACTION } from '@/utils/action';
import { formatCurrency, formatDate } from '@/utils/helper';
import { SEARCH_TIMEOUT } from '@/utils/settings';
import UpdateOrderForm from './components/UpdateOrderForm';
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
  const [updateModal, setUpdateModal] = useState(false);

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

  const handleUpdateModal = (order) => {
    dispatch(actionSetData(order));
    setUpdateModal(true);
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
            <Button onClick={() => { }}>Create Order</Button>
          </>
        }
        footer={<Pagination response={list} setUrl={setUrl} />}
      >
        <thead className="align-bottom">
          <tr className="table-row-header">
            <th className="text-nowrap text-start">QR</th>
            <th className="text-nowrap text-start">ORDER ID</th>
            <th className="text-nowrap text-start">USER</th>
            <th className="text-nowrap text-center">RESERVATION ID</th>
            <th className="text-nowrap text-start">STATUS</th>
            <th className="text-nowrap text-end">TOTAL PAYMENT</th>
            <th className="text-nowrap text-end">CREATED AT</th>
            <th className="text-nowrap text-end">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {list.error ? ( //NOTE - Add error indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={8}
              >
                 <EmptyState text={list.message} />
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
              <td className="p-3 ">
                <QRCode value={order.id} size={50} />
              </td>
              <td className="p-3 text-start">
                <span className="font-medium text-light-inverse text-md/normal">
                  {order.id}
                </span>
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
                    variant='soft'
                    color={getChipColor(order.status)}
                  >
                    {order.status}
                  </Chip>
                </span>
              </td>
              <td className="p-3 text-end">
                <span className="font-medium text-light-inverse text-md/normal">
                  {formatCurrency(order.total_payment)}
                </span>
              </td>
              <td className="p-3 text-end">
                <span className="font-medium text-light-inverse text-md/normal">
                  {formatDate(order.created_at)}
                </span>
              </td>
              <td className="p-3 text-nowrap text-end" onClick={(event) => event.stopPropagation()}>
                <IconButton onClick={() => handleUpdateModal(order)}>
                  <BsPencilFill className="primary-with-hover" />
                </IconButton>
                {/* <IconButton onClick={() => handleDelete(order)}>
                    <BsFillTrash3Fill className="danger-with-hover" />
                  </IconButton> */}
                <IconButton onClick={() => navigate(`/orders/${order.id}`)}>
                  <BsChevronRight className="secondary-with-hover" />
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