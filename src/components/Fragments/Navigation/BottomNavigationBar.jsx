import { Link } from "react-router-dom";

export default function BottomNavigationBar() {
    return (
        <div className="sm:hidden sticky mt-auto bottom-0 left-0 z-50 w-full py-2 bg-white border-t border-gray-200">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                <Link to={"/"} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group">
                    <svg className="w-6 h-6 mb-1 text-gray-500  group-hover:text-primary " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    <span className="text-sm text-gray  group-hover:text-primary ">Home</span>
                </Link>
                <Link to={"/menus"} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group">
                    <svg className="w-6 h-6 mb-1 text-gray-500  group-hover:text-primary " fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true">
                        <path d="M0 192c0-35.3 28.7-64 64-64c.5 0 1.1 0 1.6 0C73 91.5 105.3 64 144 64c15 0 29 4.1 40.9 11.2C198.2 49.6 225.1 32 256 32s57.8 17.6 71.1 43.2C339 68.1 353 64 368 64c38.7 0 71 27.5 78.4 64c.5 0 1.1 0 1.6 0c35.3 0 64 28.7 64 64c0 11.7-3.1 22.6-8.6 32H8.6C3.1 214.6 0 203.7 0 192zm0 91.4C0 268.3 12.3 256 27.4 256H484.6c15.1 0 27.4 12.3 27.4 27.4c0 70.5-44.4 130.7-106.7 154.1L403.5 452c-2 16-15.6 28-31.8 28H140.2c-16.1 0-29.8-12-31.8-28l-1.8-14.4C44.4 414.1 0 353.9 0 283.4z" />
                    </svg>
                    <span className="text-sm text-gray  group-hover:text-primary ">Menu</span>
                </Link>
                <Link to={"/contact"} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group">
                    <svg className="w-6 h-6 mb-1 text-gray-500  group-hover:text-primary " fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true">
                        <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64h96v80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64z" />
                    </svg>
                    <span className="text-sm text-gray  group-hover:text-primary ">Contact</span>
                </Link>
                <Link to={"/about"} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50  group">
                    <svg className="w-6 h-6 mb-1 text-gray-500  group-hover:text-primary " fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" aria-hidden="true">
                        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                    </svg>
                    <span className="text-sm text-gray  group-hover:text-primary ">About</span>
                </Link>
            </div>
        </div>
    );
}