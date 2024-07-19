import { Button, CircularProgress, IconButton, Snackbar } from '@mui/joy';
import React, { useState } from 'react';
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs';
import FloatProgressIndicator from '../../components/Elements/Indicator/FloatProgressIndicator';
import Pagination from '../../components/Fragments/Pagination/Pagination';
import Table from '../../components/Fragments/Table/Table';
import { actionDelete, useCrudContext } from '../../context/CrudContextProvider';
import useFetchData from '../../hooks/useFetch';
import { ACTION } from '../../utils/action';
import EmptyState from '../../components/Elements/Indicator/EmptyState';
import CreateCategoryForm from './components/CreateCategoryForm';
import UpdateCategoryForm from './components/UpdateCategoryForm';

function Category() {
  const { state, dispatch } = useCrudContext();
  const [loading, error, response] = useFetchData(`/categories`, state.data);
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const handleDelete = async (category) => {
    if (!window.confirm(`Are you sure want to delete category: ${category.no}?`)) return;
    await actionDelete(`/admin/categories/${category.id}`, dispatch);
  };

  return (
    <>
      {state.loading && <FloatProgressIndicator />}
      <Table
        title="Categories"
        description={"List of all categories"}
        actions={<Button onClick={() => setCreateModal(true)}>Create Category</Button>}
      >
        <thead className="align-bottom">
          <tr className="font-semibold text-[0.95rem] text-secondary-dark">
            <th className="pb-3 pe-3 text-start">NAME</th>
            <th className="pb-3 ps-3 text-end">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {loading ? ( //NOTE - Add loading indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={7}
              >
                <CircularProgress />
              </td>
            </tr>
          ) : error ? ( //NOTE - Add error indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={7}
              >
                <EmptyState text={error} />
              </td>
            </tr>
          ) : response.data.length === 0 ? ( //NOTE - Add no data indicator
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={7}
              >
                <EmptyState text={"No data found"} />
              </td>
            </tr>
          ) : (
            response.data.map((category, index) => (
              <tr
                key={index}
                className="table-row"
              >
                <td className="p-3 max-w-64 pl-0">
                  <div className="flex items-center">
                    <div className="relative inline-block shrink-0 rounded-2xl me-3">
                      <img src={category.image} className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt="" />
                    </div>
                    <span className="font-medium text-light-inverse text-md/normal">
                      {category.name}
                    </span>
                  </div>
                </td>
                <td className="p-3 pr-0 text-nowrap text-end">
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
        open={state.success || state.failed}
        color={state.success ? "success" : state.failed && "danger"}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch({ type: ACTION.RESET })}
      >
        {state.message}
      </Snackbar >
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

export default Category