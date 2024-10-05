import React from 'react';

function QuestionComponent({ question, name, value, onChange, onBlur, error }) {
  return (
    <div className='wrapper flex flex-col gap-[6px] mt-[6px]'>
      <label className='text-[15px]' htmlFor={name}>{question}</label>
      {error ? <div className="text-red-500 text-xs mt-1">{error}</div> : null}
      <textarea
        className='textareas bg-[#F4F8FB] text-black text-[15px] border-[#E4E4E4] border p-[8px] max-h-[60px] outline-none'
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}

export default QuestionComponent;
