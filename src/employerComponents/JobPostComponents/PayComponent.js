import React, { useEffect, useState } from 'react';
import { customStylesSelect } from "../../components/ReactSelectStyle";
import Select from "react-select";
import { selectFieldValue } from '../../app/helperFunction';
import { exectData, payData, rateData } from '../../pages/employerProtected/JobConsts';


const validateRange = (min, max) => min < max;
function PayComponent({ setTab, postJobData, setPostJobData }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
    const [errorMessageLessthen0, setErrorMessageLessthen0] = useState("");
    const [errorMessageLessthen01, setErrorMessageLessthen01] = useState("");
    const [checkDone, setCheckDone] = useState(true)
    const [checkDone2, setCheckDone2] = useState(true)
    let newMinimum = postJobData?.pay?.pay?.minimum;
    let newMaximum = postJobData?.pay?.pay?.maximum;
    let newMinimumExpectedHours = postJobData?.pay?.expectedHours?.minimum;
    let newMaximumExpectedHours = postJobData?.pay?.expectedHours?.maximum;
    useEffect(() => {
        if (postJobData?.pay?.pay?.showBy === 'range') {
            if (validateRange(newMinimum, newMaximum)) {
                setCheckDone(false);
                setErrorMessage("");
            } else {
                setCheckDone(true);
                setErrorMessage("Minimum value cannot be greater than Maximum value.");
            }
        } else {
            setCheckDone(false);
            setErrorMessage("");
        }
    }, [newMinimum, newMaximum, postJobData]);
    useEffect(() => {
        if (postJobData?.pay?.expectedHours?.showBy === 'range' && postJobData?.pay?.pay?.rateUnit === "per_hour") {
            if (validateRange(newMinimumExpectedHours, newMaximumExpectedHours)) {
                setCheckDone2(false);
                setErrorMessage2("");
            } else {
                setCheckDone2(true);
                setErrorMessage2("Minimum value cannot be greater than Maximum value.");
            }
        } else {
            setCheckDone2(false);
            setErrorMessage2("");
        }
    }, [newMinimumExpectedHours, newMaximumExpectedHours, postJobData]);
    const handleCancel = () => {
        if (checkDone) {
            setPostJobData(prev => ({
                ...prev,
                pay: {
                    pay: {
                        showBy: "range",
                        minimum: 0,
                        maximum: 0,
                        rateUnit: "per_day",
                    },
                    expectedHours: prev.pay.expectedHours
                }
            }));
        } else if (checkDone2) {
            setPostJobData(prev => ({
                ...prev,
                pay: {
                    pay: {
                        showBy: prev.pay.pay.showBy,
                        minimum: prev.pay.pay.minimum,
                        maximum: prev.pay.pay.maximum,
                        rateUnit: "per_day",
                    },
                    expectedHours: {
                        showBy: "range",
                        minimum: 0,
                        maximum: 0,
                    }
                }
            }));
        }
        setTab('0');

    }
    const handlePayByChange = (key, selectedOption, select = false, checkValue = "") => {
        if (checkValue === "value1") {
            const value = parseInt(selectedOption.target.value)
            if (value <= 0) {
                setErrorMessageLessthen0("Value must be greater then 0")
                return
            } else {
                setErrorMessageLessthen0("")
            }
        }
        if (select === true) {
            setPostJobData(prevData => ({
                ...prevData,
                pay: {
                    ...prevData.pay,
                    pay: {
                        ...prevData.pay.pay,
                        [key]: selectedOption?.value,
                        minimum: 0,
                        maximum: 0
                    }
                }
            }));
            resetRateValue();
        }
        else {
            if (postJobData?.pay?.pay?.showBy === 'range' && key !== 'rateUnit') {
                setPostJobData(prevData => ({
                    ...prevData,
                    pay: {
                        ...prevData.pay,
                        pay: {
                            ...prevData.pay.pay,
                            [key]: parseInt(selectedOption.target.value)
                        }
                    }
                }));
            }
            else if (postJobData?.pay?.pay?.showBy === 'starting_amount' && key !== 'rateUnit') {
                const value = parseInt(selectedOption.target.value) || 0;
                setPostJobData(prevData => ({
                    ...prevData,
                    pay: {
                        ...prevData.pay,
                        pay: {
                            ...prevData.pay.pay,
                            minimum: value,
                            maximum: 0
                        }
                    }
                }));
            }
            else if (postJobData?.pay?.pay?.showBy === 'maximum_amount' && key !== 'rateUnit') {
                const value = parseInt(selectedOption.target.value) || 0;
                setPostJobData(prevData => ({
                    ...prevData,
                    pay: {
                        ...prevData.pay,
                        pay: {
                            ...prevData.pay.pay,
                            minimum: 0,
                            maximum: value
                        }
                    }
                }));
            }
            else if (postJobData?.pay?.pay?.showBy === 'exact_amount' && key !== 'rateUnit') {
                const value = parseInt(selectedOption.target.value) || 0;
                setPostJobData(prevData => ({
                    ...prevData,
                    pay: {
                        ...prevData.pay,
                        pay: {
                            ...prevData.pay.pay,
                            maximum: value,
                            minimum: value
                        }
                    }
                }));
            }

            if (key === 'rateUnit') {
                setPostJobData(prevData => ({
                    ...prevData,
                    pay: {
                        ...prevData.pay,
                        pay: {
                            ...prevData.pay.pay,
                            [key]: selectedOption?.value
                        }
                    }
                }));
            }
        }


    };
    const handleShowByChange = (key, selectedOption, select = false, checkValue = "") => {
        if (checkValue === "value1") {
            const value = parseInt(selectedOption.target.value)
            if (value <= 0) {
                setErrorMessageLessthen01("Value must be greater then 0")
                return
            } else {
                setErrorMessageLessthen01("")
            }
        }
        if (select === true) {
            setPostJobData(prevData => ({
                ...prevData,
                pay: {
                    ...prevData.pay,
                    expectedHours: {
                        ...prevData.pay.expectedHours,
                        [key]: selectedOption?.value,
                        minimum: 0,
                        maximum: 0

                    }
                }
            }));
        }
        else {
            if (postJobData?.pay?.expectedHours?.showBy === 'range') {
                setPostJobData(prevData => ({
                    ...prevData,
                    pay: {
                        ...prevData.pay,
                        expectedHours: {
                            ...prevData.pay.expectedHours,
                            [key]: parseInt(selectedOption.target.value)
                        }
                    }
                }));
            }
            else if (postJobData?.pay?.expectedHours?.showBy === 'minimum') {
                const value = parseInt(selectedOption.target.value) || 0;
                setPostJobData(prevData => ({
                    ...prevData,
                    pay: {
                        ...prevData.pay,
                        expectedHours: {
                            ...prevData.pay.expectedHours,
                            minimum: value,
                            maximum: 0
                        }
                    }
                }));
            }
            else if (postJobData?.pay?.expectedHours?.showBy === 'maximum') {
                const value = parseInt(selectedOption.target.value) || 0;
                setPostJobData(prevData => ({
                    ...prevData,
                    pay: {
                        ...prevData.pay,
                        expectedHours: {
                            ...prevData.pay.expectedHours,
                            minimum: 0,
                            maximum: value
                        }
                    }
                }));
            }
            else if (postJobData?.pay?.expectedHours?.showBy === 'fixed_hours') {
                const value = parseInt(selectedOption.target.value) || 0;
                setPostJobData(prevData => ({
                    ...prevData,
                    pay: {
                        ...prevData.pay,
                        expectedHours: {
                            ...prevData.pay.expectedHours,
                            maximum: value,
                            minimum: value
                        }
                    }
                }));
            }
        }

    };
    const handleSubmit = () => {
        setTab('0')
    }

    const resetRateValue = () => {

        setPostJobData(prev => ({
            ...prev,
            pay: {
                pay: {
                    showBy: prev.pay.pay.showBy,
                    minimum: prev.pay.pay.minimum,
                    maximum: prev.pay.pay.maximum,
                    rateUnit: "per_day",
                },
                expectedHours: {
                    showBy: "range",
                    minimum: 0,
                    maximum: 0,
                }
            }
        }));
    }
    return (
        <>
            <div className={` min-h-[100vh]  z-[999] flex items-center justify-center w-[100%] fixed top-[0px] left-[0px] overlay-color`}>
                <div className='z-[1] relative min-h-[300px] -overflow-scroll -oerflow-y-scroll w-[800px] bg-[white] flex flex-col justify-between'>
                    <div className='flex items-center justify-between h-[40px] px-[30px] py-[30px] border-b'>
                        <p className='font-bold'>Edit the job post</p>

                        <img
                            onClick={handleCancel}
                            className="cursor-pointer h-[15px]"
                            src="/assets/images/employer-images/jobpostoverlaytabcross.svg"
                            alt=""
                        />
                    </div>
                    <div className=' pay-scroll relative z-[2]'>
                        <div className='py-[10px]'>
                            <div className='px-[20px]'>
                                <p className='font-[500]'>Pay</p>
                            </div>
                            <div className=' mt-[5px] grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 -flex-wrap -items-center -overflow-y-scroll -justify-between gap-[20px] px-[20px] z-[999999999]'>
                                <div className=''>
                                    <span className='font-[500]'>Show pay by</span>
                                    <div className='asas w-[150px] mt-[5px] '>
                                        <Select
                                            styles={customStylesSelect}
                                            className="react-select font-[500]"
                                            classNamePrefix="All"
                                            value={selectFieldValue(payData, postJobData?.pay?.pay?.showBy)}
                                            options={payData}
                                            isSearchable={true}
                                            placeholder="Range"
                                            onChange={(e) => handlePayByChange('showBy', e, true)}
                                        />
                                    </div>
                                </div>

                                {postJobData?.pay?.pay?.showBy === payData[0].value ?
                                    <>
                                        <div className='flex items-center -w-[100% gap-[0px] flex-wrap'>
                                            <div className='flex flex-col w-[100%]'>
                                                <span className='font-[500]'>Minimum</span>
                                                <div className='flex jj w-[100%'>
                                                    <input
                                                        className='w-[100%] px-[5px] font-semibold h-[48px] rounded-[8px] border-[#D8D8D8] mt-[5px] border'
                                                        type="number"
                                                        value={parseInt(postJobData?.pay?.pay?.minimum)}
                                                        onChange={(e) => handlePayByChange('minimum', e, false, "value1")}

                                                    />
                                                    <p className='font-[500] pt-[20px] text-[18px] -w-[50px] ml-[20px] pay-input-text-display-none'>to</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className='flex flex-col'>
                                                <span className='font-[500]'>Maximum</span>
                                                <input
                                                    className='w-[150px] px-[5px] font-semibold h-[48px] rounded-[8px] border-[#D8D8D8] mt-[5px] border'
                                                    type="number"
                                                    value={parseInt(postJobData?.pay?.pay?.maximum)}
                                                    onChange={(e) => handlePayByChange('maximum', e, false, "value1")}

                                                />
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <div className='flex items-center -w-[100% gap-[0px] flex-wrap'>
                                        <div className='flex flex-col w-[100%]'>
                                            <span className='font-[500]'>Amount</span>
                                            <div className='flex jj w-[100%'>
                                                <input
                                                    className='w-[100%] px-[5px] font-semibold h-[48px] rounded-[8px] border-[#D8D8D8] mt-[5px] border'
                                                    type="number"
                                                    value={parseInt(postJobData?.pay?.pay?.showBy === 'maximum_amount' ? postJobData?.pay?.pay?.maximum : postJobData?.pay?.pay?.minimum)}
                                                    onChange={(e) => handlePayByChange('', e, false, "value1")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div>
                                    <span className='font-[500]'>Rate</span>
                                    <div className='asas w-[150px] mt-[5px] ' >
                                        <Select
                                            styles={customStylesSelect}
                                            className="react-select font-[500]"
                                            classNamePrefix="All"
                                            value={selectFieldValue(rateData, postJobData?.pay?.pay?.rateUnit)}
                                            options={rateData}
                                            isSearchable={true}
                                            placeholder="Select"
                                            onChange={(e) => handlePayByChange('rateUnit', e, false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {errorMessage && <p className='text-[red] text-[13px] px-[20px]'>{errorMessage}</p>}
                        {errorMessageLessthen0 && <p className='text-[red] text-[13px] px-[20px]'>{errorMessageLessthen0}</p>}
                        {postJobData?.pay?.pay?.rateUnit == "per_hour" ? <div className='py-[10px]'>
                            <div className='px-[20px]'>
                                <p className='font-[500]'>Expected hours</p>
                            </div>
                            <div className=' mt-[5px] -flex grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4   items-center gap-[20px] px-[20px]'>
                                <div className='w-[100%]'>
                                    <span className='font-[500]'>Show by</span>
                                    <div className='-w-[150px] mt-[5px] w-[100%'>
                                        <Select
                                            styles={customStylesSelect}
                                            className="react-select font-[500]"
                                            classNamePrefix="All"
                                            value={selectFieldValue(exectData, postJobData?.pay?.expectedHours?.showBy)}
                                            options={exectData}
                                            isSearchable={true}
                                            placeholder="Range"
                                            onChange={(e) => handleShowByChange('showBy', e, true)}
                                        />
                                    </div>
                                </div>
                                {postJobData.pay.expectedHours.showBy === exectData[0].value ?
                                    <>
                                        <div className='flex items-center -w-[100% gap-[0px] flex-wrap'>
                                            <div className='flex flex-col w-[100%]'>
                                                <span className='font-[500]'>From</span>
                                                <div className='flex jj w-[100%'>
                                                    <input
                                                        className='w-[100%] px-[5px] font-semibold h-[48px] rounded-[8px] border-[#D8D8D8] mt-[5px] border'
                                                        type="number"
                                                        value={parseInt(postJobData.pay.expectedHours.minimum)}
                                                        onChange={(e) => handleShowByChange('minimum', e, false, "value1")}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className=''>
                                            <div className='flex flex-col'>
                                                <span className='font-[500]'>To</span>
                                                <input
                                                    className='w-[150px] px-[5px] font-semibold h-[48px] rounded-[8px] border-[#D8D8D8] mt-[5px] border'
                                                    type="number"
                                                    value={parseInt(postJobData.pay.expectedHours.maximum)}
                                                    onChange={(e) => handleShowByChange('maximum', e, false, "value1")}

                                                />
                                            </div>
                                        </div>
                                    </>
                                    :
                                    <div className='flex items-center -w-[100% gap-[0px] flex-wrap'>
                                        <div className='flex flex-col w-[100%]'>
                                            <span className='font-[500]'>{exectData.find(item => item.value === postJobData?.pay?.expectedHours?.showBy)?.field}</span>
                                            <div className='flex jj w-[100%'>
                                                <input
                                                    className='w-[100%] px-[5px] font-semibold h-[48px] rounded-[8px] border-[#D8D8D8] mt-[5px] border'
                                                    type="number"
                                                    value={parseInt(postJobData?.pay?.expectedHours?.showBy === 'maximum' ? postJobData.pay.expectedHours.maximum : postJobData.pay.expectedHours.minimum)}
                                                    onChange={(e) => handleShowByChange('', e, false, "value1")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                }
                                <p className=' pt-[20px] -text-[18px]'>Hours per week</p>
                            </div>
                        </div> : ""}
                    </div>
                    {errorMessageLessthen01 && <p className='text-[red] text-[13px] px-[20px]'>{errorMessageLessthen01}</p>}
                    {errorMessage2 && <p className='text-[red] text-[13px] px-[20px]'>{errorMessage2}</p>}
                    <div className='h-[60px] -w-[100%] border-t px-[30px] mt-[15px] py-[10px] relative z-[1]' >
                        <button className='px-[10px] py-[5px] rounded-[5px] bg-[#FFCB05] font-[500] float-right'
                            onClick={handleSubmit}
                            disabled={checkDone || checkDone2}
                        >Done</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default PayComponent;
