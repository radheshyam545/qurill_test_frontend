import React, { useState } from 'react';

function AddSkillComp({value, idx, todo, setTodo}) {
    const [status, setStatus] = useState(false)
  const delrow =()=>{
    const finaldata = todo.filter((v,i)=>i!=idx)
    setTodo(finaldata)
  }
  return (
    <>
        <li className={`  mt-[5px] flex items-center justify-between px-[20px] mx-[5px] min-h-[50px] bg-[black] text-[white]  -w-[200px]`} >
            <p onClick={()=>setStatus(!status)} className={` -min-w-[60px] ${status ? 'line-add' : ''}`}>{value}</p>
            <span onClick={delrow} className='cursor-pointer px-[10px] text-[20px] text-[black] bg-[#FFCB05] ml-[8px] font-semibold'>X</span>
          </li>
    </>
  );
}

export default AddSkillComp;
