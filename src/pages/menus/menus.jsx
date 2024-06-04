import CardMenu from "../../components/Fragments/Card/CardMenu"
import useMenu from "../../hooks/menus/useMenu"

export default function Menu() {
    const [menus, loading, error] = useMenu();

    return (
        <div className="container flex flex-col gap-5">
            {loading
                ? <>

                    <CartMenuLayout category="Makanan">
                        {Array.from({ length: 10 }, (_, i) => (
                            <div key={i} className="flex flex-col items-center text-center animate-pulse">
                                <div className="object-cover h-56 w-full bg-gray-300" alt="" />
                                <p className="bg-gray-300 mt-6 mb-10 w-40 h-4"></p>
                            </div>
                        ))}
                    </CartMenuLayout>

                </>
                : <>
                    <CartMenuLayout category="Makanan" children={
                        menus.filter(menu => menu.category.name === "Makanan").map((menu) =>
                        (
                            <CardMenu key={menu.id} menu={menu} link={`/menus/${menu.id}`} />
                        ))
                    } />
                    <CartMenuLayout category="Minuman" children={
                        menus.filter(menu => menu.category.name === "Minuman").map((menu) =>
                        (
                            <CardMenu key={menu.id} menu={menu} link={`/menus/${menu.id}`} />
                        ))
                    } />
                    <CartMenuLayout category="Dessert" children={
                        menus.filter(menu => menu.category.name === "Dessert").map((menu) =>
                        (
                            <CardMenu key={menu.id} menu={menu} link={`/menus/${menu.id}`} />
                        ))
                    } />
                </>
            }
        </div>
    )
}

function CartMenuLayout({ category, children }) {
    return (
        <div className="mt-10" key={category}>
            <h1 className="text-5xl font-semibold">{category}</h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-5 mt-8">
                {children}
            </div>
        </div>
    )
}
