import { useState } from "react"


function InputText({labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType}){

    const [value, setValue] = useState(defaultValue)

    const updateInputValue = (val) => {
        setValue(val)
        updateFormValue({updateType, value : val})
    }

    return(
        <div className={`form-control w-full mb-[36px] ${containerStyle}`}>
            <label className="label p-0 leading-[24px] mb-[6px]">
                <span className={"text-[20px] font-normal" + labelStyle}>{labelTitle}</span>
            </label>
            <input type={type || "text"} value={value} placeholder={placeholder || ""} onChange={(e) => updateInputValue(e.target.value)} className="w-full px-[15px] py-[16px] border border-[#919191] rounded-[5px] focus:border-[#FFCB05] outline-none" />
        </div>
    )
}


export default InputText