import React, { useState } from 'react';
import Select from "react-select";
import { customStylesSelect } from "../../components/ReactSelectStyle";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const addOneDay = (date) => {
    if (!date) return date;
    return moment(date).add(0, 'days').format('YYYY-MM-DD');
};
function InterviewRequestAvailability({ selectedApplicantData, disabled,setRErrors2,rErrors2, setRErrors3,rErrors3, handleDateChange, sDate,eDate, rErrors,rValues, handleSelectChange }) {
    const durationOptions = [
        { value: '15 minutes', label: '15 minutes' },
        { value: '30 minutes', label: '30 minutes' },
        { value: '45 minutes', label: '45 minutes' },
        { value: '1 hour', label: '1 hour' },
        { value: '2 hour', label: '2 hour' },
        { value: '3 hour', label: '3 hour' },
        { value: '4 hour', label: '4 hour' },
        { value: '5 hour', label: '5 hour' }
    ];
    const datee = selectedApplicantData?.interviewDetails?.seekerResponse?.selectedTime?.date;
    const adjustedDatee = addOneDay(datee);
    console.log("kjkjkjkj", selectedApplicantData?.interviewDetails?.seekerResponse?.selectedTime)
   
    const startTime = selectedApplicantData?.interviewDetails?.seekerResponse?.selectedTime?.startTime;
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#fff',
            border: '1px solid #e3d8d8',
            // border:'#868686',
            borderRadius: '5px',
            boxShadow: 'none',
            fontSize: '17px',
            paddingTop: '2px',
            paddingBottom: '2px',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#fff'
            }
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: '#000',
            fontWeight: 'semibold'
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: '#C9C9C9',
            fontWeight: '500',
            fontSize: '16px'
        }),
        dropdownIndicator: (provided, state) => ({
            display: 'none'
        }),
        indicatorSeparator: (provided, state) => ({
            display: 'none'
        }),
        menu: (provided, state) => ({
            ...provided,
            width: '80%',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
        }),
        menuList: (provided, state) => ({
            ...provided,
            padding: 0,
            // borderRadius:'20px'
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#F8B501' : 'white',
            color: state.isSelected ? 'white' : '#000',
            fontSize: '13px',
            fontWeight: 'semi-bold',
            '&:hover': {
                backgroundColor: '#E2E2E2',
                color: '#000'
            },
            width: '100%',
            boxSizing: 'border-box'
        })

    };
    const getTimeOptions = () => {
        const times = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = moment().hours(hour).minutes(minute).format('hh:mm A');
                times.push({ value: time, label: time });
            }
        }
        return times;
    };
    const getTimeOptions2 = () => {
        const times = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = moment().hours(hour).minutes(minute).format('hh:mm A');
                if (time !== '12:00 AM') {
                    times.push({ value: time, label: time });
                }
            }
        }
        return times;
    };
    const timeOptions = getTimeOptions();
    const timeOptions2 = getTimeOptions2();
const validateTimes = (startTime, endTime) => {
    let errors = {};
    if (startTime && endTime) {
        const start = moment(startTime, 'hh:mm A');
        const end = moment(endTime, 'hh:mm A');
        if (end.isBefore(start)) {
            errors.endTime = 'End time must be later than start time';
        }
        if (end.isSame(start)) {
            errors.endTime = 'End time cannot be the same as start time';
        }
    }
    setRErrors2(errors);
    return errors;
};
const validateDates = (startDate, endDate) => {
    let errors = {};
    if (startDate && endDate) {
        const start = moment(startDate);
        const end = moment(endDate);
        if (end.isBefore(start)) {
            errors.endDate = 'End date must be later than start date';
        }
        // if (end.isSame(start)) {
        //     errors.endDate = 'End date cannot be the same as start date';
        // }
    }
    // setRErrors3(prevErrors => ({ ...prevErrors, ...errors }));
    setRErrors3(errors);

    return errors;
};
const handleTimeChange = (type, option) => {
    const newTime = option ? option.value : '';
    const updatedValues = { ...rValues, [type]: newTime };
    handleSelectChange(type, option);
    if (type === 'startTime') {
        validateTimes(newTime, rValues.endTime);
    } else if (type === 'endTime') {
        validateTimes(rValues.startTime, newTime);
    }
};
const handleDateChange2 = (type, date) => {
    const newDate = date ? moment(date).format('YYYY-MM-DD') : '';
    console.log(newDate,"proposals=====>innk",date,"fffff",sDate)

    const updatedValues = { ...rValues, [type]: newDate };
    handleDateChange(type, date);
    if (type === 'startDate') {
        validateDates(newDate, rValues.endDate);
    } else if (type === 'endDate') {
        validateDates(rValues.startDate, newDate);
    }
};
    const customStyles2 = {
        container: {
            display: 'inline-block',
            position: 'relative',
        },
        input: {
            fontSize: '18px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '140px',
            textAlign: 'center',
            backgroundColor: '#fff',
            color: '#666',
        },
        placeholder: {
            color: '#aaa', // Placeholder color
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            pointerEvents: 'none', // Allow clicks to pass through
        },
        calendar: {
            position: 'absolute',
            top: '100%',
            left: '0',
            zIndex: 1000,
        },
    };
    return (
        <>
            <div className='mt-[40px]'>
                <div className='mt-[20px] -flex -items-center gap-[8px]'>
                    <p className='font-[500] text-[15px]'>Duration of Interview :</p>
                    <Select
                        isDisabled={disabled}
                        styles={customStylesSelect}
                        id="duration"
                        className="react-select font-[500] w-[150px] text-[15px] -height"
                        classNamePrefix="All"
                        options={durationOptions} // Corrected options syntax
                        value={durationOptions.find(option => option?.value === rValues?.duration)}
                                    onChange={(option) => handleSelectChange('duration', option)}
                        placeholder="Duration"
                    />
                            {rErrors?.duration ? (<div className="text-red-500">{rErrors?.duration}</div>) : null}
                </div>
                <p className='text-[15px] font-bold mt-[10px]'>Date and time restrictions</p>
                {
                    selectedApplicantData?.interviewDetails?.seekerResponse?.status == "accepted" ?
                    <div className='-flex p-2'>
                        <div className='-flex mt-[10px]'>
                            <div className="left w-[150px] min-h-[30px] -flex- -flex-col -gap-[10px]">
                                <button className=" bg-[#FFCB05] px-[20px] w-[300px] py-[8px] border border-[#D8D7D7] h-[43px] rounded-[5px]"> {adjustedDatee} | {startTime}</button>
                            </div>
                        </div>
                    </div>
                    
                    :<div className='flex flex-wrap items-center gap-[5px] mt-[10px]'>
                    <div className='request-availibility-inputs'>
                    <div className='flex flex-col request-availibility-inputs'>
                        <label className='text-[15px]' htmlFor="">Start Date</label>
                        {/* <div style={customStyles.container}> */}
                            <DatePicker
                                id="date-picker"
                                disabled={disabled}
                                selected={sDate}
                                minDate={new Date()}
                                onChange={(value) => handleDateChange2("startDate", value)}
                                dateFormat="MMMM d, yyyy"
                                className={`react-datepicker__input-container font-[500] request-availibility-inputs  w-[140px] h-[45px] rounded-[6px] border text-[15px] px-[10px]`}
                                placeholderText='Select Date'
                            />
                            {/* {rErrors?.startDate ? (<div className="text-red-500">{rErrors?.startDate}</div>) : null} */}
                            {rErrors?.startDate ? (<div className="text-red-500">{rErrors?.startDate}</div>) : (<div className="text-red-500">{rErrors3?.startDate}</div>)}

                        </div>
                    </div>
                    <p className=' text-[#C9C9C9] mt-[22px] d-none'>-</p>
                    <div className='flex flex-col request-availibility-inputs'>
                        <label className='text-[15px] opacity-[1]' htmlFor="">End Date</label>
                        <DatePicker
                            disabled={disabled}
                            id="date-picker"
                            selected={eDate}
                            minDate={new Date()}

                            onChange={(value) => handleDateChange2("endDate", value)}
                            dateFormat="MMMM d, yyyy"
                            className={`react-datepicker__input-container font-[500]  w-[140px] h-[44px] rounded-[6px] border text-[15px] px-[10px]`}
                            placeholderText='Select Date'
                        />
                            {/* {rErrors?.endDate && <div className="text-red-500">{rErrors.endDate}</div>} */}
                            {rErrors?.endDate ? (<div className="text-red-500">{rErrors?.endDate}</div>) : (<div className="text-red-500">{rErrors3?.endDate}</div>)}

                    </div>
                    <div className='request-availibility-inputs'>  
                        <label className='text-[15px] opacity-[1]' htmlFor="">Start Time</label>
                        <Select
                            isDisabled={disabled}
                            styles={customStyles}
                            className="react-select font-[500] w-[140px] request-availibility-inputs text-[15px] -height"
                            classNamePrefix="All"
                            options={timeOptions} // Corrected options syntax
                            isSearchable={true}
                            value={timeOptions.find(option => option?.value === rValues?.startTime)}
                                    onChange={(option) => handleTimeChange('startTime', option)}
                                    placeholder="Select Time"
                        />
                        {rErrors?.startTime ? (<div className="text-red-500">{rErrors?.startTime}</div>) : (<div className="text-red-500">{rErrors2?.startTime}</div>)}
                    </div>
                    <p className='text-[#C9C9C9] mt-[22px] d-none'>-</p>
                    <div className='request-availibility-inputs'>
                        <label className='text-[15px]' htmlFor="">End Time</label>
                        <Select
                            isDisabled={disabled}
                            styles={customStyles}
                            className="react-select font-[500] w-[140px] request-availibility-inputs text-[15px] -height"
                            classNamePrefix="All"
                            options={timeOptions2} // Corrected options syntax
                            isSearchable={true}
                            value={timeOptions2.find(option => option?.value === rValues?.endTime)}
                                    onChange={(option) => handleTimeChange('endTime', option)}
                                    placeholder="Select Time"
                        />
                        {rErrors?.endTime ? (<div className="text-red-500">{rErrors?.endTime}</div>) : (<div className="text-red-500">{rErrors2?.endTime}</div>)}
                    </div>
                </div>
                }
            </div>
        </>
    );
}

export default InterviewRequestAvailability;
