import CardUserNotLogin from '@/components/Fragments/Card/CardUserNotLogin';
import { useStateContext } from '@/context/AuthContextProvider';
import axiosClient from '@/services/axios';
import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import BookingDetail from './components/BookingDetail';
import BookingForm from './components/BookingForm';

export async function loader() {
  try {
    const reservation = await axiosClient.get('/reservations');
    return { reservation: reservation?.data?.data }
  } catch (error) {
    return { reservation: null }
  }
}
function Reservation() {
  const { reservation } = useLoaderData();
  const { user } = useStateContext();
  const [hide, setHide] = React.useState(true);
  const navigate = useNavigate();
  if (!user && !reservation) return < CardUserNotLogin />

  return (
    <div className="sm:container p-5 sm:p-0">
      {reservation && hide
        ? <BookingDetail reservation={reservation} onEdit={() => setHide(false)} />
        : <BookingForm reservation={reservation} onCancel={() => (hide) ? navigate(-1) : setHide(true)} />
      }
    </div>
  )
}

export default Reservation