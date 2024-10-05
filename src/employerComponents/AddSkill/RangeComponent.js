
import React, { useState } from 'react';

function RangeComponent({ range, setRange, title, removeSkill }) {

    return (
        <>
            <div className='h-[70px] -w-[450px] -bg-[red] px-[40px] border-dotted border-b-[2px] border-b-[#7B7B7B] flex items-center justify-between gap-[8px]'>
                <p className='font-[500] pt-[25px] text-[18px] -switch-text-1000'>{title}</p>
                <div className='w-[250px] -bg-[red] range-wrapper-main'>
                    <p className='pr-[20px]' style={{ paddingLeft: `${range}%` }}>{range}%</p>
                    <div className='h-[10px] w-[100%] -bg-[red] range-input-wrapper bg-[#D9D9D9] mt-[5px] rounded-[20px] z-[2] relative'>
                        <div className='w-[50%] h-[100%] bg-[#FFCB05]  rounded-[20px]' style={{ width: `${range}%` }}>
                            <input type="range" min="0" max="100" name="" id="" className='-mb-[20px] padding-remove -pr-[10px] range-input range w-[250px] -mt-[0.5px] absolute -top-[4px]' onChange={(v) => setRange(v.target.value)} />
                        </div>
                        <img
                            className='cursor-pointer h-[15px] absolute top-[50%] right-[-30px] transform translate-y-[-50%]'
                            src="/assets/images/employer-images/jobpostoverlaytabcross.svg"
                            alt=""
                            onClick={removeSkill}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default RangeComponent;
