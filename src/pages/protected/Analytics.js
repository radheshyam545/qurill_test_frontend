import React from 'react'
import LineChart from '../../components/EChart/LineChart';
import { customStylesSelect } from "../../components/ReactSelectStyle";

import Select from "react-select";
import AnalyticsCards from '../../components/AnalyticsCards';

function Analytics() {
    return (
        <div className=' rounded-xl '>
            <h2 className='text-[25px] font-semibold mb-4 h-8'>
                Analytics
            </h2>
            <div className='analytics-graph w-[84%]  h-[500px] m-auto rounded-[20px] bg-[] border-2 border-[#D8D8D8] p-[15px] bg-[#fff] '>
                <span className='analytics-graph-header bg-[] flex gap-[10px] flex-wrap rounded-xl flex items-center justify-between '>
                    <span className='analytics-graph-header-left  flex items-center justify-center w-[50%] bg-[]'>
                        <p className='px-[15px]'>This Week</p>
                        <img src="/assets/images/analytics-graph-arrow.svg" alt="" className='100%' />
                        <p className='px-[15px] text-[#27AE60] text-[22px] font-bold'>48.9k</p>
                    </span>
                    <span className='analytic-btn mr-[80px]'>
                        <Select
                            styles={customStylesSelect}
                            className="react-select"
                            classNamePrefix="select"
                            options={[
                                { value: 'Daily', label: 'Daily' },
                                { value: 'Weekly', label: 'Weekly' },
                                { value: 'Monthly', label: 'Monthly' },
                                { value: 'Yearly', label: 'Yearly' },
                            ]}
                            isSearchable
                            placeholder="Daily"

                        />

                    </span>

                </span>
                <LineChart />

            </div>
            <div className='w-[100%] m-auto mt-5 flex flex-wrap justify-between items-censter bg-[#fff]'>
               <AnalyticsCards/>
               <AnalyticsCards/>
               <AnalyticsCards/>
               <AnalyticsCards/>

                

                
            </div>
        </div>
    )
}

export default Analytics;