import { Button, IconButton, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import Oops from "/assets/images/oops.png"

export default function CardUserNotLogin({ onClose }) {
    return <div className="text-center">
        <IconButton sx={{ position: "absolute", top: 10, right: 10 }} onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
        </IconButton>
        <img src={Oops} alt="oops" />
        <Typography level="" sx={{ fontWeight: "bold" }}>Ooops, you are not logged in</Typography>
        <Typography level="" sx={{ mb: 5 }}>Please login to continue</Typography>
        <Link to={"/login"}><Button  fullWidth variant="solid">Login</Button></Link>
        {/* <Typography level="body-md" textColor={"neutral.500"}>or</Typography>
        <Link to={"/register"}><Button fullWidth variant="outlined">Register</Button></Link> */}
    </div>;
}