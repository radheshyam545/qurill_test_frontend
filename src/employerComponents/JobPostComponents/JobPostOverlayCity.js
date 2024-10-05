import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { customStylesSelect } from '../../components/ReactSelectStyle';
import { usaCities, usaCitiesEnum } from '../../pages/employerProtected/JobConsts';

function JobPostOverlayCity({ heading, setTab, postJobData, setPostJobData, name = "" }) {
    const [formData, setFormData] = useState(postJobData);
    const [checkCityActive, setCheckCityActive] = useState(true)
    const [throughError, setThroughError] = useState(false)
    useEffect(() => {
        setFormData(postJobData);
        if (postJobData?.state) {
            setCheckCityActive(false)
            setThroughError(false)
        } else {
            setThroughError(true)
        }
    }, [postJobData]);
    const handleSubmit = (e) => {
        e.preventDefault();
        setPostJobData(formData);
        setTab('0');
    };
    const cityOptions = postJobData?.state && usaCitiesEnum[postJobData?.state]
    ? Object.keys(usaCitiesEnum[postJobData?.state]).map(cityKey => ({
        value: cityKey,
        label: usaCitiesEnum[postJobData?.state][cityKey]
    }))
    : [];
const selectedCity = cityOptions.find(option => option.label === postJobData?.city);
console.log(postJobData?.city, 'therere---->',cityOptions, )
    return (
        <div>
            <div className={`h-[100vh] z-[999] flex items-center justify-center w-[100%] fixed top-0 left-0 overlay-color`}>
                <div className='h-[300px] z-[50] w-[700px] bg-white flex flex-col justify-between'>
                    <div className='flex items-center justify-between h-[40px] px-[30px] py-[30px] border-b'>
                        <p className='font-bold'>Edit the job post</p>
                        <img onClick={() => setTab('0')} className='cursor-pointer h-[15px]' src="/assets/images/employer-images/jobpostoverlaytabcross.svg" alt="Close" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 -mt-[35px] mx-[20px] mb-[65px]'>
                            <label className='font-bold' htmlFor={name}>{heading}</label>
                            <Select
                                name="City"
                                styles={customStylesSelect}
                                className="react-select"
                                classNamePrefix="select"
                                options={usaCities[postJobData?.state]}
                                isDisabled={checkCityActive}
                                isSearchable
                                placeholder="Select"
                                onChange={(selectedOption) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        city: selectedOption.value
                                    }));
                                }}
                                value={selectedCity}
                            />
                            {console.log("Ahmad",usaCitiesEnum[postJobData?.state]?.[postJobData?.city])}
                            {throughError ? <p className='text-[red] text-[13px]'>State is required</p> : null}
                        </div>
                        <div className='h-[60px] w-[100%] border-t px-[30px] py-[10px]'>
                            <button
                                className='px-[10px] py-[5px] rounded-[5px] bg-[#FFCB05] font-bold float-right'
                                type="submit"
                            >
                                Done
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JobPostOverlayCity
