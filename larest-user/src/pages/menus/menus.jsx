import EmptyState from "@/components/Elements/Indicator/EmptyState";
import SearchInput from "@/components/Elements/Input/SearchInput";
import CardMenu from "@/components/Fragments/Card/CardMenu";
import CartMenuLayout from "@/components/Layouts/CardMenuLayout";
import axiosClient from "@/services/axios";
import { Option, Select } from "@mui/joy";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const menus = await axiosClient.get('/menus');

  return { menus: menus?.data?.data };
}
export default function Menu() {
  const { menus } = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState(null);
  const filteredMenus = menus?.filter((menu) => {
    return (
      (!filterType || menu.category.name === filterType) &&
      menu.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredCategories = [...new Set(filteredMenus.map(menu => menu.category.name))];
  const categories = [...new Set(menus.map(menu => menu.category.name))];

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
              <Option key={category} value={category}>{category}</Option>
            ))}
          </Select>
        </div>
      </section>
      <section className="container flex flex-col gap-5 mt-2 sm:mt-0">
        {filteredCategories.length === 0
          ? <EmptyState text="Oops! No menus found" />
          : filteredCategories.map((category) => (
            <CartMenuLayout key={category} category={category}>
              {filteredMenus.filter(menu => menu.category.name === category).map((menu) => (
                <CardMenu key={menu.id} menu={menu} link={`/menus/${menu.id}`} />
              ))}
            </CartMenuLayout>
          ))
        }
        {/* {categories.every(category =>
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
        )} */}
      </section>
    </>
  )
}




