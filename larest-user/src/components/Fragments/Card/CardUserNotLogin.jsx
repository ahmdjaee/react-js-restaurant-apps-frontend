import { Button, Typography } from "@mui/joy";
import { Link } from "react-router-dom";
import Oops from "/assets/images/oops.png";

export default function CardUserNotLogin() {
  return (
    <div className="h-full flex">
      <div className="text-center m-auto ">
        <img className="m-auto" src={Oops} alt="oops" />
        <Typography level="" sx={{ fontWeight: "bold" }}>Ooops, you are not logged in</Typography>
        <Typography level="" sx={{ mb: 5 }}>Please login to continue</Typography>
        <Link to={"/login"}>
          <Button fullWidth variant="solid">Login</Button>
        </Link>
      </div>
    </div>
  );
}