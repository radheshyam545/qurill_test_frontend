import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { customStylesSelect } from "../../components/ReactSelectStyle";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



function InterviewFixedSchedule({ disabled, fErrors2,setFErrors2,fErrors, handleDateChange, date, handleSelectChange, fValues }) {
    const [startDate, setStartDate] = useState(new Date());



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
        setFErrors2(errors);
        return errors;
    };

    const handleTimeChange = (type, option) => {
        const newTime = option ? option.value : '';
        const updatedValues = { ...fValues, [type]: newTime };
        
        // Update the state
        handleSelectChange(type, option);

        if (type === 'startTime') {
            validateTimes(newTime, fValues.endTime);
        } else if (type === 'endTime') {
            validateTimes(fValues.startTime, newTime);
        }
    };


    const timeOptions = getTimeOptions();
    const timeOptions2 = getTimeOptions2();

    return (
        <>
            <div className='mt-[20px]'>
                <div className='flex flex-wrap items-center gap-[15px]'>
                    <div className='flex flex-col fixed-schedule-inputs'>
                        <label className='text-[15px]' htmlFor="">Date:</label>
                        {/* <Select
                    styles={customStylesSelect}
                    className="react-select font-[500] w-[140px] -text-[18px] -height"
                    classNamePrefix="All"
                    options={[{ value: " ", label: "" }]} // Corrected options syntax
                    isSearchable={true}
                    placeholder=""
                /> */}
                        <DatePicker
                            disabled={disabled}
                            id="date-picker"
                            selected={date}
                            minDate={new Date()}

                            // onChange={(date) => setStartDate(date)}
                            onChange={(value) => handleDateChange("date",value)}
                            dateFormat="MMMM d, yyyy"
                            className={`react-datepicker__input-container font-[500]  w-[140px] h-[46px] rounded-[6px] border text-[15px] px-[10px]`}
                            placeholderText='Select Date'
                        />
                        {fErrors?.date ? (<div className="text-red-500">{fErrors?.date}</div>) : null}

                    </div>
                    <div className='fixed-schedule-inputs'>
                        <label className='text-[15px]' htmlFor="">Start Time:</label>
                        <Select
                            styles={customStylesSelect}
                            className="react-select font-[500] w-[160px] fixed-schedule-inputs text-[15px] -height"
                            classNamePrefix="All"
                            options={timeOptions} // Corrected options syntax
                            isSearchable={true}
                            value={timeOptions.find(option => option?.value === fValues?.startTime)}
                            onChange={(option) => handleTimeChange('startTime', option)}
                            placeholder="Select Time"
                            isDisabled={disabled}

                        />
                        {fErrors?.startTime ? (<div className="text-red-500">{fErrors?.startTime}</div>) : (<div className="text-red-500">{fErrors2?.startTime}</div>)}
                    </div>

                    <p className='mt-[22px] d-none'>-</p>
                    <div className='fixed-schedule-inputs'>
                        <label className='text-[15px]' htmlFor="">End Time:</label>
                        <Select
                            styles={customStylesSelect}
                            className="react-select font-[500] fixed-schedule-inputs w-[160px] text-[15px] -height"
                            classNamePrefix="All"
                            options={timeOptions2} // Corrected options syntax
                            isSearchable={true}
                            value={timeOptions2.find(option => option?.value === fValues?.endTime)}
                            onChange={(option) => handleTimeChange('endTime', option)}
                            placeholder="Select Time"
                            isDisabled={disabled}
                        />
                        {fErrors?.endTime ? (<div className="text-red-500">{fErrors?.endTime}</div>) : (<div className="text-red-500">{fErrors2?.endTime}</div>)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default InterviewFixedSchedule;
