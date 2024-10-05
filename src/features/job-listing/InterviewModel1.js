import React, { memo, useEffect, useState } from 'react';
import { conturyEnum, typeEnum } from '../jobSearch/jobConst';

function InterviewModel1({ interviewData, setInterviewModel, interviewModel, interViewResponce }) {
    const interviewStatus = interviewData?.interviewDetails?.seekerResponse.status;

    const { timeZone } = interviewData?.interviewDetails?.employerProposal || {};
    const { date } = interviewData?.interviewDetails?.employerProposal?.time?.fixedTime || {};
    const { startTime } = interviewData?.interviewDetails?.employerProposal?.time?.fixedTime || {};
    const { endTime } = interviewData?.interviewDetails?.employerProposal?.time?.fixedTime || {};
    const interviewType = interviewData?.interviewDetails?.employerProposal?.interviewType || {};
    // const type = Object.keys(interviewType).find(key => interviewType[key]);
    const type = Object.keys(interviewType).find(key => { const value = interviewType[key]; return value && Object.keys(value)?.length > 0; });
    const message = type && interviewType[type]?.message;
    const address = type && interviewType[type]?.address;
    const video = type && interviewType[type]?.meetingLink;
    const phone = type && interviewType[type]?.phone;
    const pin = type && interviewType[type]?.pin;


    const { city } = interviewData || {};
    const { country } = interviewData || {};
    const { state } = interviewData || {};
    const content = interviewData?.interviewDetails?.employerProposal?.content || {};

    const [payload, setPayload] = useState({});
    const [accept, setAccept] = useState(false)
    useEffect(() => {
        const fixedTime = interviewData?.interviewDetails?.employerProposal?.time?.fixedTime || {};
        setPayload(fixedTime);
    }, [interviewData]);

    console.log(phone, "----------l")

    return (
        <>
            <div className=' flex justify-center items-center model h-[100vh] w-[100%] top-0 left-0 fixed bg-[#0000005e] z-[999999]'>
                <div className=' max-h-[95%] w-[1000px] bg-[white] overflow-y-auto rounded-[15px] p-[15px]'>
                    <button className="btn btn-sm btn-circle mb-[10px] float-right -absolute right-2 top-2" onClick={() => { setInterviewModel(!interviewModel) }}>✕</button>
                    {/* <div className="interviewmodel-header flex items-center justify-between px-[20px] h-[100px] border rounded-[15px] w-[100%]">
                        <img src="/assets/images/interviewmodel.svg" alt="" />
                        <span className='text-center'>
                            <p className='font-semibold'>Senior Software Engineer</p>
                            <p className='text-[15px]'>Dallas, Taxas, USA</p>
                            <p className='text-[15px]'>03 Aug, 2023</p>
                        </span>
                        <span className='text-center'>
                            <p className='font-semibold text-[15px]'>$100,000 - $350,000 </p>
                            <p className='font-semibold text-[15px]'>Annual</p>
                        </span>

                    </div> */}
                    <div className='px-[20px] py-[15px] border rounded-[15px] mt-[40px]'>
                        <h1 className='text-[18px] font-semibold'>Interview</h1>
                        <div className='mt-[20px]'>
                            <span className='font-semibold'>Time zone:</span><span className='ml-[20px]'>{timeZone}</span>
                        </div>
                        {/* ---------------------- */}
                        <div className='flex mt-[20px]'>
                            <div className='w-[40%]'>
                                <span className='font-semibold'>Interview schedule date:</span> {date?.substring(0, 10)}
                            </div>
                            <div>
                                <span className='font-semibold'>Interview start at:</span>{startTime} - {endTime} <span className='font-[500]'></span>
                            </div>
                        </div>
                        {/* --------------------------- */}
                        <div className='flex mt-[30px]'>
                            <div className='w-[40%]'>
                                <span className='font-semibold'>Interview Type :</span> {typeEnum[type]}
                            </div>
                            {type === "inPerson" && (
                                <div>
                                    <span className='font-semibold'>Address :</span> {address}
                                </div>
                            )}
                            {type === "video" && (
                                <div>
                                    <span className='font-semibold'>Video conference link :</span><span className='ml-[20px]'>{video}</span>
                                </div>
                            )}
                            {type === "phone" && (
                                <div>
                                    <span className='font-semibold'>Phone no:</span><span className='ml-[20px]'>{phone}</span>
                                </div>
                            )}
                            {type === "phone" && (
                                <div>
                                    <span className='font-semibold ml-[200px]'>Pin :</span><span className='ml-[20px]'>{pin}</span>
                                </div>
                            )}
                        </div>
                        {/* ------------------------------- */}
                        <p className='font-semibold mt-[30px]'>Message:</p>
                        <p className='mt-[10px]'>{message}</p>
                        {/* -------------------------------- */}
                        {content && content?.length>0 &&
                            <p className='font-semibold mt-[30px]'>Content</p>
                        }
                        {
                            content?.length > 0 && content.map((item) => {
                                return (
                                    <li className='list-disc ml-[20px] mt-[10px]'>{item}</li>
                                )
                            })
                        }

                    </div>
                    {
                        interviewStatus === "pending" &&
                        <div className='float-right mt-[30px]'>
                            <button onClick={() => { setAccept(!accept) }} className='rounded-l-[5px] bg-[#FFCB05] px-[35px] py-[15px]'>ACCEPT</button>
                            <button onClick={() => {
                                interViewResponce({}, false)
                                setInterviewModel(!interviewModel)
                            }
                            } className='rounded-r-[5px] bg-[#DFE6EE] px-[35px] py-[15px]'>DECLINE</button>
                        </div>
                    }
                </div>
            </div>
            {/* -----------------overlay--------------- */}
            <div className={` ${accept ? '' : 'hidden'} flex justify-center items-center model h-[100vh] w-[100%] top-0 left-0 fixed bg-[#0000005e] z-[999999]`}>
                <div className=' max-h-[80%] w-[40%] bg-[white] text-center scrollnone overflow-y-scroll rounded-[15px] p-[15px]'>
                    <p className='font-bold'>Are you sure you want to accept this interview with Microsoft Inc?</p>
                    <div className='flex gap-[10px] justify-center mt-[20px]'>
                        <button className='px-[20px] py-[5px] rounded-[5px] bg-[#FFCB05]' onClick={() => {
                            setInterviewModel(!interviewModel)
                            interViewResponce(payload, true)
                            setAccept(!accept)
                        }}>Yes</button>
                        <button onClick={() => {
                            setInterviewModel(!interviewModel)
                            setAccept(!accept)
                        }} className='px-[20px] py-[5px] rounded-[5px] bg-[#E2E2E2]'>No</button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default memo(InterviewModel1);
