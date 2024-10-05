import React from 'react';

function JobTypeComponent({ tab, setTab, postJobData, setPostJobData }) {
  const handleJobTypeClick = (jobType) => {
    // If the jobType is already selected, unselect it
    if (postJobData.type === jobType) {
      setPostJobData(prevData => ({
        ...prevData,
        type: ""
      }));
    } else {
      // Otherwise, select the new jobType
      setPostJobData(prevData => ({
        ...prevData,
        type: jobType
      }));
    }
  };

  const closeTab = () => {
    setTab('0');
  };

  return (
    <div className={`h-[100vh] z-[999] flex items-center justify-center w-[100%] fixed top-0 left-0 overlay-color`}>
      <div className='h-[300px] w-[700px] bg-white flex flex-col justify-between'>
        <div className='flex items-center justify-between h-[40px] px-[30px] py-[30px] border-b'>
          <p className='font-bold'>Edit the job post</p>
          <img onClick={closeTab} className='cursor-pointer h-[15px]' src="/assets/images/employer-images/jobpostoverlaytabcross.svg" alt="" />
        </div>
        <div className='px-[20px]'>
          <p className='font-bold'>Job type</p>
          <div className='flex gap-[10px] flex-wrap mt-[5px] mb-[50px]'>
            <button
              onClick={() => handleJobTypeClick('full_time')}
              className={` ${postJobData.type === 'full_time' ? 'jobtypeActive' : ''} px-[15px] py-[5px] rounded-[18px] font-semibold bg-[#F2F2F2] border border-[#B3B3B3] text-[18px]`}
            >
              Full-time
            </button>
            <button
              onClick={() => handleJobTypeClick('part_time')}
              className={` ${postJobData.type === 'part_time' ? 'jobtypeActive' : ''} px-[15px] py-[5px] rounded-[18px] font-semibold bg-[#F2F2F2] border border-[#B3B3B3] text-[18px]`}
            >
              Part-time
            </button>
            <button
              onClick={() => handleJobTypeClick('temporary')}
              className={` ${postJobData.type === 'temporary' ? 'jobtypeActive' : ''} px-[15px] py-[5px] rounded-[18px] font-semibold bg-[#F2F2F2] border border-[#B3B3B3] text-[18px]`}
            >
              Temporary
            </button>
            <button
              onClick={() => handleJobTypeClick('internship')}
              className={` ${postJobData.type === 'internship' ? 'jobtypeActive' : ''} px-[15px] py-[5px] rounded-[18px] font-semibold bg-[#F2F2F2] border border-[#B3B3B3] text-[18px]`}
            >
              Internship
            </button>
          </div>
        </div>
        <div className='h-[60px] w-[100%] border-t px-[30px] py-[10px]'>
          <button className='px-[10px] py-[5px] rounded-[5px] bg-[#FFCB05] font-bold float-right' onClick={closeTab}>Done</button>
        </div>
      </div>
    </div>
  );
}

export default JobTypeComponent;
