import React, { useEffect, useState } from 'react'
import MiniDoughnutForEmployer from '../../employerComponents/EChart/MiniDoughnutForEmployer'
import Select from "react-select";
import InterviewProposeTime from '../../employerComponents/JobDetails/InterviewProposeTime';
import InterviewRequestAvailability from '../../employerComponents/JobDetails/InterviewRequestAvailability';
import InterviewFixedSchedule from '../../employerComponents/JobDetails/InterviewFixedSchedule';
import InterviewTypeInperson from '../../employerComponents/JobDetails/InterviewTypeInperson';
import InterviewTypeVideo from '../../employerComponents/JobDetails/InterviewTypeVideo';
import InterviewTypePhone from '../../employerComponents/JobDetails/InterviewTypePhone';
import { customStylesSelect } from "../../components/ReactSelectStyle";
import moment from 'moment-timezone';
import { postCall } from '../../app/axiosConfig';
import { notifyStatus } from '../../app/toaster';
import CustomOverlay from '../../containers/CustomOverlay';
const addOneDay = (date) => {
    if (!date) return date;
    return moment(date).add(0, 'days').format('YYYY-MM-DD');
};
function InterviewModal({ disabled, getJobData, payloadRes, payload, setPayload, jobs, jobId, userId, interview, setInterviewTypeBtn, setInterviewTimeBtn, setInterview, interviewTypeBtn, interviewTimeBtn,selectedApplicantData, customStyles }) {
    console.log("proposals=====>inn", payloadRes)

    const [isLoadingData, setIsLoadingData] = useState(false);
    const getTimeZoneOptions = () => {
        const timeZoneNames = moment?.tz?.names();
        return timeZoneNames?.map(zone => {
            const offset = moment?.tz(zone)?.format('Z');
            const label = `UTC${offset} · ${zone.replace('_', ' ').split('/').pop()}`;
            return { value: zone, label };
        });
    };
    const timeZoneOptions = getTimeZoneOptions();
    const [proposals, setProposals] = useState([{ date: '', startTime: '', endTime: '' }]);
    const [contentArray, setContentArray] = useState({ timeZone: '', content: [] });
    const [formErrors, setFormErrors] = useState({});
    const [formErrors2, setFormErrors2] = useState({ key: '1' });
    // const [formValues, setFormValues] = useState({ timeZone: '', content: [] });
    const [pterrors, setptErrors] = useState({});
    const [personErrors, setPersonErrors] = useState({ key: null});
    const [personValues, setPersonValues] = useState(payloadRes?.interviewType?.inPerson);
    const [videoErrors, setVideoErrors] = useState({ key: null });
    const [videoValues, setVideoValues] = useState(payloadRes?.interviewType?.video);
    const [phoneErrors, setPhoneErrors] = useState({ key: null });
    const [phoneValues, setPhoneValues] = useState(payloadRes?.interviewType?.phone);
    const [isEditingContent, setIsEditingContent] = useState(false);
    const [tempIndex, setTempIndex] = useState(null);
    useEffect(() => {

        if (payload?.jobId && payload?.userId) {
            apiCallFun();
        }
    }, [payload]);
    const apiCallFun = async () => {
        try {
            setIsLoadingData(true);
            // alert("called")
            // console.log("payloadjjjj",payload)
            const response = await postCall('/jobs/send-interview-proposal', payload);
            const { status } = response;

            if (status === 200) {
                getJobData();
                setInterview(!interview)
                console.log('Status Updated Successfully');
                notifyStatus("Status Updated Successfully")
            }
        } catch (error) {
            console.error('Error fetching job data:', error);
        } finally {
            setIsLoadingData(false);
        }
    };

    const func2 = () => {
        const errors = {};
        proposals.forEach((item, index) => {
            const error = {};
            // Convert values to strings and then trim
            const dateStr = String(item.date || '').trim();
            const startTimeStr = String(item.startTime || '').trim();
            const endTimeStr = String(item.endTime || '').trim();
            if (!dateStr) { error.date = 'Date is required'; }
            if (!startTimeStr) { error.startTime = 'Start time is required'; }
            if (!endTimeStr) { error.endTime = 'End time is required'; }
            if (Object.keys(error).length > 0) { errors[index] = error; }
        });
        setFormErrors2(errors);
    };
    const [tempVal, setTempVal] = useState('');
    console.log(formErrors,"proposals=====>")

    const handleSelectChange1 = (fieldName, option) => {

        setContentArray(prev => ({
            ...prev,
            [fieldName]: option ? option.label : ''
        }));
        setFormErrors(prev => {
        console.log(formErrors,"proposals=====>in")

            // Only remove the error if it exists
            if (prev[fieldName]) {
                const { [fieldName]: _, ...rest } = prev;
                return rest;
            }
            return prev; // Return previous state if no error to remove
            
        });
        console.log(formErrors,"proposals=====>in")

    }
    const [resTime, setResTime] = useState(payloadRes?.timeZone);
    const [pErrors, setPErrors] = useState({ key: '1' });
    const [pErrors2, setPErrors2] = useState({ startTime: '', endTime: '' });
    const [fErrors2, setFErrors2] = useState({ startTime: '', endTime: '' });
    const [rErrors2, setRErrors2] = useState({ startTime: '', endTime: '' });
    const [rErrors3, setRErrors3] = useState({ startTime: '', endTime: '' });
    const [pValues, setPValues] = useState(payloadRes?.time?.proposedTime);
    const [rErrors, setRErrors] = useState({});
    const [rValues, setRValues] = useState(payloadRes?.time?.requestAvailability);
    const [fErrors, setFErrors] = useState({});
    const [fValues, setFValues] = useState(payloadRes?.time?.fixedTime);
    console.log(fValues,"qwqwqwqwqwqwval")
    console.log(payload,"qwqwqwqwqwqwpay")

    let firstSetConditionMet = false;
    let secondSetConditionMet = false;
    let thirdSetConditionMet = false;

    const func = async () => {
        console.log("proposals=====>1")

        func2();
        console.log("proposals=====>2")
        const errors = {};

        contentArray.content.map((item, index) => {
            if (!item.trim()) { // Use `trim()` on the string item directly
                errors[index] = 'Save the Content';
            }
            return item;
        });

        console.log("proposals=====>3")

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        }

        console.log("proposals=====>4")

        if (!contentArray.timeZone) errors.timeZone = 'Time Zone is required';

        setFormErrors(errors);


        if (interviewTimeBtn == '3') {
            const errors3 = {};
            if (!fValues?.date) errors3.date = 'Date is required';
            if (!fValues?.startTime) errors3.startTime = 'Start time is required';
            if (!fValues?.endTime) errors3.endTime = 'End time is required';
            setFErrors(errors3);
            const areAllValuesValid = Object?.values(fValues)?.every(value => value !== '');
            const areAllValuesNull = Object?.values(fErrors)?.every(value => value === null);
            const areAllValuesNull2 = Object?.values(fErrors2)?.every(value => value === null);
            if (areAllValuesValid && areAllValuesNull && areAllValuesNull2 && Object.keys(fErrors).length === 0 && Object.keys(fErrors2).length === 0) {
                firstSetConditionMet = true;
            }
        }
        else if (interviewTimeBtn == '1') {
            const errors1 = {};
            if (!pValues?.date) errors1.date = 'Date is required';
            if (!pValues?.startTime) errors1.startTime = 'Start time is required';
            if (!pValues?.endTime) errors1.endTime = 'End time is required';
            setPErrors(errors1);
            const areAllValuesValid = Object?.values(proposals)?.every(value => value !== '');
            const areAllValuesNull = Object?.values(formErrors2)?.every(value => value === null);
            const areAllValuesNull2 = Object?.values(pterrors)?.every(value => value === null);
            if (areAllValuesValid && areAllValuesNull && areAllValuesNull2 && Object.keys(formErrors2).length === 0) {
                firstSetConditionMet = true;
            }
        }
        else if (interviewTimeBtn == '2') {
            const errors2 = {};
            if (!rValues?.duration) errors2.duration = 'Duration time is required';
            if (!rValues?.startDate) errors2.startDate = 'Start date is required';
            if (!rValues?.endDate) errors2.endDate = 'End date is required';
            if (!rValues?.startTime) errors2.startTime = 'Required';
            if (!rValues?.endTime) errors2.endTime = 'Required';
            setRErrors(errors2);
            const areAllValuesValid = Object?.values(rValues)?.every(value => value !== '');
            const areAllValuesNull = Object?.values(rErrors)?.every(value => value === null);
            const areAllValuesNull2 = Object?.values(rErrors2)?.every(value => value === null);
            const areAllValuesNull3 = Object?.values(rErrors3)?.every(value => value === null);
            if (areAllValuesValid && areAllValuesNull && areAllValuesNull2 && areAllValuesNull3 && Object.keys(rErrors).length === 0 && Object.keys(rErrors2).length === 0) {
                firstSetConditionMet = true;
            }
        }
        if (interviewTypeBtn == '1') {
            const errors1 = {};
            if (!personValues.address) errors1.address = 'Required';
            if (!personValues.message) errors1.message = 'Required';
            setPersonErrors(errors1);
            const areAllValuesValid = Object?.values(personValues)?.every(value => value !== '');
            const areAllValuesNull = Object?.values(errors1)?.every(value => value === null);
            console.log(areAllValuesValid, "dfdfdfd", areAllValuesNull, "sdsds", personErrors === null, "fdfd", Object.keys(personErrors).length === 0)
            console.log('proposals=====>2', areAllValuesValid, areAllValuesNull)
            if (areAllValuesValid && areAllValuesNull) {
                secondSetConditionMet = true;
            }
        }
        
        else if (interviewTypeBtn == '2') {
            const errors1 = {};
            if (!videoValues.meetingLink) errors1.meetingLink = 'Required';
            if (!videoValues.message) errors1.message = 'Required';
            setVideoErrors(errors1);
            const areAllValuesValid = Object?.values(videoValues)?.every(value => value !== '');
            const areAllValuesNull = Object?.values(errors1)?.every(value => value === null);
            console.log('proposals=====>2', areAllValuesValid, areAllValuesNull)

            if (areAllValuesValid && areAllValuesNull) {
                secondSetConditionMet = true;
            }
        }
        else if (interviewTypeBtn == '3') {
            const errors1 = {};
            if (!phoneValues.phone) errors1.phone = 'Required';
            if (!phoneValues.pin) errors1.pin = 'Required';
            if (!phoneValues.message) errors1.message = 'Required';
            setPhoneErrors(errors1);
            const areAllValuesValid = Object?.values(phoneValues)?.every(value => value !== '');
            const areAllValuesNull = Object?.values(errors1)?.every(value => value === null);
            console.log('proposals=====>2', areAllValuesValid, areAllValuesNull)

            if (areAllValuesValid && areAllValuesNull) {
                secondSetConditionMet = true;
            }
        }

        if (errors === null || Object.keys(errors).length === 0) {
            thirdSetConditionMet = true;
        }
console.log(payload,"ljljljljljljl")
        const areAllValuesEmpty = () => contentArray.timeZone?.trim() === '' || contentArray.timeZone?.trim() === null && contentArray.content.length === 0 || contentArray.content.some(item => Object.values(item).includes(null))
        let areAllValuesValid = !areAllValuesEmpty();
        console.log('proposals=====>', firstSetConditionMet, secondSetConditionMet, areAllValuesValid, thirdSetConditionMet)
        if (firstSetConditionMet && secondSetConditionMet && areAllValuesValid && thirdSetConditionMet) {
            setPayload(prev => ({ ...prev, employerProposal: { ...prev?.employerProposal, timeZone: contentArray?.timeZone } }));
            setPayload(prev => ({ ...prev, employerProposal: { ...prev?.employerProposal, content: contentArray?.content.map(item => item) } }));
            setPayload(prevPayload => ({ ...prevPayload, jobId: jobId, userId: userId }));
            if (interviewTimeBtn === '1') {
                setPayload(prev => ({ ...prev, employerProposal: { ...prev?.employerProposal, time: { ...prev?.employerProposal?.time, proposedTime: proposals, requestAvailability: {}, fixedTime: {} } } }));
            } else if (interviewTimeBtn === '2') {
                setPayload(prev => ({ ...prev, employerProposal: { ...prev?.employerProposal, time: { ...prev?.employerProposal?.time, requestAvailability: rValues, fixedTime: {}, proposedTime: [], } } }));
            } else if (interviewTimeBtn === '3') {
                // const isoString = new Date(fValues).toISOString();
                setPayload(prev => ({ ...prev, employerProposal: { ...prev?.employerProposal, time: { ...prev?.employerProposal?.time, fixedTime: fValues, requestAvailability: {}, proposedTime: [], } } }));
            }
            if (interviewTypeBtn === '1') {
                setPayload(prev => ({ ...prev, employerProposal: { ...prev?.employerProposal, interviewType: { ...prev?.employerProposal?.interviewType, inPerson: personValues, video: {}, phone: {} } } }));
            } else if (interviewTypeBtn === '2') {
                setPayload(prev => ({ ...prev, employerProposal: { ...prev?.employerProposal, interviewType: { ...prev?.employerProposal?.interviewType, video: videoValues, inPerson: {}, phone: {} } } }));
            } else if (interviewTypeBtn === '3') {
                setPayload(prev => ({ ...prev, employerProposal: { ...prev?.employerProposal, interviewType: { ...prev?.employerProposal?.interviewType, phone: phoneValues, inPerson: {}, video: {} } } }));
            }
            // window.alert("Success");
        } else {
            console.log("Conditions not met");
        }
    }
    console.log(payload, "payload11")

    const handleDateChange = (name, date) => {
        if (interviewTimeBtn == '3') {
            // const isoString = new Date(date).toISOString();
            // const adjustedDatee = addOneDay(isoString);
            setFValues(prev => ({
                ...prev,
                [name]: date
            }));
            if (fErrors?.date) {
                setFErrors(prev => { const { [name]: _, ...rest } = prev; return rest; });
            }
        }
        if (interviewTimeBtn == '1') {
            const isoString = new Date(date).toISOString();
            const adjustedDatee = addOneDay(isoString);
            setPValues(prev => ({
                ...prev,
                [name]: adjustedDatee
            }));
            if (pErrors?.date) {
                setPErrors(prev => { const { [name]: _, ...rest } = prev; return rest; });
            }
        }
        if (interviewTimeBtn == '2') {
            // const isoString = new Date(date).toISOString();
            // const adjustedDatee = addOneDay(isoString);
            setRValues(prev => ({
                ...prev,
                [name]: date
            }));
            if (rErrors?.startDate) {
                setRErrors(prev => { const { [name]: _, ...rest } = prev; return rest; });
            }
            if (rErrors?.endDate) {
                setRErrors(prev => { const { [name]: _, ...rest } = prev; return rest; });
            }
        }
    };
    const handleSelectChange = (fieldName, option) => {
        if (interviewTimeBtn == '3') {
            setFValues(prev => ({
                ...prev,
                [fieldName]: option ? option.value : ''
            }));
            if (fErrors[fieldName]) {
                setFErrors(prev => { const { [fieldName]: _, ...rest } = prev; return rest; });
            }
        }
        if (interviewTimeBtn == '1') {
            setPValues(prev => ({
                ...prev,
                [fieldName]: option ? option.value : ''
            }));
            if (pErrors[fieldName]) {
                setPErrors(prev => { const { [fieldName]: _, ...rest } = prev; return rest; });
            }
        }
        if (interviewTimeBtn == '2') {
            setRValues(prev => ({
                ...prev,
                [fieldName]: option ? option.value : ''
            }));
            if (rErrors[fieldName]) {
                setRErrors(prev => { const { [fieldName]: _, ...rest } = prev; return rest; });
            }
        }
    };
    const handleInterviewTypeChange = (name, date) => {
        if (interviewTypeBtn === '1') {
            setPersonValues(prev => ({
                ...prev,
                [name]: date
            }));
            if (personErrors.address) {
                setPersonErrors(prev => { const { [name]: _, ...rest } = prev; return rest; });
            }
            if (personErrors.message) {
                setPersonErrors(prev => { const { [name]: _, ...rest } = prev; return rest; });
            }
        }
        else if (interviewTypeBtn === '2') {
            setVideoValues(prev => ({
                ...prev,
                [name]: date
            }));
            if (videoErrors.meetingLink) {
                setVideoErrors(prev => { const { [name]: _, ...rest } = prev; return rest; });
            }
            if (videoErrors.message) {
                setVideoErrors(prev => { const { [name]: _, ...rest } = prev; return rest; });
            }
        }
        else if (interviewTypeBtn === '3') {
            setPhoneValues(prev => ({
                ...prev,
                [name]: date
            }));
            if (phoneErrors.phone) {
                setPhoneErrors(prev => { const { [name]: _, ...rest } = prev; return rest; });
            }
            if (phoneErrors.pin) {
                setPhoneErrors(prev => { const { [name]: _, ...rest } = prev; return rest; });
            }
            if (phoneErrors.message) {
                setPhoneErrors(prev => { const { [name]: _, ...rest } = prev; return rest; });
            }
        }
    };
    // console.log("PayloadContent:1", payloadRes?.content);

    useEffect(() => {
        if (payloadRes) {
            setPersonValues(payloadRes?.interviewType?.inPerson);
            console.log("personValues2", payloadRes?.interviewType?.inPerson)
            setVideoValues(payloadRes?.interviewType?.video);
            setPhoneValues(payloadRes?.interviewType?.phone);
            setRValues(payloadRes?.time?.requestAvailability)
            setFValues(payloadRes?.time?.fixedTime)
            setResTime(payloadRes?.timeZone);
            let _arrContentArray = { ...contentArray };
            const updatedContentArray = {
                ..._arrContentArray, timeZone: payloadRes?.timeZone, content: Array.isArray(payloadRes?.content)
                    ? [...payloadRes.content]
                    : _arrContentArray.content
            };
            // content: Array.isArray(payloadRes?.content) 
            // ? [...payloadRes.content] 
            // : _arrContentArray.content  };
            setContentArray(updatedContentArray);
            //proposedTime is not empty 
            if (payloadRes?.time?.proposedTime?.length > 0) {

                setProposals(payloadRes?.time?.proposedTime)
            }
        }
    }, [payloadRes, payload]);


    const selectOptions = contentArray.content.map(item => ({
        value: item.id,
        label: item.text || "Default Label"
    }));
    
    const handleEdit = (index) => {     
        setTempIndex(index);
        setTempVal(contentArray.content[index]);
        setIsEditingContent(true);
    };

    const handleSave = () => {
        if (tempVal.trim() === '') {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                [tempIndex]: 'Content cannot be empty'
            }));
        } else {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                [tempIndex]: ''
            }));
            setContentArray(prevState => ({
                ...prevState,
                content: prevState.content.map((item, i) => i === tempIndex ? tempVal : item)
            }));
            setTempIndex(null);
            setTempVal('');
            setIsEditingContent(false);
        }
    };


    const handleRemove = (index) => {
        setContentArray(prevState => ({
            ...prevState,
            content: prevState.content.filter((_, i) => i !== index)
        }));
        setFormErrors(prev => {
            const { [index]: _, ...rest } = prev;
            return rest;
        });
        setIsEditingContent(false)
    };

    const handleAddContent = () => {
        setContentArray(prevState => ({
            ...prevState,
            content: [...prevState.content, '']
        }));
        const newIndex = contentArray.content.length
        setTempIndex(newIndex);
        setTempVal('');
        setIsEditingContent(true);
    };

    const tempHandleChange = (index, value) => {
        setTempVal(value);
        setContentArray(prevState => ({
            ...prevState,
            content: prevState.content.map((item, i) => i === index ? value : item)
        }));
        setFormErrors(prev => {
            const { [index]: _, ...rest } = prev;
            return rest;
        });

    };
    return (
        <div className={` ${interview ? '' : 'hide'} w-[100%] flex items-center justify-center fixed -max-w-[1600px] top-0 left-0 w-full h-full z-50 `}>
            <CustomOverlay isLoading={isLoadingData} />
            <div className="bg-gray-900 bg-opacity-50 fixed inset-0  z-[6]"></div>
            <div className='w-[50%] job-details-interview-modal h-[80%] px-5 py-[20px] max-w-[1500px] bg-white rounded-xl  absolute z-[7] shadow-2xl relative overflow-y-scroll overflow-x-hidden '>
                <button className=" h-[25px] w-[25px] -font-bold rounded-[50%] bg-[#afc4b5] absolute right-3 top-2" onClick={() => setInterview(!interview)}>X</button>
                {/* <table className="table w-full  overflow-x-auto -text-[12px] -border-dotted mt-[60px]">
                <tbody className='mt-[20px] '>
                    <tr className=" border rounded-[10px] -cursor-pointer -under-shadow w-full flex justify-between px-[20px] items-center -hover:scale-[1.01] h-[110px]"  >
                        <td className="--text-[16px]  bg-white rounded-l-[15px] ">
                            <span className='-flex -items-centers'>
                                <p className='font-semibold -text-[16px] text-nowrap'>Matthew Stafford
                                </p>
                                <p className='text-nowrap'>Dallas, Taxas, USA</p>
                                <p className='text-nowrap'>03 Aug, 2023</p>
                            </span>
                        </td>
                        <td className=" text-center -text-[16px] bg-white">
                            <p className='font-[500] text-nowrap'>3 years</p>
                        </td>
                        <td className=" text-center -text-[16px] bg-white -bg-[red] ">
                            <div className='text-center'>
                                <MiniDoughnutForEmployer value={"75%"} />
                            </div>
                        </td>
                        <td className="-text-[16px] bg-white  z-[99999]">
                            <Select
                                styles={customStyles}
                                className="inline-flex  py-[5px] px-4 rounded-xl font-semibold transition-colors duration-100"
                                classNamePrefix="All"
                                value={''}
                                options={[
                                    { value: "0", label: "Shortlist" },
                                    { value: "1", label: "Screened" },
                                    { value: "2", label: "Interview" },
                                    { value: "3", label: "Offer" },
                                    { value: "4", label: "Hire" }
                                ]}
                                isSearchable={false}
                                placeholder="Interviewed"
                            // onChange={handleSelectChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table> */}
                <div className='-h-[50px] w-full py-[10px] px-[30px] border rounded-[10px] mt-[40px]'>
                    <h2 className='font-bold text-[15px]'>Interview</h2>
                    <p className='font-bold text-[15px] mt-[8px]'>Date | Time</p>
                    <div className='mt-[20px] -flex -items-center gap-[8px]'>
                        <p className='font-[500] text-[15px]'>Time zone :</p>
                        <Select
                            isDisabled={disabled}
                            styles={customStylesSelect}
                            className="react-select font-[500] request-availibility-inputs w-[240px] -text-[18px] -height"
                            classNamePrefix="All"
                            options={timeZoneOptions} // Corrected options syntax
                            isSearchable={true}
                            value={timeZoneOptions?.find(option => option?.label === contentArray?.timeZone)}
                            onChange={(option) => handleSelectChange1('timeZone', option)}
                            placeholder="Time Zone"
                        />
                        {formErrors?.timeZone ? (<div className="text-red-500">{formErrors?.timeZone}</div>) : null}

                    </div>
                    <div className='flex gap-[8px] mt-[22px]'>
                        <button disabled={disabled} onClick={() => { setInterviewTimeBtn("1") }} className={` ${interviewTimeBtn === "1" ? 'bg-[#FFCB05]' : ''} text-[15px] px-[25px] py-[10px] border border-[#D8D7D7] rounded-[5px]`}>Propose Time</button>
                        <button disabled={disabled} onClick={() => { setInterviewTimeBtn("2") }} className={` ${interviewTimeBtn === "2" ? 'bg-[#FFCB05]' : ''} text-[15px] px-[25px] py-[10px] border border-[#D8D7D7] rounded-[5px]`}>Request Availability</button>
                        <button disabled={disabled} onClick={() => { setInterviewTimeBtn("3") }} className={` ${interviewTimeBtn === "3" ? 'bg-[#FFCB05]' : ''} text-[15px] px-[25px] py-[10px] border border-[#D8D7D7] rounded-[5px]`}>Fixed Schedule</button>
                    </div>
                    {interviewTimeBtn === "1" && <InterviewProposeTime selectedApplicantData={selectedApplicantData} disabled={disabled} pterrors={pterrors} setptErrors={setptErrors} formErrors2={formErrors2} setFormErrors2={setFormErrors2} proposals={proposals} setProposals={setProposals} pErrors2={pErrors2} setPErrors2={setPErrors2} pErrors={pErrors} pValues={pValues} handleDateChange={handleDateChange} date={pValues?.date} handleSelectChange={handleSelectChange} />}
                    {interviewTimeBtn === "2" && <InterviewRequestAvailability selectedApplicantData={selectedApplicantData} disabled={disabled} setRErrors2={setRErrors2} rErrors2={rErrors2} setRErrors3={setRErrors3} rErrors3={rErrors3} rErrors={rErrors} handleDateChange={handleDateChange} sDate={rValues?.startDate} eDate={rValues?.endDate} rValues={rValues} handleSelectChange={handleSelectChange} />}
                    {interviewTimeBtn === "3" && <InterviewFixedSchedule disabled={disabled} fErrors2={fErrors2} setFErrors2={setFErrors2} fErrors={fErrors} handleDateChange={handleDateChange} date={fValues?.date} handleSelectChange={handleSelectChange} fValues={fValues} />}
                    <div className='mt-[20px]'>
                        <p className='text-[15px] font-bold'>Interview Type</p>
                        <div className='flex gap-[8px] mt-[22px]'>
                            <button disabled={disabled} onClick={() => { setInterviewTypeBtn("1") }} className={` ${interviewTypeBtn === "1" ? 'bg-[#FFCB05]' : ''} text-[15px] px-[55px] py-[10px] border border-[#D8D7D7] rounded-[5px]`}>In-Person</button>
                            <button disabled={disabled} onClick={() => { setInterviewTypeBtn("2") }} className={` ${interviewTypeBtn === "2" ? 'bg-[#FFCB05]' : ''} text-[15px] px-[55px] py-[10px] border border-[#D8D7D7] rounded-[5px]`}>Video</button>
                            <button disabled={disabled} onClick={() => { setInterviewTypeBtn("3") }} className={` ${interviewTypeBtn === "3" ? 'bg-[#FFCB05]' : ''} text-[15px] px-[55px] py-[10px] border border-[#D8D7D7] rounded-[5px]`}>Phone</button>
                        </div>
                        {interviewTypeBtn === "1" && <InterviewTypeInperson disabled={disabled} handleInterviewTypeChange={handleInterviewTypeChange} personErrors={personErrors} personValues={personValues} />}
                        {interviewTypeBtn === "2" && <InterviewTypeVideo disabled={disabled} handleInterviewTypeChange={handleInterviewTypeChange} videoErrors={videoErrors} videoValues={videoValues} />}
                        {interviewTypeBtn === "3" && <InterviewTypePhone disabled={disabled} handleInterviewTypeChange={handleInterviewTypeChange} phoneErrors={phoneErrors} phoneValues={phoneValues} />}
                    </div>
                    {<div className='mt-[20px]'>
                        <p className='font-bold text-[15px]'>Content</p>
                        {contentArray.content.map((item, index) => (
                            <div key={index} className='mb-[10px]'>
                                <span className='flex'>
                                    <input
                                        className='border-l border-t outline-none px-[12px] border-b h-[35px] w-[400px] rounded-l-[5px] text-[15px] font-[500] text-[black] content-inputs'
                                        type="text"
                                        // value={index === tempIndex ? tempVal : item}
                                        value={item}
                                        onChange={(e) => tempHandleChange(index, e.target.value)}
                                        disabled={index !== tempIndex}
                                    />
                                    <div className='border-r border-t border-b h-[35px] w-[70px] pl-[20px] pr-[10px] rounded-r-[5px] flex items-center gap-[12px]'>
                                        {!disabled && <img className='cursor-pointer' src="/assets/images/employer-images/interview-content-edit-icon.svg" alt="Edit" onClick={() => { handleEdit(index); }} />}
                                        {!disabled && <img className='cursor-pointer' src="/assets/images/employer-images/interview-content-delete-icon.svg" alt="Delete" onClick={() => handleRemove(index)} />}
                                    </div>
                                </span>
                                {formErrors[index] && (
                                    <div className="text-red-500">{formErrors[index]}</div>
                                )}
                                {isEditingContent && index === tempIndex && (
                                    <div className='flex justify-end w-[470px] mt-[15px]'>
                                        <div className='flex gap-[10px]'>
                                            <button
                                                className='px-[10px] py-[8px] rounded-[5px] text-[14px] bg-[#E2E2E2] font-bold'
                                                onClick={() => {
                                                    if (!contentArray.content[tempIndex].trim()) {
                                                        handleRemove(tempIndex);
                                                    } else {
                                                        setContentArray(prevState => ({
                                                            ...prevState,
                                                            content: prevState.content.map((item, i) => i === tempIndex ? item : item)
                                                        }));
                                                    }
                                                    setIsEditingContent(false);
                                                }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className='px-[10px] py-[8px] rounded-[5px] text-[14px] bg-[#FFCB05] font-bold'
                                                onClick={handleSave}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {!disabled && <span className='cursor-pointer flex gap-[8px] mt-[10px]'>
                            <img
                                className={`text-[20px] ${isEditingContent ? 'text-gray-500 cursor-not-allowed' : ''}`}
                                style={{ cursor: isEditingContent ? 'not-allowed' : 'pointer' }}
                                disabled={disabled && isEditingContent}
                                src="/assets/images/employer-images/propose-time-plus-icon.svg"
                                alt="Add"
                                onClick={() => { if (!isEditingContent) { handleAddContent(); } }}
                            />
                            <p
                                onClick={() => { if (!isEditingContent) { handleAddContent(); } }}
                                className={`text-[15px] ${isEditingContent ? 'text-gray-500 cursor-not-allowed' : ''}`}
                                style={{ cursor: isEditingContent ? 'not-allowed' : 'pointer' }}
                            >
                                Add Note</p>
                        </span>}
                        <div className='flex justify-end mt-[15px]'>
                            <div className='flex gap-[20px]'>
                                {!disabled && (<button onClick={() => { setInterview(!interview) }} className='px-[40px] py-[8px] rounded-[5px] text-[14px] bg-[#E2E2E2] font-bold '>Cancel</button>)}
                                {!disabled && (<button onClick={func} className='px-[40px] py-[8px] rounded-[5px] text-[14px] bg-[#FFCB05] font-bold '>Schedule</button>)}
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}
export default InterviewModal