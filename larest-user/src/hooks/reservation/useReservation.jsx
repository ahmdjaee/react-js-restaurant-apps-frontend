import { useEffect, useState } from "react";
import { getReservation } from "../../services/ReservationService";

const useReservation = () => {
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {

        (async () => {
            try {
                const response = await getReservation();
                if (response) {
                    setReservation(response);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                setError(true);
                console.log(error);
            }
        })();

    }, []);

    return [reservation, loading, error];
};

export default useReservation;