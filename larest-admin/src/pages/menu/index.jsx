import { Button, IconButton, Option, Select, Snackbar } from "@mui/joy";
import { useEffect, useState } from "react";
import { BsFillTrash3Fill, BsPencilFill } from "react-icons/bs";
import EmptyState from "../../components/Elements/Indicator/EmptyState";
import FloatProgressIndicator from "../../components/Elements/Indicator/FloatProgressIndicator";
import SearchInput from "../../components/Elements/Input/SearchInput";
import Table from "../../components/Fragments/Table/Table";
import { actionDelete, actionGet, actionSetData, resetAction, resetState, useCrudContext } from "../../context/CrudContextProvider";
import CreateMenuForm from "./components/CreateMenuForm";
import UpdateMenuForm from "./components/UpdateMenuForm";

function Menu() {
  const { state, dispatch } = useCrudContext();
  const { list, action, refetch } = state;
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    actionGet('/menus', dispatch, controller.signal);
    return () => { controller.abort() };
  }, [refetch])

  useEffect(() => {
    return () => dispatch(resetState())
  }, [])

  const filteredMenus = list?.data?.filter((menu) => {
    return (
      (!filterType || menu.category.name === filterType) &&
      menu?.name?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleDelete = async (menu) => {
    if (!window.confirm(`Are you sure want to delete menu: ${menu.name}?`)) return;
    await actionDelete(`/admin/menus/${menu.id}`, dispatch);
  };

  const handleUpdateModal = (menu) => {
    dispatch(actionSetData(menu));
    setUpdateModal(true);
  }

  return (
    <>
      <FloatProgressIndicator loading={action.loading} />
      <Table
        title="Menu"
        description="List of all menu"
        loading={list.loading}
        actions={
          <>
            <Select
              value={filterType}
              onChange={(_, value) => setFilterType(value)}
              sx={{ width: 150, marginRight: "12px" }}
              placeholder="Category"
            >
              <Option value="">All</Option>
              <Option value="Food">Food</Option>
              <Option value="Drink">Drink</Option>
              <Option value="Dessert">Dessert</Option>
            </Select>
            <SearchInput className={"me-3"} value={search} onChange={(val) => setSearch(val)} />
            <Button onClick={() => setCreateModal(true)}>Create Menu</Button>
          </>
        }
      >
        <thead className="align-bottom">
          <tr className="font-semibold text-[0.95rem] text-secondary-dark">
            <th className="pb-3 max-w-64 pe-3 text-start">NAME</th>
            <th className="pb-3 max-w-64 px-3 text-start ">DESCRIPTION</th>
            <th className="pb-3 max-w-64 px-3 text-end">PRICE</th>
            <th className="pb-3 max-w-64 px-3 text-end ">CATEGORY</th>
            <th className="pb-3 max-w-64 ps-3 text-end ">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {list.error ? ( //NOTE - Add error indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={7}
              >
                <EmptyState text={error} />
              </td>
            </tr>
          ) : filteredMenus?.length === 0 ? ( //NOTE - Add no data indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={7}
              >
                <EmptyState text={"No data found"} />
              </td>
            </tr>
          ) : filteredMenus?.map((menu) => (
            <tr key={menu.id} className="table-row">
              <td className="p-3 max-w-64 pl-0">
                <div className="flex items-center">
                  <div className="relative inline-block shrink-0 rounded-2xl me-3">
                    <img src={menu.image} className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt="" />
                  </div>
                  <div className="flex flex-col justify-start">
                    <a className="mb-1 font-semibold transition-colors duration-200 ease-in-out text-lg/normal text-secondary-inverse hover:text-primary">{menu.name}</a>
                  </div>
                </div>
              </td>
              <td className="p-3 max-w-64 text-start">
                <span className="line-clamp-2 font-semibold text-light-inverse text-md/normal">
                  {menu.description}
                </span>
              </td>
              <td className="p-3 max-w-64 text-end">
                <span className="line-clamp-2 font-semibold text-light-inverse text-md/normal">
                  Rp {menu.price}
                </span>
              </td>
              <td className="p-3 max-w-64 text-end">
                <span className="line-clamp-2 font-semibold text-light-inverse text-md/normal">
                  {menu?.category?.name}
                </span>
              </td>
              <td className="p-3 pr-0 max-w-64 text-end">
                <IconButton onClick={() => handleUpdateModal(menu)}>
                  <BsPencilFill className="primary-with-hover" />
                </IconButton>
                <IconButton onClick={() => handleDelete(menu)}>
                  <BsFillTrash3Fill className="danger-with-hover" />
                </IconButton>
              </td>
            </tr>
          ))
          }
        </tbody>
      </Table>
      <CreateMenuForm
        open={createModal}
        onClose={() => setCreateModal(false)}
      />
      <UpdateMenuForm
        open={updateModal}
        onClose={() => setUpdateModal(false)}
      />
      <Snackbar
        open={action.success || action.failed}
        color={action.success ? "success" : action.failed && "danger"}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch(resetAction())}
      >
        {action.message}
      </Snackbar >
    </>
  );
}

export default Menu;
