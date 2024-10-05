// import React from 'react';
import Select from "react-select";
import { customStylesSelect } from "../../components/ReactSelectStyle";
import CountrySelect from './CountrySelect';
import ReactFlagsSelect from "react-flags-select"
import React, { useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function ContactInformation() {
    const [selected, setSelected] = useState("");

    return (
        <>
            <div className='mt-[26px]'>
                <h2 className=' text-[22px] font-bold'>Contact Information</h2>
                <div className='grid grid-cols-2 gap-[15px] bg-[yellow mt-[10px]'>
                    <div>
                        <label className="mb-1 font-semibold">Contact Email</label>
                        <input
                            name="addressLine2"
                            type="text"
                            placeholder={"abcde@gmail.com"}
                            className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8]  placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                        />
                    </div>
                    <div>
                        {/* <CountrySelect/> */}
                        {/* <ReactFlagsSelect
                            selected={selected}
                            onSelect={(code) => setSelected(code)}
                        />; */}
                        <label className="mb-1 font-semibold">Contact Number</label>
                        <PhoneInput
                            country={'us'}
                            inputStyle={{
                                height: "45px",
                                width: "100%",
                                backgroundColor: "#FBFBFB",
                                borderRadius: "10px"
                            }}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-[15px] bg-[yellow mt-[10px]'>
                    <div>
                        <label className="mb-1 font-semibold">Company URL</label>
                        <input
                            name="addressLine2"
                            type="text"
                            placeholder={"http://abcd.com"}
                            className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8]  placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-[15px] bg-[yellow mt-[10px]'>
                    <div>
                        <h3 className="font-semibold font-semibold">Business Country *</h3>
                        <ReactFlagsSelect
                            selected={selected}
                            onSelect={(code) => setSelected(code)}
                            isSearchable
                            placeholder={"USA"}
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold font-semibold">Select State</h3>
                        <Select
                            styles={customStylesSelect}
                            className="react-select outline-none"
                            classNamePrefix="All"
                            options={[{ value: "Draft ", label: "Draft" }, { value: "Published ", label: "Published " }, { value: "Unpublished ", label: "Unpublished " }]} // Corrected options syntax
                            isSearchable={true}
                            placeholder="Select State"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-[15px] bg-[yellow mt-[10px]'>
                    <div>
                        <label className="mb-1 font-semibold">Business Line 1 *</label>
                        <input
                            name="addressLine2"
                            type="text"
                            placeholder={"Est aliquip duis non"}
                            className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8]  placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                        />
                    </div>
                    <div>
                        <label className="mb-1 font-semibold">Business Line 2</label>
                        <input
                            name="addressLine2"
                            type="text"
                            placeholder={"Anim asperiores natus doloremque"}
                            className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8]  placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-[15px] bg-[yellow mt-[10px]'>
                    <div>
                        <label className="mb-1 font-semibold">Business City *</label>
                        <input
                            name="addressLine2"
                            type="text"
                            placeholder={"Newyork"}
                            className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8]  placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                        />
                    </div>
                    <div>
                        <label className="mb-1 font-semibold">Business Postal Code *</label>
                        <input
                            name="addressLine2"
                            type="text"
                            placeholder={"Newyork"}
                            className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8]  placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactInformation;
