import SearchInput from '../../Elements/Input/SearchInput'
import { BiExit } from 'react-icons/bi'
import AlertDialogModal from '../Modal/AlertDialogModal'
import { useState } from 'react'
import { useStateContext } from '../../../context/ContextProvider'
import { Button } from '@mui/joy'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../../service/axios'

function NavBar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { search, setSearch, setToken, setUser } = useStateContext()

  const handleLogout = async () => {
    try {
      const response = await axiosClient.delete('/users/logout')
      if (response && response.status === 200) {
        window.location.href = '/login'
        setToken(null)
        setUser(null)
      }
    } catch (error) {
      console.log(error.response.data);
    }

  }
  return (
    <div className="sticky top-0 shadow-md z-50 bg-white">
      <nav className=" px-2 sm:px-4 py-5 flex items-center justify-between ">
        <SearchInput onChange={(val) => setSearch(val)} value={search} />
        <Button variant='plain' color='warning' onClick={() => setOpen(true)}>
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