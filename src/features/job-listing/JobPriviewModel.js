import React from 'react'
import PropTypes from 'prop-types'
import { CountryDATAEnum, ExperienceEnum, JobTypeEnum, usaCitiesEnum, USStatesEnum } from '../../pages/employerProtected/JobConsts'
import { modeEnum, rateUnitEnum } from '../jobSearch/jobConst'
import classNames from 'classnames'

function JobPreviewModel({ currentItem, modal, setModal }) {
    if (!currentItem) return null;

    const { businessName, isAlreadyApplied, title, address, state, city, zipCode, country, type, mode, experienceLevel, pay, workSchedule, benefits, description } = currentItem;

    console.log(currentItem)
    const getPayDescription = () => {
        if (pay?.pay?.showBy === "range" && pay?.pay?.minimum && pay?.pay?.maximum) {
            return `$${pay?.pay?.minimum} - $${pay?.pay?.maximum} ${rateUnitEnum[pay?.pay?.rateUnit]}`;
        }
        if (pay?.pay?.showBy === "starting_amount" && pay?.pay?.minimum) {
            return `Starting at $${pay?.pay?.minimum} ${rateUnitEnum[pay?.pay?.rateUnit]}`;
        }
        if (pay?.pay?.showBy === "maximum_amount" && pay?.pay?.maximum) {
            return `$${pay?.pay?.maximum} maximum ${rateUnitEnum[pay?.pay?.rateUnit]}`;
        }
        if (pay?.pay?.showBy === "exact_amount" && pay?.pay?.maximum) {
            return `$${pay?.pay?.maximum} ${rateUnitEnum[pay?.pay?.rateUnit]}`;
        }
        return "";
    }

    const getExpectedHoursDescription = () => {
        if (pay?.pay?.rateUnit === "per_hour") {
            switch (pay?.expectedHours?.showBy) {
                case "range":
                    return ` | ${pay?.expectedHours?.minimum} - ${pay?.expectedHours?.maximum} hours`;
                case "minimum":
                    return ` | ${pay?.expectedHours?.minimum} hours minimum`;
                case "maximum":
                    return ` | ${pay?.expectedHours?.maximum} hours maximum`;
                case "fixed_hours":
                    return ` | ${pay?.expectedHours?.maximum} hours`;
                default:
                    return "";
            }
        }
        return "";
    }

    return (
        <div>
            <div className={classNames('modal job-detail', { 'modal-open': modal })}>
                <div className="modal-box max-w-[1122px]">
                    <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setModal(false)}>✕</button>
                    <div>
                        <div className="job-listing-preview-header flex justify-between items-center mt-[18px]">
                            <div className="flex items-center gap-[8px] h-[80px] w-[80px]">
                                <img
                                    src={currentItem?.photo || "/assets/images/seeker-job-search-company-icon.svg"}
                                    alt="Profile"
                                    className='h-[60px] w-[80px] object-contain'
                                />
                                <p className="font-semibold text-[16px] text-nowrap">{businessName}</p>
                            </div>
                            <div className="flex gap-[8px]">
                                <button className="bg-[#FFCB05] rounded-[20px] text-[15px] py-[7px] px-[20px] border border-[#B3B3B3] hover:bg-[#FFCB05] font-[500]" disabled={isAlreadyApplied}>
                                  Apply
                                </button>
                                <button className="border border-[#B3B3B3] text-[15px] rounded-[20px] py-[7px] px-[20px]">Share</button>
                                <button className="border border-[#B3B3B3] text-[15px] rounded-[20px] py-[7px] px-[20px]">Save</button>
                            </div>
                        </div>
                        {/* Job Details */}
                        <div className="mt-[50px] flex items-center -gap-[8px]">
                            <div className="min-w-[170px] flex items-center gap-[8px]">
                                <img className="h-[16px]" src="/assets/images/seeker-job-search-job-title-icon.svg" alt="Job Title Icon" />
                                <p className="text-[15px] font-semibold">Job Title</p>
                            </div>
                            <span className="font-[700]">:</span>
                            <p className="ml-[25px] text-[15px] font-[500]">{title}</p>
                        </div>
                        <div className="mt-[15px] flex items-center -gap-[8px]">
                            <div className="min-w-[170px] flex items-center gap-[8px]">
                                <img className="h-[16px]" src="/assets/images/seeker-job-search-address-icon.svg" alt="Address Icon" />
                                <p className="text-[15px] font-semibold">Address</p>
                            </div>
                            <span className="font-[700]">:</span>
                            <p className="ml-[25px] text-[15px] font-[500]">{`${address || ""}, ${city || ""}, ${state || ""} ${zipCode || ""}, ${CountryDATAEnum[country] || ""}`}</p>
                        </div>
                        <div className="mt-[15px] flex items-center -gap-[8px]">
                            <div className="min-w-[170px] flex items-center gap-[8px]">
                                <img className="h-[16px]" src="/assets/images/seeker-job-search-job-type-icon.svg" alt="Job Type Icon" />
                                <p className="text-[15px] font-semibold">Job Type</p>
                            </div>
                            <span className="font-[700]">:</span>
                            <p className="ml-[25px] text-[15px] font-[500]">{type ? JobTypeEnum[type] : ""}</p>
                        </div>
                        <div className="mt-[15px] flex items-center -gap-[8px]">
                            <div className="min-w-[170px] flex items-center gap-[8px]">
                                <img className="h-[16px]" src="/assets/images/seeker-job-search-job-type-icon.svg" alt="Job Mode Icon" />
                                <p className="text-[15px] font-semibold">Job Mode</p>
                            </div>
                            <span className="font-[700]">:</span>
                            <p className="ml-[25px] text-[15px] font-[500]">{mode ? modeEnum[mode] : ""}</p>
                        </div>
                        <div className="mt-[15px] flex items-center -gap-[8px]">
                            <div className="min-w-[170px] flex items-center gap-[8px]">
                                <img className="h-[16px]" src="/assets/images/seeker-job-search-experience-icon.svg" alt="Experience Icon" />
                                <p className="text-[15px] font-semibold">Experience Level</p>
                            </div>
                            <span className="font-[700]">:</span>
                            {console.log(experienceLevel, 456)}
                            <p className="ml-[25px] text-[15px] font-[500]">{experienceLevel ? ExperienceEnum[experienceLevel] : ""}</p>
                        </div>
                        <div className="mt-[15px] flex items-center -gap-[8px]">
                            <div className="min-w-[170px] flex items-center gap-[8px]">
                                <img className="h-[16px]" src="/assets/images/seeker-job-search-pay-icon.svg" alt="Pay Icon" />
                                <p className="text-[15px] font-semibold">Pay</p>
                            </div>
                            <span className="font-[700]">:</span>
                            <p className="ml-[25px] text-[15px] font-[500]">
                                {getPayDescription()}
                                {getExpectedHoursDescription()}
                            </p>
                        </div>
                        <div className="mt-[15px] flex items-center -gap-[8px]">
                            <div className="min-w-[170px] flex items-center gap-[8px]">
                                <img className="h-[16px]" src="/assets/images/seeker-job-search-work-schedule-icon.svg" alt="Work Schedule Icon" />
                                <p className="text-[15px] font-semibold">Work Schedule</p>
                            </div>
                            <span className="font-[700]">:</span>
                            <p className="ml-[25px] text-[15px] font-[500]">{workSchedule}</p>
                        </div>
                        <div className="job-listing-model-benefits mt-[15px] flex items-center -gap-[8px]">
                            <div className="min-w-[170px] job-listing-model-header-picture flex items-center gap-[8px]">
                                <img className="h-[16px]" src="/assets/images/seeker-job-search-benefit-icon.svg" alt="Benefits Icon" />
                                <p className="text-[15px] font-semibold">Benefits</p>
                            </div>
                            <span className="font-[700] job-listing-model-benefits-dot">:</span>
                            <span className="flex gap-[10px] flex-wrap ml-[25px]">
                                {benefits.map((item, index) => (
                                    <button key={index} className="bg-[#F2F2F2] font-[500] border text-[15px] border-[#B3B3B3] rounded-[20px] py-[7px] px-[20px]">
                                        {item}
                                    </button>
                                ))}
                            </span>
                        </div>
                        <div className="mt-[40px]">
                            <p className="font-semibold text-[15px]">Job description:</p>
                            <ul className="pl-[35px]">
                                <li className="list-disc text-[15px]">{description?.type}</li>
                            </ul>
                        </div>
                        <div className="mt-[20px]">
                            <p className="font-semibold text-[15px]">Responsibilities:</p>
                            <ul className="pl-[35px]">
                                <li className="list-disc text-[15px]">{description?.responsibilities}</li>
                            </ul>
                        </div>
                        <div className="mt-[20px]">
                            <p className="font-semibold text-[15px]">Qualification:</p>
                            <ul className="pl-[35px]">
                                <li className="list-disc text-[15px]">{description?.qualifications}</li>
                            </ul>
                        </div>
                        <div className="my-[30px]"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

JobPreviewModel.propTypes = {
    currentItem: PropTypes.shape({
        businessName: PropTypes.string,
        isAlreadyApplied: PropTypes.bool,
        title: PropTypes.string,
        address: PropTypes.string,
        state: PropTypes.string,
        city: PropTypes.string,
        zipCode: PropTypes.string,
        country: PropTypes.string,
        type: PropTypes.string,
        mode: PropTypes.string,
        experienceLevel: PropTypes.string,
        pay: PropTypes.shape({
            pay: PropTypes.shape({
                showBy: PropTypes.string,
                minimum: PropTypes.number,
                maximum: PropTypes.number,
                rateUnit: PropTypes.string,
            }),
            expectedHours: PropTypes.shape({
                showBy: PropTypes.string,
                minimum: PropTypes.number,
                maximum: PropTypes.number,
            }),
        }),
        workSchedule: PropTypes.string,
        benefits: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.shape({
            type: PropTypes.string,
            responsibilities: PropTypes.string,
            qualifications: PropTypes.string,
        }),
    }),
    modal: PropTypes.bool.isRequired,
    setModal: PropTypes.func.isRequired,
}

export default JobPreviewModel
