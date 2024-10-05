import React from 'react';

function BasicInformation() {
    return (
        <>
        <div className='mt-[20px]'>
            <h2 className='font-bold text-[26px]'>Basic Information</h2>
            <div className='mt-[10px]'>
                <label className="mb-1 font-semibold">Company Name *</label>
                <input
                    name="addressLine2"
                    type="text"
                    placeholder={"Sociabletech"}
                    className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[1px] border-[#D8D8D8]  placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                />
            </div>
            <div className='grid grid-cols-2 gap-[15px] bg-[yellow mt-[10px]'>
                <div>
                    <label className="mb-1 font-semibold">Founded On</label>
                    <input
                        name="addressLine2"
                        type="text"
                        placeholder={"01-01-1970"}
                        className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8]  placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                    />
                </div>
                <div>
                    <label className="mb-1 font-semibold">Employee</label>
                    <input
                        name="addressLine2"
                        type="text"
                        placeholder={"4"}
                        className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8]  placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                    />
                </div>
            </div>
        </div>
        </>
    );
}

export default BasicInformation;
