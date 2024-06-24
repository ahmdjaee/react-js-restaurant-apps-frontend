import { useEffect, useState } from "react";
import { getReservation } from "../../services/ReservationService";

const useReservation = () => {
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const sessionReservation = sessionStorage.getItem("reservation") && JSON.parse(sessionStorage.getItem("reservation"))

    useEffect(() => {
        if (sessionReservation !== null) {
            setReservation(sessionReservation);
            setLoading(false);
        } else {
            (async () => {
                try {
                    const response = await getReservation();
                    if (response) {
                        setReservation(response.data);
                        sessionStorage.setItem("reservation", JSON.stringify(response.data));
                        setLoading(false);
                    }
                } catch (error) {
                    setLoading(false);
                    setError(true);
                    console.log(error);
                }
            })();
        }

    }, []);

    return [reservation, loading, error];
};

export default useReservation;