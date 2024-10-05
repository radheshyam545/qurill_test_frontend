import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactSelect from 'react-select';
import Select from "react-select";
import { delCall, getCall, patchCall, putCall } from '../../app/axiosConfig';
import { FaSpinner } from 'react-icons/fa';
import { notifyStatus } from '../../app/toaster';
import moment from 'moment';
import { statusEnum } from '../jobSearch/jobConst';
import { useSelector } from 'react-redux';
import { CountryDATAEnum, usaCitiesEnum, USStatesEnum } from '../../pages/employerProtected/JobConsts';
function TableRow({ fetchData, jobs, Item, index, setOpen, setModal, setViewPost }) {

    const navigate = useNavigate();
    const { countryList } = useSelector(state => state.lead)
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#F5CB16',
            border: '5px',
            borderRadius: '8px',
            boxShadow: 'none',
            padding: '0px 15px',
            // paddingRight: '4px',
            '&:hover': {
                backgroundColor: '#F8B501'
            }
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: '#000',
            fontWeight: 'semibold'

        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: '#000',
            fontWeight: 'semibold'
        }),
        dropdownIndicator: (provided, state) => ({
            display: 'none'
        }),
        indicatorSeparator: (provided, state) => ({
            display: 'none'
        }),
        menu: (provided, state) => ({
            ...provided,
            width: 'auto',
            // borderRadius: '8px',
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',

        }),
        menuList: (provided, state) => ({
            ...provided,
            padding: 0,
            // borderRadius:'20px'
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#F8B501' : 'white',
            color: state.isSelected ? 'white' : '#000',
            fontSize: '13px',
            // borderBottomLeftRadius: '12px',
            // borderBottomRightRadius: '12px',
            fontWeight: 'normal',
            '&:hover': {
                backgroundColor: '#E2E2E2',
                color: '#000'
            },
            width: '100%',
            boxSizing: 'border-box'
        })
    };

    const handleSelectChange = async (selectedOption) => {
        if (jobs && jobs[index]) {
            const jobId = jobs[index]._id;
            if (selectedOption?.value === "edit") {
                const queryParams = {
                    _id: jobId,
                    name: 'draft'
                };
                const queryString = new URLSearchParams(queryParams).toString();
                window.location.href = `/employer/JobPost?${queryString}`;
            } else if (selectedOption?.label.toLowerCase() == "view job post") {
                setViewPost(Item)
                setModal(true)
            }
            else if (selectedOption?.value === "delete") {
                try {
                    setLoading(true);
                    const response = await delCall(`/jobs/${jobId}`);
                    await fetchData();
                    const { data, status } = response
                    if (status === 200) {
                        const message = data?.message || "Job Deleted Successfully";
                        notifyStatus(message)
                    }
                } catch (error) {
                } finally {
                    setLoading(false);
                }
            } else if (selectedOption?.value?.toLowerCase() === "unpublished" || selectedOption?.value?.toLowerCase() === "published") {
                const status = selectedOption.value.toLowerCase() === "unpublished" ? "unpublished" : "published";
                const updatedBody = { status };

                try {
                    setLoading(true);
                    const response = await patchCall(`/jobs/${jobId}/change-status`, updatedBody);
                    await fetchData();
                    const { data, status } = response
                    if (status === 200) {
                        const message = data?.message || "Status updated successfully";
                        notifyStatus(message)
                    }


                } catch (error) {
                    console.error('Error changing job status:', error);
                } finally {
                    setLoading(false);
                }
            }
        } else {
            console.error('Invalid index or job not found');
        }
    };

    const formattedDate = moment(Item?.createdAt).format('MMMM D, YYYY h:mm A');
    return (
        <>
            <tr className="border-0 cursor-pointer -under-shadow w-full rounded-[20px] h-[110px] -tab-top" id={index}>
                <td className="text-[15px] leading-[15px] table-text font-semibold bg-white rounded-l-[10px] -w-[300px] leading-[13px] whitespace-nowrap" onClick={() => navigate(`/employer/Job-Detail/${Item?._id}`)}>
                    {Item?.title?.length > 50 ? Item?.title.slice(0, 25) + '...' : Item?.title}
                    <p className="font-normal whitespace-nowrap text-[#000] opacity-[0.6] text-[12px] leading-[18px] table-text -text-nowrap mt-[10px]"> {formattedDate}</p>
                </td>
                <td className="text-[15px] table-text  bg-white font-[500] text-center" onClick={() => navigate(`/employer/Job-Detail/${Item?._id}`)}>{Item?.VIEWS}</td>
                <td className="text-[15px]  table-text whitespace-nowrap bg-white -w-[200px] font-[500] -text-center" onClick={() => navigate(`/employer/Job-Detail/${Item?._id}`)}>
                    <p className='-text-nowrap'>{Item?.city ? `${Item.city}, ${Item.state}` : Item?.city || Item?.state || ""}</p>
                    <p className='-text-nowrap text-[12px] mt-[2px] whitespace-nowrap text-[#919191]'>{Item?.country ? CountryDATAEnum[Item?.country] : ''}</p>
                </td>
                <td className="text-[15px] table-text bg-white text-center" onClick={() => navigate(`/employer/Job-Detail/${Item?._id}`)}>
                    <p>{Item?.applicants}</p>
                </td>
                <td className="text-[15px] table-text bg-white text-center" onClick={() => navigate(`/employer/Job-Detail/${Item?._id}`)}>
                    <p>{Item?.applied}</p>
                </td>
                <td className="text-[15px] table-text bg-white text-center" onClick={() => navigate(`/employer/Job-Detail/${Item?._id}`)}>
                    <p>{Item?.shortListed}</p>
                </td>
                <td className="text-[15px] table-text bg-white text-center" onClick={() => navigate(`/employer/Job-Detail/${Item?._id}`)}>
                    <p>{Item?.screened}</p>
                </td>
                <td className="text-[15px] table-text bg-white text-center" onClick={() => navigate(`/employer/Job-Detail/${Item?._id}`)}>
                    <p>{Item?.interviewed}</p>
                </td>
                <td className="text-[15px] table-text bg-white text-center" onClick={() => navigate(`/employer/Job-Detail/${Item?._id}`)}>
                    <p>{Item?.hired}</p>
                </td>
                <td className="text-[15px] w-[] -cursor-pointer table-text bg-white rounded-r-[10px] -h-[110px] -overflow-y-scroll text-center">
                    <Select
                        styles={customStyles}
                        className="inline-flex  py-[5px] px-4 rounded-xl font-semibold transition-colors duration-100"
                        classNamePrefix="All"
                        value={null}
                        onChange={handleSelectChange}
                        options={
                            Item?.status === "published"
                                ? [
                                    { value: "unpublished", label: "Unpublish" },
                                    { value: "view job post", label: "View job post" }
                                ]
                                : Item?.status === "draft"
                                    ? [
                                        { value: "edit", label: "Edit" },
                                        { value: "delete", label: "Delete" }
                                    ]
                                    : Item?.status === "unpublished"
                                        ? [
                                            { value: "published", label: "Publish" },
                                            { value: "view job post", label: "View job post" }
                                        ]

                                        : []
                        }
                        isSearchable={false}

                        placeholder={loading ? (<div className="flex justify-center items-center">
                            <FaSpinner className="animate-spin h-5 w-5 mr-3 text-blue-500" /> Loading...</div>) : statusEnum[Item?.status]}
                    // onChange={handleSelectChange}

                    />

                </td>
            </tr>
            <tr className="border-0 relative -z-[0]">
                <td colSpan={8} className="bg-[#FAFAFA] h-[12px] p-0"></td>
            </tr>
        </>
    )
}

export default TableRow