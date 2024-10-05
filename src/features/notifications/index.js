import { useEffect, useState } from "react"
import { getCall } from "../../app/axiosConfig"
import CustomOverlay from "../../containers/CustomOverlay"
import moment from "moment"
import ReactPaginate from "react-paginate"
import { useNavigate } from "react-router-dom"
import BellIcon from '@heroicons/react/24/outline/BellIcon'

const Notification = () => {
    const navigate = useNavigate()
    const [notificationData, setNotificationData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [totalJobs, setTotalJobs] = useState(""); ////pagination 
    const [totalPages, setTotalPages] = useState(""); ////pagination 
    const PER_PAGE = 10;  ////pagination
    const pageCount = totalPages;  ////pagination
    const [currentPage, setCurrentPage] = useState(""); ////pagination 
    const handlePageClick = ({ selected }) => { setCurrentPage(selected); }; ////pagination
    useEffect(() => {
        // fetch notification data
        getNotification()
    }, [currentPage])

    const getNotification = async () => {

        setIsLoading(true)
        // fetch notification data
        try {
            const response = await getCall('/profile/notifications', { limit: PER_PAGE, page: (currentPage + 1) })
            const { data, status } = response
            console.log("response", data)

            if (status === 200) {
                setNotificationData(data.notifications)
                setTotalJobs(data.totalNotifications)
                setTotalPages(data.totalPages)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }

    }
    let count = notificationData?.length
    const ArrowRight = () => {
        return (
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.00224 5.64428C6.90021 5.50966 6.85201 5.4274 6.78628 5.36196C5.12178 3.69613 3.45416 2.03342 1.79092 0.366338C1.47667 0.0509956 1.11673 -0.0805011 0.686678 0.0597204C0.0181257 0.278466 -0.215993 1.09424 0.225953 1.64204C0.279787 1.70873 0.342386 1.76793 0.403107 1.82838C2.32926 3.75035 4.25605 5.67294 6.18283 7.59429C6.72368 8.13399 7.2758 8.13523 7.81477 7.59803C9.75282 5.66547 11.6896 3.73103 13.6289 1.80034C13.8737 1.55666 14.0258 1.28432 13.9964 0.929718C13.9638 0.537097 13.766 0.253538 13.4111 0.0946206C13.0468 -0.0686596 12.695 -0.0175567 12.377 0.224248C12.2968 0.285322 12.2273 0.36073 12.156 0.432399C10.5115 2.07455 8.86768 3.7167 7.22509 5.36009C7.15936 5.42553 7.10929 5.50655 7.00162 5.64428L7.00224 5.64428Z" fill="#919191" />
            </svg>
        )
    }
    return (
        <div className="card bg-white rounded-[8px]">
            <CustomOverlay isLoading={isLoading} />
            <div className="card-body py-[12px] px-0">
                <div className="pl-[18px] pr-[40px]">
                    <div className="flex items-center justify-between">
                        <h5 className="font-bold text-[18px] text-[#1E1E1E]">Notification</h5>
                    </div>
                    <div className="my-[15px]">
                        {/* <label className="bg-[#EAECF0] text-[14px] font-normal text-[#1E1E1E] rounded-[20px] py-[2px] px-[11px]">{`${count} Unread`}</label> */}
                    </div>
                </div>

                <div className=" pl-[18px] pr-[40px]">
                    {notificationData?.length > 0 && notificationData.map((item) => {
                        return (
                            <div className="cursor-pointer notification-card flex items-center gap-[15px] rounded-[15px] p-[10px] border border-[#d8d8d8] mb-8"
                                onClick={() => { navigate(`/seeker/job-listing`) }}
                            >
                            <div className="min-w-[35px] [w-[35] h-[35px] rounded-full -bg-[#E5EBFE] bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url(${item?.employerPhoto ? item?.employerPhoto : '/assets/images/notification.png'})`,}} ></div>

                            {/* <BellIcon className="h-6 w-6" /> */}
                                <div className="min-w-[150px] max-w-[250px]">
                                    <h5 className="font-bold text-[15px] mb-[2px]">{item?.businessName || ""}</h5>
                                    <p className="text-[10px] text-[#2E2D46] m-0">{moment(item?.date).format('YYYY-MM-DD HH:mm:ss') || ""}</p>
                                </div>
                                <p className="text-[15px] m-0 text-[#1E1E1E]">{item?.message || ""}</p>
                                <div>
                                    {/* <span className="w-2 h-2 flex rounded-full bg-primary"></span> */}
                                </div>
                            </div>)
                    })}
                    {
                        <div className="pagination-wrapper scrollnone flex flex-row items-center justify-between mt-6  w-[100%]">
                            {notificationData && notificationData?.length > 0 && <>
                                <div>
                                    <span className='text-[15px]'>
                                        Showing {currentPage * PER_PAGE + 1} to {Math.min((currentPage + 1) * PER_PAGE, totalJobs)} of {totalJobs} entries
                                    </span>
                                </div>
                                <div className="react-pagination">
                                    <ReactPaginate
                                        previousLabel={<ArrowRight />}
                                        nextLabel={<ArrowRight />}
                                        pageCount={pageCount}
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={2}
                                        marginPagesDisplayed={1}
                                        forcePage={currentPage}
                                    />
                                </div>
                            </>}
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Notification