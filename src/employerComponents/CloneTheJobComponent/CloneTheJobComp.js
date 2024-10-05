// import React from 'react';
import Select from "react-select";
import React, { useEffect, useState } from 'react'

import { getCall } from '../../app/axiosConfig';

import { customStylesSelect } from "../../components/ReactSelectStyle";
import CustomOverlay from "../../containers/CustomOverlay";

function CloneTheJobComp({ heading, tab, setTab ,handleSelectChange} ) {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [page,setPage]=useState("")
  useEffect(() => { getJobData();}, [handleSelectChange]);

  const getJobData = async () => {
    try {
      let allJobs = [];  // Array to store all job data

      let currentPage = 1;
      let totalPages = 1;  // Initialize totalPages to 1 initially

      while (currentPage <= totalPages) {
          const response = await getCall(`/jobs?page=${currentPage}`);
          allJobs = [...allJobs, ...response.data.jobs];  // Concatenate new jobs to existing ones
          totalPages = response.data.totalPages;  // Update totalPages from the response
          currentPage++;
      }

      setJobs(allJobs);  // Set all jobs retrieved
      setPage(totalPages);  // Set total pages

  } catch (error) {
      console.error('Error fetching job data:', error);
  }finally {
    setIsLoadingData(false)
  }
};
const jobOptions = jobs.map(job => ({
  value: job._id, 
  label: job.title
}));
const handleSelectJob = (selectedOption) => {
  setSelectedJobId(selectedOption.value)
};
  const handleClick = () => {
    // Query parameters object
    const queryParams = {
      _id: selectedJobId,
      name: 'clone'
    };

    // Building the query string
    const queryString = new URLSearchParams(queryParams).toString();
    console.log("this job id is selected option",queryString)

    // Redirecting to another component with query parameters
    window.location.href = `JobPost?${queryString}`;
  }
  

  return (
    <>
         <div className={` h-[100vh] z-[10] z-[999] flex items-center justify-center w-[100%] fixed top-[0px] left-[0px] overlay-color`}>
        <CustomOverlay isLoading={isLoadingData} />
        <div className='h-[300px] z-[50] w-[700px] bg-[white] flex flex-col justify-between'>
        <div className='flex items-center justify-between h-[40px] px-[30px] py-[30px] border-b'>
            <p className='font-bold'>Clone the job</p>
            <img onClick={()=>setTab('0')}  className='cursor-pointer h-[15px]' src="/assets/images/employer-images/jobpostoverlaytabcross.svg" alt="" />
        </div>
        <div className='grid grid-cols-1 -mt-[35px] mx-[20px]'>
        <label className='font-bold mb-[5px]' htmlFor="">{heading}</label>
        <Select
                        styles={customStylesSelect}
                        className="react-select -fontbold"
                        classNamePrefix="All"
                        options={jobOptions} 
                        isSearchable={true}
                        placeholder="Select a job"
                        onChange={handleSelectJob}
                        value={jobOptions.find(option => option.value === selectedJobId)}
                    />
        </div>
        <div className='h-[60px] -w-[100%] border-t px-[30px] py-[10px]'>
        <button onClick={handleClick} className='px-[10px] py-[5px] rounded-[5px] bg-[#FFCB05] font-[600] float-right'>Clone</button>

        </div>

        </div>
        </div>
    </>
  );
}

export default CloneTheJobComp;