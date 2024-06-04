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
                                <div className="object-cover h-56 w-full bg-zinc-200" alt="" />
                                <p className="bg-zinc-200 mt-6 mb-10 w-40 h-4"></p>
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
        <div className="mt-10 mx-2 sm:mx-0" key={category}>
            <p className="md:text-4xl sm:text-3xl xs:text-2xl text-lg font-semibold">{category}</p>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-2 sm:gap-5 mt-8">
                {children}
            </div>
        </div>
    )
}
