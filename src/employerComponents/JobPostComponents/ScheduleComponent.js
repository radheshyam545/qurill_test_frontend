import React, { useEffect, useState } from 'react';

function ScheduleComponent({ tab, setTab, postJobData, setPostJobData }) {
    const [selectedSchedule, setSelectedSchedule] = useState(postJobData?.workSchedule);
    useEffect(() => {
        setSelectedSchedule(postJobData?.workSchedule);
    }, [postJobData]);
    
    const handleScheduleChange = (value) => {
        if (selectedSchedule === value) {
            setSelectedSchedule(''); // Deselect if already selected
        } else {
            setSelectedSchedule(value); // Select the new value
        }
    };

    const handleSubmit = () => {
        try {
            setPostJobData(prevData => ({
                ...prevData,
                workSchedule: selectedSchedule
            }));
            setTab('0');
        } catch (e) {

        }
    };

    return (
        <>
            <div className="h-[100vh] z-[10] z-[999] flex items-center justify-center w-[100%] fixed top-[0px] left-[0px] overlay-color">
                <div className="h-[300px] w-[700px] bg-[white] flex flex-col justify-between">
                    <div className="flex items-center justify-between h-[40px] px-[30px] py-[30px] border-b">
                        <p className="font-bold">Edit the job post</p>
                        <img
                            onClick={() => setTab('0')}
                            className="cursor-pointer h-[15px]"
                            src="/assets/images/employer-images/jobpostoverlaytabcross.svg"
                            alt=""
                        />
                    </div>
                    <div className="px-[20px]">
                        <p className="font-bold"> Schedule</p>
                        <div className="flex gap-[10px] flex-wrap mt-[5px] mb-[50px]">
                            <button
                                onClick={() => handleScheduleChange('+ 4 hours')}
                                className={`px-4 py-2 rounded-[18px] font-semibold bg-[#F2F2F2] border border-[#B3B3B3] text-[18px] ${selectedSchedule === '+ 4 hours' ? 'jobtypeActive' : ''}`}
                            >
                                + 4 hours
                            </button>
                            <button
                                onClick={() => handleScheduleChange('+ 6 hours')}
                                className={`px-4 py-2 rounded-[18px] font-semibold bg-[#F2F2F2] border border-[#B3B3B3] text-[18px] ${selectedSchedule === '+ 6 hours' ? 'jobtypeActive' : ''}`}
                            >
                                + 6 hours
                            </button>
                            <button
                                onClick={() => handleScheduleChange('+ 8 hours')}
                                className={`px-4 py-2 rounded-[18px] font-semibold bg-[#F2F2F2] border border-[#B3B3B3] text-[18px] ${selectedSchedule === '+ 8 hours' ? 'jobtypeActive' : ''}`}
                            >
                                + 8 hours
                            </button>
                            <button
                                onClick={() => handleScheduleChange('+ 10 hours')}
                                className={`px-4 py-2 rounded-[18px] font-semibold bg-[#F2F2F2] border border-[#B3B3B3] text-[18px] ${selectedSchedule === '+ 10 hours' ? 'jobtypeActive' : ''}`}
                            >
                                + 10 hours
                            </button>
                            <button
                                onClick={() => handleScheduleChange('+ 12 hours')}
                                className={`px-4 py-2 rounded-[18px] font-semibold bg-[#F2F2F2] border border-[#B3B3B3] text-[18px] ${selectedSchedule === '+ 12 hours' ? 'jobtypeActive' : ''}`}
                            >
                                + 12 hours
                            </button>
                            <button
                                onClick={() => handleScheduleChange('Monday to Friday')}
                                className={`px-4 py-2 rounded-[18px] font-semibold bg-[#F2F2F2] border border-[#B3B3B3] text-[18px] ${selectedSchedule === 'Monday to Friday' ? 'jobtypeActive' : ''}`}
                            >
                                Monday to Friday
                            </button>
                            <button
                                onClick={() => handleScheduleChange('Day Shift')}
                                className={`px-4 py-2 rounded-[18px] font-semibold bg-[#F2F2F2] border border-[#B3B3B3] text-[18px] ${selectedSchedule === 'Day Shift' ? 'jobtypeActive' : ''}`}
                            >
                                Day Shift
                            </button>
                        </div>
                    </div>
                    <div className="h-[60px] -w-[100%] border-t px-[30px] py-[10px]">
                        <button className="px-[10px] py-[5px] rounded-[5px] bg-[#FFCB05] font-bold float-right" onClick={handleSubmit}>Done</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ScheduleComponent;
