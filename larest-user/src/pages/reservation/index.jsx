import React from 'react'
import BookingForm from './components/BookingForm'
import axiosClient from '@/services/axios';
import { useLoaderData } from 'react-router-dom';
import BookingDetail from './components/BookingDetail';
import { useStateContext } from '@/context/AuthContextProvider';
import CardUserNotLogin from '@/components/Fragments/Card/CardUserNotLogin';

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

  if (!user) return <CardUserNotLogin />

  return (
    <div className="sm:container p-5 sm:p-0">
      {reservation && hide
        ? <BookingDetail reservation={reservation} onEdit={() => setHide(false)} />
        : <BookingForm reservation={reservation} onCancel={() => setHide(true)} />
      }
    </div>
  )
}

export default Reservation