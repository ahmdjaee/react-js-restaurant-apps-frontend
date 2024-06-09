import { useEffect, useState } from "react";
import { getReservation } from "../../services/ReservationService";

const useReservation = () => {
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const sessionReservation = JSON.parse(sessionStorage.getItem("reservation"));

    useEffect(() => {
        if (sessionReservation !== null) {
            setReservation(sessionReservation);
        } else {
            (async () => {
                setLoading(true);
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