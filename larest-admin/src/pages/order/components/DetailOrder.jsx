import { Breadcrumbs, Chip, ListItemDecorator, Tab, tabClasses, TabList, Tabs } from '@mui/joy'
import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import CustomMainCard from '@/components/Fragments/Card/CustomMainCard'
import axiosClient from '@/service/axios'
import QRCode from 'qrcode.react'
import { formatCurrency, formatDate } from '@/utils/helper'
import TextCurrency from '@/components/Elements/Text/TextCurrency'
import { FaEye } from 'react-icons/fa'
import { BsEye, BsPencil, BsPlus } from 'react-icons/bs'

export async function loader({ params }) {
  const response = await axiosClient.get(`/orders/${params.id}`)
  return response?.data?.data;
}

function DetailOrder() {
  const order = useLoaderData()

  return (
    <>
      <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent', width: 'min-content', marginInline: 'auto', mt: 2 }}>
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
          <Tab disableIndicator>
            <ListItemDecorator>
              <BsEye />
            </ListItemDecorator>
            Detail
          </Tab>
          <Tab disableIndicator>
            <ListItemDecorator>
              <BsPencil />
            </ListItemDecorator>
            Edit
          </Tab>
          <Tab disableIndicator>
            <ListItemDecorator>
              <BsPlus />
            </ListItemDecorator>
            Create</Tab>
        </TabList>
      </Tabs>
      <CustomMainCard
        header={
          <Breadcrumbs sx={{ p: 0, m: 0 }}>
            <Link className=' text-xl/tight text-primary hover:underline' to={-1}>Orders</Link>
            <Link className='font-medium text-xl/tight cursor-auto'>Detail</Link>
          </Breadcrumbs>
        }
        className="flex "
      >
        <div className="w-[35%] flex flex-col">
          <QRCode value={order.id} size={300} />
        </div>
        <div className="flex-1 flex-col flex items-start gap-3">
          <div className="flex items-center w-full border-b border-gray-300 pb-2">
            <p className="w-64 font-semibold text-gray-700">ID</p>
            <p className="text-gray-600">{order.id}</p>
          </div>
          <div className="flex items-center w-full border-b border-gray-300 pb-2">
            <p className="w-64 font-semibold text-gray-700">Name</p>
            <p className="text-gray-600">{order.user.name}</p>
          </div>
          <div className="flex items-center w-full border-b border-gray-300 pb-2">
            <p className="w-64 font-semibold text-gray-700">Email</p>
            <p className="text-gray-600">{order.user.email}</p>
          </div>
          <div className="flex items-center border-b border-gray-300 pb-2 w-full">
            <p className="w-64 font-semibold text-gray-700">Order Status</p>
            <Chip variant="solid" color="primary" className="w-full md:w-auto">{order.status}</Chip>
          </div>
          <div className="flex items-center w-full border-b border-gray-300 pb-2">
            <p className="w-64 font-semibold text-gray-700">Total Payment</p>
            <p className="text-gray-600 font-bold">{formatCurrency(order.total_payment)}</p>
          </div>
          <div className="flex items-center w-full border-b border-gray-300 pb-2">
            <p className="w-64 font-semibold text-gray-700">Ordered At</p>
            <p className="text-gray-600">{formatDate(order.created_at)}</p>
          </div>
          <div className="flex items-center w-full border-b border-gray-300 pb-2">
            <p className="w-64 font-semibold text-gray-700">Reservation ID</p>
            <p className="text-gray-600">{order.reservation.id}</p>
          </div>
          <div className="flex items-center w-full border-b border-gray-300 pb-2">
            <p className="w-64 font-semibold text-gray-700">Table Number</p>
            <p className="text-gray-600">{order.reservation.table.no}</p>
          </div>
          <div className="flex items-center w-full border-b border-gray-300 pb-2">
            <p className="w-64 font-semibold text-gray-700">Table Capacity</p>
            <p className="text-gray-600">{order.reservation.table.capacity}</p>
          </div>
          <div className="flex items-center w-full border-b border-gray-300 pb-2">
            <p className="w-64 font-semibold text-gray-700">Reservation Date</p>
            <p className="text-gray-600">{order.reservation.date}</p>
          </div>
          <div className="flex items-center w-full border-b border-gray-300 pb-2">
            <p className="w-64 font-semibold text-gray-700">Reservation Time</p>
            <p className="text-gray-600">{order.reservation.time}</p>
          </div>
          <div className="flex items-center w-full border-b border-gray-300 pb-2">
            <p className="w-64 font-semibold text-gray-700">Total Person</p>
            <p className="text-gray-600">{order.reservation.persons}</p>
          </div>
          <div className="flex items-center w-full border-b border-gray-300 pb-2">
            <p className="w-64 font-semibold text-gray-700">Reservation Status</p>
            <Chip variant="outlined" color="success" className="w-full md:w-auto">{order.reservation.status}</Chip>
          </div>
          <div className="flex items-center w-full border-b border-gray-300 pb-2">
            <p className="w-64 font-semibold text-gray-700">Reservation Notes</p>
            <p className="text-gray-600">{order.reservation.notes}</p>
          </div>
        </div>

      </CustomMainCard>

      <CustomMainCard header={"Order Items"}>
        {order.items.map((item) => (
          <div className="mb-3 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 ">
            <div className="flex  rounded-lg bg-white sm:flex-row">
              <img src={item.menu.image} className="m-2 h-24 w-28 rounded-md border object-cover object-center" alt="" />
              <div className="flex flex-grow flex-col px-4 py-4">
                <span className="font-semibold">{item.menu.name}</span>
                <span className="float-right text-gray-400">x {item.quantity}</span>
                <TextCurrency color="text-black" className={"text-lg font-bold"} text={item.menu.price} />
              </div>
            </div>
          </div >
        ))}
      </CustomMainCard>
    </>
  )
}

export default DetailOrder