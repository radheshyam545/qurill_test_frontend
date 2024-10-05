import { customStylesSelect } from "../../components/ReactSelectStyle";
import Select from "react-select";
import { applicantStatus } from "../../app/selectData";

const JobListingFilter = ({ status, setStatus }) => {
    const handleChange = (selectedOption) => {
        setStatus((prev) => ({
            ...prev, 
            status: selectedOption?.value || ""
        }));
    };

    return (
        <div className="-mb-[5px] -bg-[white] py-[20px] rounded-[10px] px-[40px]">
            <div className="flex gap-[10px] flex-wrap justify-end">
                <div>
                    <h4 className="text-[15px]">Status</h4>
                    <Select
                        styles={customStylesSelect}
                        className="react-select float-right text-[15px]"
                        classNamePrefix="select"
                        value={status.status ? applicantStatus.find((item)=>(item.value==status.status)?.label) : null}
                        onChange={handleChange}
                        options={applicantStatus}
                        isSearchable
                        placeholder="Status"
                    />
                </div>
            </div>
        </div>
    )
}

export default JobListingFilter