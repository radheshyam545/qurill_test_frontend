import { themeChange } from "theme-change";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import { openRightDrawer } from "../features/common/rightDrawerSlice";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";

// import { NavLink, Routes, Link, useLocation } from 'react-router-dom'
import { getCountryList } from "../app/commonFunction";
import { messaging } from "../app/firebaseConfig";
import { delCall } from "../app/axiosConfig";
import DeleteUser from "../features/jobSearch/DeleteUser";

function Header() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { noOfNotifications, pageTitle } = useSelector((state) => state.header);
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme")
  );
  const [profileStatusCheck, setProfileStatusCheck] = useState(false);
  const [disqualifierModal, setDisqualifierModal] = useState(false);
  const [disqualifierData, setDisqualifierData] = useState([]);
  useEffect(() => {
    const list = getCountryList();
  }, []);
  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
    // 👆 false parameter is required for react project
  }, []);

  // Opening right sidebar for notification
  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: "Notifications",
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      })
    );
  };

  const hendleTosubmit = async () => {
    setProfileStatusCheck(false);
    setDisqualifierModal(false);
    const responce = await postCall("/profile/delete", {});

    console.log(responce);

    if (responce?.status == 200) {
      localStorage.clear();
      window.location.href = "/";
    }
  };
  const cencelmd = async () => {
    setProfileStatusCheck(false);
    setDisqualifierModal(false);
  };

  function logoutUser() {
    requestNotificationPermission();
    localStorage.clear();
    window.location.href = "/";
  }

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        // Get the token
        const currentToken = await getToken(messaging, {
          vapidKey: process.env.REACT_APP_VAPID_KEY,
        });

        if (currentToken) {
          await delCall(`/employers/push-notification-token/${currentToken}`);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      } else {
        console.log("Unable to get permission to notify.");
      }
    } catch (e) {
      console.log("Error =>", e);
    }
  };

  return (
    // navbar fixed  flex-none justify-between bg-base-300  z-10 shadow-md

    <>
      <div className={disqualifierModal ? "" : `hidden`}>
        <DeleteUser
          profileStatusCheck={profileStatusCheck}
          disqualifierModal={disqualifierModal}
          setDisqualifierModal={hendleTosubmit}
          cencelmd={cencelmd}
          disqualifierData={disqualifierData}
        />
      </div>
      <div className="navbar justify-between sticky top-0 bg-base-100 z-10 py-3 ">
        {/* <div className="text-center">
                    <span className="px-[16px] py-[7px] rounded-[8px] bg-[#1F1E2C] text-[#fff] cursor-pointer">Porfile Preview</span>
                </div>
                <div className="text-center">
                    <span className="px-[16px] py-[7px] rounded-[8px] bg-[#1F1E2C] text-[#fff] cursor-pointer">Porfile Preview</span>
                </div> */}

        {/* Menu toogle for mobile view or small screen */}
        <div className="flex justify-start flex-1">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden flex justify-center items-center"
          >
            <Bars3Icon className="hamburger h-5 inline-block w-5" />
          </label>
          {/* <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1> */}
        </div>
        <div className="text-center mr-5">
          {/* <span className="header-preview-btn  text-[15px] px-[16px] py-[7px] rounded-[8px] bg-[#ffcb05] text-[#000] cursor-pointer" onClick={()=>{navigate('/employer/profilepreview')}}>Company Profile</span> */}
        </div>

        <div className="flex-none ">
          {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
                also includes corporate and retro themes in tailwind.config file */}

          {/* <select className="select select-sm mr-4" data-choose-theme>
                    <option disabled selected>Theme</option>
                    <option value="light">Default</option>
                    <option value="dark">Dark</option>
                    <option value="corporate">Corporate</option>
                    <option value="retro">Retro</option>
                </select> */}

          {/* Light and dark theme selection toogle **/}
          {/* <label className="swap ">
                <input type="checkbox"/>
                <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "dark" ? "swap-on" : "swap-off")}/>
                <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={"fill-current w-6 h-6 "+(currentTheme === "light" ? "swap-on" : "swap-off")} />
            </label> */}

          {/* Notification icon */}
          {/* <button className="nav-bell-btn w-10 h-10 bg-[#1F1E2C] rounded-full flex items-center justify-center text-primary" onClick={() => openNotification()}>
                        <div className="indicator">
                            <BellIcon className="h-6 w-6" />
                            {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm px-1">{noOfNotifications}</span> : null}
                        </div>
                    </button> */}

          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="cursor-pointer">
              <div className="w-10 h-10 bg-[#1F1E2C] rounded-full flex items-center justify-center">
                <svg
                  width="14"
                  height="17"
                  viewBox="0 0 14 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.00371 16.9132C5.15617 16.9132 3.30863 16.9132 1.46109 16.9132C0.990574 16.9132 0.750877 16.6867 0.750877 16.2432C0.750877 15.3382 0.748904 14.4341 0.750877 13.5292C0.754822 11.3273 2.47807 9.47694 4.77048 9.21193C4.93817 9.19219 5.10685 9.17904 5.27552 9.17904C6.43356 9.17622 7.59161 9.1734 8.74965 9.17904C10.9957 9.18843 12.9567 10.8697 13.2092 13.0001C13.2319 13.1899 13.2447 13.3825 13.2457 13.5743C13.2496 14.4792 13.2486 15.3833 13.2467 16.2883C13.2467 16.6707 12.9912 16.9132 12.5868 16.9132C10.7264 16.9132 8.86506 16.9132 7.00469 16.9132H7.00371Z"
                    fill="#FFCB05"
                  />
                  <path
                    d="M11.3705 4.42251C11.3695 6.72866 9.41347 8.58279 6.98395 8.58091C4.5643 8.57903 2.62108 6.71456 2.62305 4.39807C2.62699 2.09568 4.586 0.246247 7.01946 0.250006C9.42827 0.253765 11.3715 2.11729 11.3705 4.42251Z"
                    fill="#FFCB05"
                  />
                </svg>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="justify-between">
                <Link to={"/employer/setting-profile"}>
                  Profile Settings
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>

              {/* <li className="justify-between">
                <a
                  href={"#"}
                  onClick={() => {
                    setProfileStatusCheck(true);
                    setDisqualifierModal(true);
                  }}
                >
                  Delete Account
                   
                </a>
              </li> */}
              {/* <li className=''><Link to={'/app/settings-billing'}>Bill History</Link></li> */}
              <div className="divider mt-0 mb-0"></div>
              <li>
                <a onClick={logoutUser}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
