import React from 'react';

function BlueButton(props) {
    return (
        <div>
            <button className="inline-flex py-[3px] text-[#5C89FF] border border-[2px] border-[#5C89FF] font-semibold px-[10px] rounded-[8px] bg-[#DCECFF]">
                {props.blue}
            </button>
        </div>
    );
}

export default BlueButton;
