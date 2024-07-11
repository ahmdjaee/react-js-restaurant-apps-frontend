import { Button, IconButton } from '@mui/material'
import SearchInput from '../../Elements/Input/SearchInput'
import { BiExit } from 'react-icons/bi'
import AlertDialogModal from '../Modal/AlertDialogModal'
import { useState } from 'react'
import { useStateContext } from '../../../context/ContextProvider'

function NavBar() {
  const [open, setOpen] = useState(false)
  const { handleLogout, search, setSearch } = useStateContext()

  return (
    <div className="sticky top-0 shadow-md z-50 bg-white">
      <nav className=" px-2 sm:px-4 py-5 flex items-center justify-between ">
        <SearchInput onChange={(val) => setSearch(val)} value={search} />
        <Button onClick={() => setOpen(true)}>
          <BiExit className="text-2xl me-2" />
          Logout
        </Button>
      </nav >
      <AlertDialogModal
        open={open}
        onClose={() => setOpen(false)}
        props={{
          title: 'Logout',
          content: 'Are you sure you want to logout?',
          action: 'Logout',
          cancel: 'Cancel',
        }}
        onCancel={() => setOpen(false)}
        onAction={handleLogout}
      />
    </div>
  )
}

export default NavBar