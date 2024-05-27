import * as React from 'react';
import { Link } from "react-router-dom"
import NavLink from "../Elements/Link/NavLink"
import Logo from "../Elements/Logo/Logo"
import { Button } from "@material-tailwind/react"
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
import { logout } from '../../services/UserService';
import { Badge } from '@mui/joy';
import { getCartItem } from '../../services/CartService';

function NavBar({ children, navLink = true }) {
    const user = JSON.parse(localStorage.getItem("user"))
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const toggleDrawer = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(inOpen);
    };

    // React.useEffect(() => {
    //     async function fetchData() {
    //         const controller = new AbortController();
    //         const response = await getCartItem(controller);

    //         const totalQuantity = response.data.reduce((total, cart) => total + cart.quantity, 0);

    //         setTotalQuantity(totalQuantity)
    //     }
    //     fetchData();
    // }, []);

    const handleLogout = async () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        window.location.href = "/"

        const response = await logout();
        console.info("Logout " + response)
    }
    return (
        <>
            <nav className="container py-6 flex items-center justify-between">
                <Logo home={"/"} />
                {
                    navLink && <NavLink menu="/menus" events="/events" about="/about" contacts="/contact" />
                }

                <div className="flex gap-12 items-center">
                    {children}
                    {user
                        ? <p className="font-semibold cursor-pointer" onClick={toggleDrawer(true)}><span className="text-primary">Hello,</span> {user.name}</p>
                        : <Link to={"/login"}><Button variant="outlined" color="deep-orange">Sign in</Button></Link>
                    }

                </div>
            </nav>

            <Drawer anchor='right' size='sm' open={open} onClose={toggleDrawer(false)}>
                <Box
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {/* {['Order', 'Starred', 'Send email', 'Drafts'].map((text) => (
                            <ListItem key={text}>
                                <ListItemButton>{text}</ListItemButton>
                            </ListItem>
                        ))} */}
                        <Link to={"/transactions"}>
                            <ListItem >
                                <ListItemButton>Transaction</ListItemButton>
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <List>
                        {/* {['All mail', 'Trash', 'Spam'].map((text) => (
                            <ListItem key={text}>
                                <ListItemButton>{text}</ListItemButton>
                            </ListItem>
                        ))} */}
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
                        <Button color="red" onClick={handleLogout}>
                            Logout
                        </Button>
                        <Button variant="text" color="black" onClick={() => setOpenDialog(false)}>
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </>
    )
}

export default NavBar