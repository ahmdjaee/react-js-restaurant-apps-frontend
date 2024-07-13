import { Button, Chip, CircularProgress, IconButton, Snackbar } from '@mui/joy';
import React, { useState } from 'react';
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs';
import Badge from '../../components/Elements/Badge/Badge';
import FloatProgressIndicator from '../../components/Elements/Indicator/FloatProgressIndicator';
import Table from '../../components/Fragments/Table/Table';
import { actionDelete, useCrudContext } from '../../context/CrudContextProvider';
import useFetchData from '../../hooks/useFetch';
import { ACTION } from '../../utils/action';
import { formatDate } from '../../utils/helper';
import CreateEventForm from './components/CreateEventForm';

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
  const [url] = useState(`/events`);
  const [loading, _, response] = useFetchData(url, state.data);
  const [createModal, setCreateModal] = useState(false);

  const handleDelete = async (event) => {
    if (!window.confirm(`Are you sure want to delete event: ${event.title}?`)) return;
    await actionDelete(`/admin/events/${event.id}`, dispatch);
  };

  return (
    <>
      {state.loading && <FloatProgressIndicator />}
      <Table
        title="Events"
        description={"List of all events"}
        actions={<Button onClick={() => setCreateModal(true)}>Create Event</Button>}
      // footer={<Pagination response={response} setUrl={setUrl} />}
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
            response.data.map((event, index) => (
              <tr
                key={index}
                className="border-b border-dashed last:border-b-0"
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
                    size="sm"
                    variant="solid"
                  >
                    {event.active ? "Active" : "Inactive"}
                  </Chip>
                </td>
                <td className="p-3 pr-0 text-nowrap">
                  <IconButton>
                    <BsPencilFill className="text-blue-600 text-lg" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(event)}>
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
      <CreateEventForm
        open={createModal}
        onClose={() => setCreateModal(false)}
      />
    </>
  );
}

export default Event