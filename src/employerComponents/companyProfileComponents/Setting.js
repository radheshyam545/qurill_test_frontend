import React from 'react';
import Switch from '../../employerContainers/Switch';

function Setting() {



    return (
        <>
        <div className='my-[40px]'>
        <h2 className='font-bold text-[26px]'>Setting</h2>
            <div className='mt-[20px]'>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer"></input>
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none -peer-focus:ring-4 -peer-focus:ring-blue-800 -dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#ffcb05]"></div>
                    <label className='px-2 text-lg'>Display contact number over company profile</label>
                </label>
            </div>
            <div>
                <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer"></input>
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none -peer-focus:ring-4 -peer-focus:ring-blue-800 -dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#ffcb05]"></div>
                    <label className='px-2 text-lg'>Display contact email over company profile</label>
                </label>
            </div>
        </div>
        </>
    );
}

export default Setting;
