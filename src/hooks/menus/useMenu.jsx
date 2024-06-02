import { useEffect, useState } from "react";
import { getMenu } from "../../services/MenuService";

const useMenu = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);

    useEffect(() => {
         async function fetchData() {
            setLoading(true)
            const response = await getMenu();

            if (response.data) {
                setMenus(response.data)
                setLoading(false)
            }
        }

        fetchData();
    }, [])

    return [menus, loading, error];
}

export default useMenu