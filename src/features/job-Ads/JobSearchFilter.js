import { customStylesSelect } from "../../components/ReactSelectStyle";
import Select from "react-select";
import { selectFieldValue, selectFieldValueDefault } from "../../app/helperFunction";
import { useCallback, useEffect, useRef, useState } from "react";
import { getCall } from "../../app/axiosConfig";
import { debounce, debouncedSearch } from "../../app/commonFunction";


const statusArray = [{ value: "draft", label: "draft" }, { value: "published", label: "published" }, { value: "unpublished", label: "unpublished" }]
const sortArray = [{ value: "asc", label: "Ascending" }, { value: "desc", label: "Descending" }]

const JobSearchFilter = ({ jobLocation, setFilter, filter, setApplyFilter, setCurrentPage }) => {
    const [jobs, setJobs] = useState([]);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const locationInputRef = useRef(null);

    const handleFilterChange = (key, value) => {
        setFilter({ ...filter, [key]: value })
        if (key === 'location' || key === 'title') {
            debouncedSearch()
            return
        }
    }

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
    const handleSearch = useCallback(() => {
        setApplyFilter(true)
    }, []);
    const debouncedSearch = useCallback(debounce((handleSearch), 500), [handleSearch]);


    const handleClearFilter = () => {
        setCurrentPage(0);
        setFilter({ title: '', location: '', status: '', sort: '' })
        setTimeout(() => { setApplyFilter(true) }, 1)
    }
    const handleLocationInputClick = () => {
        setShowLocationDropdown(true);
    };

    const handleLocationInputBlur = () => {
        // Delay hiding dropdown to allow selection
        setTimeout(() => {
            setShowLocationDropdown(false);
        }, 200);
    };
    const handleLocationInputChange = (newValue) => {
        handleFilterChange('location', newValue);
        setShowLocationDropdown(false); // Hide dropdown after selection
    };
    

    return (
        <div className="job-search-wrapper scrollnone job-ads mb-[25px] px-[40px] -bg-[#D8D8D8] py-[20px] rounded-[10px]">
            {/* <div className="jobsearch-center flex gap-[10px] flex-wrap" > */}
            <div className="-jobsearch-center pt-[15px] gap-[10px] grid -grid-cols-5 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 -bg-[red]">
                <div className="flex -justify-between items-end">
                    <div className='flex -justify-between items-center w-[100%]'>
                        <div className="flex items-center relative  bg-[#FFFFFF] rounded-[8px] border-[1px] border-[#D8D8D8] w-[100%] h-[46px] rounded-[7px]">
                            <span className=" h-[100%] bg-[#fff] rounded-l-xl w-[40px] flex items-center justify-center bt-[2px]  ">
                                <img src="/assets/images/employer-searchbar-icon.svg" alt="" />
                            </span>
                            <div className="relative w-[100%]" >
                                <input
                                    type="search"
                                    value={filter.title}
                                    name="title"
                                    onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
                                    // onClick={handleInputClick} // Optionally trigger fetching on click
                                    placeholder="Search Job"
                                    className="text-[15px] text-[#000] px-[20px] py-[8px] outline-none bg-[#fff] rounded-[8px] w-full"
                                />

                                {/* {showDropdown && (
                                    <div ref={dropdownRef} className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg">
                                        {
                                            <ul className="py-1">
                                                {filteredJobs.map((job) => (
                                                    <li
                                                        key={job._id}
                                                        className="cursor-pointer px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                                        // onClick={() => handleItemClick(job.title)}
                                                    >
                                                        {job.title}
                                                    </li>
                                                ))}
                                            </ul>

                                            // : (
                                            //     <p className="p-2 text-sm text-gray-600">No results found</p>
                                            // )
                                        }
                                    </div>
                                )} */}

                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>

                <div className="relative">
                    <h3 className="font-[500] text-[15px]">Job Location</h3>
                    <input
                        type="search"
                        value={filter.location}
                        name="location"
                        onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
                        // onChange={handleInputChange1}
                        // onClick={handleInputClick} // Optionally trigger fetching on click
                        placeholder="location"
                        ref={locationInputRef}
                        onFocus={handleLocationInputClick}
                        onBlur={handleLocationInputBlur}
                        className="text-[15px] text-[#000] h-[46px] px-[20px] bg-[#fff] -py-[8px] outline-none bg-[#FBFBFB] rounded-[8px] border-[1px] border-[#D8D8D8] w-[100%]"

                    />
                    {showLocationDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg">
                            <ul className="py-1">
                                {jobLocation.filter(job => job.includes(filter.location)).map((job, index) => (
                                    <li
                                        key={index} // Use index as key for simplicity, should use a unique identifier
                                        className="cursor-pointer px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                        onClick={() => handleLocationInputChange(job)}
                                    >
                                        {job}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {/* {showDropdown1 && (
                        <div ref={locationDropdownRef} className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg">
                            {
                                <ul className="py-1">
                                    {filteredJobs1.map((job) => (
                                        <li
                                            key={job._id}
                                            className="cursor-pointer px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                                            // onClick={() => handleItemClick1(job.address)}
                                        >
                                            {job.address}
                                        </li>
                                    ))}
                                </ul>

                            }
                        </div>
                    )} */}
                </div>

                {/* ---------------date picker--------------- */}
                {/* <div >
                    <h3 class="font-semibold">Date Range</h3>
                    <div class="relative border border-gray-300 rounded-lg h-[45px]">
                        <div className="pt-[1px]">
                            <Datepicker
                                value={value}
                                onChange={handleValueChange}
                                showShortcuts={false}
                                classNames="bg-[red]"
                            />
                        </div>

                    </div>
                </div> */}

                {/* ---------------date picker--------------- */}
                <div className="">
                    <h3 className="font-[500] text-[15px]">Select Status</h3>
                    <Select
                        styles={customStylesSelect}
                        className="react-select font-[500] z-[1] "
                        classNamePrefix="All"
                        // value={selectFieldValue(statusArray, filter.status)}
                        value={filter.status ? selectFieldValueDefault(statusArray, filter.status) : null}
                        options={statusArray}
                        // isSearchable={true}
                        placeholder={filter.status ? filter.status : "Status"}
                        onChange={(e) => handleFilterChange('status', e.value)}
                    />
                </div>
                <div className="">
                    <h3 className="font-[500] text-[15px]">Sort</h3>
                    <Select
                        styles={customStylesSelect}
                        className="react-select font-[500] z-[1]"
                        classNamePrefix="All"
                        value={filter.sort ? selectFieldValueDefault(sortArray, filter.sort) : null}
                        options={sortArray}
                        placeholder="Ascending"
                        onChange={(e) => handleFilterChange('sort', e.value)}
                    />
                </div>
                <div>
                <div className='flex  items-end -gap-[5px] mt-[10px] z-[20]'>
                    <div className='flex gap-[10px] mt-[10px]'>
                        <button onClick={() => handleClearFilter()} className="font-[500] text-[15px] py-[8px] px-[20px] h-[46px]  bg-[#E2E2E2] rounded-[8px]"> Clear </button>
                        <button onClick={() => setApplyFilter(true)} className="font-[500] text-[15px] py-[8px] px-[20px] h-[46px]  bg-[#FFCB05] rounded-[8px]  "> Filter </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default JobSearchFilter