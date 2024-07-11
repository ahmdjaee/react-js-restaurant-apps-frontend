import { CircularProgress } from "@mui/joy";
import { useStateContext } from "../../../context/ContextProvider";
import useReservation from "../../../hooks/reservation/useReservation";
import BookingDetail from "./BookingDetail";
import BookingForm from "./BookingForm";
import CardUserNotLogin from "../Card/CardUserNotLogin";

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