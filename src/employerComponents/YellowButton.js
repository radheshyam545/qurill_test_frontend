import React from 'react';

function YellowButton({yellow}) {
    return (
        <div>
            <button className="inline-flex py-[7px] px-[10px]  font-semibold rounded-[8px] bg-[#FFCB05]">
                {yellow}
            </button>
        </div>
    );
}

export default YellowButton;
