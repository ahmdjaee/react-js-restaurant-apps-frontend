import NavLink from '@/components/Elements/Link/NavLink';
import Logo from "@/components/Elements/Logo/Logo";
import { useStateContext } from '@/context/ContextProvider';
import { Avatar, Badge, Button, IconButton } from '@mui/joy';
import Box from '@mui/joy/Box';
import DialogActions from '@mui/joy/DialogActions';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Divider from '@mui/joy/Divider';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import * as React from 'react';
import { MdOutlineLocalGroceryStore, MdOutlineTableBar } from 'react-icons/md';
import { Link, useLocation } from "react-router-dom";
import BookingAction from '../Form/BookingAction';
import { FaPen } from 'react-icons/fa6';

function TopNavBar({ navLink = true, carts }) {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const { user } = useStateContext();

  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(inOpen);
  };

  const handleLogout = () => {
    setOpenDialog(false);
  };

  return (
    <div className="sm:shadow-sm z-50 bg-white">
      <nav className="container px-3 sm:px-0 py-2 sm:py-5 flex items-center justify-between ">
        <Logo home={"/"} />
        <NavLink />
        <CheckUser user={user} toggleDrawer={toggleDrawer} carts={carts} />
      </nav >

      <Drawer anchor='right' size='sm' open={open} onClose={toggleDrawer(false)}>
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {[
              ['Profile', '/profile'],
              ['Transaction', '/transactions'],
            ].map(([title, url]) => (
              <Link key={title} to={url}>
                <ListItem >
                  <ListItemButton>{title}</ListItemButton>
                </ListItem>
              </Link>
            ))
            }
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton onClick={() => setOpenDialog(true)}>Logout </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Modal open={openDialog} onClose={() => setOpenDialog(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent >
            Some data will be lost. Are you sure want to logout?
          </DialogContent>
          <DialogActions>
            <Button color="danger" onClick={handleLogout}>
              Logout
            </Button>
            <Button variant="plain" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </div >
  )
}

export default TopNavBar

function CheckUser({ user, toggleDrawer, carts }) {
  const location = useLocation();
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <Modal onClose={() => setShowModal(false)} open={showModal} >
        <BookingAction
          onSuccess={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
      <div className="flex gap-3 sm:gap-6 items-center">
        <Link to={user ? "/carts" : "/login"}>
          <IconButton>
            <Badge color='danger' variant='solid' size='sm' badgeInset="-10%">
              <MdOutlineLocalGroceryStore className='size-5 sm:size-6 text-gray' />
            </Badge>
          </IconButton>
        </Link>
        <Link to={"reservation"}>
          <IconButton variant={`${location.pathname === "/reservation" ? "solid" : "plain"}`} color={`${location.pathname === "/reservation" ? "primary" : "neutral"}`}>
            <Badge color='danger' variant='solid' size='sm' badgeInset="-10%">
              <MdOutlineTableBar className={`size-5 sm:size-6 ${location.pathname === "/reservation" ? "text-white" : "text-gray"}`} />
            </Badge>
          </IconButton>
        </Link>
        {user
          ? (
            <>
              <button
                className="hidden py-2 px-3 rounded-lg hover:bg-zinc-100 lg:block font-semibold cursor-pointer"
                onClick={toggleDrawer(true)}
              >
                <span className="text-primary">Hello,</span>
                {user.name}
              </button>
              <div className="lg:hidden">
                <Avatar
                  onClick={toggleDrawer(true)}
                  alt="Remy Sharp"
                  src={`${user.photo !== null
                    ? user.photo
                    : "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png"}`
                  }
                />
              </div>
            </>
          )
          : <Link to={"/login"}><Button variant="outlined" color='neutral' >Sign in</Button></Link>
        }
      </div>
    </>
  )
}