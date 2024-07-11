import { Tab, TabList, Tabs, tabClasses } from "@mui/joy";
import CardMenu from "../../../components/Fragments/Card/CardMenu"
import useMenu from "../../../hooks/menus/useMenu"
import {useState } from "react";
import SearchInput from "../../../components/Elements/Input/SearchInput";
import CartMenuLayout from "../../../components/Layouts/CardMenuLayout";

export default function Menu() {
    const [menus, loading, error] = useMenu();
    const [searchTerm, setSearchTerm] = useState('');
    // const [filterType, setFilterType] = useState('All');
    const categories = ["Food", "Beverage", "Dessert"];
    const filteredMenus = menus.filter((menu) => {
        return (
            // (filterType === 'All' || menu.type === filterType) &&
            menu.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <>
            <section className="bg-white sticky top-20 z-40 py-2">
                <div className="flex items-center justify-between container">
                    <SearchInput fullWidth className={"me-5"} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
                    <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent' }}>
                        <TabList
                            disableUnderline
                            sx={{
                                p: 0.5,
                                gap: 0.5,
                                borderRadius: 'xl',
                                bgcolor: 'background.level1',
                                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                    boxShadow: 'sm',
                                    bgcolor: 'background.surface',
                                },
                            }}
                        >
                            <a href="#food" target="_top" > <Tab disableIndicator>Food</Tab></a>
                            <a href="#beverage"><Tab disableIndicator>Beverage</Tab></a>
                            <a href="#dessert"><Tab disableIndicator>Dessert</Tab></a>
                        </TabList>
                    </Tabs>
                </div>
            </section>
            <section className="container flex flex-col gap-5">
                {loading
                    ? <>

                        <CartMenuLayout category="Food">
                            {Array.from({ length: 10 }, (_, i) => (
                                <div key={i} className="flex flex-col items-center text-center animate-pulse">
                                    <div className="object-cover h-56 w-full bg-zinc-200" alt="" />
                                    <p className="bg-zinc-200 mt-6 mb-10 w-40 h-4"></p>
                                </div>
                            ))}
                        </CartMenuLayout>

                    </>
                    : <>
                        {categories.map((category) => (
                            <CartMenuLayout
                                key={category}
                                category={category}

                            >
                                {filteredMenus
                                    .filter(menu => menu.category.name === category)
                                    .map((menu) => (
                                        <CardMenu key={menu.id} menu={menu} link={`/menus/${menu.id}`} />
                                    ))
                                }
                            </CartMenuLayout>
                        ))}
                    </>
                }
            </section>
        </>
    )
}



