import routes from '../employerRoutes/sidebar'
import { NavLink, Routes, Link, useLocation } from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import DeleteUser from '../features/jobSearch/DeleteUser';
import { postCall } from '../app/axiosConfig';

function LeftSidebar() {
    const location = useLocation();

    const dispatch = useDispatch()
    const [profileStatusCheck, setProfileStatusCheck] = useState(false);
    const [disqualifierModal, setDisqualifierModal] = useState(false);
    const [disqualifierData, setDisqualifierData] = useState([]);



    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click()
    }
    //   px-[20px]


    // const hendleTosubmit = async() => {
    //         setProfileStatusCheck(false);
    //         setDisqualifierModal(false);
    //         const responce = await postCall("/profile/delete", {});
        
    //         console.log(responce);
        
    //         if (responce?.status == 200) {
    //           localStorage.clear();
    //           window.location.href = "/";
    //         }
    // }

    const hendleTosubmit = async () => {
        try {
          setProfileStatusCheck(false);
          setDisqualifierModal(false);
          const response = await postCall("/profile/delete", {});
    
          console.log(response);
    
          if (response?.status == 200) {
            localStorage.clear();
            window.location.href = "/";
          }
        } catch (error) {
          toast?.error(error?.response?.data?.message);
        }
      };

    const cencelmd = async () => {
        setProfileStatusCheck(false);
        setDisqualifierModal(false);
      };
    
      


    return (
        <>
        <div className="drawer-side  z-30 ">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu px-[20px]  py-[26px]  lg:w-[252px] w-[300px] bg-base-100 min-h-full   text-base-content">
                <button className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
                    <XMarkIcon className="h-5 inline-block w-5" />
                </button>

                <li className="mb-[70px] font-semibold text-xl">

                    <Link className='lg:justify-center lg:px-0 px-4 site-logo p-0' to={'/employer/dashboard'}><span className="rounded-[10px] w-10 bg-primary h-10"></span>Qruil</Link> </li>
                {
                    routes.map((route, k) => {
                        return (
                            <li className="menu-link bg-[#FFFFFF]" key={k}>

                                {

                                    route.submenu ?
                                        // <SidebarSubmenu {...route} /> 
                                        ''
                                        :
                                         route.name=="Delete Account" ? 
                                         (
                                            <button
                                                onClick={()=>{
                                                    setProfileStatusCheck(true);
                                                    setDisqualifierModal(true);}}
                                                className={`sidebar-button-p-m ${location.pathname === route.path ? 'bg-[#FFCB05]' : 'hover:bg-[#FFF7EA]'}`}
                                            >
                                                <span className={`h-[100%] rounded-[10px] bg-[#FFCB05] text-[black] sidebar-button-icon-p-m`}>
                                                    {route.icon}
                                                </span>
                                                <span className={`se font-semibold text-[15px] text-[black]`}>
                                                    {route.name}
                                                </span>
                                            </button>
                                        
                                         
                                          ) : (<NavLink
                                            end
                                            to={route.path}
                                            className={({ isActive }) => ` ${isActive ? 'bg-[#FFCB05] focus:border-[] focus:bg-[#FFCB05]  rounded-[12px] sidebar-button-p-m   ' : ' sidebar-button-p-m font-normal hover:bg-[#FFF7EA]'}`} >
                                            <span className={` h-[100%] rounded-[10px] ${location.pathname === route.path ? 'bg-[black] text-[#FFCB05] sidebar-button-icon-p-m' : 'bg-[#FFCB05] text-[black] sidebar-button-icon-p-m'}`} >
                                                {route.icon}
                                            </span>
                                            {/* ${location.pathname === route.path ? '' : '' */}
                                            <span className={` se font-semibold text-[15px] ${location.pathname === route.path ? 'text-[black]' : 'text-[black]'}`}>
                                                {route.name}
                                            </span>
                                            {/* {
                                            location.pathname == route.path ? (<span className="absolute mt-1 mb-1 inset-y-0 left-0 w-[2px] rounded-tr-md rounded-br-md bg-primary "
                                                aria-hidden="true"></span>) : null
                                    } */}
                                        </NavLink>)
                                }

                            </li>
                        )
                    })
                }

            </ul>
        </div>
        <div className={disqualifierModal ? "" : `hidden`}>
        <DeleteUser
          profileStatusCheck={profileStatusCheck}
          disqualifierModal={disqualifierModal}
          setDisqualifierModal={hendleTosubmit}
          cencelmd={cencelmd}
          disqualifierData={disqualifierData}
        />
      </div>
        </>
    )
}

export default LeftSidebar