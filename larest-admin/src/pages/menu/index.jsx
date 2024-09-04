import Badge from "@/components/Elements/Badge/Badge";
import { formatCurrency } from "@/utils/helper";
import { Button, Chip, IconButton, Option, Select, Snackbar } from "@mui/joy";
import { useEffect, useState } from "react";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import EmptyState from "../../components/Elements/Indicator/EmptyState";
import FloatProgressIndicator from "../../components/Elements/Indicator/FloatProgressIndicator";
import SearchInput from "../../components/Elements/Input/SearchInput";
import Table from "../../components/Fragments/Table/Table";
import {
  actionDelete,
  actionGet,
  actionSetData,
  resetAction,
  resetState,
  useCrudContext,
} from "../../context/CrudContextProvider";
import CreateMenuForm from "./components/CreateMenuForm";
import UpdateMenuForm from "./components/UpdateMenuForm";
const getBadgeColor = (type = "") => {
  switch (type) {
    case "Promo":
      return "from-green-400 to-green-600";
    case "Special":
      return "from-blue-400 to-blue-600";
    case "New":
      return "from-red-400 to-red-600";
    case "Hot":
      return "from-yellow-400 to-yellow-600";
    case "Best Seller":
      return "from-purple-400 to-purple-600";
    case "Featured":
      return "from-pink-400 to-pink-600";
    case "Sale":
      return "from-gray-400 to-gray-600";
    case "Flash Sale":
      return "from-gray-400 to-gray-600";
    default:
      return "from-gray-400 to-gray-500";
  }
};

const tags = [
  "Promo",
  "Special",
  "New",
  "Hot",
  "Best Seller",
  "Featured",
  "Sale",
  "Flash Sale",
];

function Menu() {
  const { state, dispatch } = useCrudContext();
  const { list, action, refetch } = state;
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    categories: null,
    tags: [],
  });

  useEffect(() => {
    const controller = new AbortController();
    actionGet("/menus", dispatch, controller.signal);
    return () => {
      controller.abort();
    };
  }, [refetch]);

  useEffect(() => {
    return () => dispatch(resetState());
  }, []);

  const filteredMenus = list?.data?.filter((menu) => {
    return (
      (!filter.categories || menu.category.name === filter.categories) &&
      menu?.name?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const categories = [...new Set(list?.data?.map((menu) => menu?.category?.name))];

  const handleDelete = async (menu) => {
    if (!window.confirm(`Are you sure want to delete menu: ${menu.name}?`)) return;
    await actionDelete(`/admin/menus/${menu.id}`, dispatch);
  };

  const handleUpdateModal = (menu) => {
    dispatch(actionSetData(menu));
    setUpdateModal(true);
  };

  return (
    <>
      <FloatProgressIndicator loading={action.loading} />
      <Table
        title="Menu"
        description="List of all menu"
        loading={list.loading}
        actions={
          <>
            <a className="text-blue-600 font-medium text-sm cursor-pointer me-3">Reset</a>
            <Select
              // value={filter}
              // onChange={(_, value) => setFilter(value)}
              sx={{ width: 150, marginRight: "12px" }}
              placeholder="Tag"
            >
              {tags.map((tag) => (
                <Option key={tag} value={tag}>
                  {tag}
                </Option>
              ))}
            </Select>
            <Select
              value={filter.categories}
              onChange={(_, value) => setFilter({ ...filter, categories: value })}
              sx={{ width: 150, marginRight: "12px" }}
              placeholder="Category"
            >
              <Option value={""}>All</Option>
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
            <SearchInput
              className={"me-3"}
              value={search}
              onChange={(val) => setSearch(val)}
            />
            <Button onClick={() => setCreateModal(true)}>Create Menu</Button>
          </>
        }
      >
        <thead className="align-bottom">
          <tr className="table-row-header">
            <th className=" text-start">NAME</th>
            <th className=" text-start ">DESCRIPTION</th>
            <th className=" text-start ">TAGS</th>
            <th className=" text-start">PRICE</th>
            <th className=" text-center">STOCK</th>
            <th className=" text-end ">CATEGORY</th>
            <th className=" text-end ">ACTIVE</th>
            <th className=" text-end ">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {list.error ? ( //NOTE - Add error indicator
            <tr>
              <td className="text-xl text-center overflow-hidden" colSpan={8}>
                <EmptyState text={list.message} />
              </td>
            </tr>
          ) : filteredMenus?.length === 0 ? ( //NOTE - Add no data indicator
            <tr>
              <td className="text-xl text-center overflow-hidden" colSpan={8}>
                <EmptyState text={"No data found"} />
              </td>
            </tr>
          ) : (
            filteredMenus?.map((menu) => (
              <tr key={menu.id} className="table-row-body">
                <td className=" ">
                  <div className="flex items-center">
                    <div className="relative inline-block shrink-0 rounded-2xl me-3">
                      <img
                        src={menu.image}
                        className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-start overflow-hidden">
                      <span>{menu.name}</span>
                    </div>
                  </div>
                </td>
                <td className=" max-w-64  text-start">
                  <span className="line-clamp-2">
                    {menu.description}
                  </span>
                </td>
                <td className=" text-start ">
                  <div className="text-nowrap flex items-center gap-2">
                    {menu.tags ? (
                      menu.tags.split(",").map((tag, index) =>
                        index === 0 ? (
                          <Badge key={index} color={getBadgeColor(tag)}>
                            {tag}
                          </Badge>
                        ) : index === 1 ? (
                          <p
                            key={index}
                            className=" text-zinc-500 font-medium text-sm"
                          >
                            +{menu.tags.split(",").length - 1} more
                          </p>
                        ) : null
                      )
                    ) : (
                      <Badge color={getBadgeColor()}>N/A</Badge>
                    )}
                  </div>
                </td>
                <td className="  text-start">
                  <span className="line-clamp-2">
                    {formatCurrency(menu.price)}
                  </span>
                </td>
                <td className="  text-center">
                  <span className="line-clamp-2">{menu.stock}</span>
                </td>
                <td className="  text-end">
                  <span className="line-clamp-2">
                    {menu.category?.name}
                  </span>
                </td>
                <td className=" text-end">
                  <Chip
                    color={menu.active ? "primary" : "danger"}
                    onClick={function () {}}
                    variant="solid"
                  >
                    {menu.active ? "Active" : "Inactive"}
                  </Chip>
                </td>
                <td className="  text-end text-nowrap">
                  <IconButton onClick={() => handleUpdateModal(menu)}>
                    <BsPencilFill className="primary-with-hover" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(menu)}>
                    <BsFillTrash3Fill className="danger-with-hover" />
                  </IconButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <CreateMenuForm
        open={createModal}
        onClose={() => setCreateModal(false)}
        tags={tags}
      />
      <UpdateMenuForm
        open={updateModal}
        onClose={() => setUpdateModal(false)}
        tags={tags}
      />
      <Snackbar
        open={action.success || action.failed}
        color={action.success ? "success" : action.failed && "danger"}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch(resetAction())}
      >
        {action.message}
      </Snackbar>
    </>
  );
}

export default Menu;
