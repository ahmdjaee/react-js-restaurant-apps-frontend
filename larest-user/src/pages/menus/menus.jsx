import { Option, Select, Tab, TabList, Tabs, tabClasses } from "@mui/joy";
import SearchInput from "@/components/Elements/Input/SearchInput";
import { useLoaderData } from "react-router-dom";
import axiosClient from "@/services/axios";
import { Fragment, useState } from "react";
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
    <Fragment>
      <section className="bg-white sticky top-0 z-40 pb-3 px-3 sm:px-0">
        <div className="flex flex-row gap-3 sm:flex-row items-center justify-between container">
          <SearchInput size={"w-[70%]"} className={"sm:me-5 "} onChange={(value) => setSearchTerm(value)} value={searchTerm} />
          <Select
            value={filterType}
            onChange={(_, value) => setFilterType(value)}
            sx={{ width: "30%" }}
            placeholder="Category"
          >
            <Option value={null}>All</Option>
            {categories.map((category) => (
              <Option value={category.name}>{category.name}</Option>
            ))}
          </Select>
          {/* <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent' }}>
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
          </Tabs> */}
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
                ? (
                  <div className="flex justify-center">
                    <EmptyState text={"No menu found"} />
                  </div>
                )
                : filteredMenus
                  .filter(menu => menu.category.name === category.name)
                  .map((menu) => (
                    <CardMenu key={menu.id} menu={menu} link={`/menus/${menu.id}`} />
                  ))
            }
          </CartMenuLayout>
        ))}
      </section>
    </Fragment>
  )
}




