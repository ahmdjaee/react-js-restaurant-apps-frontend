import React from 'react'
import SearchInput from '../../Elements/Input/SearchInput'

function AdminNavbar() {
  return (
    <div className="sticky top-0 shadow-md z-50 bg-white">
      <nav className=" px-2 sm:px-4 py-5 flex items-center justify-between ">
        <SearchInput />
      </nav >
    </div>
  )
}

export default AdminNavbar