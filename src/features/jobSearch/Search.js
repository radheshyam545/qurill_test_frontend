import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getSearchData } from "./jobSearchSlice";


const SearchIcon = () => {
    
    return (
        <svg
            className="absolute left-3 top-[50%] -translate-y-[50%]"
            width={"18px"}
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            role="img"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            class=""
        >
            <path
                fill-rule="evenodd"
                d="M13.335 14.749a6.5 6.5 0 111.414-1.414l6.105 6.104a.5.5 0 010 .707l-.708.708a.5.5 0 01-.707 0l-6.104-6.105zM14 9.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                clip-rule="evenodd"
            ></path>
        </svg>
    );
};

const CrossIcon = ({ onClick }) => {
    return (
        <svg
            onClick={onClick}
            className="absolute right-3 top-[50%] -translate-y-[50%] cursor-pointer"
            width={"20px"}
            xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" class="css-1nhvvuv eac13zx0"><path d="M5.934 4.873a.5.5 0 00-.707 0l-.354.354a.5.5 0 000 .707L8.94 10l-4.066 4.066a.5.5 0 000 .707l.354.354a.5.5 0 00.707 0L10 11.06l4.066 4.066a.5.5 0 00.707 0l.353-.354a.5.5 0 000-.707L11.06 10l4.066-4.066a.5.5 0 000-.707l-.353-.354a.5.5 0 00-.708 0L10 8.94 5.934 4.873z"></path><svg xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" class="css-1nhvvuv eac13zx0"><path d="M5.934 4.873a.5.5 0 00-.707 0l-.354.354a.5.5 0 000 .707L8.94 10l-4.066 4.066a.5.5 0 000 .707l.354.354a.5.5 0 00.707 0L10 11.06l4.066 4.066a.5.5 0 00.707 0l.353-.354a.5.5 0 000-.707L11.06 10l4.066-4.066a.5.5 0 000-.707l-.353-.354a.5.5 0 00-.708 0L10 8.94 5.934 4.873z"></path></svg></svg>
    );
};

// useEffect(()=>{

// })
const SearchDropdown = ({ inputValue, onItemClick, setInputValue, closeDropdown }) => {
const { jobSearchData } = useSelector(state => state.jobSearch)
    const filteredItems = jobSearchData?.jobs?.filter((item) =>
    item && item.toString()?.toLowerCase().includes(inputValue.toLowerCase())
    );

    
    const handleItemClick = (value) => {
        setInputValue(value.toString());
        onItemClick(value)
        closeDropdown();
    };

    if (inputValue?.length < 2) {
        return null;
    }

    //////////////////////////////////////////////
    

    
    

    return (
        <div className="dropdown w-full block absolute bg-white py-3 border shadow-md rounded-[8px] mt-5 h-240 overflow-y-auto cat-section z-10">
            <ul>
                {filteredItems?.map((item, index) => (
                    <li
                        key={index}
                        className="relative border-b last:border-b-0 pl-10 hover:bg-[#F3F8FC] py-2 px-3 cursor-pointer"
                        onClick={() => handleItemClick(item)}
                    >
                        <span className="absolute left-3 top-[50%] -translate-y-[50%]">
                            <SearchIcon />
                        </span>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const SearchJobInput = ({setSearchObj, searchObj,filter, setFilter, setApplyFilter,jobTitle}) => {

    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState("");
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);



    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        dispatch(getSearchData({...searchObj, name: e.target.value}))
        setSearchObj({ ...searchObj, 'name': e.target.value })
    };

    const handleItemClick = (value) => {
        setInputValue(value.toString());
        console.log('searchObj::::',value.toString())
        setSearchObj({ ...searchObj, 'name': value.toString() })
        closeDropdown();
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    // const clearInputValue = () => {
    //     // console.log('heheehhehhehehehheheheh')
    //     setInputValue("");
    //     dispatch(getSearchData({...searchObj, name: ''}))
    //     setSearchObj((pre)=>({ ...pre, 'name': '' }))
    //     // dispatch(getSearchData({...searchObj, name: ''}));
    // };
////////////////////////////////////////////////////////
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
    const debouncedSearch = useCallback(debounce((handleSearch), 1000), [handleSearch]);
    const handleFilterChange = (key, value) => {
        setFilter({ ...filter, [key]: value })
        if (key === 'location' || key === 'title') {
            debouncedSearch()
            return
        }
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
    return (
        <div className=" lg:w-[300px] md:w-[100%] w-full relative m-[5px]">
            <span className="absolute left-3 top-[50%] -translate-y-[50%]">
                <SearchIcon />
            </span>
            <input
                // type="text"
                // placeholder="Job title or Keyword"
                // value={inputValue}
                // onChange={handleInputChange}
                // onFocus={toggleDropdown}
                className="w-full text-[15px] job-search-search-input text-[#000] px-[20px] py-[8px] rounded-[8px] outline-none placeholder:text-[#2E2D46] focus:bg-[#F3F8FC] px-[40px]"
                                      type="search"
                                    value={filter?.title}
                                    name="title"
                                    onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
                                    onFocus={handleLocationInputClick}
                                    onBlur={handleLocationInputBlur}
                                    // onClick={handleInputClick} // Optionally trigger fetching on click
                                    placeholder="Search Job"
                                    // className="text-[16px] text-[#000] px-[20px] py-[8px] outline-none bg-[#fff] rounded-[8px] w-full"
            />
            {/* {showLocationDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg">
                            <ul className="py-1">
                                {jobTitle.filter(job => job.includes(filter?.title)).map((job, index) => (
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
                    )} */}
             {/* {inputValue && <span className="absolute right-3 top-[50%] -translate-y-[50%]"><CrossIcon onClick={clearInputValue} /></span>} */}
            {/* {isDropdownOpen && (
                <SearchDropdown
                    inputValue={inputValue}
                    onItemClick={handleItemClick}
                    setInputValue={setInputValue}
                    closeDropdown={closeDropdown}
                />
            )}  */}
        </div>
    )
}

export default SearchJobInput