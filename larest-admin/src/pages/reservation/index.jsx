import EmptyState from "@/components/Elements/Indicator/EmptyState";
import FloatProgressIndicator from "@/components/Elements/Indicator/FloatProgressIndicator";
import SearchInput from "@/components/Elements/Input/SearchInput";
import Pagination from "@/components/Fragments/Pagination/Pagination";
import Table from "@/components/Fragments/Table/Table";
import {
  actionGet,
  actionSetData,
  resetAction,
  resetState,
  useCrudContext,
} from "@/context/CrudContextProvider";
import useDebounced from "@/hooks/useDebounce";
import { formatDate, formatTime } from "@/utils/helper";
import { SEARCH_TIMEOUT, SNACKBAR_TIMEOUT } from "@/utils/settings";
import { Button, Chip, IconButton, Snackbar } from "@mui/joy";
import { useEffect, useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import DetailReservation from "./components/DetailReservation";
import UpdateReservationForm from "./components/UpdateReservationForm";
import CreateReservationForm from "./components/CreateReservationForm";

function getChipColor(status) {
  switch (status) {
    case "pending":
      return "warning";
    case "confirmed":
      return "primary";
    case "cancelled":
      return "danger";
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
  const [createModal, setCreateModal] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    actionGet(url, dispatch, controller.signal);
    return () => {
      controller.abort();
    };
  }, [url, refetch, dispatch]);

  useEffect(() => {
    return () => dispatch(resetState());
  }, [dispatch]);

  // const handleDelete = async (event) => {
  // if (!window.confirm(`Are you sure want to delete event: ${event.title}?`)) return;
  // await actionDelete(`/admin/events/${event.id}`, dispatch);
  // };

  const handleUpdateModal = (reservation) => {
    dispatch(actionSetData(reservation));
    setUpdateModal(true);
  };

  const handleDetailModal = (reservation) => {
    dispatch(actionSetData(reservation));
    setDetailModal(true);
  };

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
        actions={
          <>
            <SearchInput onChange={debouncedSetUrl} className="me-3" />
            <Button onClick={() => setCreateModal(true)}>Create Reservation</Button>
          </>
        }
        footer={<Pagination response={list} setUrl={setUrl} />}
      >
        <thead className="align-bottom">
          <tr className="table-row-header">
            <th className="text-nowrap text-start">ID</th>
            <th className="text-nowrap text-start">NAME</th>
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
              <td className="text-xl text-center overflow-hidden" colSpan={9}>
                <EmptyState text={list.message} />
              </td>
            </tr>
          ) : list?.data.length === 0 ? ( //NOTE - Add no data indicator
            <tr>
              <td className="text-xl text-center overflow-hidden" colSpan={9}>
                <EmptyState text={"No data found"} />
              </td>
            </tr>
          ) : (
            list?.data.map(
              (
                reservation,
                index //NOTE - Add table rows
              ) => (
                <tr
                  key={index}
                  className="table-row-body"
                  onClick={() => handleDetailModal(reservation)}
                >
                  <td className=" text-start">
                    <span>{reservation.id}</span>
                  </td>
                  <td className="text-start">
                    <span className="font-medium text-nowrap text-light-inverse text-md/normal">
                      {reservation.user?.name}
                    </span>
                  </td>
                  <td className="text-center">
                    <span>{reservation.table?.no}</span>
                  </td>

                  <td className="text-start">
                    <span>{formatDate(reservation.date)}</span>
                  </td>
                  <td className="text-start">
                    <span>{formatTime(reservation.time)}</span>
                  </td>
                  <td className="text-center">
                    <span>{reservation.persons}</span>
                  </td>
                  <td className="text-center">
                    <span>
                      <Chip variant="soft" color={getChipColor(reservation.status)}>
                        {reservation.status}
                      </Chip>
                    </span>
                  </td>
                  <td className="text-start">
                    <span>{reservation.notes}</span>
                  </td>
                  <td
                    className="text-nowrap text-end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconButton onClick={() => handleUpdateModal(reservation)}>
                      <BsPencilFill className="primary-with-hover" />
                    </IconButton>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </Table>
      <DetailReservation open={detailModal} onClose={() => setDetailModal(false)} />
      <UpdateReservationForm
        open={updateModal}
        onClose={() => setUpdateModal(false)}
      />
      <CreateReservationForm
        open={createModal}
        onClose={() => setCreateModal(false)}
      />
      <Snackbar
        open={action.success || action.failed}
        color={action.success ? "success" : action.failed ? "danger" : null}
        variant="solid"
        autoHideDuration={SNACKBAR_TIMEOUT}
        onClose={() => dispatch(resetAction())}
      >
        {action.message}
      </Snackbar>
    </>
  );
}

export default Reservation;
