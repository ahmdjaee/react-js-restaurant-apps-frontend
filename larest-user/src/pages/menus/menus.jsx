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
    <>
      <section className="bg-white sticky top-with-top-bar-height z-40 sm:pt-2 px-3 sm:px-0">
        <div className="flex flex-row gap-3 sm:flex-row items-center justify-between container">
          <SearchInput size={"w-[70%]"} className={"sm:me-5 "} onChange={(value) => setSearchTerm(value)} value={searchTerm} />
          <Select
            value={filterType}
            onChange={(_, value) => setFilterType(value)}
            sx={{ width: "30%" }}
            placeholder="Category"
          >
            <Option value={""}>All</Option>
            {categories.map((category) => (
              <Option key={category.id} value={category.name}>{category.name}</Option>
            ))}
          </Select>
        </div>
      </section>
      <section className="container flex flex-col gap-5 mt-2 sm:mt-0">
        {categories.every(category =>
          filteredMenus.filter(menu => menu.category.name === category.name).length === 0
        ) ? (
          <EmptyState text="Oops! No menus found" />
        ) : (
          categories.map((category) => {
            const categoryMenus = filteredMenus.filter(menu => menu.category.name === category.name);

            return categoryMenus.length > 0 ? (
              <CartMenuLayout key={category.id} category={category.name}>
                {categoryMenus.map((menu) => (
                  <CardMenu key={menu.id} menu={menu} link={`/menus/${menu.id}`} />
                ))}
              </CartMenuLayout>
            ) : null;
          })
        )}
      </section>
    </>
  )
}




