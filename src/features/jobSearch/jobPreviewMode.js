import React from 'react'
import { modeEnum, rateUnitEnum } from './jobConst'
import { CountryDATAEnum, ExperienceEnum, JobTypeEnum, usaCitiesEnum, USStatesEnum } from '../../pages/employerProtected/JobConsts'

function JobPreviewMode({ applyCheck, loading, selectedJobId, jobs, modal, setModal, getIndex, setSelectedJobId, handleApply }) {
    return (
        <div>
            <div className={`modal job-detail ${modal ? "modal-open" : ""}`}>
                <div className={`modal-box max-w-[1122px]`}>
                    <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setModal(false)}>✕</button>
                    {
                        jobs && jobs?.length > 0 && jobs?.map((item, index) => {
                            if (index === getIndex)
                                return (
                                    <div>
                                        <div className="flex justify-between job-search-preview-header items-center mt-[18px]">
                                            <div className="flex items-center gap-[8px] h-[80px] w-[80px]">
                                                <img
                                                    src={item?.photo || "/assets/images/seeker-job-search-company-icon.svg"}
                                                    alt="Profile"
                                                    className='h-[60px] w-[80px] object-contain'
                                                />
                                                <p className="font-semibold text-[18px]">{item?.businessName}</p>
                                            </div>
                                            <div className="flex gap-[8px]">
                                                <button className="bg-[#FFCB05] rounded-[20px] py-[7px] px-[20px] text-[15px] border border-[#B3B3B3] hover:bg-[#FFCB05] font-[500]"
                                                    disabled={item?.isAlreadyApplied}
                                                    onClick={() => {
                                                        if (applyCheck(item)) { return }
                                                        setSelectedJobId(item?._id)
                                                        handleApply(item?._id)
                                                    }}
                                                >{(loading && selectedJobId === item?._id) ? <span className="loading"></span> : item.isAlreadyApplied ? 'Applied' : 'Apply'}</button>

                                                <button className="border border-[#B3B3B3] rounded-[20px] text-[15px] py-[7px] px-[20px]">Share</button>
                                                <button className="border border-[#B3B3B3] rounded-[20px] text-[15px] py-[7px] px-[20px]">Save</button>

                                            </div>
                                        </div>
                                        {/* 1 */}
                                        <div className=" mt-[50px] flex items-center -gap-[8px]">
                                            <div className="min-w-[170px] -bg-[red] flex items-center gap-[8px]">
                                                <img className="h-[16px]" src="/assets/images/seeker-job-search-job-title-icon.svg" alt="" />
                                                <p className=" text-[15px] font-semibold">Job Title</p>
                                            </div>
                                            <span className="font-[700]">:</span>
                                            <p className="ml-[25px] text-[15px] font-[500]">{item?.title}</p>
                                        </div>
                                        {/* 2 */}
                                        <div className=" mt-[15px] flex items-center -gap-[8px]">
                                            <div className="min-w-[170px] -bg-[red] flex items-center gap-[8px]">
                                                <img className="h-[16px]" src="/assets/images/seeker-job-search-address-icon.svg" alt="" />
                                                <p className=" text-[15px] font-semibold">Address</p>
                                            </div>
                                            <span className="font-[700]">:</span>
                                            <p className="ml-[25px] text-[15px] font-[500]">{`${item?.address || ""}, ${item?.city || ""}, ${item?.state || ""} ${item?.zipCode || ""}, ${CountryDATAEnum[item?.country] || ""}`}</p>
                                        </div>
                                        {/* 3 */}
                                        <div className=" mt-[15px] flex items-center -gap-[8px]">
                                            <div className="min-w-[170px] -bg-[red] flex items-center gap-[8px]">
                                                <img className="h-[16px]" src="/assets/images/seeker-job-search-job-type-icon.svg" alt="" />
                                                <p className=" text-[15px] font-semibold">Job Type</p>
                                            </div>
                                            <span className="font-[700]">:</span>
                                            <p className="ml-[25px] text-[15px] text-[15px] font-[500]">{item?.type ? JobTypeEnum[item?.type] : ""}</p>
                                        </div>
                                        {/* 3.1 */}
                                        <div className=" mt-[15px] flex items-center -gap-[8px]">
                                            <div className="min-w-[170px] -bg-[red] flex items-center gap-[8px]">
                                                <img className="h-[16px]" src="/assets/images/seeker-job-search-job-type-icon.svg" alt="" />
                                                <p className=" text-[15px] font-semibold">Job Mode</p>
                                            </div>

                                            <span className="font-[700]">:</span>
                                            <p className="ml-[25px] text-[15px] text-[15px] font-[500]">{item?.mode ? modeEnum[item?.mode] : ""}</p>
                                        </div>
                                        {/* 4 */}
                                        <div className=" mt-[15px] flex items-center -gap-[8px]">
                                            <div className="min-w-[170px] -bg-[red] flex items-center gap-[8px]">
                                                <img className="h-[16px]" src="/assets/images/seeker-job-search-experience-icon.svg" alt="" />
                                                <p className=" text-[15px] font-semibold">Experience Level </p>
                                            </div>
                                            <span className="font-[700]">:</span>
                                            <p className="ml-[25px] font-[500] text-[15px]">{item?.experienceLevel ? ExperienceEnum[item?.experienceLevel] : ""}</p>
                                        </div>
                                        {/* 5 */}
                                        <div className=" mt-[15px] flex items-center -gap-[8px]">
                                            <div className="min-w-[170px] -bg-[red] flex items-center gap-[8px]">
                                                <img className="h-[16px]" src="/assets/images/seeker-job-search-pay-icon.svg" alt="" />
                                                <p className=" text-[15px] font-semibold">Pay </p>
                                            </div>
                                            <span className="font-[700]">:</span>
                                            <p className="ml-[25px] text-[15px] font-[500]">
                                                {item?.pay?.pay?.showBy === "range" && item?.pay?.pay?.minimum && item?.pay?.pay?.maximum
                                                    ? `$${item?.pay?.pay?.minimum} - $${item?.pay?.pay?.maximum} ${rateUnitEnum[item?.pay?.pay?.rateUnit]}`
                                                    : item?.pay?.pay?.showBy === "starting_amount" && item?.pay?.pay?.minimum
                                                        ? `Starting at $${item?.pay?.pay?.minimum}  ${rateUnitEnum[item?.pay?.pay?.rateUnit]}`
                                                        : item?.pay?.pay?.showBy === "maximum_amount" && item?.pay?.pay?.maximum
                                                            ? ` $${item?.pay?.pay?.maximum} maximum ${rateUnitEnum[item?.pay?.pay?.rateUnit]}`
                                                            : item?.pay?.pay?.showBy === "exact_amount" && item?.pay?.pay?.maximum
                                                                ? `$${item?.pay?.pay?.maximum} ${rateUnitEnum[item?.pay?.pay?.rateUnit]}`
                                                                : ""
                                                }
                                                {
                                                    item?.pay?.pay?.rateUnit === "per_hour" && item?.pay?.expectedHours?.showBy === "range"
                                                        ? ` | ${item?.pay?.expectedHours?.minimum} - ${item?.pay?.expectedHours?.maximum} hours`
                                                        : ""
                                                }
                                                {
                                                    item?.pay?.pay?.rateUnit === "per_hour" && item?.pay?.expectedHours?.showBy === "minimum"
                                                        ? ` | ${item?.pay?.expectedHours?.minimum} hours minimum`
                                                        : ""
                                                }
                                                {
                                                    item?.pay?.pay?.rateUnit === "per_hour" && item?.pay?.expectedHours?.showBy === "maximum"
                                                        ? ` | ${item?.pay?.expectedHours?.maximum} hours maximum`
                                                        : ""
                                                }
                                                {
                                                    item?.pay?.pay?.rateUnit === "per_hour" && item?.pay?.expectedHours?.showBy === "fixed_hours"
                                                        ? ` | ${item?.pay?.expectedHours?.maximum} hours`
                                                        : ""
                                                }
                                            </p>
                                        </div>
                                        {/* 6 */}
                                        <div className=" mt-[15px] flex items-center -gap-[8px]">
                                            <div className="min-w-[170px] -bg-[red] flex items-center gap-[8px]">
                                                <img className="h-[16px]" src="/assets/images/seeker-job-search-work-schedule-icon.svg" alt="" />
                                                <p className=" text-[15px] font-semibold">Work Schedule</p>
                                            </div>
                                            <span className="font-[700]">:</span>
                                            <p className="ml-[25px] font-[500] text-[15px]">{item?.workSchedule}</p>
                                        </div>
                                        {/* 7 */}
                                        <div className="job-search-model-benefits mt-[15px] flex items-center -gap-[8px]">
                                            <div className="min-w-[170px] job-listing-model-header-picture -bg-[red] flex items-center gap-[8px]">
                                                <img className="h-[16px]" src="/assets/images/seeker-job-search-benefit-icon.svg" alt="" />
                                                <p className=" text-[15px] font-semibold">Benefits</p>
                                            </div>
                                            <span className="job-search-model-benefits-dot font-[700]">:</span>
                                            <span className="flex gap-[10px] flex-wrap ml-[25px]">
                                                {item?.benefits.map(item => <button className="  bg-[#F2F2F2] font-[500] border border-[#B3B3B3] text-[15px] rounded-[20px] py-[7px] px-[20px]">{item}</button>)}
                                            </span>
                                        </div>
                                        <div className="mt-[40px]">
                                            <p className="font-semibold text-[15px]">Job description:</p>
                                            <ul className="pl-[35px]">
                                                <li className="list-disc text-[15px]">{item?.description?.type}</li>
                                            </ul>
                                        </div>
                                        <div className="mt-[20px]">
                                            <p className="font-semibold text-[15px]">Responsibilities:</p>
                                            <ul className="pl-[35px]">
                                                <li className="list-disc text-[15px]">{item?.description?.responsibilities}</li>
                                            </ul>
                                        </div>
                                        <div className="mt-[20px]">
                                            <p className="font-semibold text-[15px]">Qualification:</p>
                                            <ul className="pl-[35px]">
                                                <li className="list-disc text-[15px]">{item?.description?.qualifications}</li>
                                            </ul>
                                        </div>
                                        <div className="my-[30px]"> </div>
                                    </div>
                                )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default JobPreviewMode
