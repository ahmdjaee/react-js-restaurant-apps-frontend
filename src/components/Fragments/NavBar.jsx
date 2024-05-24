import * as React from 'react';
import { Link } from "react-router-dom"
import NavLink from "../Elements/Link/NavLink"
import Logo from "../Elements/Logo/Logo"
import { Button } from "@material-tailwind/react"
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';

function NavBar() {
    const user = JSON.parse(localStorage.getItem("user"))
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (inOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(inOpen);
    };
    return (
        <>
            <nav className="container py-6 flex items-center justify-between">
                <Logo home={"/"} />
                <NavLink menu="/menus" events="/events" about="/about" contacts="/contact" />
                <div className="flex gap-10 items-center">
                    <Link to={"/carts"}><i className="fa-solid fa-shopping-cart fa-xl" ></i></Link>
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
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
                            <ListItem key={text}>
                                <ListItemButton>{text}</ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text) => (
                            <ListItem key={text}>
                                <ListItemButton>{text}</ListItemButton>
                            </ListItem>
                        ))}
                        <ListItem>
                                <ListItemButton>Logout</ListItemButton>
                            </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default NavBar