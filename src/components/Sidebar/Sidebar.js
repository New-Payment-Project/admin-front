import React from "react";
import { BiHomeAlt2, BiDollarCircle } from "react-icons/bi";
import { RiFileList3Line } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import AvatarLogo from "../../assets/Avatar.png";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("password");
    localStorage.removeItem("login");
    navigate("/login");
  };

  const buttonStyle =
    "flex items-center gap-[12px] text-start px-[12px] py-[16px] focus:bg-gradient-to-r from-[#0179FE] to-[#4893FF] focus:text-white rounded-[6px] transition duration-300 ease-in-out hover:bg-blue-200 hover:text-blue-900";
  return (
    <div className="drawer lg:drawer-open z-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
  <label
    htmlFor="my-drawer-2"
    aria-label="close sidebar"
    className="drawer-overlay"
  ></label>
  <ul className="menu bg-base-200 text-base-content min-h-full w-[280px] max-w-[280px] p-4 flex flex-col items-center justify-between" style={{ userSelect: 'none' }}>
    <div>
      <div className="flex items-center justify-start gap-[1px]">
        <img src="" alt="logo" className="w-[33px]" />
        <p className="text-[18px] font-bold">Company Name</p>
      </div>
      <div className="w-full max-w-sm min-w-[200px] my-[25px]">
        <div className="relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="w-full flex flex-col font-semibold leading-[24px] text-[16px]">
        <Link to={"/home"} className={`${buttonStyle}`}>
          <BiHomeAlt2 className="text-[24px]" /> Home
        </Link>
        <Link to={"/banks"} className={`${buttonStyle}`}>
          <BiDollarCircle className="text-[24px]" /> My Banks
        </Link>
        <Link to={"/transaction-history"} className={`${buttonStyle}`}>
          <RiFileList3Line className="text-[24px]" />
          Transaction History
        </Link>
      </div>
    </div>
    <div className="flex items-center justify-start gap-[22px]">
      <img src={AvatarLogo} alt="user-logo" className="w-[40px]" />
      <div className="flex flex-col">
        <p className="text-[14px] font-semibold">Username</p>
        <p className="text-[14px]">user@gmail.com</p>
      </div>
      <button
        onClick={Logout}
        className="flex items-center justify-end w-full"
      >
        <HiOutlineLogout className="text-[25px]" />
      </button>
    </div>
  </ul>
</div>
    </div>
  );
};

export default Sidebar;
