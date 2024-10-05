import React from 'react';

function Changepasswordpopup({onClose}) {
  return (
    <>
     <div className='w-[100%] flex items-center justify-center fixed top-0 left-0 w-full h-full z-50'>
     <div className="bg-gray-900 bg-opacity-50 fixed inset-0 z-[6]"></div>
    <div className='w-[425px] p-5 bg-white rounded-xl absolute z-[7] shadow-2xl '>
      
     
       <h2 className='text-2xl font-semibold w-full pb-5'>
         Change password
       </h2>

       <label className='text- font-semibold block w-full pb-1'>
       Current password
       </label>

       <div className='w-full h-[8%] relative flex justify-end items-center '>
       <input type='password' className='w-full h-[8%] p-4 rounded-xl border border-[#919191]'/>
       <img src='.\assets\images\eyeicon.svg' className=' absolute h-[90%] w-[10%] right-[2%]'/>
       </div>


       <label className='text font-semibold block w-full pb-1 pt-2'>
       New password
       </label>

       <div className='w-full h-[8%] relative flex justify-end items-center '>
       <input type='password' className='w-full p-4 rounded-xl border border-[#919191]'/>
       <img src='.\assets\images\eyeicon.svg' className=' absolute h-[90%] w-[10%] right-[2%]'/>
       </div>

     <div className='flex w-full p-6'>
       <button className='w-[80px] h-[40px] bg-[#FFCB05] rounded-xl'>
         save
       </button>
       <button onClick={onClose} className='w-[80px] h-[40px] ml-8 rounded-xl'>
         cancel
       </button>
     </div>
    
    </div>
    </div>

    </>
  );
}

export default Changepasswordpopup;
