import { Breadcrumbs, Chip } from '@mui/joy'
import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import CustomMainCard from '@/components/Fragments/Card/CustomMainCard'
import axiosClient from '@/service/axios'
import QRCode from 'qrcode.react'
import { formatDate } from '@/utils/helper'

export async function loader({ params }) {
  const response = await axiosClient.get(`/orders/${params.id}`)
  return response?.data?.data;
}

function DetailOrder() {
  const order = useLoaderData()
  
  return (
    <CustomMainCard
      header={
        <Breadcrumbs sx={{ p: 0, m: 0 }}>
          <Link className=' text-xl/tight text-primary hover:underline' to={-1}>Orders</Link>
          <Link className='font-medium text-xl/tight cursor-auto'>Detail</Link>
        </Breadcrumbs>
      }
      className="flex "
    >
      <div className="w-[25%]">
        <QRCode value={order.id} size={256} />
      </div>
      <div className="flex-1 flex-col flex items-start gap-3">
        <div className="flex items-center w-full border-b border-gray-300 pb-2">
          <p className="w-64 font-semibold text-gray-700">ID</p>
          <p className="text-gray-600">{order.id}</p>
        </div>
        <div className="flex items-center w-full border-b border-gray-300 pb-2">
          <p className="w-64 font-semibold text-gray-700">User Name</p>
          <p className="text-gray-600">{order.user.name}</p>
        </div>
        <div className="flex items-center w-full border-b border-gray-300 pb-2">
          <p className="w-64 font-semibold text-gray-700">User Email</p>
          <p className="text-gray-600">{order.user.email}</p>
        </div>
        <div className="flex items-center border-b border-gray-300 pb-2 w-full">
          <p className="w-64 font-semibold text-gray-700">Order Status</p>
          <Chip variant="solid" color="primary" className="w-full md:w-auto">{order.status}</Chip>
        </div>
        <div className="flex items-center w-full border-b border-gray-300 pb-2">
          <p className="w-64 font-semibold text-gray-700">Total Payment</p>
          <p className="text-gray-600">{order.total_payment}</p>
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

  )
}

export default DetailOrder