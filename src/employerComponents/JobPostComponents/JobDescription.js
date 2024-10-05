import React, { useEffect, useState } from 'react';

function JobDescription({ tab, setTab, postJobData, setPostJobData,submitCheck }) {
    const [type, setType] = useState(postJobData?.description?.type);
    const [responsibilities, setResponsibilities] = useState(postJobData?.description?.responsibilities);
    const [qualifications, setQualifications] = useState(postJobData?.description?.qualifications);

    useEffect(() => {
        setType(postJobData?.description?.type)
        setResponsibilities(postJobData?.description?.responsibilities)
        setQualifications(postJobData?.description?.qualifications)
    }, [postJobData])
    // {postJobData?.status != 'draft' && (postJobData?.description?.qualifications == '' || postJobData?.description?.qualifications == undefined) && submitCheck && <p className='text-[red] text-[13px]'>Description is required</p>}

    const handleDone = (e) => {
        e.preventDefault(); // Prevent the default form submission
        setPostJobData(prevData => ({
            ...prevData,
            description: {
                ...prevData.description,
                type: type,
                responsibilities: responsibilities,
                qualifications: qualifications
            }
        }));
        setTab('0');
    };

    return (
        <>
            <div className={`h-[100vh] z-[999] flex items-center justify-center w-[100%] fixed top-[0px] left-[0px] overlay-color`}>
                <div className='h-[700px] rounded-[10px] w-[700px] bg-[white] flex flex-col justify-between'>
                    <div className='flex items-center justify-between h-[40px] px-[30px] py-[30px] border-b'>
                        <p className='font-bold'>Edit the job post</p>
                        <img onClick={() => setTab('0')} className='cursor-pointer h-[15px]' src="/assets/images/employer-images/jobpostoverlaytabcross.svg" alt="" />
                    </div>
                    <form onSubmit={handleDone} className='overflow-y-scroll'>
                        <div className='px-[20px] mt-[20px]'>
                            <p className='font-bold'> Job Description</p>
                             {postJobData?.status != 'draft' && (postJobData?.description?.type == '' || postJobData?.description?.type == undefined) && submitCheck && <p className='text-[red] text-[13px]'>Type is required</p>}
                            <textarea
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className='mt-[5px] border border-[2px] rounded-[8px] p-[8px] w-[100%] min-h-[400px]'
                            ></textarea>
                        </div>
                        <div className='px-[20px] mt-[20px]'>
                            <p className='font-bold'> Responsibilities</p>
                            {postJobData?.status != 'draft' && (postJobData?.description?.responsibilities == '' || postJobData?.description?.responsibilities == undefined) && submitCheck && <p className='text-[red] text-[13px]'>Responsibilities is required</p>}
                            <textarea
                                value={responsibilities}
                                onChange={(e) => setResponsibilities(e.target.value)}
                                className='mt-[5px] border border-[2px] rounded-[8px] p-[8px] w-[100%] min-h-[400px]'
                            ></textarea>
                        </div>
                        <div className='px-[20px] mt-[20px]'>
                            <p className='font-bold'> Qualifications</p>
                            {postJobData?.status != 'draft' && (postJobData?.description?.qualifications == '' || postJobData?.description?.qualifications == undefined) && submitCheck && <p className='text-[red] text-[13px]'>Qualification is required</p>}
                            <textarea
                                value={qualifications}
                                onChange={(e) => setQualifications(e.target.value)}
                                className='mt-[5px] border border-[2px] rounded-[8px] p-[8px] w-[100%] min-h-[400px]'
                            ></textarea>
                        </div>
                        <div className='h-[60px] w-[100%] border-t px-[30px] py-[10px]'>
                            <button type='submit' className='px-[10px] py-[5px] rounded-[5px] bg-[#FFCB05] font-bold float-right'>Done</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default JobDescription;
