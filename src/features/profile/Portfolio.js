import React, { useEffect, useState } from "react";
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import { multipleFileUpload, singleFileUpload } from "../../app/helperFunction";
import { postProfileData } from "../../features/profile/profileSlice";
import { useSelector, useDispatch } from 'react-redux'
import { notifySuccess } from "../../app/toaster";
import ProfileUploadsCards from "../../components/ProfileUploadsCards";
import { set } from "lodash";
import Select from "react-select";
import { customStylesSelect } from "../../components/ReactSelectStyle";
import { LicenseData } from "../../pages/employerProtected/JobConsts";

const Portfolio = () => {

    const dispatch = useDispatch()
    const [collapse1, setCollapse1] = useState(true);
    const [tabData, setTabData] = useState({})
    const [file, setFile] = useState(null)
    const [files, setFiles] = useState(null)
    const [loadingSave, setLoadingSave] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [loading3, setLoading3] = useState(false)
    const [selectedCertificate, setSelectedCertificate] = useState([])

    const { profilePagesData } = useSelector(state => state.profile)
    const { portfolio } = profilePagesData

    const toggleCollapse = (collapseNumber) => {
        switch (collapseNumber) {
            case 1:
                setCollapse1(!collapse1);
                break;
            default:
                break;
        }
    };

    // useEffect(() => { if (file != null) { singleFileUpload(file, setTabData); setFile(null) } }, [file])
    // useEffect(() => { if (files != null) { multipleFileUpload(files, setTabData); setFiles(null) } }, [files])

    useEffect(() => {
        if (!portfolio) setTabData({})
        else {
            setTabData(portfolio)
            setSelectedCertificate(portfolio?.certifications || [])
        }
    }, [portfolio])

    const handleFileChange = async (e, key) => {
        if (e.target.files) {
            try {

                if (key === 'resume') {
                    setLoading(true)
                } else if (key === 'coverLetter') {
                    setLoading1(true)

                } else if (key === 'certifications') {
                    setLoading3(true)
                }

                let res = await singleFileUpload(e.target.files[0])
                if (res?.success) {
                    const { url } = res.data
                    if (key === 'certifications') {
                        setTabData({ ...tabData, [key]: [...tabData[key], url] })
                    }
                    else {
                        setTabData({ ...tabData, [key]: url })
                    }
                    setLoading(false)
                    setLoading1(false)
                    setLoading2(false)
                    setLoading3(false)
                }
            } catch (e) {
                setLoading(false)
                setLoading1(false)
                setLoading2(false)
                setLoading3(false)
            }

        }
    };

    const handleMultiFileChange = async (e, key) => {

        if (e.target.files) {
            try {
                setLoading2(true)
                let res = await multipleFileUpload(e.target.files)
                if (res?.success) {
                    setLoading2(false)

                    let urls = res.data.map(item => item.url)
                    setTabData({ ...tabData, [key]: [...tabData[key], ...urls] })
                }
            } catch (e) {
                setLoading2(false)
            }
        }

    };


    const handleSave = async () => {
        setLoadingSave(true)
        try {
            dispatch(postProfileData({ portfolio: tabData })).unwrap().then(() => {
                setLoadingSave(false)
                // setSelectedCertificate()
                notifySuccess('Portfolio Updatded Successfully')
            })
        } catch (e) {
            console.log('error profile', e)
            setLoadingSave(false)
        }

    };

    const handleInputChange = (key, value) => {
        setTabData({ ...tabData, [key]: value });
    }
    const previewFile = (url) => {
        window.open(url, '_blank');
    }

    const deleteFile = (key, index) => {
        let data = { ...tabData }

        if (key === 'projects') {
            data[key] = data['projects'].filter((item, i) => index != i)
        } else {
            delete data[key]
        }
        setTabData(data)
    }

    const handleCertificateChange = (selectedOption) => {
        setTabData({ ...tabData, ['certifications']: selectedOption.map(item => item.value) })
        setSelectedCertificate(selectedOption.map(item => item.value))
    }

    return (
        <div>

            <form >
                <div className="section-1 mb-10 overflow-hidden">
                    <h4 onClick={() => toggleCollapse(1)} className=" flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[15px] mb-3">
                        Portfolio
                        <ChevronDownIcon className={` transition-all duration-300 ${collapse1 ? 'rotate-180' : ''} w-[23px]`} />
                    </h4>
                    <div className={`transition-all duration-300 ${collapse1 ? 'show' : 'hidden'}`}>
                        <div className=" mb-5 bg-[]">
                            <label className="mb-1 text-[15px] block">Resume CV/Resume</label>
                            <span className="portfolio-file-upload-section flex gap-[40px]">
                                <input
                                    className="file-input file-input-bordered text-[15px] w-full max-w-xs"
                                    type="file"
                                    id="resumeFile"
                                    name="file"
                                    // accept='.pdf'
                                    onChange={(e) => { handleFileChange(e, 'resume') }}
                                />
                                {tabData.resume &&
                                    <span className="flex gap-[10px] justify-center items-center">
                                        <p className="font-semibold underline text-[15px] text-[#96b1ff] cursor-pointer" onClick={() => { previewFile(tabData.resume) }}>Download</p>
                                        <img src="assets/images/profile-portfolio-trash-icon.svg" onClick={() => { deleteFile('resume') }} alt="" className="w-[15px] cursor-pointer" />
                                    </span>
                                }
                                {loading &&
                                    <span className="flex gap-[10px] justify-center items-center">
                                        <span className="loading"></span>
                                    </span>
                                }

                            </span>
                            {/* <input type="file" placeholder="Upload resume cv" className="font-15px" /> */}
                        </div>
                        <div className="mb-5">
                            <label className="mb-1 block text-[15px]">Upload cover letter</label>
                            <span className="portfolio-file-upload-section flex gap-[40px]">
                                <input
                                    className="file-input file-input-bordered text-[15px] w-full max-w-xs "
                                    type="file"
                                    id="coverFile"
                                    name="file"
                                    // accept='.pdf'
                                    onChange={(e) => { handleFileChange(e, 'coverLetter') }}
                                />
                                {tabData.coverLetter &&
                                    <span className="flex gap-[10px] justify-center items-center">
                                        <p className="font-semibold underline text-[#96b1ff] cursor-pointer" onClick={() => { previewFile(tabData.resume) }}>Download</p>
                                        <img src="assets/images/profile-portfolio-trash-icon.svg" onClick={() => { deleteFile('coverLetter') }} alt="" className="w-[15px] cursor-pointer" />
                                    </span>
                                }
                                {loading1 &&
                                    <span className="flex gap-[10px] justify-center items-center">
                                        <span className="loading"></span>
                                    </span>
                                }
                            </span>
                            {/* <input type="file" placeholder="Upload resume cv" className="font-15px" /> */}
                        </div>
                        <div className="mb-5">
                            <label className="mb-1 block text-[15px]">Select Certification</label>
                            <span className="portfolio-file-upload-section flex gap-[40px]">
                                <Select
                                    styles={{
                                        ...customStylesSelect,
                                        control: (provided) => ({
                                            ...provided,
                                            fontWeight: 500,
                                        }),
                                        groupHeading: (provided) => ({
                                            ...provided,
                                            fontWeight: 700,
                                            color: 'black'
                                        }),
                                    }}
                                    className="react-select font-[500] w-[280px] text-[15px] -height"
                                    classNamePrefix="All"
                                    value={selectedCertificate.map(value =>
                                        LicenseData.flatMap(group => group.options).find(option => option.value === value)
                                    )}
                                    options={LicenseData}
                                    isSearchable={true}
                                    placeholder="Certificate"
                                    onChange={handleCertificateChange}
                                    isMulti={true}
                                />
                                {loading3 &&
                                    <span className="flex gap-[10px] justify-center items-center">
                                        <span className="loading"></span>
                                    </span>
                                }
                            </span>
                        </div>
                        <div className="portfolio-project-upload-section flex gap-[20px]">
                            <div className="portfolio-project-upload-left mb-5 w-6/12">
                                <label className="mb-1 block text-[15px] font-semibold">Upload Project</label>
                                <div className="relative py-2 h-[350px] max-w-[480px] gap-1 flex items-center justify-center flex-col border-[1px] border-dashed border-[#BFBFBF]">
                                    {/* <input type="file" className="absolute cursor-pointer left-0 top-0 w-full h-full z-1 opacity-0" /> */}
                                    <input
                                        className="absolute cursor-pointer text-[15px] left-0 top-0 w-full h-full z-1 opacity-0"
                                        type="file"
                                        id="projectFile"
                                        name="file"
                                        accept='.jpg,.jpeg,.png,.gif'
                                        multiple
                                        onChange={(e) => handleMultiFileChange(e, 'projects')}
                                    />
                                    <svg width="85" height="66" viewBox="0 0 85 66" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.443 65.9936C31.5377 65.9936 20.6349 65.9936 9.72963 65.9936C3.83864 65.9936 0 62.201 0 56.383C0 40.7968 0 25.2105 0 9.62427C0 3.80384 3.84118 0.00866233 9.7271 0.00866233C15.6054 0.00866233 21.4863 -0.0163718 27.3646 0.018676C30.998 0.0387033 34.1753 1.2103 36.6736 3.91649C36.8865 4.1468 37.155 4.3596 37.2767 4.63247C37.8341 5.88417 38.8223 6.04189 40.0942 6.03438C49.7985 5.98431 59.5003 6.00434 69.2046 6.00684C75.0879 6.00684 78.9747 9.79951 78.8759 15.6325C78.8455 17.455 79.0913 18.6416 80.9612 19.6529C83.6748 21.1199 84.9544 23.7936 84.9671 26.8703C85.0101 36.929 85.0127 46.9852 84.9721 57.0439C84.9519 62.1058 80.9206 65.9786 75.729 65.9886C64.6337 66.0087 53.5409 65.9936 42.4455 65.9936H42.443ZM45.5266 35.9902C45.894 36.3157 46.1245 36.5084 46.3399 36.7162C48.3517 38.6564 50.3559 40.609 52.3779 42.5417C53.7182 43.8234 55.5628 43.8484 56.7815 42.6368C58.0079 41.4176 57.98 39.5926 56.6472 38.2909C53.3635 35.089 50.0772 31.8871 46.7478 28.7328C44.2876 26.4021 40.7656 26.3696 38.2902 28.6978C34.9025 31.8821 31.5706 35.1265 28.2691 38.401C27.7953 38.8691 27.4862 39.6202 27.3646 40.2886C27.1492 41.4877 27.8891 42.6568 28.9913 43.2051C30.1593 43.7859 31.4769 43.6056 32.4904 42.6468C34.5883 40.6566 36.6559 38.6363 38.7386 36.6336C38.9261 36.4534 39.139 36.2956 39.4582 36.0253C39.4582 36.5285 39.4582 36.8664 39.4582 37.2044C39.4582 42.762 39.4405 48.322 39.481 53.8796C39.4861 54.563 39.6685 55.3241 40.0106 55.9099C40.6871 57.0715 42.1339 57.5146 43.4033 57.1265C44.6727 56.736 45.5215 55.5669 45.524 54.1224C45.5342 48.4697 45.5291 42.817 45.5291 37.1643C45.5291 36.8339 45.5291 36.5034 45.5291 35.9927L45.5266 35.9902ZM41.2597 12.005C41.921 13.3494 42.557 14.556 43.1144 15.7952C43.8112 17.3423 44.9489 18.0282 46.682 18.0207C55.051 17.9832 63.42 18.0032 71.7865 18.0032H72.838C72.838 17.097 72.838 16.3209 72.838 15.5448C72.8354 13.1366 71.6851 12.005 69.2375 12.005C60.268 12.005 51.301 12.005 42.3315 12.005H41.2547H41.2597Z" fill="#F1F1F1" /></svg>
                                    <h5 className="text-16 font-semibold text-[15px] mt-3">{loading2 ? <span className="loading"></span> : 'Upload Project'}</h5>
                                    <p className=" text-13 m-0 text-[15px] text-[#CECECE]">
                                        Drag and Drop your file here or <span className="text-[#4C73FF] underline">choose files</span>
                                    </p>

                                </div>
                            </div>
                            {
                                tabData?.projects && tabData?.projects?.length > 0 &&
                                <div className="portfolio-project-upload-left mb-5 w-6/12">
                                    <label className="mb-1 block font-semibold text-[15px] ">Uplodes</label>
                                    <div className="relative  h-[350px] w-[100%] overflow-y-scroll grid grid-cols-4 p-[10px]  gap-[5px] border-[1px] border-dashed border-[#BFBFBF]">
                                        {
                                            tabData?.projects.map((item, index) => {
                                                return <ProfileUploadsCards url={item} index={index} handleDelete={deleteFile} />
                                            })
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="mb-5 lg:w-6/12">
                            <label className="mb-1 block text-[15px]">Website URL</label>
                            <input type="text" value={tabData?.website} onChange={(e) => handleInputChange('website', e.target.value)} placeholder="Website URL" className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]" />
                        </div>

                        {/* <div className="mt-2">
                            <div className="inline-flex gap-1 cursor-pointer hover:text-[#FFCB05]">
                                <PlusCircleIcon className="w-[20px]" />
                                <span> Add</span>
                            </div>
                        </div> */}
                    </div>
                </div>
                <div className="text-end">
                    {/* <button className="font-medium bg-[#FFCB05] px-[40px] text-[16px] rounded-[0px] py-[12px] border-0" onClick={() => { handleSave() }}>{loading ? <span className="loading"></span> : 'Save'}</button> */}
                    <button type="button" onClick={handleSave} className="font-medium bg-[#FFCB05] px-[40px] text-[15px] rounded-[0px] py-[12px] border-0">{loadingSave ? <span className="loading"></span> : 'Save'}</button>
                </div>
            </form >

        </div >
    )
}

export default Portfolio