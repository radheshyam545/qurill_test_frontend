// import React, { useEffect } from 'react';
import React, { useState } from 'react';
// import { Slider } from "@material-tailwind/react";
import Switch from '../../employerContainers/switch_component';
import PreviewAdpopup from '../../employerComponents/PreviewAd_popup';


function Companyprofile() {
  const [popuppassworrd , setpopuppssword]=useState(false)
  const [isPopup , setIsPopup]=useState(false)
  const openPopup=()=>{
    setIsPopup(true);
  }
  const closePopup=()=>{
    setIsPopup(false);
  }

  return (
    <>
      <div className='px-5 py-4 bg-white rounded w-full'>
        <div className='py-4  border-b w-full flex justify-end'>
          <a href='#' className='text-[#6347FF]'>Preview Ad</a>
        </div>
        <div>
          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* input */}
          <div className='mt-10 mb-5'>
            <label className='block font-semibold text-[#1E1E1E]'>Job Title</label>
            <input type='text' placeholder='Add a title' className='p-2 rounded border outline-0 border-[#919191] w-full' />
          </div>
          {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* 3 inputs  */}
          <div className='flex w-full mb-5 gap-6'>
            {/* 1 */}
            <div className='w-full '>
              <label className='block font-semibold text-[#1E1E1E]'>Category</label>
              <input type='text' placeholder='e.g. paris' className='p-2 rounded border outline-0 border-[#919191] w-full ' />
            </div>
            {/* 2 */}
            <div className='w-full '>
              <label className='block font-semibold text-[#1E1E1E]'>Sub-category</label>
              <input type='text' placeholder='Add a title' className='p-2 rounded border outline-0 border-[#919191] w-full ' />
            </div>
            {/* 3 */}
            <div className='w-full '>
              <label className='block font-semibold text-[#1E1E1E]'>search job location</label>
              <input type='text' placeholder='search location' className='p-2 rounded border outline-0 border-[#919191] w-full ' />
            </div>

          </div>
          {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* 2 inputs */}
          <div className='flex w-full gap-4 mb-5'>
            {/* 1 */}
            <div className='w-[30%]'>
              <label className='block font-semibold text-[#1E1E1E]'>City</label>
              <input type='text' placeholder='e.g. paris' className='p-2 rounded border outline-0 border-[#919191] w-full' />
            </div>

            {/* 2 */}
            <div className='w-[50%]'>
              <label className='block font-semibold text-[#1E1E1E]'>State</label>
              <input type='text' placeholder='e.g. texas' className='p-2 rounded border outline-0 border-[#919191] w-full' />
            </div>
          </div>
          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* 3 inputs */}
          <div className='flex mb-5 gap-4 w-full'>
            {/* 1 */}
            <div className=' mb-5 gap-4  w-[40%]'>
              <label className='block font-semibold text-[#1E1E1E]'>Work type</label>
              <input type='text' placeholder='Select Work type' className='p-2 rounded border outline-0 border-[#919191] w-full' />
            </div>

            <div className='mb-5 gap-4 w-[40%]'>
              <label className='block font-semibold text-[#1E1E1E]'>Salary type</label>
              <input type='text' placeholder='Annual' className='p-2 rounded border outline-0 border-[#919191] w-full' />
            </div>

            {/* 3 */}
            <div className=' mb-5 gap-4 w-full w-[60%]'>
              <label className='block font-semibold text-[#1E1E1E]'>Salary range</label>
              <input type='text' placeholder='e.g. texas' className='p-2 rounded border outline-0 border-[#919191] w-full' />
            </div>
          </div>
          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* Hide salary checkbox */}
          <div className='flex w-full gap-2 py-5'>
            <input type='checkbox' className='rounded-xl' />
            <label classNam>Hide salary</label>
            <button className='rounded-full'><img src='/assets/images/question_button.svg' className='rounded-full' /></button>
          </div>
          {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* 3 description boxes */}
          <div>
            {/* 1 */}
            <div className='py-4 border-t'>
              <div className='flex gap-2'>
                <label className='py-2 text-lg font-semibold'>job summary</label>
                <button className='rounded-full'><img src='/assets/images/question_button.svg' className='rounded-full' /></button>
              </div>
              <textarea rows="2" cols="50" placeholder='job summary' className='w-full px-2 outline-0 bg-[#F4F8FB]'></textarea>
            </div>
            {/* 2 */}
            <div className='-py-4 '>
              <div className='flex gap-2'>
                <label className='py-2 text-lg font-semibold'>job description</label>
                <button className='rounded-full'><img src='/assets/images/question_button.svg' className='rounded-full' /></button>
              </div>
              <textarea rows="6" cols="50" placeholder='add job description here' className='w-full px-2 outline-0 bg-[#F4F8FB]'></textarea>
            </div>
            {/* 3 */}
            <div className='py-4 border-b'>
              <div className='flex gap-2'>
                <label className='py-2 text-lg font-semibold'>About company</label>
                <button className='rounded-full'><img src='/assets/images/question_button.svg' className='rounded-full' /></button>
              </div>
              <textarea rows="6" cols="50" placeholder='write about company' className='w-full px-2 outline-0 bg-[#F4F8FB]'></textarea>
            </div>
          </div>
          {/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* applicants profile info */}
          <div className='py-4 border-b '>
            <h3 className='py-2 text-lg font-semibold'>Applicant profile info</h3>

            {/* Switches */}
            <div className='flex w-full justify-between'>
              {/* Column 1  of buttons*/}
              <div>
                {/* button 1 */}
                <div className='flex py-1'>
                  <Switch /><label className='px-2 text-lg'>Personal information</label>
                </div>
                {/* button 2 */}
                <div className='flex py-1'>
                  <Switch /><label className='px-2 text-lg'>Contact</label>
                </div>
                {/* button 3 */}
                <div className='flex py-1'>
                  <Switch /><label className='px-2 text-lg'>Address</label>
                </div>
                {/* button 4 */}
                <div className='flex py-1'>
                  <Switch /><label className='px-2 text-lg'>Languages</label>
                </div>
                {/* button 5 */}
                <div className='flex py-1'>
                  <Switch /><label className='px-2 text-lg'>Demographics</label>
                </div>
                {/* button 6 */}
                <div className='flex py-1'>
                  <Switch /><label className='px-2 text-lg'>Citizenship status</label>
                </div>
              </div>
              {/* //////////////////////// */}
              {/* Column 2  of buttons*/}
              <div>
                {/* button 1 */}
                <div className='flex py-1'>
                  <Switch /><label className='px-2 text-lg'>Personal statement</label>
                </div>
                {/* button 2 */}
                <div className='flex py-1'>
                  <Switch /><label className='px-2 text-lg'>Work</label>
                </div>
                {/* button 3 */}
                <div className='flex py-1'>
                  <Switch /><label className='px-2 text-lg'>Education & training</label>
                </div>
                {/* button 4 */}
                <div className='flex py-1'>
                  <Switch /><label className='px-2 text-lg'>Skills</label>
                </div>
                {/* button 5 */}
                <div className='flex py-1'>
                  <Switch /><label className='px-2 text-lg'>Portfolio</label>
                </div>
              </div>
            </div>
          </div>
          {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* Add skills */}
          <div className='py-4 border-b '>
            <h3 className='py-2 text-lg font-semibold'>Add Skills</h3>
            {/* add skill bar */}
            <div className='flex'>
              <button className='h-[45px] w-[70px] bg-[#FFCB05] flex justify-center items-center'><img src="\assets\images\search_icon.svg" className='' /></button>
              <input type="text" placeholder='Add skills' className='h-[45px] outline-0 w-[60%] border-y-2 px-2 border-[#FFCB05]' />
              <button className='h-[45px] w-[70px] bg-[#000] flex justify-center items-center text-white'>Add</button>
            </div>

            {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            {/* skills sliders */}
            <div className='flex justify-end gap-3 mt-5 py-2'>
              <div className='gap-3'>
                {/* SQL slider */}
                <div className='border rounded-xl px-3 py-2 w-[300px] bg-[#F4F8FB] mb-3'>
                  <label className='block'>SQL</label>
                  <div className='h-[10px] w-[100%] bg-[#D9D9D9] rounded-[10px] flex'>
                    <div className='h-[10px] bg-[#FFCB05] w-[80%] rounded-[10px] relative'>
                      <div className='h-[15px] w-[15px] rounded-[50%] bg-[#FFCB05] absolute  right-[-5px] bottom-[-2.5px]'></div>
                      <div className='h-[15px] w-[px] bg-[white] absolute  right-[-12px] bottom-[25px]'>80%</div>
                    </div>
                  </div>                  
                </div>
                {/* C++ slider */}
                <div className='border rounded-xl px-3 py-2 w-[300px] bg-[#F4F8FB]'>
                  <label className='block'>C++</label>
                  <div className='h-[10px] w-[100%] bg-[#D9D9D9] rounded-[10px] flex'>
                    <div className='h-[10px] bg-[#FFCB05] w-[100%] rounded-[10px] relative'>
                      <div className='h-[15px] w-[15px] rounded-[50%] bg-[#FFCB05] absolute  right-[-5px] bottom-[-2.5px]'></div>
                      <div className='h-[15px] w-[px] bg-[white] absolute  right-[-12px] bottom-[25px]'>80%</div>
                    </div>
                  </div> 
                  <p></p>
                </div>
              </div>
              <div className='gap-3'>
                {/* Git slider */}
                <div className='border rounded-xl px-3 py-2 w-[300px] bg-[#F4F8FB] mb-3'>
                  <label className='block'>Git</label>
                  <div className='h-[10px] w-[100%] bg-[#D9D9D9] rounded-[10px] flex'>
                    <div className='h-[10px] bg-[#FFCB05] w-[50%] rounded-[10px] relative'>
                      <div className='h-[15px] w-[15px] rounded-[50%] bg-[#FFCB05] absolute  right-[-5px] bottom-[-2.5px]'></div>
                      <div className='h-[15px] w-[px] bg-[white] absolute  right-[-12px] bottom-[25px]'>80%</div>
                    </div>
                  </div> 
                </div>
                {/* Javascript slider */}
                <div className='border rounded-xl px-3 py-2 w-[300px] bg-[#F4F8FB]'>
                  <label className='block'>Javascript</label>
                  <div className='h-[10px] w-[100%] bg-[#D9D9D9] rounded-[10px] flex'>
                    <div className='h-[10px] bg-[#FFCB05] w-[100%] rounded-[10px] relative'>
                      <div className='h-[15px] w-[15px] rounded-[50%] bg-[#FFCB05] absolute  right-[-5px] bottom-[-2.5px]'></div>
                      <div className='h-[15px] w-[px] bg-[white] absolute  right-[-12px] bottom-[25px]'>80%</div>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
          </div>
          {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* add a question */}
          <div className='py-8 border-b'>
            <div className='flex gap-2 mb-2'>
              <label className='text-lg font-semibold'>Questtion for candidates (optional)</label>
              <button className='rounded-full'><img src='/assets/images/question_button.svg' className='rounded-full' /></button>
            </div>
            {isPopup && <PreviewAdpopup onClose={closePopup}/>}
            <button onClick={openPopup} className='h-[50px] w-full bg-[#FFCB05] rounded flex justify-start items-center px-2 font-semibold'>+ Add Question</button>
          </div>
          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* footer buttons */}
          <div className='flex justify-end gap-3 mt-6'>
            <button className='text-[#6347FF]  p-3  rounded font-semibold'>Preview ad</button>
            <button className='text-[] bg-[#E2E2E2] p-3  rounded font-semibold'>Discard</button>
            <button className='text-white bg-[#000] p-3  rounded font-semibold'>Save as draft</button>
            <button className='text-[] bg-[#FFCB05] p-3  rounded font-semibold'>Save & continue</button>
          </div>
        </div>
      </div>


    </>
  );
}

export default Companyprofile;