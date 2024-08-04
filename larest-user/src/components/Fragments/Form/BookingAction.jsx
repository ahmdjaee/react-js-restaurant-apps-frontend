import { CircularProgress } from "@mui/joy";
import { useStateContext } from "../../../context/ContextProvider";
import CardUserNotLogin from "../Card/CardUserNotLogin";
import BookingDetail from "../../../pages/reservation/components/BookingDetail";
import BookingForm from "../../../pages/reservation/components/BookingForm";

function BookingAction({ onSuccess, onCancel }) {
    const [reservation, loading] = useReservation();
    const { user } = useStateContext()

    if (user) {
        return (
            <>
                {loading
                    ? <CircularProgress />
                    : <>
                        {reservation
                            ? <BookingDetail  reservation={reservation} onCancel={onCancel} />
                            : <BookingForm onCancel={onCancel} onSuccess={onSuccess} />
                        }
                    </>
                }

            </>
        )
    } else {
        return (<CardUserNotLogin onClose={onCancel} />)
    }
}

export default BookingAction