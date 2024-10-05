import { useEffect, useState } from "react";
import moment from 'moment';
import { customStylesSelect } from "../../components/ReactSelectStyle";
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import SearchJobLocation from "./Location";
import SearchJobInput from "./Search";
import { filterValue } from "./jobConst";

const JobSearchFilter = ({ filter, setFilter, setApplyFilter, jobs, getJobData, jobCompanyName = [] }) => {
    const dispatch = useDispatch();
    const [filterJob, setFilterJob] = useState({});
    const [searchObj, setSearchObj] = useState({ name: '', location: '' });
    const { jobListPageData } = useSelector(state => state.jobSearch);
    const [filters, setFilters] = useState(filterValue);

    useEffect(() => {
        if (jobCompanyName.length > 0) {
            let obj = {
                displayName: "Company",
                id: "company",
                value: jobCompanyName.map((item) => ({ value: item, label: item }))
            };
            setFilters([...filterValue, obj]);
        }
    }, [jobCompanyName]);

    const getDateRange = (range) => {
        const today = new Date();
        let endDate = new Date();
        switch (range) {
            case "Last 24 hours":
                endDate.setDate(today.getDate() - 1);
                break;
            case "Last 3 days":
                endDate.setDate(today.getDate() - 3);
                break;
            case "Last 7 days":
                endDate.setDate(today.getDate() - 7);
                break;
            case "Last 14 days":
                endDate.setDate(today.getDate() - 14);
                break;
            default:
                break;
        }
        return { endDate };
    }

    const selectionHandler = (selectedOption, key, idName) => {
        let _queryObj = { ...filterJob, ...searchObj };
        if (idName === "publishedSince") {
            const { endDate } = getDateRange(selectedOption.value);
            _queryObj = { ..._queryObj, [idName]: moment(endDate).format('MM-DD-YYYY')  };
        } else {
            _queryObj = { ..._queryObj, [idName]: selectedOption.value };
        }
        setFilterJob(_queryObj);
        setFilter(prev => ({ ...prev, ..._queryObj }));
        console.log("222222222222",typeof _queryObj?.payRange,_queryObj)
        getJobData(_queryObj);
    }

    const clickHandel = (key) => {
        let _queryObj = { ...filterJob, ...searchObj };
        delete _queryObj[key];
        setFilterJob(_queryObj);

        const updatedFilter = { ...filter };
        delete updatedFilter[key];
        setFilter(updatedFilter);
        console.log(typeof updatedFilter)
        getJobData(updatedFilter);
    }

    const renderFilterValue = (idName, value) => {
        if (idName === "publishedSince") {
            // const currentDate = new Date()
            // const valueDate = new Date(value)
            // const diffInTime = currentDate.getTime() - valueDate.getTime()
            // const diffInHours = diffInTime / (1000 * 3600*2)
            // if (diffInHours < 24) {
            //     return "Last 24 hours";
            // } else if (diffInHours < 72) { 
            //     return "Last 3 days";
            // } else if (diffInHours < 168) { 
            //     return "Last 7 days";
            // } else if (diffInHours < 336) { 
            //     return "Last 14 days";
            // } else {
            //     return '---'; 
            // }
            return value;
        } else {
            // For other filter types
            const filterOption = filters.find(optionGroup => optionGroup.id === idName);
            if (filterOption) {
                const selectedOption = filterOption.value.find(option => option.value === value);
                return selectedOption ? selectedOption.label : '';
            }
        }
        return '';
    }
    
    
    
    
    
    


    return (
        <div className="job-search-wrapper -mb-[10px] px-[40px] -bg-[white] py-[20px] rounded-[10px]">
            <div className="flex justify-center mb-[20px]">
                <div className="mt-[10px] bg-[White] flex min-h-[50px] flex-wrap content-center items-center justify-center -p-[10px] rounded-[10px] border-2 border-[#D8D8D8] flex-wrap">
                    <SearchJobInput setSearchObj={setSearchObj} searchObj={searchObj} filter={filter} setFilter={setFilter} setApplyFilter={setApplyFilter} jobTitle={jobs?.title} />
                    <span className="h-[60%] w-[2px] jobsearch-filter-span bg-[#D8D8D8]"></span>
                    <SearchJobLocation setSearchObj={setSearchObj} searchObj={searchObj} filter={filter} setFilter={setFilter} setApplyFilter={setApplyFilter} jobTitle={jobs?.title} />
                    <button onClick={() => setApplyFilter(true)} className="bg-[#FFCB05] py-[8px] px-[34px] rounded-[8px] text-[15px] text-[#1F1E2C] m-[5px]">Search</button>
                </div>
            </div>
            <div className="jobsearch-center justify-center flex gap-[10px] flex-wrap">
                {
                    filters && filters.length > 0 && filters.map((optionGroup, index) => {
                        let keyy = optionGroup.displayName;
                        let idName = optionGroup.id;
                        return (
                            <div key={index} className="job-search-filter-input w-[250px]">
                                {
                                    filterJob[idName] ? (
                                        <div>
                                            <button className="btn bg-[#555555] hover:bg-[#333333]  text-[#fff] border-0 flex items-center gap-[10px] w-[200px]"
                                                onClick={() => clickHandel(idName)}
                                            >
                                                {renderFilterValue(idName, filterJob[idName])}
                                                <svg
                                                    width={"20px"}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    focusable="false"
                                                    role="img"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    aria-hidden="true"
                                                    className="css-1nhvvuv eac13zx0"
                                                >
                                                    <path d="M5.934 4.873a.5.5 0 00-.707 0l-.354.354a.5.5 0 000 .707L8.94 10l-4.066 4.066a.5.5 0 000 .707l.354.354a.5.5 0 00.707 0L10 11.06l4.066 4.066a.5.5 0 00.707 0l.353-.354a.5.5 0 000-.707L11.06 10l4.066-4.066a.5.5 0 000-.707l-.353-.354a.5.5 0 00-.708 0L10 8.94 5.934 4.873z"></path>
                                                    <path d="M5.934 4.873a.5.5 0 00-.707 0l-.354.354a.5.5 0 000 .707L8.94 10l-4.066 4.066a.5.5 0 000 .707l.354.354a.5.5 0 00.707 0L10 11.06l4.066 4.066a.5.5 0 00.707 0l.353-.354a.5.5 0 000-.707L11.06 10l4.066-4.066a.5.5 0 000-.707l-.353-.354a.5.5 0 00-.708 0L10 8.94 5.934 4.873z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <Select
                                            styles={customStylesSelect}
                                            className="react-select text-[15px]"
                                            classNamePrefix="select"
                                            options={optionGroup.value}
                                            isSearchable={true}
                                            placeholder={keyy}
                                            onChange={(e) => selectionHandler(e, keyy, idName)}
                                        />
                                    )
                                }
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default JobSearchFilter
