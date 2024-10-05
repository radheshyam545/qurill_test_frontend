import React, { useState } from "react";

const LocationIcon = () => {
    return (
        <svg width="12" height="17" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.45285 0C7.92715 0.0854872 8.40854 0.144027 8.87385 0.262502C10.082 0.569605 11.1134 1.19078 11.9877 2.05959C12.9486 3.01482 13.569 4.15821 13.8532 5.46932C14.0764 6.49889 14.0396 7.52799 13.7799 8.55151C13.4943 9.67817 13.0323 10.7361 12.489 11.7605C11.2718 14.0561 9.7307 16.1352 8.05199 18.1214C7.87513 18.3305 7.69638 18.5382 7.51243 18.7417C7.20365 19.0836 6.79082 19.0878 6.48676 18.7417C4.5806 16.5701 2.84561 14.2792 1.49271 11.728C0.908706 10.6269 0.413131 9.48769 0.155413 8.26253C-0.205392 6.54442 0.0613104 4.92202 0.963087 3.41159C1.89466 1.85284 3.25512 0.808412 5.01659 0.290378C5.47008 0.157036 5.95099 0.113828 6.41914 0.0288055C6.46218 0.0209072 6.50426 0.00975669 6.54682 0C6.84899 0 7.15116 0 7.45285 0ZM7.00551 10.3356C8.967 10.3226 10.5294 8.76569 10.5143 6.84037C10.4996 5.02052 9.00909 3.4181 6.98423 3.42321C5.02226 3.42832 3.47265 4.9931 3.48494 6.90727C3.49724 8.79821 5.08847 10.3481 7.00551 10.3351V10.3356Z" fill="black" />
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
    const items = ['lahore a', 'lahore b', 'lahore c'];
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
                        <span className="absolute left-4 top-[50%] -translate-y-[50%]">
                            <LocationIcon />
                        </span>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};



const SearchJobLocation = () => {

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
        <div className="md:w-[460px] w-full mr-3 relative">
            <span className="absolute left-3 top-[50%] -translate-y-[50%]">
                <LocationIcon />
            </span>
            <input
                type="text"
                placeholder="Location" 
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

export default SearchJobLocation