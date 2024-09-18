import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import TopProgressBar from "../Elements/Indicator/TopProgressBar";
import NavBar from "../Fragments/Navigation/NavBar";
import Sidebar from "../Fragments/Sidebar/Sidebar";

function Main() {
  const { token } = useStateContext();

  if (token === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex overflow-hidden">
      <TopProgressBar />
      <Sidebar />
      <div className="bg-gray-50 flex-1 block overflow-y-auto overflow-x-clip">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
