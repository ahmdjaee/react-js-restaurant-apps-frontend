import React from 'react'
import BookingForm from './components/BookingForm'
import axiosClient from '@/services/axios';
import { useLoaderData, useNavigation } from 'react-router-dom';
import BookingDetail from './components/BookingDetail';
import { useStateContext } from '@/context/AuthContextProvider';
import CardUserNotLogin from '@/components/Fragments/Card/CardUserNotLogin';
import FloatProgressIndicator from '@/components/Elements/Indicator/FloatProgressIndicator';
import { Card, Skeleton } from '@mui/joy';

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
  const navigation = useNavigation();
  const { user } = useStateContext();
  const [hide, setHide] = React.useState(true);

  if (!user) return (
    <>
      {
        navigation.state = "loading"
          ? (
            <div className="flex flex-col p-5 mt-5">
              {[...Array(7)].map((_, index) => (
                <div className="shadow p-3"  >
                  <Skeleton animation="wave" variant="text" level='h1' sx={{ width: "100%" }} />
                </div>
              ))}
            </div>
          )
          : < CardUserNotLogin />
      }
    </>
  )

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