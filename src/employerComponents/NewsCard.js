import React from 'react';

function NewsCard(props) {
  const {image ,disciption} = props
  return (
    <>
        <div className='rounded border border-slate-200 shadow-xl m-[15px]'>
            <div className=' h-[190px] rounded-t bg-no-repeat bg-center bg-cover' style={{backgroundImage:`url(${image})`}}>
              
            </div>
            <div className='p-4'>
             <h2 className='w-full h-28 text-lg font-bold'>
               today super store to steal the new version of playsttion 5 whic is relesed today
             </h2>
             <p className='text-sm w-full h-28 mt-[2px] text-[16px]'>
                {disciption}
                </p>
             <div className='flex w-full mt-[6px] text-xs h-5'>
                <p className=' font-semibold'>
                    2 hours earlier
                </p>
                <p className='ml-10'>
                    lucy hiddlestone
                </p>
                <p className='border-l-2 border-l-slate-400 w-[80px] h-5 text-center ml-[10px]'>
                    4 min read
                </p>
             </div>
            </div>
        </div>
    </>
  );
}

export default NewsCard;