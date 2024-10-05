import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JobSearchFilter from "../../features/job-Ads/JobSearchFilter";
import JobList from "../../features/job-Ads/jobList";
import PreviewModal from "../../employerComponents/Modal/previewModal";

const JobSearchListing = () => {

  const [modal, setModal] = useState(false)
  const [viewPost, setViewPost] = useState("")
  const navigate = useNavigate()
  const [filter, setFilter] = useState({
    title: '',
    location: '',
    status: '',
    sort: '',
  });
  const [tmp, setTmp] = useState(true);
  const [applyFilter, setApplyFilter] = useState(false);
  const [clearLoading, setClearLoading] = useState(false);
  const [jobs, setJobs] = useState(null);
  const [open, setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <div>
      <div className="-bg-[#FFFFFF] rounded-xl ">
        <div>
          <div className="-pt-[30px] px-[40px]  flex justify-between items-center">
            <div className='flex flex-col relative '>
              <div className={` ${open ? '' : 'display-nones'} flex flex-col `}>
                <div className='py-[15px] hover:bg-[#E2E2E2] cursor-pointer border-b text-center text-[14px] font-[500] bg-[white]'>Clone a job</div>
                <div onClick={() => { navigate('/employer/JobPost') }} className='py-[15px] hover:bg-[#E2E2E2] cursor-pointer -border-b text-center text-[14px] rounded-b-[10px] font-[500] bg-[white]'>Create a new job</div>
              </div>
            </div>
          </div>
          <div><JobSearchFilter jobLocation={jobs?.locations} setFilter={setFilter} filter={filter} tmp={tmp} setClearLoading={setClearLoading} setApplyFilter={setApplyFilter} setCurrentPage={setCurrentPage} /> </div>
          <div className="-overflow-x-scroll min-h-[20px]">
            <JobList setJobs={setJobs} jobs={jobs?.jobs} setModal={setModal} setViewPost={setViewPost} filter={filter} setTmp={setTmp} setFilter={setFilter} clearLoading={clearLoading} applyFilter={applyFilter} setApplyFilter={setApplyFilter} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </div>
        </div>
      </div>

      <PreviewModal modal={modal} setModal={setModal} data={viewPost ? viewPost : ""} />
    </div>
  );
}

export default JobSearchListing;
