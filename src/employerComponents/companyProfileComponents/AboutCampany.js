import React from 'react';
import Select from "react-select";
import { customStylesSelect } from "../../components/ReactSelectStyle";
function AboutCampany() {
    return (
        <>
            <div className='mt-[20px]'>
                <h2 className='font-bold text-[26px]'>About Company</h2>
                <div className='border pt-[30px] mt-[10px]'>
                    <textarea rows="15" cols="50" placeholder='Write about company...' className='w-full max-h-[400px] px-2 py-[10px] outline-none border-[0px] bg-[#F4F8FB]'></textarea>
                </div>
            </div>
        </>
    );
}
export default AboutCampany;
