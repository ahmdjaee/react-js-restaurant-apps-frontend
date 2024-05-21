import CardMenu from "../Fragments/Card/CardMenu"
import dish2 from "../../assets/dish-2.svg"
import { useEffect, useState } from "react"
import { getMenu } from "../../services/MenuApi"
function Menu() {
    const [menus, setMenus] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            setLoading(true)
            const response = await getMenu(controller);

            if (response.data) {
                setMenus(response.data)
                setLoading(false)
            }
        }

        fetchData();
        return () => {
            controller.abort();
        };
    }, [])

    // menus.filter((menu) => menu.type === "makanan")

    return (
        <div className="container flex flex-col gap-24">
            {loading
                ? <>
                    <div className="mt-10" key="Makanan">
                        <h1 className="text-5xl font-semibold">Makanan</h1>
                        <div className="grid grid-cols-4 gap-5 mt-8">
                            {Array.from({ length: 10 }, (_, i) => (
                                <div className="flex flex-col items-center text-center animate-pulse">
                                    <div className="object-cover h-56 w-full bg-gray-300" alt="" />
                                    <p className="bg-gray-300 mt-6 mb-10 w-40 h-4"></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
                : <>
                    <div className="mt-10" key="Makanan">
                        <h1 className="text-5xl font-semibold">Makanan</h1>
                        <div className="grid grid-cols-4 gap-5 mt-8">
                            {menus.map((menu) => {
                                return <CardMenu key={menu.id} title={menu.name} image={menu.image} price={menu.price} isLoading={loading} link="/menus/detail" />
                            })}
                        </div>
                    </div>
                    <div className="" key="Minuman">
                        <h1 className="text-5xl font-semibold">Minuman</h1>
                        <div className="grid grid-cols-4 gap-5 mt-8">
                            {menus.map((menu) => {
                                return <CardMenu key={menu.id} title={menu.name} image={menu.image} price={menu.price} isLoading={loading} link="/menus/detail" />
                            })}
                        </div>
                    </div>
                    <div className="" key="Dessert">
                        <h1 className="text-5xl font-semibold">Dessert</h1>
                        <div className="grid grid-cols-4 gap-5 mt-8">
                            {menus.map((menu) => {
                                return <CardMenu key={menu.id} title={menu.name} image={menu.image} price={menu.price} isLoading={loading} link="/menus/detail" />
                            })}
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default Menu