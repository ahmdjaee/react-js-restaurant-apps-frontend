import EmptyState from "@/components/Elements/Indicator/EmptyState";
import FloatProgressIndicator from "@/components/Elements/Indicator/FloatProgressIndicator";
import SearchInput from "@/components/Elements/Input/SearchInput";
import Pagination from "@/components/Fragments/Pagination/Pagination";
import Table from "@/components/Fragments/Table/Table";
import {
  actionGet,
  resetState,
  useCrudContext,
} from "@/context/CrudContextProvider";
import useDebounced from "@/hooks/useDebounce";
import { ACTION } from "@/utils/action";
import { formatCurrency, formatDate, getCurrentDateTime } from "@/utils/helper";
import { SEARCH_TIMEOUT, SNACKBAR_TIMEOUT } from "@/utils/settings";
import { Button, Chip, IconButton, Snackbar } from "@mui/joy";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import CsvDownload from "react-csv-downloader";
import { BsChevronRight, BsDownload, BsPencilFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
function getChipColor(status) {
  switch (status) {
    case "new":
      return "primary";
    case "checkout":
      return "warning";
    case "paid":
      return "success";
    case "failed":
      return "danger";
    case "completed":
      return "success";
    default:
      return "primary";
  }
}

function Order() {
  const navigate = useNavigate();
  const { state, dispatch } = useCrudContext();
  const { list, action, refetch } = state;
  const [url, setUrl] = useState(`admin/orders`);

  useEffect(() => {
    const controller = new AbortController();
    actionGet(url, dispatch, controller.signal);
    return () => {
      controller.abort();
    };
  }, [url, refetch, dispatch]);

  useEffect(() => {
    return () => dispatch(resetState());
  }, [dispatch]);

  const debouncedSetUrl = useDebounced((value) => {
    setUrl(`${url}?search=${value}`);
  }, SEARCH_TIMEOUT);

  const columns = [
    {
      id: "id",
      displayName: "ID",
    },
    {
      id: "name",
      displayName: "NAME",
    },
    {
      id: "email",
      displayName: "EMAIL",
    },
    {
      id: "reservation_id",
      displayName: "RESERVATION ID",
    },
    {
      id: "status",
      displayName: "STATUS",
    },
    {
      id: "total_payment",
      displayName: "TOTAL PAYMENT",
    },
    {
      id: "created_at",
      displayName: "CREATED AT",
    },
  ];

  const datas = list.data.map((item) => ({
    id: item.id,
    name: item.user?.name,
    email: item.user?.email,
    reservation_id: item.reservation?.id,
    status: item.status,
    total_payment: item.total_payment,
    created_at: formatDate(item.created_at),
  }));

  return (
    <>
      <FloatProgressIndicator loading={action.loading} />
      <Table
        title="Orders"
        description={"List of all orders"}
        loading={list.loading}
        actions={
          <>
            <CsvDownload
              filename={"ORDERS - " + getCurrentDateTime()}
              extension=".csv"
              separator=";"
              columns={columns}
              datas={datas}
              text="DOWNLOAD"
            >
              <Button variant="outlined" color="neutral" sx={{ mr: 1 }}>
                <BsDownload className="me-2" />
                Download CSV
              </Button>
            </CsvDownload>
            <SearchInput className={"me-2"} onChange={debouncedSetUrl} />
            <Button onClick={() => navigate("/orders/create")}>Create Order</Button>
          </>
        }
        footer={<Pagination response={list} setUrl={setUrl} />}
      >
        <thead className="align-bottom">
          <tr className="table-row-header">
            <th className="text-nowrap text-start">QR</th>
            <th className="text-nowrap text-start">ORDER ID</th>
            <th className="text-nowrap text-start">NAME</th>
            <th className="text-nowrap text-start">EMAIL</th>
            <th className="text-nowrap text-center">RESERVATION ID</th>
            <th className="text-nowrap text-start">STATUS</th>
            <th className="text-nowrap text-end">TOTAL PAYMENT</th>
            <th className="text-nowrap text-end">CREATED AT</th>
            <th className="text-nowrap text-end">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {list.error ? ( //NOTE - Add error indicator
            <tr>
              <td className="text-xl text-center overflow-hidden" colSpan={9}>
                <EmptyState text={list.message} />
              </td>
            </tr>
          ) : list.data.length === 0 ? ( //NOTE - Add no data indicator
            <tr>
              <td className="text-xl text-center overflow-hidden" colSpan={9}>
                <EmptyState text={"No data found"} />
              </td>
            </tr>
          ) : (
            list.data.map(
              (
                order,
                index //NOTE - Add table rows
              ) => (
                <tr
                  key={index}
                  className="table-row-body"
                  to={`/orders/${order.id}`}
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  <td className="">
                    <QRCode value={order.id} size={50} />
                  </td>
                  <td className="text-start">
                    <span>{order.id}</span>
                  </td>
                  <td className="text-start text-nowrap">
                    <span>{order.user?.name}</span>
                  </td>
                  <td className="text-start">
                    <span>{order.user?.email}</span>
                  </td>
                  <td className="text-center">
                    <span>{order.reservation?.id}</span>
                  </td>
                  <td className="text-start">
                    <span>
                      <Chip variant="soft" color={getChipColor(order.status)}>
                        {order.status}
                      </Chip>
                    </span>
                  </td>
                  <td className="text-end">
                    <span>{formatCurrency(order.total_payment)}</span>
                  </td>
                  <td className="text-end text-nowrap">
                    <span>{formatDate(order.created_at)}</span>
                  </td>
                  <td
                    className="text-nowrap text-end"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <IconButton>
                      <BsPencilFill className="primary-with-hover" />
                    </IconButton>
                    <IconButton onClick={() => navigate(`/orders/${order.id}`)}>
                      <BsChevronRight className="secondary-with-hover" />
                    </IconButton>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </Table>
      <Snackbar
        open={action.success || action.failed}
        color={action.success ? "success" : action.failed ? "danger" : null}
        variant="solid"
        autoHideDuration={SNACKBAR_TIMEOUT}
        onClose={() => dispatch({ type: ACTION.RESET_ACTION })}
      >
        {action.message}
      </Snackbar>
    </>
  );
}

export default Order;
