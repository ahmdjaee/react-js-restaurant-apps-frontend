import EmptyState from '@/components/Elements/Indicator/EmptyState';
import FloatProgressIndicator from '@/components/Elements/Indicator/FloatProgressIndicator';
import SearchInput from '@/components/Elements/Input/SearchInput';
import Pagination from '@/components/Fragments/Pagination/Pagination';
import Table from '@/components/Fragments/Table/Table';
import { actionGet, actionSetData, resetAction, resetState, useCrudContext } from '@/context/CrudContextProvider';
import useDebounced from '@/hooks/useDebounce';
import { formatDate, formatTime } from '@/utils/helper';
import { SEARCH_TIMEOUT } from '@/utils/settings';
import { Chip, IconButton, Snackbar } from '@mui/joy';
import { useEffect, useState } from 'react';
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs';
import UpdateReservationForm from './components/UpdateReservationForm';
import DetailReservation from './components/DetailReservation';

function getChipColor(status) {
  switch (status) {
    case "pending":
      return "warning";
    case "confirmed":
      return "primary";
    case "cancelled":
      return "danger";;
    case "completed":
      return "success";
    default:
      return "primary";
  }
}

function Reservation() {
  const { state, dispatch } = useCrudContext();
  const { list, action, refetch } = state;
  const [url, setUrl] = useState(`/admin/reservations`);
  const [updateModal, setUpdateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);

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

  const handleUpdateModal = (reservation) => {
    dispatch(actionSetData(reservation));
    setUpdateModal(true);
  }

  const handleDetailModal = (reservation) => {
    dispatch(actionSetData(reservation));
    setDetailModal(true);
  }

  const debouncedSetUrl = useDebounced((value) => {
    setUrl(`admin/reservations?search=${value}`);
  }, SEARCH_TIMEOUT);

  return (
    <>
      <FloatProgressIndicator loading={action.loading} />
      <Table
        title="Reservations"
        description={"List of all reservation"}
        loading={list.loading}
        actions={<SearchInput onChange={debouncedSetUrl} />}
        footer={<Pagination response={list} setUrl={setUrl} />}
      >
        <thead className="align-bottom">
          <tr className="table-row-header">
            <th className="text-nowrap text-start">ID</th>
            <th className="text-nowrap text-start">USER</th>
            <th className="text-nowrap text-center">TABLE</th>
            <th className="text-nowrap text-start">DATE</th>
            <th className="text-nowrap text-start">TIME</th>
            <th className="text-nowrap text-center">PERSON</th>
            <th className="text-nowrap text-center">STATUS</th>
            <th className="text-nowrap text-start">NOTES</th>
            <th className="text-nowrap text-end">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {list.error ? ( //NOTE - Add error indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={9}
              >
                <EmptyState text={error} />
              </td>
            </tr>
          ) : list?.data.length === 0 ? ( //NOTE - Add no data indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={9}
              >
                <EmptyState text={"No data found"} />
              </td>
            </tr>
          ) : (
            list?.data.map((reservation, index) => ( //NOTE - Add table rows
              <tr
                key={index}
                className="table-row"
                onClick={() => handleDetailModal(reservation)}
              >
                <td className="p-3  text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {reservation.id}
                  </span>
                </td>
                <td className="p-3 text-start">
                  <span className="font-medium text-nowrap text-light-inverse text-md/normal">
                    {reservation.user?.name}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {reservation.table?.no}
                  </span>
                </td>

                <td className="p-3 text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {formatDate(reservation.date)}
                  </span>
                </td>
                <td className="p-3 text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {formatTime(reservation.time)}
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
                      variant='soft'
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
                <td className="p-3 text-nowrap text-end" onClick={(e) => e.stopPropagation()}>
                  <IconButton onClick={() => handleUpdateModal(reservation)}>
                    <BsPencilFill className="primary-with-hover" />
                  </IconButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <DetailReservation
        open={detailModal}
        onClose={() => setDetailModal(false)}
      />
      <UpdateReservationForm
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

export default Reservation