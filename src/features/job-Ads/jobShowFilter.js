import React, { useCallback } from 'react';
import { customStylesSelect } from "../../components/ReactSelectStyle";
import Select from "react-select";
import { selectFieldValueDefault } from "../../app/helperFunction";

import { educationList, Experience, LicenseData } from '../../pages/employerProtected/JobConsts';

function JobShowFilter({ setFilter, filter, setApplyFilter, setCurrentPage }) {
    console.log(educationList)
    const handleFilterChange = (key, value) => {
        setFilter({ ...filter, [key]: value });
        if (key === 'applicantName') {
            debouncedSearch();
            return
        }
    };
    const debounce = (func, wait) => {
        let timeout;
        return function (...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    const handleSearch = useCallback(() => {setApplyFilter(true);}, []);
    const debouncedSearch = useCallback(debounce(handleSearch, 1000), [handleSearch]);

    const handleClearFilter = () => {
        setCurrentPage(0);
        setFilter({
            applicantName: '',
            education: '',
            experienceLevel: '',
            certification: '',
        });
        setTimeout(() => setApplyFilter(true), 1);
    };

    return (
        <div>
            <div className='-h-[100px] pt-[15px] grid -grid-cols-5 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 -bg-[red]'>
                <div className='mr-4 flex items-end gap-[5px] mt-[10px] -w-[100%]'>
                    <div className='flex -justify-between items-center bg-[#fff] w-[100%]'>
                        <div className="flex relative bg-[#FFFFFF] rounded-[8px] border border-[#D8D8D8] w-[100%] bg- h-[46px]">
                            <span className="h-[100%] bg-[#fff] rounded-l-xl w-[40px] flex items-center justify-center">
                                <img className='' src="/assets/images/employer-searchbar-icon.svg" alt="Search" />
                            </span>
                            <div className='h-[100%] bg-[#fff] flex rounded-r-xl items-center w-[100%] -w-[120px]'>
                                <input
                                    type="search"
                                    value={filter?.applicantName}
                                    name="applicantName"
                                    onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
                                    placeholder="Search Applicant"
                                    className="text-[16px] text-[#000] px-[20px] py-[8px] outline-none bg-[#fff] rounded-[8px] w-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mr-4 -w-[300px] mt-[5px]'>
                    <h3 className='text-[15px] font-[500]'>Education</h3>
                    <Select
                        styles={customStylesSelect}
                        className="react-select text-nowrap"
                        classNamePrefix="All"
                        options={educationList}
                        value={filter.education ? selectFieldValueDefault(educationList, filter.education) : null}
                        placeholder="Select Education"
                        onChange={(e) => handleFilterChange('education', e.value)}
                    />
                </div>
                <div className='mr-4 -w-[300px] mt-[5px]'>
                    <h3 className='text-[15px] font-[500]'>Experience</h3>
                    <Select
                        styles={customStylesSelect}
                        className="react-select text-nowrap"
                        classNamePrefix="All"
                        options={Experience}
                        isSearchable={true}
                        placeholder="Select Experience"
                        value={filter.experienceLevel ? selectFieldValueDefault(Experience, filter.experienceLevel) : null}
                        onChange={(e) => handleFilterChange('experienceLevel', e.value)}
                    />
                </div>
                <div className='mr-4 -w-[300px] mt-[5px]'>
                    <h3 className='text-[15px] font-[500]'>Certifications</h3>
                    <Select
                        styles={customStylesSelect}
                        className="react-select text-nowrap"
                        classNamePrefix="All"
                        options={LicenseData}
                        isSearchable={true}
                        placeholder="Select Certification"
                        // value={filter.certification ? selectFieldValueDefault(LicenseData, filter.certification) : null}
                        value={LicenseData.find(category => 
                            category.options.some(option => option.value === filter.certification)
                        )?.options.find(option => option.value === filter.certification) || null}
                        onChange={(e) => handleFilterChange('certification', e.value)}
                    />
                </div>
                <div className='flex items-end -justify-end'>
                    <div className='flex -items-center -justify-end gap-[10px] mt-[20px]'>
                        <button
                            className="font-[500] text-[15px] py-[8px] px-[20px] h-[46px] bg-[#E2E2E2] rounded-[8px]"
                            onClick={handleClearFilter}
                        >
                            Clear
                        </button>
                        <button
                            className="font-[500] text-[15px] py-[8px] px-[20px] h-[46px] bg-[#FFCB05] rounded-[8px]"
                            onClick={() => setApplyFilter(true)}
                        >
                            Filter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobShowFilter;
