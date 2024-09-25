import Badge from "@/components/Elements/Badge/Badge";
import EmptyState from "@/components/Elements/Indicator/EmptyState";
import SearchInput from "@/components/Elements/Input/SearchInput";
import Table from "@/components/Fragments/Table/Table";
import {
  actionDelete,
  actionGet,
  actionSetData,
  resetAction,
  resetState,
  useCrudContext,
} from "@/context/CrudContextProvider";
import { formatDate } from "@/utils/helper";
import { Button, Chip, IconButton, Option, Select, Snackbar } from "@mui/joy";
import { useEffect, useLayoutEffect, useState } from "react";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import CreateEventForm from "./components/CreateEventForm";
import UpdateEventForm from "./components/UpdateEventForm";
import { SNACKBAR_TIMEOUT } from "@/utils/settings";

const getBadgeColor = (type) => {
  switch (type) {
    case "Promo":
      return "from-green-400 to-green-600";
    case "Concert":
      return "from-blue-400 to-blue-600";
    case "Flash Sale":
      return "from-red-400 to-red-600";
    case "Workshop":
      return "from-yellow-400 to-yellow-600";
    case "Festival":
      return "from-purple-400 to-purple-600";
    default:
      return "from-gray-400 to-gray-600";
  }
};
function Event() {
  const { state, dispatch } = useCrudContext();
  const { list, action, refetch } = state;
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    actionGet("/events", dispatch, controller.signal);
    return () => {
      controller.abort();
    };
  }, [refetch]);

  useLayoutEffect(() => {
    return () => dispatch(resetState());
  }, [dispatch]);


  const filteredEvents = list?.data?.filter((event) => {
    return (
      (!filterType || event.type === filterType) &&
      event?.title?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleDelete = async (event) => {
    if (!window.confirm(`Are you sure want to delete event: ${event.title}?`))
      return;
    await actionDelete(`/admin/events/${event.id}`, dispatch);
  };

  const handleReset = () => {
    setSearch("");
    setFilterType(null);
  };

  const handleUpdateModal = (event) => {
    dispatch(actionSetData(event));
    setUpdateModal(true);
  };

  return (
    <>
      <Table
        title="Events"
        description={"List of all events"}
        loading={list.loading}
        actions={
          <>
            <Button
              sx={{ marginRight: "12px" }}
              variant="plain"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Select
              value={filterType}
              onChange={(_, value) => setFilterType(value)}
              placeholder="Type"
              sx={{ marginRight: "12px" }}
            >
              <Option value="">All</Option>
              <Option value="Promo">Promo</Option>
              <Option value="Concert">Concert</Option>
              <Option value="Flash Sale">Flash Sale</Option>
              <Option value="Workshop">Workshop</Option>
              <Option value="Festival">Festival</Option>
            </Select>
            <SearchInput
              className={"me-3"}
              value={search}
              onChange={(val) => setSearch(val)}
            />
            <Button onClick={() => setCreateModal(true)}>Create Event</Button>
          </>
        }
      >
        <thead className="align-bottom">
          <tr className="table-row-header">
            <th className="text-nowrap text-start">TITLE</th>
            <th className="text-nowrap text-start">DESCRIPTION</th>
            <th className="text-nowrap text-start">TYPE</th>
            <th className="text-nowrap text-start">EVENT START</th>
            <th className="text-nowrap text-end "> EVENT END</th>
            <th className="text-nowrap text-end ">ACTIVE</th>
            <th className="text-nowrap text-end ">ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {list.error ? ( //NOTE - Add error indicator
            <tr>
              <td className="text-xl text-center overflow-hidden" colSpan={7}>
                <EmptyState text={list.message} />
              </td>
            </tr>
          ) : filteredEvents?.length === 0 ? ( //NOTE - Add no data indicator
            <tr>
              <td className="text-xl text-center overflow-hidden" colSpan={7}>
                <EmptyState text={"No data found"} />
              </td>
            </tr>
          ) : (
            filteredEvents?.map(
              (
                event,
                index //NOTE - Add table rows
              ) => (
                <tr
                  key={index}
                  className="table-row-body"
                  // onClick={() => handleUpdateModal(event)}
                >
                  <td className="max-w-64">
                    <div className="flex items-center">
                      <div className="relative inline-block shrink-0 rounded-2xl me-3">
                        <img
                          src={event.image}
                          className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                          alt=""
                        />
                      </div>
                      <span className="">{event.title}</span>
                    </div>
                  </td>
                  <td className=" text-start">
                    <span className="">{event.description}</span>
                  </td>
                  <td className=" text-start">
                    <Badge color={getBadgeColor(event.type)}>{event.type}</Badge>
                  </td>
                  <td className=" text-start">
                    <span className="">{formatDate(event.event_start)}</span>
                  </td>
                  <td className="text-end">
                    <span className="">{formatDate(event.event_end)}</span>
                  </td>
                  <td className="text-end">
                    <Chip
                      color={event.active ? "primary" : "danger"}
                      onClick={function () {}}
                      variant="solid"
                    >
                      {event.active ? "Active" : "Inactive"}
                    </Chip>
                  </td>
                  <td className="text-nowrap text-end">
                    <IconButton onClick={() => handleUpdateModal(event)}>
                      <BsPencilFill className="primary-with-hover" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(event)}>
                      <BsFillTrash3Fill className="danger-with-hover" />
                    </IconButton>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </Table>
      <Snackbar
        open={action.success || action.failed}
        color={action.success ? "success" : action.failed ? "danger" : null}
        variant="solid"
        autoHideDuration={SNACKBAR_TIMEOUT}
        onClose={() => dispatch(resetAction())}
      >
        {action.message}
      </Snackbar>
      <CreateEventForm open={createModal} onClose={() => setCreateModal(false)} />
      <UpdateEventForm open={updateModal} onClose={() => setUpdateModal(false)} />
    </>
  );
}

export default Event;
