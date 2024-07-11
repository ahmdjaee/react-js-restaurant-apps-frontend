import * as React from 'react';
import { Link } from "react-router-dom"
import NavLink from "../../Elements/Link/NavLink"
import Logo from "../../Elements/Logo/Logo"
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { current, logout } from '../../../services/UserService';
import { Avatar, Badge, Button } from '@mui/joy';
import { useEffect } from 'react';
import { useStateContext } from '../../../context/ContextProvider';
import BookingAction from '../Form/BookingAction';

function NavBar({ navLink = true }) {
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const { user, setUser } = useStateContext();

    useEffect(() => {
        async function getUser() {
            try {
                const response = await current();
                if (response) {
                    setUser(response)
                }
            } catch (error) {

            }
        }
        getUser();
    }, [])



    const toggleDrawer = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(inOpen);
    };

    const handleLogout = async () => {
        const response = await logout();
        if (response) {
            localStorage.clear();
            window.location.href = "/"
        }
    }
    return (
        <div className="sticky top-0 shadow-sm z-50 bg-white">
            <nav className="container px-2 sm:px-0 py-5 flex items-center justify-between ">
                <Logo home={"/"} />
                {
                    navLink && <NavLink menu="/menus" events="/events" about="/about" contacts="/contact" />
                }
                <CheckUser user={user} toggleDrawer={toggleDrawer} />

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

export default NavBar

function CheckUser({ user, toggleDrawer }) {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            <Modal onClose={() => setShowModal(false)} open={showModal} >
                <BookingAction
                    onSuccess={() => setShowModal(false)}
                    onCancel={() => setShowModal(false)}
                />
            </Modal>
            <div className="flex gap-5 sm:gap-6 items-center">
                {user
                    ? <>
                        <Button onClick={() => setShowModal(true)} size="sm" className='shadow-md shadow-slate-300 hidden lg:block' sx={{ borderRadius: '20px' }}>Book a table </Button>
                        <Link to={"/carts"}>
                            <Badge color='danger' variant='solid' size='sm' badgeInset="-10%" badgeContent={0}>
                                <i className="fa-solid fa-shopping-cart fa-xl " ></i>
                            </Badge>
                        </Link>
                        <button className="hidden py-2 px-3 rounded-lg hover:bg-zinc-100 lg:block font-semibold cursor-pointer" onClick={toggleDrawer(true)}><span className="text-primary">Hello,</span> {user.name}</button>
                        <div className="lg:hidden">
                            <Avatar onClick={toggleDrawer(true)} alt="Remy Sharp" src={`${user.photo !== null ? user.photo : "https://static-00.iconduck.com/assets.00/avatar-default-icon-2048x2048-h6w375ur.png"}`} />
                        </div>
                    </>
                    : <>
                        <Link to={"/login"}>
                            <Badge color='danger' variant='solid' size='sm' badgeInset="-10%">
                                <i className="fa-solid fa-shopping-cart fa-xl " ></i>
                            </Badge>
                        </Link>
                        <Link to={"/login"}><Button variant="outlined" >Sign in</Button></Link>
                    </>
                }
            </div>
        </>
    )
}