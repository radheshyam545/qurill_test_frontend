import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function InputText({ labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType }) {
    const [value, setValue] = useState(defaultValue);
    const [showPassword, setShowPassword] = useState(false);

    const updateInputValue = (val) => {
        setValue(val);
        updateFormValue({ updateType, value: val });
    };

    const togglePasswordVisibility = (e) => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`form-control w-full mb-[10px] ${containerStyle}`}>
            <label className="label p-0 leading-[24px] mb-[6px]">
                <span className={"text-[20px] font-normal" + labelStyle}>{labelTitle}</span>
            </label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : type || "text"}
                    value={value}
                    placeholder={placeholder || ""}
                    onChange={(e) => updateInputValue(e.target.value)}
                    className="w-full px-[15px] py-[16px] border border-[#919191] rounded-[5px] focus:border-[#FFCB05] outline-none pr-[40px]"
                />
                {/* {type === "password" && (
                    <span
                        className="absolute top-[50%] right-[10px] transform -translate-y-1/2"
                        onClick={(e) => togglePasswordVisibility(e)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                )} */}
            </div>
        </div>
    );
}

export default InputText;
