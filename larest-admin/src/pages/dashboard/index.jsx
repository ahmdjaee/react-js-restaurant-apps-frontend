import useFetchData from "@/hooks/useFetch";
import { formatCurrency, formatDate } from "@/utils/helper";
import { Avatar, Chip, Skeleton } from "@mui/joy";
import { IoFastFoodOutline } from "react-icons/io5";
import {
  MdAutorenew,
  MdOutlineEventAvailable,
  MdOutlinePeopleOutline,
} from "react-icons/md";
import { Link } from "react-router-dom";
import MyChart from "./components/Chart";

function Dashboard() {
  const [userLoading, userError, userResponse] = useFetchData(
    "/admin/users/summary"
  );
  const [orderLoading, orderError, orderResponse] = useFetchData(
    "/admin/orders/summary"
  );
  const [menuLoading, menuError, menuResponse] = useFetchData(
    "/admin/menus/summary"
  );

  const [eventLoading, eventError, eventResponse] = useFetchData(
    "/admin/events/summary"
  );

  const [userLatestLoading, userLatestError, userLatestResponse] = useFetchData(
    "/admin/users?latest=true&per_page=5"
  );

  const [orderLatestLoading, orderLatestError, orderLatestResponse] = useFetchData(
    "/admin/orders?latest=true&per_page=5"
  );

  return (
    <div id="main-content" className=" bg-gray-50 relative overflow-y-auto p-5">
      <main>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 ">
          {/* <!-- Card Item Start --> */}
          <div class="flex flex-col gap-3 justify-between shadow rounded-lg bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-gray-500">
            <IoFastFoodOutline className="size-8 primary-with-hover mx-auto" />
            <div class="flex items-end justify-between mt-4">
              <span class="text-sm font-medium">Total menu</span>
              <Skeleton
                loading={menuLoading}
                variant="inline"
                height={20}
                sx={{ borderRadius: "10px" }}
              >
                <Chip color="primary">{menuResponse?.data?.total ?? "Loading"}</Chip>
              </Skeleton>
            </div>
          </div>
          {/* <!-- Card Item End --> */}

          {/* <!-- Card Item Start --> */}
          <div class="flex flex-col gap-3 justify-between shadow rounded-lg bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-gray-500">
            <MdAutorenew className="size-8 primary-with-hover mx-auto" />
            <div class="flex items-end justify-between mt-4">
              <span class="text-sm font-medium">Total Order</span>
              <Skeleton
                loading={orderLoading}
                variant="inline"
                height={20}
                sx={{ borderRadius: "10px" }}
              >
                <Chip color="primary">
                  {orderResponse?.data?.total ?? "Loading"}
                </Chip>
              </Skeleton>
            </div>
          </div>
          {/* <!-- Card Item End --> */}

          {/* <!-- Card Item Start --> */}
          <div class="flex flex-col gap-3 justify-between shadow rounded-lg bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-gray-500">
            <MdOutlinePeopleOutline className="size-8 primary-with-hover mx-auto" />
            <div class="flex items-end justify-between mt-4">
              <span class="text-sm font-medium">Total User</span>
              <Skeleton
                loading={userLoading}
                variant="inline"
                height={20}
                sx={{ borderRadius: "10px" }}
              >
                <Chip color="primary">{userResponse?.data?.total ?? "Loading"}</Chip>
              </Skeleton>
            </div>
          </div>
          {/* <!-- Card Item End --> */}

          {/* <!-- Card Item Start --> */}
          <div class="flex flex-col gap-3 justify-between shadow rounded-lg bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-gray-500">
            <MdOutlineEventAvailable className="size-8 primary-with-hover mx-auto" />
            <div class="flex items-end justify-between mt-4">
              <span class="text-sm font-medium">Total Event</span>
              <Skeleton
                loading={eventLoading}
                variant="inline"
                height={20}
                sx={{ borderRadius: "10px" }}
              >
                <Chip color="primary">
                  {eventResponse?.data?.total ?? "Loading"}
                </Chip>
              </Skeleton>
            </div>
          </div>
          {/* <!-- Card Item End --> */}
        </div>
        <div className="pt-6 ">
          <div className="w-full grid">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-shrink-0">
                  <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                    $45,385
                  </span>
                  <h3 className="text-base font-normal text-gray-500">
                    Sales this week
                  </h3>
                </div>
                <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                  12.5%
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <MyChart />
            </div>
          </div>
          {/* <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                    2,340
                  </span>
                  <h3 className="text-base font-normal text-gray-500">
                    New products this week
                  </h3>
                </div>
                <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                  14.6%
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                    5,355
                  </span>
                  <h3 className="text-base font-normal text-gray-500">
                    Visitors this week
                  </h3>
                </div>
                <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                  32.9%
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                    385
                  </span>
                  <h3 className="text-base font-normal text-gray-500">
                    User signups this week
                  </h3>
                </div>
                <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                  -2.7%
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div> */}
          <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
            <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold leading-none text-gray-900">
                  Latest Customers
                </h3>
                <Link
                  to="/users"
                  className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
                >
                  View all
                </Link>
              </div>
              <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200">
                  {userLatestLoading ? (
                    Array.from({ length: 5 }, (_, index) => (
                      <li key={index} className="py-3 sm:py-4">
                        <Skeleton loading height={30} variant="rectangular" />
                      </li>
                    ))
                  ) : userLatestResponse.data.length === 0 ? (
                    <div className="text-center py-3 sm:py-4">
                      No new users in the last 7 days
                    </div>
                  ) : (
                    userLatestResponse?.data?.map((user) => (
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <Avatar
                              className="h-8 w-8 rounded-full"
                              src={user?.image}
                              alt={user?.name}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {user?.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              <a
                                href="/cdn-cgi/l/email-protection"
                                className="__cf_email__"
                                data-cfemail="17727a767e7b57607e7973646372653974787a"
                              >
                                {user?.email}
                              </a>
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900">
                            {formatDate(user?.created_at)}
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
            {/* <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
              <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
                Acquisition Overview
              </h3>
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                        Top Channels
                      </th>
                      <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                        Users
                      </th>
                      <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="text-gray-500">
                      <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                        Organic Search
                      </th>
                      <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                        5,649
                      </td>
                      <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">30%</span>
                          <div className="relative w-full">
                            <div className="w-full bg-gray-200 rounded-sm h-2">
                              <div
                                className="bg-cyan-600 h-2 rounded-sm"
                                style={{ width: "30%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-gray-500">
                      <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                        Referral
                      </th>
                      <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                        4,025
                      </td>
                      <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">24%</span>
                          <div className="relative w-full">
                            <div className="w-full bg-gray-200 rounded-sm h-2">
                              <div
                                className="bg-orange-300 h-2 rounded-sm"
                                style={{ width: "24%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-gray-500">
                      <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                        Direct
                      </th>
                      <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                        3,105
                      </td>
                      <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">18%</span>
                          <div className="relative w-full">
                            <div className="w-full bg-gray-200 rounded-sm h-2">
                              <div
                                className="bg-teal-400 h-2 rounded-sm"
                                style={{ width: "18%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-gray-500">
                      <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                        Social
                      </th>
                      <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                        1251
                      </td>
                      <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">12%</span>
                          <div className="relative w-full">
                            <div className="w-full bg-gray-200 rounded-sm h-2">
                              <div
                                className="bg-pink-600 h-2 rounded-sm"
                                style={{ width: "12%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-gray-500">
                      <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                        Other
                      </th>
                      <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                        734
                      </td>
                      <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">9%</span>
                          <div className="relative w-full">
                            <div className="w-full bg-gray-200 rounded-sm h-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-sm"
                                style={{ width: "9%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="text-gray-500">
                      <th className="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left">
                        Email
                      </th>
                      <td className="border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0">
                        456
                      </td>
                      <td className="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0">
                        <div className="flex items-center">
                          <span className="mr-2 text-xs font-medium">7%</span>
                          <div className="relative w-full">
                            <div className="w-full bg-gray-200 rounded-sm h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-sm"
                                style={{ width: "7%" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Latest Transactions
                  </h3>
                  <span className="text-base font-normal text-gray-500">
                    This is a list of latest transactions
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    to="/orders"
                    className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
                  >
                    View all
                  </Link>
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <div className="overflow-x-auto rounded-lg">
                  <div className="align-middle inline-block min-w-full">
                    <div className="shadow overflow-hidden sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Transaction
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Date & Time
                            </th>
                            <th
                              scope="col"
                              className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white">
                          {orderLatestLoading ? (
                            Array.from({ length: 5 }, (_, index) => (
                              <tr key={index}>
                                <td colSpan={3} className="p-4">
                                  <Skeleton
                                    loading
                                    height={30}
                                    variant="rectangular"
                                  />
                                </td>
                              </tr>
                            ))
                          ) : orderLatestResponse.data.length === 0 ? (
                            <div className="text-center py-3 sm:py-4">
                              No recent orders in the last 7 days
                            </div>
                          ) : (
                            orderLatestResponse?.data?.map((order) => (
                              <tr>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                  Payment from{" "}
                                  <span className="font-semibold">
                                    {order.user?.name}
                                  </span>
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                  {formatDate(order.created_at)}
                                </td>
                                <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                  {formatCurrency(order.total_payment)}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
