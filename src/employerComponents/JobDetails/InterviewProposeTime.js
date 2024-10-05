import React, { useEffect, useRef, useState } from 'react';
import Select from "react-select";
import { customStylesSelect } from "../../components/ReactSelectStyle";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const addOneDay = (date) => {
    if (!date) return date;
    return moment(date).add(0, 'days').format('YYYY-MM-DD');
};
function InterviewProposeTime({ selectedApplicantData, disabled, pterrors, setptErrors, setFormErrors2, formErrors2, setProposals, proposals, pErrors2, setPErrors2, pErrors, pValues, handleDateChange, formValues, setFormValues, isTouched, interviewTimeBtn, date, handleSelectChange }) {
    // const [proposals, setProposals] = useState([{ date: '', startTime: '', endTime: '' }]);
    // const [formErrors2, setFormErrors2] = useState({ key: '1' });
    console.log("kjkjkjkj", selectedApplicantData?.interviewDetails?.seekerResponse?.selectedTime)
    const datee = selectedApplicantData?.interviewDetails?.seekerResponse?.selectedTime?.date;
    const adjustedDatee = addOneDay(datee);
    const startTime = selectedApplicantData?.interviewDetails?.seekerResponse?.selectedTime?.startTime;
    const endTime = selectedApplicantData?.interviewDetails?.seekerResponse?.selectedTime?.endTime;
    console.log("kjkjkjkj", datee)
    const isFirstRender = useRef(true);
    const func2 = () => {
        const errors = {};

        proposals.forEach((item, index) => {
            const error = {};

            // Convert values to strings and then trim
            const dateStr = String(item.date || '').trim();
            const startTimeStr = String(item.startTime || '').trim();
            const endTimeStr = String(item.endTime || '').trim();

            if (!dateStr) {
                error.date = 'Date is required';
            }
            if (!startTimeStr) {
                error.startTime = 'Start time is required';
            }
            if (!endTimeStr) {
                error.endTime = 'End time is required';
            }

            if (Object.keys(error).length > 0) {
                errors[index] = error; // Store errors by index
            }
        });

        setFormErrors2(errors);
    };

    useEffect(() => {
        // Skip running func on the initial render
        if (isFirstRender.current) {
            isFirstRender.current = false; // Set to false after first render
        } else {
            func2(); // Run func only on subsequent renders
        }
    }, [proposals]);
    console.log("propose time is array", proposals)
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

                // Exclude 12:00 AM from the options
                if (time !== '12:00 AM') {
                    times.push({ value: time, label: time });
                }
            }
        }
        return times;
    };

    //////////////////////////////////////////////////

    const validateTimes = (index, startTime, endTime) => {
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
        return { [index]: errors }; // Return errors specific to the index
    };


    // console.log('Rendering errors for index:', index);
    // console.log('formErrors2[index]:', formErrors2[index]);
    console.log('errors[index]:', pterrors);
    const handleTimeChange = (type, option) => {
        const newTime = option ? option.value : '';
        const updatedValues = { ...proposals, [type]: newTime };

        // Update the state
        handleSelectChange(type, option);

        if (type === 'startTime') {
            validateTimes(newTime, proposals.endTime);
        } else if (type === 'endTime') {
            validateTimes(proposals.startTime, newTime);
        }
    };

    const timeOptions = getTimeOptions();
    const timeOptions2 = getTimeOptions2();
    ////////////////////////////////
    const handleAddProposal = () => {
        setProposals([...proposals, { date: '', startTime: '', endTime: '' }]);
    };
    ///type=>field option=>value
    const handleChange = (index, field, value) => {
        const newProposals = [...proposals];
        newProposals[index] = { ...newProposals[index], [field]: value };
        setProposals(newProposals);

        // Validate based on field type and update errors
        let newErrors = {};
        if (field === 'startTime') {
            newErrors = validateTimes(index, value, newProposals[index].endTime);
        } else if (field === 'endTime') {
            newErrors = validateTimes(index, newProposals[index].startTime, value);
        }

        // Update the errors state with index-specific errors
        setptErrors(prevErrors => {
            // Merge new errors with existing ones, removing resolved errors
            const updatedErrors = { ...prevErrors, ...newErrors };

            // Remove errors for indices that are no longer present
            Object.keys(updatedErrors).forEach(key => {
                if (Object.keys(updatedErrors[key]).length === 0) {
                    delete updatedErrors[key];
                }
            });

            return updatedErrors;
        });
    };



    const handleSave = (index) => {
        // Implement save logic
        console.log('Saving proposal:', proposals[index]);
    };
    const handleRemove = (index) => {
        // Remove this proposal from the array
        setProposals(proposals.filter((_, i) => i !== index));
    };
    return (
        <>
            {
                selectedApplicantData?.interviewDetails?.seekerResponse?.status == "accepted" ?
                    <div className='-flex p-2'>
                        <div className='-flex mt-[10px]'>
                            <div className="left w-[150px] min-h-[30px] -flex- -flex-col -gap-[10px]">
                                <button className=" bg-[#FFCB05] px-[20px] w-[300px] py-[8px] border border-[#D8D7D7] h-[43px] rounded-[5px]">{adjustedDatee} | {startTime} - {endTime}</button>
                            </div>
                        </div>
                    </div>
                    : proposals?.map((proposal, index) => (
                        <div key={index} className='mt-[20px]'>
                            <div className='flex items-center gap-[15px]'>
                                <div className='flex flex-col'>
                                    <label className='text-[15px]' htmlFor={`date-picker-${index}`}>Date:</label>
                                    <DatePicker
                                        id={`date-picker-${index}`}
                                        selected={proposal.date}
                                        onChange={(date) => handleChange(index, 'date', date)}
                                        dateFormat="MMMM d, yyyy"
                                        minDate={new Date()}
                                        className={`react-datepicker__input-container font-[500] w-[140px] h-[46px] rounded-[6px] border text-[18px] px-[10px]`}
                                        placeholderText='Select Date'
                                        disabled={disabled}

                                    />
                                    {formErrors2[index]?.date ? (
                                        <div className="text-red-500">{formErrors2[index].date}</div>
                                    ) : null}
                                    {/* {formErrors?.date ? (<div className="text-red-500">{formErrors?.date}</div>) : null} */}
                                </div>
                                <div>
                                    <label className='text-[15px]' htmlFor={`start-time-${index}`}>Start Time:</label>
                                    <Select
                                        styles={customStylesSelect}
                                        id={`start-time-${index}`}
                                        className="react-select font-[500] w-[160px] text-[16px] -height"
                                        classNamePrefix="All"
                                        options={timeOptions}
                                        value={timeOptions.find(option => option.value === proposal.startTime)}
                                        onChange={(option) => handleChange(index, 'startTime', option ? option.value : '')}
                                        placeholder="Select Time"
                                        isDisabled={disabled}

                                    />
                                    {formErrors2[index]?.startTime ? (
                                        <div className="text-red-500">{formErrors2[index].startTime}</div>
                                    ) : pterrors[index]?.startTime ? (
                                        <div className="text-red-500">{pterrors[index].startTime}</div>
                                    ) : null}
                                    {/* {formErrors.startTime ? (<div className="text-red-500">{formErrors.startTime}</div>) : null} */}
                                </div>
                                <p className=''>-</p>
                                <div>
                                    <label className='text-[15px]' htmlFor={`end-time-${index}`}>End Time:</label>
                                    <Select
                                        id={`end-time-${index}`}
                                        styles={customStylesSelect}
                                        className="react-select font-[500] w-[160px] text-[16px]"
                                        classNamePrefix="All"
                                        options={timeOptions2}
                                        value={timeOptions2.find(option => option.value === proposal.endTime)}
                                        onChange={(option) => handleChange(index, 'endTime', option ? option.value : '')}
                                        placeholder="Select Time"
                                        isDisabled={disabled}

                                    />
                                    {formErrors2[index]?.endTime ? (
                                        <div className="text-red-500">{formErrors2[index].endTime}</div>
                                    ) : pterrors[index]?.endTime ? (
                                        <div className="text-red-500">{pterrors[index].endTime}</div>
                                    ) : null}
                                    {/* {formErrors.endTime ? (<div className="text-red-500">{formErrors.endTime}</div>) : null} */}
                                </div>
                                {proposals?.length !== 1 && !disabled && <div className='flex justify-end items-center'>
                                    <img
                                        className='cursor-pointer h-[20px]'
                                        src="/assets/images/employer-images/cross-icon.svg"
                                        alt="Remove"
                                        onClick={() => handleRemove(index)}
                                    />
                                </div>}
                            </div>
                        </div>

                    ))
            }
            {!disabled && <span className='cursor-pointer flex gap-[8px] mt-[10px]' >
                <img className='h-[20px]' src="/assets/images/employer-images/propose-time-plus-icon.svg" alt="" onClick={handleAddProposal} />
                <p className='text-[15px]' onClick={handleAddProposal}>Propose more time</p>
            </span>}
        </>
    );
}

export default InterviewProposeTime;
