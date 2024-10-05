import React, { useState } from 'react'

function SearchBarEmployer() {

    


    return (
        
        <div className='flex justify-between items-center'>
        <div className="flex relative  bg-[#FFFFFF]] rounded-[8px] border w-fit h-[53px] rounded-xl">
            <span className=" h-[50px] bg-[#FBFBFB] rounded-l-xl w-[40px] flex items-center justify-center bt-[2px]  ">
                <img src="/assets/images/employer-searchbar-icon.svg" alt="" />
            </span>
            <div className='h-[50px] bg-[#FBFBFB] flex rounded-r-xl items-center w-[300px]' >
                <input type="search" placeholder="Search Job" className="text-[16px] text-[#000] px-[20px] py-[8px] outline-none bg-[#FBFBFB] rounded-[8px] -border-[1px] border-non w-[100%]"  />
            </div>
        </div>
        <div>
        
        </div>
        </div>

    )
}

export default SearchBarEmployer
