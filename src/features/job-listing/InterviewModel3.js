import React, { memo, useEffect, useState } from 'react';
import { typeEnum } from '../jobSearch/jobConst';
import moment from 'moment';
const addOneDay = (date) => {
    if (!date) return date;
    return moment(date).add(0, 'days').format('YYYY-MM-DD');
};
function InterviewModel3({ status:pageStatus, interViewResponce, interviewData, setInterviewModel, interviewModel }) {
    const interviewStatus = interviewData?.interviewDetails?.seekerResponse.status;

    console.log(interviewData?.interviewDetails?.employerProposal?.time?.proposedTime, "currenthello")
    const { timeZone } = interviewData?.interviewDetails?.employerProposal || {};
    const datee=interviewData?.interviewDetails?.seekerResponse?.selectedTime?.date;
    const adjustedDate = addOneDay(datee);

    const startTime=interviewData?.interviewDetails?.seekerResponse?.selectedTime?.startTime;
    const endTime=interviewData?.interviewDetails?.seekerResponse?.selectedTime?.endTime;
    console.log("pageStatus",datee)

    const porposedTime = interviewData?.interviewDetails?.employerProposal?.time?.proposedTime || {};
    const content = interviewData?.interviewDetails?.employerProposal?.content || {};
    const interviewType = interviewData?.interviewDetails?.employerProposal?.interviewType || {};
    const type = Object.keys(interviewType).find(key => { const value = interviewType[key]; return value && Object.keys(value)?.length > 0; });
    const message = type && interviewType[type]?.message;
    const address = type && interviewType[type]?.address;
    const video = type && interviewType[type]?.meetingLink;
    const phone = type && interviewType[type]?.phone;
    const pin = type && interviewType[type]?.pin;

    const [tab, setTab] = useState("0")

    const [payload, setPayload] = useState({});
    useEffect(() => {
        if (porposedTime?.length > 0) {
            const { date, startTime, endTime } = porposedTime[0];
            setPayload({ date, startTime, endTime });
        }
    }, [porposedTime]);
    const [accept, setAccept] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleButtonClick = (index, item) => {

        setSelectedIndex(index);
        const { date, startTime, endTime } = item;
        setPayload({ date, startTime, endTime });
    };
    return (
        <>
            <div className=' flex justify-center items-center model h-[100vh] w-[100%] top-0 left-0 fixed bg-[#0000005e] z-[999999]'>
                <div className=' max-h-[95%] w-[1000px] bg-[white] relative overflow-y-auto rounded-[15px] p-[15px]'>
                    <button className="btn btn-sm btn-circle mb-[10px] float-right -absolute right-2 top-2" onClick={() => { setInterviewModel(!interviewModel) }}>✕</button>
                    {/* <div className="interviewmodel-header  flex items-center justify-between px-[20px] h-[100px] border rounded-[15px] w-[100%]">
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
                        {/* ---------------------- */}
                        <div className='mt-[20px]'>
                            <span className='font-semibold'>Time zone:</span><span className='ml-[20px]'>{timeZone}</span>
                        </div>
                        <p className='font-bold mt-[20px]'>Select date and time</p>
                        {interviewData?.interviewDetails?.seekerResponse?.status == "accepted" ? 
                            <div className='-flex p-2'>
                        <div className='-flex mt-[10px]'>
                            <div className="left w-[150px] min-h-[30px] -flex- -flex-col -gap-[10px]">
                                <button className=" bg-[#FFCB05] px-[20px] w-[300px] py-[8px] border border-[#D8D7D7] h-[43px] rounded-[5px]"> {adjustedDate} | {startTime} - {endTime}</button>
                            </div>
                        </div>
                    </div>
                        :
                        <div className='-flex p-2'>
                            {
                                porposedTime?.length > 0 && porposedTime.map((item, index) => {
                                    const adjustedDatee = addOneDay(item.date);
                                    return (
                                        <div className='-flex mt-[10px]' key={index}>
                                            <div className="left w-[150px] min-h-[30px] -flex- -flex-col -gap-[10px]">
                                                <button
                                                    disabled={interviewStatus !== "pending"}
                                                    onClick={() => handleButtonClick(index, item)} className={` ${selectedIndex === index ? 'bg-[#FFCB05]' : ''} px-[20px] w-[300px] py-[8px] border border-[#D8D7D7] h-[43px] rounded-[5px]`}>{adjustedDatee} | {item.startTime} - {item.endTime}</button>
                                                {/* <button onClick={() => { setTab("2") }} className={` ${tab === "2" ? 'bg-[#FFCB05]' : ''} px-[20px] w-[100%] py-[8px] border border-[#D8D7D7] h-[43px] rounded-[5px]`}>6-29-2024</button> */}
                                            </div>
                                            {/* <div className="right w-[400px] min-h-[30px] flex-wrap flex gap-[10px]"> */}
                                            {/* <button onClick={() => { setTab("1") }} className={` ${tab === "1" ? 'bg-[#FFCB05]' : ''} px-[20px] -w-[45%] py-[8px] border border-[#D8D7D7] ml-[10px] rounded-[5px] h-[43px]`}>{item.startTime}</button> */}
                                            {/* <button onClick={() => { setTab("1") }} className={` ${tab === "1" ? 'bg-[#FFCB05]' : ''} px-[20px] -w-[45%] py-[8px] border border-[#D8D7D7] ml-[10px] rounded-[5px] h-[43px]`}>{item.endTime}</button> */}
                                            {/* <button onClick={() => { setTab("5") }} className={` ${tab === "5" ? 'bg-[#FFCB05]' : ''} px-[20px] -w-[45%] py-[8px] border border-[#D8D7D7] ml-[10px] rounded-[5px] h-[43px]`}>9:00 am - 11:30 am</button> */}
                                            {/* </div> */}
                                        </div>
                                    )
                                })
                            }
                        </div>}
                        {/* ------------------------------- */}
                        <div className='flex flex-wrap mt-[30px]'>
                            <div className='w-[40%]'>
                                <span className='font-semibold '>Interview Type :</span> {typeEnum[type]}
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
                        <p className='font-semibold mt-[30px]'>Message:</p>
                        <p className='mt-[5px]'>{message}</p>
                        {/* -------------------------------- */}
                        {content && content?.length>0 &&
                            <p className='font-semibold mt-[30px]'>Content</p>
                        }
                        {
                            content?.length > 0 && content.map((item) => {
                                return (
                                    <li className='list-disc ml-[20px] mt-[10px] key={index}'>{item}</li>
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
                            }} className='rounded-r-[5px] bg-[#DFE6EE] px-[35px] py-[15px]'>DECLINE</button>
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
                        <button onClick={() => { setAccept(!accept) }} className='px-[20px] py-[5px] rounded-[5px] bg-[#E2E2E2]'>No</button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default memo(InterviewModel3);
