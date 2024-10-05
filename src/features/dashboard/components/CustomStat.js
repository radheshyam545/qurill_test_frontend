import React from "react"

const CustomStats = ({icon, title, count, className}) => {
    return (
        <div className={`w-3/12 px-[18px] ${className}`}>
            <div className='p-1 bg-[#FFCB05] text-[#1E1E1E] inline-flex rounded-[4px] w-10 h-10 items-center justify-center'>
                {icon}
            </div>
            <h4 className='text-[16px] text-[#1E1E1E] mb-[6px] mt-[20px]'>{title}</h4>
            <h3 className='text-[22px] font-bold text-[#1E1E1E] mb-0'>{count}</h3>
        </div>
    )
}

export default CustomStats