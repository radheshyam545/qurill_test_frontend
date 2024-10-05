import Header from "./Header"
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import routes from '../employerRoutes'
import { Suspense, lazy, useState } from 'react'
import SuspenseContent from "./SuspenseContent"
import { useSelector } from 'react-redux'
import { useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { customStylesSelect } from "../components/ReactSelectStyle"
import { options } from "../components/EChart/Doughnut/chartOptions"
import JobPostOverlay from "../employerComponents/JobPostComponents/JobPostOverlay"
import CloneTheJobComp from "../employerComponents/CloneTheJobComponent/CloneTheJobComp"
import PreviewModal from "../employerComponents/Modal/previewModal"
import { varificationRoute } from "./Layout"


const Page404 = lazy(() => import('../pages/protected/404'))

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#F5CB16',
        border: '5px',
        borderRadius: '8px',
        boxShadow: 'none',
        padding: '0px 4px',
        '&:hover': {
            backgroundColor: '#F8B501'
        }
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: '#000',
        fontWeight: 'semibold'
        //font size

    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: '#000',
        fontWeight: 'semibold'
    }),
    dropdownIndicator: (provided, state) => ({
        display: 'none'
    }),
    indicatorSeparator: (provided, state) => ({
        display: 'none'
    }),
    menu: (provided, state) => ({
        ...provided,
        width: 'auto', // You can set this to your desired width
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
    }),
    menuList: (provided, state) => ({
        ...provided,
        padding: 0,
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#F8B501' : 'white',
        color: state.isSelected ? 'white' : '#000',
        fontSize: '12px', // Adjust the font size here
        fontWeight: 'normal',
        '&:hover': {
            backgroundColor: '#E2E2E2',
            color: '#000'
        },
        width: '100%',
        boxSizing: 'border-box'
    })
};



function PageContent() {
    const mainContentRef = useRef(null);
    const { pageTitle } = useSelector(state => state.header)
    const navigate = useNavigate()
    const location = useLocation();
    const [tab, setTab] = useState(true)
    const [modal, setModal] = useState(false)

    // Scroll back to top on new page load
    const handleSelectChange = (selectedOption) => {
        if (selectedOption.value === "1") {
            // Perform your desired action here
            navigate("/employer/JobPost?"); // Example action
        } else {
            setTab('1')
        }
    }
    useEffect(() => {
        mainContentRef.current.scroll({
            top: 0,
            behavior: "smooth"
        });
    }, [pageTitle])


    return (
        <div className="drawer-content flex flex-col ">
            <div className={`${tab === '1' ? '' : 'employer-overlay-none'}`}>
                {/* <JobPostOverlay  /> */}
                <CloneTheJobComp heading={'Job title'} tab={tab} setTab={setTab} handleSelectChange={handleSelectChange}/>
            </div>
            {!varificationRoute.includes(location.pathname) && <Header />}
            <main className={!varificationRoute.includes(location.pathname) && "scrollnone main-center flex-1 overflow-y-auto m-[20px]"} ref={mainContentRef}>
                {!varificationRoute.includes(location.pathname) &&
                    <div className="p-3 flex justify-end w-full ">
                        {
                            location.pathname === '/employer/JobPost?' ?
                                <button className="inline-flex py-[5px]  px-4 rounded-[10px] font-semibold bg-[#FFCB05] hover:bg-[#F8B501] transition-colors duration-100"
                                    onClick={() => { setModal(true) }}
                                >Preview</button>
                                :
                                location.pathname === '/employer/job-ads' &&
                                <Select
                                    styles={customStyles}
                                    className="inline-flex text-[15px] py-[5px] px-4 rounded-xl font-semibold transition-colors duration-100"
                                    classNamePrefix="All"
                                    value={''}
                                    options={[
                                        { value: "0", label: "Clone a job" },
                                        { value: "1", label: "Create a new job" }
                                    ]}
                                    isSearchable={false}
                                    placeholder="Post a Job"
                                    onChange={handleSelectChange}
                                />

                        }
                    </div>}

                <Suspense fallback={<SuspenseContent />}>
                    <Routes>
                        {
                            routes.map((route, key) => {
                                return (
                                    <Route
                                        key={key}
                                        exact={true}
                                        path={`${route.path}`}
                                        element={<route.component />}
                                    />
                                )
                            })
                        }

                        {/* Redirecting unknown url to 404 page */}
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </Suspense>
                {!varificationRoute.includes(location.pathname) && <div className="h-5"></div>}
            </main>
            {/* <PreviewModal jobs={[{}]} modal={modal} setModal={setModal} /> */}
        </div>
    )
}


export default PageContent
