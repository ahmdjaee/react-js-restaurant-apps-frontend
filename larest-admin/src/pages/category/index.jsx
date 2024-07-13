import { Button, CircularProgress, IconButton, Snackbar } from '@mui/joy';
import React, { useState } from 'react';
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs';
import FloatProgressIndicator from '../../components/Elements/Indicator/FloatProgressIndicator';
import Pagination from '../../components/Fragments/Pagination/Pagination';
import Table from '../../components/Fragments/Table/Table';
import { actionDelete, useCrudContext } from '../../context/CrudContextProvider';
import useFetchData from '../../hooks/useFetch';
import { ACTION } from '../../utils/action';

function Category() {
  const { state, dispatch } = useCrudContext();
  const [url, setUrl] = useState(`/categories`);
  const [loading, _, response] = useFetchData(url, state.data);

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
        actions={<Button>Create Category</Button>}
        footer={<Pagination response={response} setUrl={setUrl} />}
      >
        <thead className="align-bottom">
          <tr className="font-semibold text-[0.95rem] text-secondary-dark">
            <th className="pb-3 pe-3 text-start">NAME</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                className="text-xl text-center overflow-hidden"
                colSpan={6}
              >
                <CircularProgress />
              </td>
            </tr>
          ) : (
            response.data.map((category, index) => (
              <tr
                key={index}
                className="border-b border-dashed last:border-b-0"
              >
                <td className="p-3 pl-0">
                  <div className="flex flex-col justify-start">
                    <span className="font-semibold text-light-inverse text-md/normal">
                      {category.name}
                    </span>
                  </div>
                </td>
                <td className="p-3 pr-0 flex items-center justify-end">
                  <IconButton>
                    <BsPencilFill className="text-blue-600 text-lg" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(category)}>
                    <BsFillTrash3Fill className="text-red-600 text-lg" />
                  </IconButton>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Snackbar
        open={state.success}
        color="success"
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch({ type: ACTION.RESET })}
      >
        Table has been deleted
      </Snackbar >
    </>
  );
}

export default Category