import React, { memo, useEffect, useState } from 'react';
// import Datepicker from 'react-tailwindcss-datepicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { customStylesSelect } from "../../components/ReactSelectStyle";
import { conturyEnum, typeEnum } from '../jobSearch/jobConst';





function InterviewModel2({interViewResponce, interviewData, setInterviewModel, interviewModel }) {
    // console.log(interviewData?.interviewDetails?.employerProposal?.interviewType, "current2nd")
    const interviewStatus = interviewData?.interviewDetails?.seekerResponse.status;
    const {date:seekerData, startTime:seekerTime} = interviewData?.interviewDetails?.seekerResponse?.selectedTime || {};
    // console.log("llkkkklkl",interviewData?.interviewDetails?.seekerResponse?.status)
    // let status="";
    // if(interviewData?.interviewDetails?.seekerResponse?.status == "rejected"){
    //     status = "Rejected"
    // }
    // else if(interviewData?.interviewDetails?.seekerResponse?.status == "accepted"){
    //     status = "Accepted"
    // }

    const { timeZone } = interviewData?.interviewDetails?.employerProposal || {};
    const { duration } = interviewData?.interviewDetails?.employerProposal?.time?.requestAvailability || {};
    const { startDate } = interviewData?.interviewDetails?.employerProposal?.time?.requestAvailability || {};
    const { endDate } = interviewData?.interviewDetails?.employerProposal?.time?.requestAvailability || {};
    const { startTime } = interviewData?.interviewDetails?.employerProposal?.time?.requestAvailability || {};
    const { endTime } = interviewData?.interviewDetails?.employerProposal?.time?.requestAvailability || {};
    const interviewType = interviewData?.interviewDetails?.employerProposal?.interviewType || {};
    const type = Object.keys(interviewType).find(key => { const value = interviewType[key]; return value && Object.keys(value).length > 0;});
    const message = type && interviewType[type]?.message;
    const content = interviewData?.interviewDetails?.employerProposal?.content || {};
    // const { video } = interviewData?.interviewDetails?.employerProposal?.interviewType || {}; //// compulsory for all
    const address = type && interviewType[type]?.address;
    const video = type && interviewType[type]?.meetingLink;
    const phone = type && interviewType[type]?.phone;
    const pin = type && interviewType[type]?.pin;
    // console.log(startDate,"llkkkklkl")
    const [payload, setPayload] = useState({date:'',time:''})

    const [accept, setAccept] = useState(false)
    /////////////////////////////////////////////////////////////////////////////////
    const [selectedDate, setSelectedDate] = useState(null);

    const handleChange = (date) => {
        setSelectedDate(date);
        setPayload(prevPayload => ({
            ...prevPayload,
            date: date
        }));
        // handleDateChange(date); // Send the selected date to the function
    };
    ///////////////////// filtered time logicccc
    const [timeList] = useState([
        { time: '12:00 AM' }, { time: '12:30 AM' }, { time: '1:00 AM' }, { time: '1:30 AM' },
        { time: '2:00 AM' }, { time: '2:30 AM' }, { time: '3:00 AM' }, { time: '3:30 AM' },
        { time: '4:00 AM' }, { time: '4:30 AM' }, { time: '5:00 AM' }, { time: '5:30 AM' },
        { time: '6:00 AM' }, { time: '6:30 AM' }, { time: '7:00 AM' }, { time: '7:30 AM' },
        { time: '8:00 AM' }, { time: '8:30 AM' }, { time: '9:00 AM' }, { time: '9:30 AM' },
        { time: '10:00 AM' }, { time: '10:30 AM' }, { time: '11:00 AM' }, { time: '11:30 AM' },
        { time: '12:00 PM' }, { time: '12:30 PM' }, { time: '1:00 PM' }, { time: '1:30 PM' },
        { time: '2:00 PM' }, { time: '2:30 PM' }, { time: '3:00 PM' }, { time: '3:30 PM' },
        { time: '4:00 PM' }, { time: '4:30 PM' }, { time: '5:00 PM' }, { time: '5:30 PM' },
        { time: '6:00 PM' }, { time: '6:30 PM' }, { time: '7:00 PM' }, { time: '7:30 PM' },
        { time: '8:00 PM' }, { time: '8:30 PM' }, { time: '9:00 PM' }, { time: '9:30 PM' },
        { time: '10:00 PM' }, { time: '10:30 PM' }, { time: '11:00 PM' }, { time: '11:30 PM' }
    ]);
    const [filteredTimeList, setFilteredTimeList] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [errors, setErrors] = useState({ date: '', time: '' });
    useEffect(() => {
        if (startTime && endTime) {
            // Parse times to Date objects for comparison
            const parseTime = (time) => {
                const [hours, minutes] = time.split(/[: ]/);
                const period = time.slice(-2);
                let hours24 = parseInt(hours, 10);
                if (period === 'PM' && hours24 !== 12) hours24 += 12;
                if (period === 'AM' && hours24 === 12) hours24 = 0;
                return new Date(1970, 0, 1, hours24, parseInt(minutes, 10));
            };

            const parsedStartTime = parseTime(startTime);
            const parsedEndTime = parseTime(endTime);

            // Filter the time list to only include times between startTime and endTime
            const filtered = timeList.filter(({ time }) => {
                const parsedTime = parseTime(time);
                return parsedTime >= parsedStartTime && parsedTime <= parsedEndTime;
            });

            setFilteredTimeList(filtered);
        }
    }, [startTime, endTime, timeList]);

    // const handleTimeChange = (event) => {
    //     setSelectedTime(event.target.value);
    //     setPayload(prevPayload => ({
    //         ...prevPayload,
    //         time: event.target.value
    //     }));
    // };
    ////////////////////////////////////////// validation
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setPayload(prevPayload => ({
            ...prevPayload,
            date: date
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            date: date ? '' : 'Date is required'
        }));
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
        setPayload(prevPayload => ({
            ...prevPayload,
            time: event.target.value
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            time: event.target.value ? '' : 'Time is required'
        }));
    };

    const handleAccept = () => {
        if (!selectedDate) {
            setErrors(prevErrors => ({ ...prevErrors, date: 'Date is required' }));
        }
        if (!selectedTime) {
            setErrors(prevErrors => ({ ...prevErrors, time: 'Time is required' }));
        }
        if (selectedDate && selectedTime) {
            setAccept(!accept)            
        }

        if(selectedDate && selectedTime && accept ){
            setAccept(!accept)            
            interViewResponce(payload, true);
            setInterviewModel(!interviewModel);
            setAccept(false);
        }
    };
    return (
        <>
            <div className=' flex justify-center items-center model h-[100vh] w-[100%] top-0 left-0 fixed bg-[#0000005e] z-[999999]'>
                <div className=' max-h-[95%] w-[1000px] bg-[white] overflow-y-auto rounded-[15px] p-[15px]'>
                    <button className="btn btn-sm btn-circle  mb-[10px] float-right -absolute right-2 top-2" onClick={() => { setInterviewModel(!interviewModel) }}>✕</button>
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
                        {/* ---------------------- */}
                        <div className=''>
                            <div className='mt-[20px]'>
                                <span className='font-semibold'>Time zone:</span><span className='ml-[20px]'>{timeZone}</span>
                            </div>
                            <div className='mt-[20px]'>
                                <span className='font-semibold'>Duration:</span><span className='ml-[20px]'>{duration}</span>
                            </div>
                            <div className='mt-[20px]'>
                                <span className='font-semibold'>Date and time restrictions</span><span className='ml-[20px]'>{startDate?.substring(0, 10)} - {endDate?.substring(0, 10)} | {startTime} - {endTime}</span>
                            </div>
                        </div>
                        <p className='font-bold mt-[20px]'>Choose date and time</p>
                        <div className='flex flex-wrap gap-[20px] mt-[px]'>
                            <div className='flex flex-col'>
                                <label htmlFor="">Date:</label>
                                {/* <input className='h-[46px] w-[120px] border rounded-[5px] pl-[10px] -ml-[10px]' type="text" name="" id=""  placeholder='06-02-2024'/> */}
                                <DatePicker
                                    disabled={interviewStatus !== "pending"}
                                    defaultValue={seekerData}
                                    selected={seekerData?seekerData:selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="MMMM d, yyyy"
                                    minDate={startDate ? new Date(startDate) : new Date()}
                                    maxDate={endDate ? new Date(endDate) : null}
                                    className="react-datepicker__input-container font-[500] w-[140px] h-[46px] rounded-[6px] border text-[18px] px-[10px]"
                                    placeholderText='Select Date'
                                // disabled={disabled}
                                />
                                 {errors.date && <p className='text-red-500'>{errors.date}</p>}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Start at:</label>
                                {/* <input className='h-[46px] w-[120px] border rounded-[5px] pl-[10px] -ml-[10px]' type="text" name="" id="" placeholder='02.00 Pm' /> */}
                                <select
                                    className='h-[46px] w-[120px] border rounded-[5px] pl-[10px] -ml-[10px]'
                                    classNamePrefix="All"
                                    styles={customStylesSelect}
                                    value={selectedTime}
                                    disabled={interviewStatus !== "pending"}
                                    //place holder                                      
                                    onChange={handleTimeChange}
                                >
                                    <option value="" disabled>{seekerTime ? seekerTime : 'Select'}</option>
                                    {filteredTimeList.map((entry, index) => (
                                        <option key={index} value={entry.time}>
                                            {entry.time}
                                        </option>
                                    ))}
                                </select>
                                {errors.time && <p className='text-red-500'>{errors.time}</p>}
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-[20px] justify-between w-[90%] mt-[20px]'>
                            <span>
                            
                                <span className='font-semibold'>Interview Type : </span>{typeEnum[type]}
                            </span>
                            {type === "inPerson" && <span>
                                <span className='font-semibold'>Address :</span><span className='ml-[20px]'>{address}</span>
                            </span>}
                            {type === "video" && <span>
                                <span className='font-semibold'>Video conference link :</span><span className='ml-[20px]'>{video}</span>
                            </span>}
                            {type === "phone" && <span>
                                <span className='font-semibold'>Phone no:</span><span className='ml-[20px]'>{phone}</span>
                            </span>}
                            {type === "phone" && <span>
                                <span className='font-semibold'>Pin :</span><span className='ml-[20px]'>{pin}</span>
                            </span>}
                        </div>
                        {/* ------------------------------- */}
                        <p className='font-semibold mt-[30px]'>Message:</p>
                        <p className='mt-[5px]'>{message}</p>
                        {/* -------------------------------- */}
                        {content && content?.length>0 &&
                            <p className='font-semibold mt-[30px]'>Content</p>
                        }
                        {/* <li className='list-disc ml-[20px] mt-[10px]'>My educational background includes my high school diploma and some.</li> */}
                        {
                           content?.length > 0 && content.map((item)=>{
                                return(
                                    <li className='list-disc ml-[20px] mt-[10px]'>{item}</li>
                                )
                            })
                        }
                    </div>
                    {
                        interviewStatus === "pending" &&
                    <div className='float-right mt-[30px]'>
                        <button 
                        onClick={() => { 
                            handleAccept()
                             }} className='rounded-l-[5px] bg-[#FFCB05] px-[35px] py-[15px]'>ACCEPT</button>
                        <button onClick={() => {
                            setInterviewModel(!interviewModel)
                            interViewResponce({}, false)
                        }} className='rounded-r-[5px] bg-[#DFE6EE] px-[35px] py-[15px]'>DECLINE</button>
                    </div>}
                </div>
            </div>
            {/* -----------------overlay--------------- */}
            <div className={` ${accept ? '' : 'hidden'} flex justify-center items-center model h-[100vh] w-[100%] top-0 left-0 fixed bg-[#0000005e] z-[999999]`}>
                <div className=' max-h-[80%] w-[40%] bg-[white] text-center scrollnone overflow-y-scroll rounded-[15px] p-[15px]'>
                    <p className='font-bold'>Are you sure you want to accept this interview with Microsoft Inc?</p>
                    <div className='flex gap-[10px] justify-center mt-[20px]'>
                        <button className='px-[20px] py-[5px] rounded-[5px] bg-[#FFCB05]' onClick={handleAccept}>Yes</button>
                        <button onClick={() => { setAccept(!accept) }} className='px-[20px] py-[5px] rounded-[5px] bg-[#E2E2E2]'>No</button>
                    </div>
                </div>
            </div>

        </>
    );
}

export default memo(InterviewModel2);
