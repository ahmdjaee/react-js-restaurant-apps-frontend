import { Tab, TabList, Tabs, tabClasses } from "@mui/joy";
import SearchInput from "@/components/Elements/Input/SearchInput";
import { useLoaderData } from "react-router-dom";
import axiosClient from "@/services/axios";
import { useState } from "react";
import CartMenuLayout from "@/components/Layouts/CardMenuLayout";
import CardMenu from "@/components/Fragments/Card/CardMenu";
import EmptyState from "@/components/Elements/Indicator/EmptyState";

export async function loader() {
  const menus = await axiosClient.get('/menus');
  const categories = await axiosClient.get('/categories');

  return {
    menus: menus?.data?.data,
    categories: categories?.data?.data,
  };
}
export default function Menu() {
  const { menus, categories } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState(null);
  const filteredMenus = menus?.filter((menu) => {
    return (
      (!filterType || menu.category.name === filterType) &&
      menu.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <section className="bg-white sticky top-20 z-40 py-2">
        <div className="flex flex-col space-y-3 sm:flex-row items-center justify-between container">
          <SearchInput fullWidth className={"me-5"} onChange={(value) => setSearchTerm(value)} value={searchTerm} />
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
              {categories.map((category) => (
                <Tab disableIndicator key={category.id} onClick={() => setFilterType(category.name)}>{category.name}</Tab>
              ))}
            </TabList>
          </Tabs>
        </div>
      </section>
      <section className="container flex flex-col gap-5">
        {categories.map((category) => (
          <CartMenuLayout
            key={category}
            category={category.name ? category.name : null}
          >
            {
              filteredMenus
                .filter(menu => menu.category.name === category.name)
                .length === 0
                ? <EmptyState />
                : filteredMenus
                  .filter(menu => menu.category.name === category.name)
                  .map((menu) => (
                    <CardMenu key={menu.id} menu={menu} link={`/menus/${menu.id}`} />
                  ))
            }
          </CartMenuLayout>
        ))}
      </section>
    </>
  )
}




