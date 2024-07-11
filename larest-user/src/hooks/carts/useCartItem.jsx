import { useState, useEffect } from 'react';
import { getCartItem } from '../../services/CartService';
const useCarts = () => {
    const [carts, setCarts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dependency, setDependency] = useState(null);

    useEffect(() => {
        setLoading(true)
        const fetchCarts = async () => {
            try {
                const response = await getCartItem();
                if (response) {
                    setCarts(response.data);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                setCarts([])
                console.log(error);
            }
        };

        fetchCarts();
    }, [dependency]);

    return [carts, loading, setCarts, setDependency];
};

export default useCarts;