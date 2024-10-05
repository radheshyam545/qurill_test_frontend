import React, { useEffect, useState } from 'react';
import JobPostOverlay from '../JobPostComponents/JobPostOverlay';
import JobDescription from '../JobPostComponents/JobDescription';
import JobTypeComponent from '../JobPostComponents/JobTypeComponent';
import JobModeComponent from '../JobPostComponents/JobModeComponent';
import PayComponent from '../JobPostComponents/PayComponent';
import ScheduleComponent from '../JobPostComponents/ScheduleComponent';
import BenefitsComponent from '../JobPostComponents/BenefitsComponent';
import { getCountryList } from '../../app/commonFunction';
import { Country, CountryDATA, CountryDATAEnum, Experience, ExperienceEnum, JobTypeEnum, usaCitiesEnum, USStates, USStatesEnum } from '../../pages/employerProtected/JobConsts';
import { jobTyoeEnum, modeEnum, rateUnitEnum } from '../../features/jobSearch/jobConst';
import JobPostOverlayState from '../JobPostComponents/JobPostOverlayState';
import JobPostOverlayCountry from '../JobPostComponents/JobPostOverlayCountry';
import JobPostOverlayExperienceLevel from '../JobPostComponents/JobPostOverlayExperienceLevel';
import JobPostOverlayCity from '../JobPostComponents/JobPostOverlayCity';

function JobPostInputFieldComponent({ postJobData, setPostJobData, submitCheck }) {
    const [tab, setTab] = useState('0');


    const getPayDisplay = () => {
        const { showBy, minimum, maximum, rateUnit } = postJobData?.pay?.pay || {};
        if (showBy === "range") {
            return minimum && maximum
                ? `$${minimum} - $${maximum} ${rateUnitEnum[rateUnit] || ''}`
                : '';
        }
        else if (showBy === "starting_amount") {
            return minimum
                ? `Starting at $${minimum} ${rateUnitEnum[rateUnit] || ''}`
                : '';
        }
        else if (showBy === "maximum_amount") {
            return maximum
                ? `$${maximum} maximum ${rateUnitEnum[rateUnit] || ''}`
                : '';
        }
        else if (showBy === "exact_amount") {
            return minimum
                ? `$${minimum} ${rateUnitEnum[rateUnit] || ''}`
                : '';
        }

        return '';
    };
    return (
        <div>
            {/* Conditional rendering of overlays and components based on the `tab` state */}
            <div className={`${tab === '1' ? '' : 'employer-overlay-none'}`}>
                <JobPostOverlay heading={'Title'} tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} name={"title"} />
            </div>
            <div className={`${tab === '2' ? '' : 'employer-overlay-none'}`}>
                <JobPostOverlayCountry heading={'Country'} tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} name={"country"} />
            </div>
            <div className={`${tab === '3' ? '' : 'employer-overlay-none'}`}>
                <JobPostOverlay heading={'Location'} tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} name={"location"} />
            </div>
            <div className={`${tab === '4' ? '' : 'employer-overlay-none'}`}>
                <JobPostOverlay heading={'Address'} tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} name={"address"} />
            </div>
            <div className={`${tab === '5' ? '' : 'employer-overlay-none'}`}>
                {/* <JobPostOverlay heading={'City'} tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} name={"city"} /> */}
                <JobPostOverlayCity heading={'City'} tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} name={"city"} />
            </div>
            <div className={`${tab === '6' ? '' : 'employer-overlay-none'}`}>
                {/* <JobPostOverlay heading={'State'} tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} name={"state"} /> */}
                <JobPostOverlayState heading={'State'} tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} name={"state"} />
            </div>
            <div className={`${tab === '7' ? '' : 'employer-overlay-none'}`}>
                <JobPostOverlay heading={'Zip code'} tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} name={"zipCode"} />
            </div>
            <div className={`${tab === '8' ? '' : 'employer-overlay-none'}`}>
                <JobTypeComponent tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} />
            </div>
            <div className={`${tab === '9' ? '' : 'employer-overlay-none'}`}>
                {/* <JobPostOverlay heading={'Experience Level'} tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} name={"experienceLevel"} /> */}
                <JobPostOverlayExperienceLevel heading={'Experience Level'} tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} name={"experienceLevel"} />
            </div>
            <div className={`${tab === '10' ? '' : 'employer-overlay-none'}`}>
                <PayComponent tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} />
            </div>
            <div className={`${tab === '11' ? '' : 'employer-overlay-none'}`}>
                <ScheduleComponent tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} />
            </div>
            <div className={`${tab === '12' ? '' : 'employer-overlay-none'}`}>
                <BenefitsComponent tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} />
            </div>
            <div className={`${tab === '13' ? '' : 'employer-overlay-none'}`}>
                <JobDescription tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} submitCheck={submitCheck} />
            </div>
            <div className={`${tab === '14' ? '' : 'employer-overlay-none'}`}>
                <JobModeComponent tab={tab} setTab={setTab} postJobData={postJobData} setPostJobData={setPostJobData} />
            </div>

            {/* Input fields for displaying data and handling errors */}
            <div className='grid grid-cols-1 mb-[10px]'>
                <label htmlFor="" className='text-[#1E1E1E] text-[15px] font-[500]'>Job Title</label>
                <input
                    readOnly
                    value={postJobData?.title}
                    onClick={() => setTab('1')}
                    className='h-[45px] rounded-[5px] border border-[#919191] border-[0.1px] px-[20px]'
                    placeholder=''
                    type="text"
                />
                {postJobData?.title === '' && submitCheck && <p className='text-[red] text-[13px]'>Job title is required</p>}
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <div className='flex flex-col mt-[10px]'>
                    <label htmlFor="" className='text-[#1E1E1E] font-[500] text-[15px]'>Country</label>
                    <input
                        readOnly
                        value={CountryDATAEnum[postJobData?.country]}
                        onClick={() => setTab('2')}
                        className='h-[45px] rounded-[5px] border border-[#919191] border-[0.1px] px-[20px]'
                        placeholder={(CountryDATA && postJobData?.country) ?
                            CountryDATA.find(item => item.value === postJobData?.country)?.label :
                            postJobData?.country || ''}
                        type="text"
                    />
                    {postJobData?.status !== 'draft' && (postJobData?.country === '' || postJobData?.country === undefined) && submitCheck && <p className='text-[red] text-[13px]'>Country is required</p>}
                </div>
                <div className='flex flex-col mt-[10px]'>
                    <label htmlFor="" className=' font-[500] text-[15px]'>State</label>
                    <input
                        readOnly
                        value={USStatesEnum[postJobData?.state]||postJobData?.state||""}
                        onClick={() => setTab('6')}
                        className='h-[45px] rounded-[5px] border border-[#919191] border-[0.1px] px-[20px]'
                        placeholder={(USStates && postJobData?.state) ?
                            USStates.find(item => item.value === postJobData?.state)?.label :
                            postJobData?.state || ''}
                        type="text"
                    />
                    {postJobData?.status !== 'draft' && (postJobData?.state === '' || postJobData?.state === undefined) && submitCheck && <p className='text-[red] text-[13px]'>State is required</p>}
                </div>
                <div className='flex flex-col mt-[10px]'>
                    <label htmlFor="" className='text-[#1E1E1E] font-[500] text-[15px]'>City</label>
                    <input
                        readOnly
                        value={usaCitiesEnum[postJobData?.state]?.[postJobData?.city]||postJobData?.city}
                        onClick={() => setTab('5')}
                        className='h-[45px] rounded-[5px] border border-[#919191] border-[0.1px] px-[20px]'
                        placeholder={postJobData?.city ? usaCitiesEnum[postJobData?.state]?.[postJobData.city] : ''}
                        type="text"
                    />
                    {postJobData?.status !== 'draft' && (postJobData?.city === '' || postJobData?.city === undefined) && submitCheck && <p className='text-[red] text-[13px]'>City is required</p>}
                </div>
                <div className='flex flex-col mt-[10px]'>
                    <label htmlFor="" className='text-[#1E1E1E] font-[500] text-[15px]'>Address</label>
                    <input
                        readOnly
                        value={postJobData?.address}
                        onClick={() => setTab('4')}
                        className='h-[45px] rounded-[5px] border border-[#919191] border-[0.1px] px-[20px]'
                        placeholder={postJobData?.address || ''}
                        type="text"
                    />
                    {postJobData?.status !== 'draft' && (postJobData?.address === '' || postJobData?.address === undefined) && submitCheck && <p className='text-[red] text-[13px]'>Address is required</p>}
                </div>
                <div className='flex flex-col mt-[10px]'>
                    <label htmlFor="" className='text-[#1E1E1E] font-[500] text-[15px]'>Zip Code</label>
                    <input
                        readOnly
                        value={postJobData?.zipCode}
                        onClick={() => setTab('7')}
                        className='h-[45px] rounded-[5px] border border-[#919191] border-[0.1px] px-[20px]'
                        placeholder={postJobData?.zipCode || ''}
                        type="text"
                    />
                    {postJobData?.status !== 'draft' && (postJobData?.zipCode === '' || postJobData?.zipCode === undefined) && submitCheck && <p className='text-[red] text-[13px]'>Zip code is required</p>}
                </div>
                {/* -4- */}
                <div className='flex flex-col mt-[10px]'>
                    <label htmlFor="" className='text-[#1E1E1E] font-[500] text-[15px]'>Job type</label>
                    <input value={jobTyoeEnum[postJobData?.type]} onClick={() => setTab('8')} className='h-[45px] rounded-[5px] border border-[#919191] px-[20px]' placeholder={JobTypeEnum[postJobData?.type] || ''} type="text" readOnly />
                    {postJobData?.status != 'draft' && (postJobData?.type == '' || postJobData?.type == undefined) && submitCheck && <p className='text-[red] text-[13px]'>Job type is required</p>}
                </div>
                <div className='flex flex-col mt-[10px]'>
                    <label htmlFor="" className='text-[#1E1E1E] font-[500] text-[15px]'>Job Mode</label>
                    <input value={modeEnum[postJobData?.mode]} onClick={() => setTab('14')} className='h-[45px] rounded-[5px] border border-[#919191] px-[20px]' placeholder={modeEnum[postJobData?.mode] || ''} type="text" readOnly />
                    {postJobData?.status != 'draft' && (postJobData?.mode == '' || postJobData?.mode == undefined) && submitCheck && <p className='text-[red] text-[13px]'>Job Mode is required</p>}
                </div>
                <div className='flex flex-col mt-[10px]'>
                    <label htmlFor="" className='text-[#1E1E1E] font-[500]  -text-[15px]' >Experience Level</label>
                    <input value={ExperienceEnum[postJobData?.experienceLevel]} readOnly onClick={() => setTab('9')} className='h-[45px] rounded-[5px] border border-[#919191] border-[0.1px] px-[20px]' placeholder={
                        postJobData?.experienceLevel
                            ? Experience.find(item => item.value === postJobData?.experienceLevel)?.label || ''
                            : ''
                    } type="text" />
                    {postJobData?.status != 'draft' && (postJobData?.experienceLevel == '' || postJobData?.experienceLevel == undefined) && submitCheck && <p className='text-[red] text-[13px]'>Experience Level is required</p>}
                </div>
                <div className='flex flex-col mt-[10px]'>
                    <label className='text-[#1E1E1E] font-[500] text-[15px]'>Pay</label>
                    <input
                        readOnly
                        value={getPayDisplay()}
                        onClick={() => setTab('10')}
                        className='h-[45px] rounded-[5px] border border-[#919191] border-[0.1px] px-[20px]'
                        placeholder={getPayDisplay()}
                        type="text"
                    />
                    {postJobData?.status !== 'draft' &&
                        submitCheck && (
                            (
                                postJobData?.pay?.pay?.rateUnit === "per_day" && (
                                    (postJobData?.pay?.pay?.showBy === 'range' && postJobData?.pay?.pay?.minimum === 0 && postJobData?.pay?.pay?.maximum === 0) ||
                                    (postJobData?.pay?.pay?.showBy === 'starting_amount' && postJobData?.pay?.pay?.minimum === 0) ||
                                    (postJobData?.pay?.pay?.showBy === 'maximum_amount' && postJobData?.pay?.pay?.maximum === 0) ||
                                    (postJobData?.pay?.pay?.showBy === 'exact_amount' && postJobData?.pay?.pay?.minimum === 0 && postJobData?.pay?.pay?.maximum === 0)
                                )
                            )
                        ) && <p className='text-red-500 text-xs'>Pay is required</p>}
                </div>
                {/* -5- */}
                <div className='flex flex-col mt-[10px]'>
                    <label htmlFor="" className='text-[#1E1E1E] font-[500]  -text-[15px]' >Work Schedule</label>
                    <input value={postJobData?.workSchedule} readOnly onClick={() => setTab('11')} className='h-[45px] rounded-[5px] border border-[#919191] border-[0.1px] px-[20px]' placeholder={postJobData?.workSchedule || ''} type="text" />
                    {postJobData?.status != 'draft' && (postJobData?.workSchedule == '' || postJobData?.workSchedule == undefined) && submitCheck && <p className='text-[red] text-[13px]'>Work Schedule is required</p>}
                </div>
                <div className='flex flex-col mt-[10px]'>
                    <label htmlFor="" className='text-[#1E1E1E] font-[500]  -text-[15px]' >Benefits</label>
                    <input value={postJobData?.benefits} readOnly onClick={() => setTab('12')} className='h-[45px] rounded-[5px] border border-[#919191] border-[0.1px] px-[20px]' placeholder={postJobData?.benefits[0] ? postJobData?.benefits : ''} type="text" />
                    {postJobData?.status != 'draft' && (postJobData?.benefits[0] == '' || postJobData?.benefits[0] == undefined) && submitCheck && <p className='text-[red] text-[13px]'>Benefit is required</p>}
                </div>
                <div className='flex flex-col mt-[10px]'>
                    <label htmlFor="" className='text-[#1E1E1E] font-[500]  -text-[15px]' >Job description</label>
                    <input value={postJobData?.description?.type} readOnly onClick={() => setTab('13')} className='h-[45px] rounded-[5px] border border-[#919191] border-[0.1px] px-[20px]' placeholder={`${postJobData?.description?.type ? postJobData?.description?.type : ''}`} type="text" />
                    {postJobData?.status !== 'draft' && (
                        (postJobData?.description?.type === '' || postJobData?.description?.type === undefined) ||
                        (postJobData?.description?.responsibilities === '' || postJobData?.description?.responsibilities === undefined) ||
                        (postJobData?.description?.qualifications === '' || postJobData?.description?.qualifications === undefined)
                    ) && submitCheck && <p className='text-[red] text-[13px]'>Job Description is required</p>}

                </div>
            </div>

        </div>
    )
}

export default JobPostInputFieldComponent
