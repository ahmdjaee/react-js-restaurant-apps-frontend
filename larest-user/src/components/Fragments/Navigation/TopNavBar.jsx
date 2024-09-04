import FloatProgressIndicator from '@/components/Elements/Indicator/FloatProgressIndicator';
import NavLink from '@/components/Elements/Link/NavLink';
import Logo from "@/components/Elements/Logo/Logo";
import { actionLogout, resetAction, useStateContext } from '@/context/AuthContextProvider';
import { useCartContext } from '@/context/CartContextProvider';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Avatar, Badge, Button, IconButton, Snackbar } from '@mui/joy';
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
import { useState } from 'react';
import { FaPencil } from 'react-icons/fa6';
import { MdOutlineLocalGroceryStore, MdOutlineTableBar } from 'react-icons/md';
import { Link } from "react-router-dom";

function TopNavBar() {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { user, deleteTokenAndUser, state, dispatch } = useStateContext();

  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(inOpen);
  };

  const handleLogout = async () => {
    const data = await actionLogout("/users/logout", dispatch);
    if (data) {
      deleteTokenAndUser();
      setOpenDialog(false);
    }
  };

  return (
    <>
      <FloatProgressIndicator loading={state.loading}/>
      <header className="sm:shadow-sm sticky top-0 z-50 top-bar-height bg-white">
        <nav className="container px-3 sm:px-0 h-[inherit] flex items-center justify-between ">
          <Logo home={"/"} />
          <NavLink />
          <CheckUser user={user} toggleDrawer={toggleDrawer} />
        </nav >

        {/* Side Drawer */}
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
      </header >
      <Snackbar
        open={state.success || (state.failed && state.message) || false}
        color={state.success ? "success" : state.failed ? "danger" : null}
        variant="solid"
        autoHideDuration={1500}
        onClose={() => dispatch(resetAction())}
      >
        {state.message}
      </Snackbar >
    </>
  )
}

export default TopNavBar

function CheckUser({ user, toggleDrawer, }) {
  const { state } = useCartContext();
  const { list } = state;
  const sm = useMediaQuery('(min-width: 640px)');
  return (
    <div className="flex gap-3 sm:gap-6 items-center">
      <Link to={"/carts" }>
        <IconButton>
          <Badge color='danger' variant='solid' size='sm' badgeInset="-10%" badgeContent={list.data.total_quantity ?? 0}>
            <MdOutlineLocalGroceryStore className='size-5 sm:size-6 text-gray' />
          </Badge>
        </IconButton>
      </Link>
      <Link to={"reservation"}>
        <IconButton >
          {/* <Badge color='danger' variant='solid' size='sm' badgeInset="-10%"> */}
            <MdOutlineTableBar className={`size-5 sm:size-6 text-gray`} />
          {/* </Badge> */}
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
                size={sm ? "md" : "sm"}
                src={user.photo}
              />
            </div>
          </>
        )
        : <Link to={"/login"}><Button variant="outlined" color='neutral' >Sign in</Button></Link>
      }
    </div>
  )
}