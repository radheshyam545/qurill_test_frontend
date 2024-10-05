import { Input } from 'postcss';
import React from 'react';

function PreviewAdpopup({onClose}) {
  return (
    <>
     <div className='w-[100%] flex items-center justify-center fixed -top-0 -left-0 h-full z-50 '>
     <div className="bg-gray-900 bg-opacity-50 fixed inset-0 z-[6]"></div>
    <div className='w-[40%] h-[70%] p-5 bg-white rounded-xl absolute z-[7] shadow-2xl '>
      
     <div>
       <h2 className='text-2xl font-semibold w-full mb-5'> 
         Write your own question
       </h2>
       <div className='flex gap-3 mb-5'>
        <button className='bg-[#FFCB05] rounded p-2'>
            Question
        </button>
        <input type="text" placeholder='write your own question' className='w-full rounded px-2 bg-[#F4F8FB] h-[50px]'/>
       </div>
       </div>
       <div>
       <h2 className=' w-full mb-2'> 
        question type
       </h2>
       <input type="text" placeholder='write your own question' className='w-full rounded px-2 bg-[#F4F8FB] h-[50px]'/>
       </div>

       
{/* footer buttons */}
     <div className='flex w-full px-10 pb-3 justify-end absolute bottom-0'>    
       <button onClick={onClose} className='p-3 mr-8 rounded bg-[#E2E2E2]'>
         close
       </button>
       <button className='p-3 bg-[#FFCB05] rounded'>
         Add a question
       </button>
     </div>
    
    </div>
    </div>

    </>
  );
}

export default PreviewAdpopup;

