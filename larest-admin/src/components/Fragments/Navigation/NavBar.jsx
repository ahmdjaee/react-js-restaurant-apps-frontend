import SearchInput from "../../Elements/Input/SearchInput";
import { BiExit } from "react-icons/bi";
import AlertDialogModal from "../Modal/AlertDialogModal";
import { useState } from "react";
import { useStateContext } from "../../../context/ContextProvider";
import { Button, IconButton } from "@mui/joy";
import axiosClient from "../../../service/axios";
import { BsMoonStarsFill } from "react-icons/bs";

function NavBar() {
  const [open, setOpen] = useState(false);
  const { search, setSearch, setToken, setUser } = useStateContext();

  const handleLogout = async () => {
    try {
      const response = await axiosClient.delete("/users/logout");
      if (response && response.status === 200) {
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div className="sticky top-0 shadow-md z-50 bg-white">
      <nav className=" px-2 sm:px-4 py-5 flex items-center justify-between ">
        <SearchInput onChange={(val) => setSearch(val)} value={search} />
        <div className="flex items-center">
          <IconButton>
            <BsMoonStarsFill className="text-yellow-600" />
          </IconButton>
          <Button variant="plain" color="warning" onClick={() => setOpen(true)}>
            <BiExit className="text-2xl me-2" />
            Logout
          </Button>
        </div>
      </nav>
      <AlertDialogModal
        open={open}
        onClose={() => setOpen(false)}
        props={{
          title: "Logout",
          content: "Are you sure you want to logout?",
          action: "Logout",
          cancel: "Cancel",
        }}
        onCancel={() => setOpen(false)}
        onAction={handleLogout}
      />
    </div>
  );
}

export default NavBar;
