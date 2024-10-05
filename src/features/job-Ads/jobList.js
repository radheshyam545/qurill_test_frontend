import React, { useEffect, useState } from 'react'
import TableRow from './tableRow';
import { getCall } from '../../app/axiosConfig';
import ReactPaginate from "react-paginate";
import CustomOverlay from '../../containers/CustomOverlay';

function JobList({ setJobs, jobs, filter, setTmp, setFilter, clearLoading, applyFilter, setApplyFilter, setModal, setViewPost, currentPage, setCurrentPage }) {

    const [openIndex, setOpenIndex] = useState(false)
    const [open, setOpen] = useState(false)
    const [totalJobs, setTotalJobs] = useState(""); ////pagination 
    const [totalPages, setTotalPages] = useState(""); ////pagination 
    const [isLoadingData, setIsLoadingData] = useState(false);
    const PER_PAGE = 10;  ////pagination
    const pageCount = totalPages;  ////pagination
    useEffect(() => { if (applyFilter) { getJobData(); setApplyFilter(false) } }, [applyFilter]);
    useEffect(() => { getJobData(); }, [currentPage]); ////pagination
    const handlePageClick = ({ selected }) => { setCurrentPage(selected); }; ////pagination
    const getJobData = async () => {
        try {
            setIsLoadingData(true);
            const response = await getCall(`/jobs`, { ...filterObjectWithValue(filter), limit: PER_PAGE, page: (currentPage + 1) });
            setTotalJobs(response.data.totalJobs);
            setTotalPages(response.data.totalPages);
            setJobs(response.data);
            setIsLoadingData(false);
            // setCurrentPage(temp);
        } catch (error) {
            setIsLoadingData(false);
            console.error('Error fetching job data:', error);
        }
    };
    const ArrowRight = () => {
        return (
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.00224 5.64428C6.90021 5.50966 6.85201 5.4274 6.78628 5.36196C5.12178 3.69613 3.45416 2.03342 1.79092 0.366338C1.47667 0.0509956 1.11673 -0.0805011 0.686678 0.0597204C0.0181257 0.278466 -0.215993 1.09424 0.225953 1.64204C0.279787 1.70873 0.342386 1.76793 0.403107 1.82838C2.32926 3.75035 4.25605 5.67294 6.18283 7.59429C6.72368 8.13399 7.2758 8.13523 7.81477 7.59803C9.75282 5.66547 11.6896 3.73103 13.6289 1.80034C13.8737 1.55666 14.0258 1.28432 13.9964 0.929718C13.9638 0.537097 13.766 0.253538 13.4111 0.0946206C13.0468 -0.0686596 12.695 -0.0175567 12.377 0.224248C12.2968 0.285322 12.2273 0.36073 12.156 0.432399C10.5115 2.07455 8.86768 3.7167 7.22509 5.36009C7.15936 5.42553 7.10929 5.50655 7.00162 5.64428L7.00224 5.64428Z" fill="#919191" />
            </svg>
        )
    }
    const filterObjectWithValue = (obj) => {
        let filteredObj = {};
        for (let key in obj) {
            if (obj[key]) {
                filteredObj[key] = obj[key];
            }
        }
        return filteredObj
    }

    return (
        <div className=" rounded-[10px]  " >
            <div className="card -bg-white job-ads px-[40px] w-[100%] p-2 bg-[#FAFAFA] rounded-[10px]">
                <div className="job-search-table-box scrollnone  ">
                    {/* {isLoadingData && || clearLoading && <CustomOverlay isLoading={true} />} */}
                    {isLoadingData || clearLoading ? <CustomOverlay isLoading={true} /> : null}
                    {
                        jobs && jobs?.length > 0 ?
                        <div className=' scrollnone relative'>
                            <table className="table w-full text-[12px] " >
                                <thead>
                                    <tr className="border-0">
                                        <th className="font-bold text-[#000]">
                                            {/* JOB TITLE */}
                                        </th>
                                        <th className="font-bold text-[#000]">
                                            {/* APPLICANTS */}
                                        </th>
                                        <th className="font-bold text-[#000]">
                                            {/* VIEWS */}
                                        </th>
                                        {/* <th className="font-bold text-[center] text-[#000]">
                                            STATUS
                                        </th> */}
                                        <th className="font-[500] -bg-[red] text-center bg-[#E2E2E2]  text-[15px]  text-[#000]">
                                            Applicants
                                        </th>
                                        <th className="font-[500] text-center bg-[#E2E2E2]  text-[15px]  text-[#000]">
                                            New
                                        </th>
                                        <th className="font-[500] text-center  bg-[#E2E2E2] text-[15px] text-[#000]">
                                            Shortlisted
                                        </th>
                                        <th className="font-[500] text-center  bg-[#E2E2E2] text-[15px]  text-[#000]">
                                            Screened
                                        </th>
                                        <th className="font-[500] text-center bg-[#E2E2E2]  text-[15px]  text-[#000]">
                                            Interviewed
                                        </th>
                                        <th className="font-[500] text-center bg-[#E2E2E2] text-[15px]  text-[#000]">
                                            Hired
                                        </th>
                                    </tr>
                                    <tr className="border-0 ">
                                        <th colSpan={8} className="bg-[#FAFAFA] h-[12px] p-0"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {jobs && jobs.length > 0 ? (
                                        // If filter is defined and has length greater than 0
                                        jobs?.map((item, index) => (
                                            <TableRow
                                                key={index} // Ensure each TableRow has a unique key prop
                                                jobs={jobs}
                                                fetchData={getJobData}
                                                setFilter={setFilter}
                                                setTmp={setTmp}
                                                Item={item}
                                                index={index}
                                                setOpen={setOpen}
                                                open={open}
                                                openIndex={openIndex}
                                                setOpenIndex={setOpenIndex}
                                                setViewPost={setViewPost}
                                                setModal={setModal}
                                            />
                                        ))
                                    ) : (
                                        <CustomOverlay isLoading={false} />
                                    )}

                                </tbody>


                            </table>
                            </div>
                            : <div className="job-listing-table-box  flex w-full flex justify-center">
                                <span className=''>No Record Found</span>
                            </div>

                    }
                    {
                        <div className="pagination-wrapper scrollnone flex flex-row items-center justify-between mt-6  w-[100%]">
                            {jobs && jobs?.length > 0 && <>
                                <div>
                                    <span className='text-[15px]'>
                                        Showing {currentPage * PER_PAGE + 1} to {Math.min((currentPage + 1) * PER_PAGE, totalJobs)} of {totalJobs} entries
                                    </span>
                                </div>
                                <div className="react-pagination">
                                    <ReactPaginate
                                        previousLabel={<ArrowRight /> }
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

export default JobList