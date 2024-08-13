import Badge from '@/components/Elements/Badge/Badge';
import EmptyState from '@/components/Elements/Indicator/EmptyState';
import SearchInput from '@/components/Elements/Input/SearchInput';
import Table from '@/components/Fragments/Table/Table';
import { actionDelete, actionGet, actionSetData, resetAction, resetState, useCrudContext } from '@/context/CrudContextProvider';
import { formatDate } from '@/utils/helper';
import { Button, Chip, IconButton, Snackbar } from '@mui/joy';
import { useEffect, useRef, useState } from 'react';
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs';
import CreateEventForm from './components/CreateEventForm';
import UpdateEventForm from './components/UpdateEventForm';

const getBadgeColor = (type) => {
  switch (type) {
    case 'Promo':
      return 'from-green-400 to-green-600';
    case 'Concert':
      return 'from-blue-400 to-blue-600';
    case 'Flash Sale':
      return 'from-red-400 to-red-600';
    case 'Workshop':
      return 'from-yellow-400 to-yellow-600';
    case 'Festival':
      return 'from-purple-400 to-purple-600';
    default:
      return 'from-gray-400 to-gray-600';
  }
};
function Event() {
  const { state, dispatch } = useCrudContext();
  const { list, action, refetch, } = state;
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    actionGet('/events', dispatch, controller.signal);
    return () => { controller.abort() };
  }, [refetch,])

  useEffect(() => {
    return () => dispatch(resetState())
  }, [])

  const filteredEvents = list?.data?.filter((event) => {
    return (
      event?.title?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleDelete = async (event) => {
    if (!window.confirm(`Are you sure want to delete event: ${event.title}?`)) return;
    await actionDelete(`/admin/events/${event.id}`, dispatch);
  };

  const handleUpdateModal = (event) => {
    dispatch(actionSetData(event))
    setUpdateModal(true);
  }

  return (
    <>
      <Table
        title="Events"
        description={"List of all events"}
        loading={list.loading}
        actions={
          <>
            <SearchInput className={"me-3"} value={search} onChange={(val) => setSearch(val)} />
            <Button onClick={() => setCreateModal(true)}>Create Event</Button>
          </>
        }
      >
        <thead className="align-bottom">
          <tr className="font-semibold text-[0.95rem] text-secondary-dark">
            <th className="pb-3 pe-3 text-nowrap text-start">TITLE</th>
            <th className="pb-3 px-3 text-nowrap text-start">DESCRIPTION</th>
            <th className="pb-3 px-3 text-nowrap text-start">TYPE</th>
            <th className="pb-3 px-3 text-nowrap text-start">EVENT START</th>
            <th className="pb-3 px-3 text-nowrap text-end "> EVENT END</th>
            <th className="pb-3 px-3 text-nowrap text-end ">ACTIVE</th>
            <th className="pb-3 ps-3 text-nowrap text-end ">ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {list.error ? ( //NOTE - Add error indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={7}
              >
                <EmptyState text={error} />
              </td>
            </tr>
          ) : filteredEvents?.length === 0 ? ( //NOTE - Add no data indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={7}
              >
                <EmptyState text={"No data found"} />
              </td>
            </tr>
          ) : (
            filteredEvents?.map((event, index) => ( //NOTE - Add table rows
              <tr
                key={index}
                className="table-row"
              // onClick={() => handleUpdateModal(event)}
              >
                <td className="p-3 max-w-64 pl-0">
                  <div className="flex items-center">
                    <div className="relative inline-block shrink-0 rounded-2xl me-3">
                      <img src={event.image} className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt="" />
                    </div>
                    <span className="font-medium text-light-inverse text-md/normal">
                      {event.title}
                    </span>
                  </div>
                </td>
                <td className="p-3  text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {event.description}
                  </span>
                </td>
                <td className="p-3  text-start">
                  <Badge color={getBadgeColor(event.type)} text={event.type}></Badge>
                </td>
                <td className="p-3  text-start">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {formatDate(event.event_start)}
                  </span>
                </td>
                <td className="p-3 text-end">
                  <span className="font-medium text-light-inverse text-md/normal">
                    {formatDate(event.event_end)}
                  </span>
                </td>
                <td className="p-3 text-end">
                  <Chip
                    color={event.active ? "primary" : "danger"}
                    onClick={function () { }}
                    variant="solid"
                  >
                    {event.active ? "Active" : "Inactive"}
                  </Chip>
                </td>
                <td className="p-3 pr-0 text-nowrap text-end">
                  <IconButton onClick={() => handleUpdateModal(event)}>
                    <BsPencilFill className="primary-with-hover" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(event)}>
                    <BsFillTrash3Fill className="danger-with-hover" />
                  </IconButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table >
      <Snackbar
        open={action.success || action.failed}
        color={action.success ? "success" : action.failed ? "danger" : null}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch(resetAction())}
      >
        {action.message}
      </Snackbar >
      < CreateEventForm
        open={createModal}
        onClose={() => setCreateModal(false)
        }
      />
      < UpdateEventForm
        open={updateModal}
        onClose={() => setUpdateModal(false)}
      />
    </>
  );
}

export default Event