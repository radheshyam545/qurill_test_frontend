import React, { useState } from "react";

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

const SearchDropdown = ({ inputValue, onItemClick, setInputValue, closeDropdown }) => {
    const items = ['aaabb', 'aaaccc', 'aaaddd'];
    const filteredItems = items.filter((item) =>
        item.toString().includes(inputValue)
    );

    const handleItemClick = (value) => {
        setInputValue(value.toString());
        closeDropdown();
    };

    if (inputValue.length < 3) {
        return null;
    }

    return (
        <div className="dropdown w-full block absolute bg-white py-3 border shadow-md rounded-[8px] mt-5 h-240 overflow-y-auto cat-section z-10">
            <ul>
                {filteredItems.map((item, index) => (
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



const SearchJobInput = () => {

    const [inputValue, setInputValue] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleItemClick = (value) => {
        setInputValue(value.toString());
        closeDropdown();
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const clearInputValue = () => {
        setInputValue("");
    };


    return (
        <div className="md:w-[300px] w-full relative">
            <span className="absolute left-3 top-[50%] -translate-y-[50%]">
                <SearchIcon />
            </span>
            <input
                type="text"
                placeholder="Job title or Keyword"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={toggleDropdown}
                className="w-full text-[15px] text-[#000] px-[20px] py-[8px] rounded-[8px] outline-none placeholder:text-[#2E2D46] focus:bg-[#F3F8FC] px-[40px]"
            />
            {inputValue && <span className="absolute right-3 top-[50%] -translate-y-[50%]"><CrossIcon onClick={clearInputValue} /></span>}
            {isDropdownOpen && (
                <SearchDropdown
                    inputValue={inputValue}
                    onItemClick={handleItemClick}
                    setInputValue={setInputValue}
                    closeDropdown={closeDropdown}
                />
            )}
        </div>
    )
}

export default SearchJobInput