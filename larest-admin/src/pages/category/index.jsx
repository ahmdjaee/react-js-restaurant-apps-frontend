import { Button, IconButton, Snackbar } from "@mui/joy";
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
import CreateCategoryForm from "./components/CreateCategoryForm";
import UpdateCategoryForm from "./components/UpdateCategoryForm";

function Category() {
  const { state, dispatch } = useCrudContext();
  const { list, action, refetch } = state;
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    actionGet("/categories", dispatch, controller.signal);
    return () => {
      controller.abort();
    };
  }, [refetch]);

  useEffect(() => {
    return () => dispatch(resetState());
  }, []);

  const filteredCategories = list?.data?.filter((category) => {
    return category?.name?.toLowerCase().includes(search.toLowerCase());
  });

  const handleDelete = async (category) => {
    if (
      !window.confirm(`Are you sure want to delete category: ${category.name}?`)
    )
      return;
    await actionDelete(`/admin/categories/${category.id}`, dispatch);
  };

  const handleUpdateModal = (category) => {
    dispatch(actionSetData(category));
    setUpdateModal(true);
  };

  return (
    <>
      <FloatProgressIndicator loading={action.loading} />
      <Table
        title="Categories"
        description={"List of all categories"}
        loading={list.loading}
        actions={
          <>
            <SearchInput
              className={"me-3"}
              value={search}
              onChange={(val) => setSearch(val)}
            />
            <Button onClick={() => setCreateModal(true)}>
              Create Category
            </Button>
          </>
        }
      >
        <thead className="align-bottom">
          <tr className="table-row-header">
            <th className="text-start">NAME</th>
            <th className="text-end">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {list.error ? ( //NOTE - Add error indicator
            <tr>
              <td className="text-xl text-center overflow-hidden" colSpan={7}>
                <EmptyState text={list.message} />
              </td>
            </tr>
          ) : filteredCategories.length === 0 ? ( //NOTE - Add no data indicator
            <tr>
              <td className="text-xl text-center overflow-hidden" colSpan={7}>
                <EmptyState text={"No data found"} />
              </td>
            </tr>
          ) : (
            filteredCategories.map((category, index) => (
              <tr key={index} className="table-row">
                <td className="p-3 max-w-64">
                  <div className="flex items-center">
                    <div className="relative inline-block shrink-0 rounded-2xl me-3">
                      <img
                        src={category.image}
                        className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl"
                        alt=""
                      />
                    </div>
                    <span className="font-medium text-light-inverse text-md/normal">
                      {category.name}
                    </span>
                  </div>
                </td>
                <td className="p-3 text-nowrap text-end">
                  <IconButton onClick={() => handleUpdateModal(category)}>
                    <BsPencilFill className="primary-with-hover" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(category)}>
                    <BsFillTrash3Fill className="danger-with-hover" />
                  </IconButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Snackbar
        open={action.success || action.failed}
        color={action.success ? "success" : action.failed && "danger"}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch(resetAction())}
      >
        {action.message}
      </Snackbar>
      <CreateCategoryForm
        open={createModal}
        onClose={() => setCreateModal(false)}
      />
      <UpdateCategoryForm
        open={updateModal}
        onClose={() => setUpdateModal(false)}
      />
    </>
  );
}

export default Category;
