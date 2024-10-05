
const ProgressBar = ({ Progress }) => {
        const color = {
            16: "bg-[#EF4242]", // Red
            32: "bg-[#FFA500]", // Orange
            48: "bg-[#FFD700]", // Yellow
            64: "bg-[#02A2FF]", // Blue
            80: "bg-[#9ACD32]", // Light Green
            100: "bg-[#56CA8B]" // Green
        };
        const getColorClass = (progress) => {
            return color[progress] || "bg-[#EEECEC]"; // Default color if progress is not in color mapping
        };
    return (
        <div className="relative bg-[#EEECEC] rounded-[10px] w-[120px] h-[10px] overflow-hidden">
            <div
                // className={`absolute left-0 top-0 h-[100%] ${Progress < 50 ? 'bg-[#EF4242]' : (Progress === 50 ? 'bg-[#02A2FF]' : 'bg-[#56CA8B]')}`}
                // className={`absolute left-0 top-0 h-[100%] bg-[#56CA8B]`}///////////////green
                // className={`absolute left-0 top-0 h-[100%] bg-[#EF4242]`}    ///////////red
                className={`absolute left-0 top-0 h-[100%] ${getColorClass(Progress)}`}    ///////////red
                style={{ width: `${Progress}%` }}>
            </div>
        </div>
    )
}

export default ProgressBar