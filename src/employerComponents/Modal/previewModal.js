import React, { useEffect, useState } from 'react';
import { modeEnum, rateUnitEnum } from '../../features/jobSearch/jobConst';
import { CountryDATAEnum, ExperienceEnum, JobTypeEnum, usaCitiesEnum, USStatesEnum } from '../../pages/employerProtected/JobConsts';

function PreviewModal({ modal, setModal, data }) {
    const [jobData, setJobData] = useState("")
    useEffect(() => {
        setJobData(data)
    }, [data])
    return (
        <div className={`modal job-detail ${modal ? "modal-open" : ""}`}>
            <div className={`modal-box max-w-[1122px]`}>
                <button
                    className="h-[25px] w-[25px] font-bold rounded-[50%] flex justify-center items-center text-[14px] bg-[#afc4b5] absolute right-3 top-2"
                    onClick={() => setModal(false)}
                >
                    X
                </button>
                <div>
                    <div className="employer-preview-model-header flex justify-between items-center mt-[18px]">
                        <div className="flex items-center gap-[8px]">
                            <img
                                className="h-[60px] w-[80px] object-contain"
                                src="/assets/images/seeker-job-search-company-icon.svg"
                                alt=""
                            />
                            <p className="font-semibold text-[18px]">Microsoft Inc</p>
                        </div>
                        <div className="flex gap-[8px]">
                            <button className="bg-[#FFCB05] rounded-[20px] py-[7px] px-[20px] text-[15px] border border-[#B3B3B3] hover:bg-[#FFCB05] font-[500]">
                                Apply
                            </button>
                            <button className="border border-[#B3B3B3] rounded-[20px] py-[7px] px-[20px] text-[15px]">
                                Share
                            </button>
                            <button className="border border-[#B3B3B3] rounded-[20px] py-[7px] px-[20px] text-[15px]">
                                Save
                            </button>
                        </div>
                    </div>
                    {/* Job Details */}
                    <div className="mt-[50px] flex items-center">
                        <div className="min-w-[170px] flex items-center gap-[8px]">
                            <img
                                className="h-[16px]"
                                src="/assets/images/seeker-job-search-job-title-icon.svg"
                                alt=""
                            />
                            <p className="text-[15px] font-semibold">Job Title</p>
                        </div>
                        <span className="font-[700]">:</span>
                        <p className="ml-[25px] text-[15px] font-[500]">{jobData?.title}</p>
                    </div>
                    <div className="mt-[15px] flex items-center">
                        <div className="min-w-[170px] flex items-center gap-[8px]">
                            <img
                                className="h-[16px]"
                                src="/assets/images/seeker-job-search-address-icon.svg"
                                alt=""
                            />
                            <p className="text-[15px] font-semibold">Address</p>
                        </div>
                        <span className="font-[700]">:</span>
                        <p className="ml-[25px] text-[15px] font-[500]">
                            {`${jobData?.address || ""}, ${jobData?.city || ""}, ${jobData?.state || ""} ${jobData?.zipCode || ""}, ${CountryDATAEnum[jobData?.country] || ""}`}
                        </p>
                    </div>
                    <div className="mt-[15px] flex items-center">
                        <div className="min-w-[170px] flex items-center gap-[8px]">
                            <img
                                className="h-[16px]"
                                src="/assets/images/seeker-job-search-job-type-icon.svg"
                                alt=""
                            />
                            <p className="text-[15px] font-semibold">Job Type</p>
                        </div>
                        <span className="font-[700]">:</span>
                        <p className="ml-[25px] text-[15px] font-[500]">{jobData?.type ? JobTypeEnum[jobData?.type] : ""}</p>
                    </div>
                    <div className="mt-[15px] flex items-center">
                        <div className="min-w-[170px] flex items-center gap-[8px]">
                            <img
                                className="h-[16px]"
                                src="/assets/images/seeker-job-search-job-type-icon.svg"
                                alt=""
                            />
                            <p className="text-[15px] font-semibold">Job Mode</p>
                        </div>
                        <span className="font-[700]">:</span>
                        <p className="ml-[25px] text-[15px] font-[500]">{modeEnum[jobData?.mode]}</p>
                    </div>
                    <div className="mt-[15px] flex items-center">
                        <div className="min-w-[170px] flex items-center gap-[8px]">
                            <img
                                className="h-[16px]"
                                src="/assets/images/seeker-job-search-experience-icon.svg"
                                alt=""
                            />
                            <p className="text-[15px] font-semibold">Experience Level</p>
                        </div>
                        <span className="font-[700]">:</span>
                        <p className="ml-[25px] text-[15px] font-[500]">{jobData?.experienceLevel ? ExperienceEnum[jobData?.experienceLevel] : ""}</p>
                    </div>
                    <div className="mt-[15px] flex items-center">
                        <div className="min-w-[170px] flex items-center gap-[8px]">
                            <img
                                className="h-[16px]"
                                src="/assets/images/seeker-job-search-pay-icon.svg"
                                alt=""
                            />
                            <p className="text-[15px] font-semibold">Pay</p>
                        </div>
                        <span className="font-[700]">:</span>
                        <p className="ml-[25px] text-[15px] font-[500]">
                            {jobData?.pay?.pay?.showBy === "range" && jobData?.pay?.pay?.minimum && jobData?.pay?.pay?.maximum
                                ? `$${jobData?.pay?.pay?.minimum} - $${jobData?.pay?.pay?.maximum} ${rateUnitEnum[jobData?.pay?.pay?.rateUnit]}`
                                : jobData?.pay?.pay?.showBy === "starting_amount" && jobData?.pay?.pay?.minimum
                                    ? `Starting at $${jobData?.pay?.pay?.minimum}  ${rateUnitEnum[jobData?.pay?.pay?.rateUnit]}`
                                    : jobData?.pay?.pay?.showBy === "maximum_amount" && jobData?.pay?.pay?.maximum
                                        ? ` $${jobData?.pay?.pay?.maximum} maximum ${rateUnitEnum[jobData?.pay?.pay?.rateUnit]}`
                                        : jobData?.pay?.pay?.showBy === "exact_amount" && jobData?.pay?.pay?.maximum
                                            ? `$${jobData?.pay?.pay?.maximum} ${rateUnitEnum[jobData?.pay?.pay?.rateUnit]}`
                                            : ""
                            }
                            {
                                jobData?.pay?.pay?.rateUnit === "per_hour" && jobData?.pay?.expectedHours?.showBy === "range"
                                    ? ` | ${jobData?.pay?.expectedHours?.minimum} - ${jobData?.pay?.expectedHours?.maximum} hours`
                                    : ""
                            }
                            {
                                jobData?.pay?.pay?.rateUnit === "per_hour" && jobData?.pay?.expectedHours?.showBy === "minimum"
                                    ? ` | ${jobData?.pay?.expectedHours?.minimum} hours minimum`
                                    : ""
                            }
                            {
                                jobData?.pay?.pay?.rateUnit === "per_hour" && jobData?.pay?.expectedHours?.showBy === "maximum"
                                    ? ` | ${jobData?.pay?.expectedHours?.maximum} hours maximum`
                                    : ""
                            }
                            {
                                jobData?.pay?.pay?.rateUnit === "per_hour" && jobData?.pay?.expectedHours?.showBy === "fixed_hours"
                                    ? ` | ${jobData?.pay?.expectedHours?.maximum} hours`
                                    : ""
                            }
                        </p>
                    </div>
                    <div className="mt-[15px] flex items-center">
                        <div className="min-w-[170px] flex items-center gap-[8px]">
                            <img
                                className="h-[16px]"
                                src="/assets/images/seeker-job-search-work-schedule-icon.svg"
                                alt=""
                            />
                            <p className="text-[15px] font-semibold">Work Schedule</p>
                        </div>
                        <span className="font-[700]">:</span>
                        <p className="ml-[25px] text-[15px] font-[500]">{jobData?.workSchedule}</p>
                    </div>
                    <div className="mt-[15px] flex items-center">
                        <div className="min-w-[170px] flex items-center gap-[8px]">
                            <img
                                className="h-[16px]"
                                src="/assets/images/seeker-job-search-benefit-icon.svg"
                                alt=""
                            />
                            <p className="text-[15px] font-semibold">Benefits</p>
                        </div>
                        <span className="font-[700]">:</span>
                        <div className="flex gap-[10px] flex-wrap ml-[25px]">
                            {(jobData?.benefits || []).map((item, index) => (
                                <button
                                    key={index}
                                    className="bg-[#F2F2F2] font-[500] border border-[#B3B3B3] rounded-[20px] py-[7px] px-[20px]"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-[40px]">
                        <p className="font-semibold text-[15px]">Job description:</p>
                        <ul className="pl-[35px]">
                            <li className="list-disc text-[15px]">{jobData?.description?.type}</li>
                        </ul>
                    </div>
                    <div className="mt-[20px]">
                        <p className="font-semibold text-[15px]">Responsibilities:</p>
                        <ul className="pl-[35px]">
                            <li className="list-disc text-[15px]">{jobData?.description?.responsibilities}</li>
                        </ul>
                    </div>
                    <div className="mt-[20px]">
                        <p className="font-semibold text-[15px]">Qualifications:</p>
                        <ul className="pl-[35px]">
                            <li className="list-disc text-[15px]">{jobData?.description?.qualifications}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreviewModal;
