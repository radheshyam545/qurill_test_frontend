import React, { useState, useEffect } from 'react'
import Select from "react-select"
import { customStylesSelect } from "../../components/ReactSelectStyle"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { getCall, postCall, putCall } from '../../app/axiosConfig'
import { singleFileUpload } from '../../app/helperFunction'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import InternalPage from './UnderVarification'
import SuspenseContent from '../../containers/SuspenseContent'
import SocialLinks from '../../employerComponents/companyProfileComponents/SocilaLinks'
const entityTypere = [
    { value: "llc", label: "LLC" },
    { value: "stock_corporation", label: "Stock Corporation" },
    { value: "nonprofit_rganization", label: "Nonprofit Organization" },
    { value: "corporation", label: "Corporation" },
    { value: "b_corp", label: "B-Corp" },
]
const validationSchema = Yup.object().shape({
    entityType: Yup.string().required('Entity Type is required'),
    mailingAddress: Yup.string().required('Mailing Address is required'),
    companySize: Yup.string().required('Company Size is required'),
    phoneNumber: Yup.object().shape({
        countryCode: Yup.string().required('Country Code is required'),
        contactNumber: Yup.string().required('Contact Number is required')
    })
})
function CompanyProfile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [appLoading, setAppLoading] = useState(false);
    const [profileObj, setProfileObj] = useState({});
    const [formState, setFormState] = useState({
        photo: '',
        entityType: '',
        phoneNumber: {
            countryCode: '+',
            contactNumber: ''
        },
        mailingAddress: '',
        websiteURL: '',
        certifications: '',
        businessRegistrationNumber: '',
        corporateDomicile: '',
        physicalAddress: '',
        companySize: '',
        industryAffiliations: '',
        taxIDNumber: '',
        socialLinks: {
            facebookURL: '',
            twitterURL: '',
            linkedinURL: '',
            youtubeURL: ''
        }
    });
    const [inActive, setInActive] = useState(true);
    const [status, setStatus] = useState(localStorage.getItem('Status'))
    useEffect(() => {
        if (status === "draft") {
            setInActive(true);
        } else if (status === "pending") {
            setInActive(false);
        } else if (status === "approved") {
            navigate("/employer/dashboard")
        }
        if (status !== 'draft')
            fetchProfileData();

    }, [status])

    const formik = useFormik({
        initialValues: formState,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const responce = await postCall('employers', values);
                const { status } = responce
                if (status == 200) {
                    fetchProfileData()
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            } finally {
                setLoading(false);
            }
        }
    })

    useEffect(() => { formik.setValues(formState); }, [formState]);

    const fetchProfileData = async () => {
        try {
            setAppLoading(true)
            const response = await getCall('/employers');
            if (response.data) {
                setStatus(response?.data?.status)
                localStorage.setItem('Status', response?.data?.status)
                setProfileObj(response.data);
                if (response?.data?.status === 'approved') {
                    navigate("/employer/dashboard")
                }
            }
        } catch (error) {
            setStatus('Inactive')
            console.error('Error fetching profile data:', error);
        }
        finally {
            setAppLoading(false)
        }
    }

    const handleFileChange = async (e) => {
        setAppLoading(true)
        const file = e.target.files[0];
        const res = await singleFileUpload(file);
        setAppLoading(false)
        const { url } = res.data;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                formik.setFieldValue('photo', url);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleImageClick = () => {
        document.getElementById('photoInput').click();
    }

    return (
        <>
            {
                appLoading ? <SuspenseContent /> :
                    inActive ?
                        <div className='company-profile-wrapper flex justify-center h-[100vh] w-[100%] rounded-[15px] bg-[#F3F8FC]'>
                            <div className='bg-[White] w-[80%] border h-[95%] overflow-scroll rounded-[15px] company-profile-second-wrapper px-[40px] py-[40px] my-[30px] pb-[100px] '>
                                <p className='font-semibold flex justify-center text-[20px]'>Legitimacy Checkpoint</p>
                                <div >
                                    {formik.values.photo ? (
                                        
                                        <img src={formik.values.photo} alt="Profile Preview" className='company-profile-img mt-2 max-w-[100px] min-w-[100px] max-h-[100px] min-h-[100px] object-contain' />
                                    ) : (
                                        <div >
                                            <img src="/assets/images/employer-images/legitimacylogo.svg" alt="" className='company-profile-img h-[100px]' onClick={handleImageClick} />
                                        </div>
                                    )}
                                    <input
                                        id="photoInput"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[15px] mt-[10px]'>
                                        <div>
                                            <h3 className="mb-1 font-[500]">Entity Type *</h3>
                                            <Select
                                                styles={customStylesSelect}
                                                className="react-select outline-none"
                                                classNamePrefix="All"
                                                options={entityTypere}
                                                isSearchable={true}
                                                placeholder="Select"
                                                value={entityTypere.find(option => option.value === formik.values.entityType)}
                                                onChange={(option) => formik.setFieldValue('entityType', option.value)}
                                            />
                                            {formik.touched.entityType && formik.errors.entityType ? (
                                                <div className="text-red-600">{formik.errors.entityType}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <label className="mb-1 font-[500]">Corporate domicile </label>
                                            <input
                                                name="corporateDomicile"
                                                type="text"
                                                placeholder="Corporate domicile"
                                                className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8] placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                                                value={formik.values.corporateDomicile}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.corporateDomicile && formik.errors.corporateDomicile ? (
                                                <div className="text-red-600">{formik.errors.corporateDomicile}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <label className="mb-1 font-[500]">Contact Number *</label>
                                            <PhoneInput
                                                country={'us'}
                                                buttonStyle={{ width: "60px" }}
                                                dropdownStyle={{ width: "400px" }}
                                                inputStyle={{
                                                    height: "45px",
                                                    width: "100%",
                                                    paddingLeft: "70px",
                                                    backgroundColor: "#FBFBFB",
                                                    borderRadius: "10px"
                                                }}
                                                value={formik.values.phoneNumber.contactNumber}
                                                onChange={(value) => formik.setFieldValue('phoneNumber.contactNumber', value)}
                                            />
                                            {formik.touched.phoneNumber?.contactNumber && formik.errors.phoneNumber?.contactNumber ? (
                                                <div className="text-red-600">{formik.errors.phoneNumber.contactNumber}</div>
                                            ) : null}
                                        </div>

                                        <div>
                                            <label className="mb-1 font-[500]">Physical Address </label>
                                            <input
                                                name="physicalAddress"
                                                type="text"
                                                placeholder="Physical Address"
                                                className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8] placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                                                value={formik.values.physicalAddress}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.physicalAddress && formik.errors.physicalAddress ? (
                                                <div className="text-red-600">{formik.errors.physicalAddress}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <label className="mb-1 font-[500]">Mailing Address *</label>
                                            <input
                                                name="mailingAddress"
                                                type="text"
                                                placeholder="Mailing Address"
                                                className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8] placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                                                value={formik.values.mailingAddress}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.mailingAddress && formik.errors.mailingAddress ? (
                                                <div className="text-red-600">{formik.errors.mailingAddress}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <h3 className="font-[500]">Company Size *</h3>
                                            <input
                                                type="number"
                                                className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8] placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                                                placeholder="Number of employees"
                                                value={formik.values.companySize}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value >= 0) {
                                                        formik.setFieldValue('companySize', value);
                                                    }
                                                }}

                                                // onChange={(e) => formik.setFieldValue('companySize', e.target.value)}
                                            />
                                            {formik.touched.companySize && formik.errors.companySize ? (
                                                <div className="text-red-600">{formik.errors.companySize}</div>
                                            ) : null}
                                        </div>

                                        <div>
                                            <label className="mb-1 font-[500]">Website URL </label>
                                            <input
                                                name="websiteURL"
                                                type="text"
                                                placeholder="Website URL"
                                                className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8] placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                                                value={formik.values.websiteURL}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.websiteURL && formik.errors.websiteURL ? (
                                                <div className="text-red-600">{formik.errors.websiteURL}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <label className="mb-1 font-[500]">Industry Affiliations</label>
                                            <input
                                                name="industryAffiliations"
                                                type="text"
                                                placeholder="Industry Affiliations"
                                                className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8] placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                                                value={formik.values.industryAffiliations}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.industryAffiliations && formik.errors.industryAffiliations ? (
                                                <div className="text-red-600">{formik.errors.industryAffiliations}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold font-[500]">Certifications </h3>
                                            <Select
                                                styles={customStylesSelect}
                                                className="react-select outline-none"
                                                classNamePrefix="All"
                                                options={[{ value: "ISO 9001", label: "ISO 9001" }, { value: "ISO 14001", label: "ISO 14001" }]}
                                                isSearchable={true}
                                                placeholder="Certifications"
                                                value={{ label: formik.values.certifications, value: formik.values.certifications }}
                                                onChange={(option) => formik.setFieldValue('certifications', option.value)}
                                            />
                                            {formik.touched.certifications && formik.errors.certifications ? (
                                                <div className="text-red-600">{formik.errors.certifications}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <label className="mb-1 font-[500]">Tax ID Number (EIN) </label>
                                            <input
                                                name="taxIDNumber"
                                                type="text"
                                                placeholder="Tax ID Number (EIN)"
                                                className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8] placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                                                value={formik.values.taxIDNumber}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.taxIDNumber && formik.errors.taxIDNumber ? (
                                                <div className="text-red-600">{formik.errors.taxIDNumber}</div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <label className="mb-1 font-[500]">Business Registration Number </label>
                                            <input
                                                name="businessRegistrationNumber"
                                                type="text"
                                                placeholder="Business Registration Number"
                                                className="w-full text-[15px] bg-[#FBFBFB] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#D8D8D8] placeholder:text-[#B5B5B5] focus:bg-[#F3F8FC]"
                                                value={formik.values.businessRegistrationNumber}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.businessRegistrationNumber && formik.errors.businessRegistrationNumber ? (
                                                <div className="text-red-600">{formik.errors.businessRegistrationNumber}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <SocialLinks
                                        socialLinks={formik.values.socialLinks}
                                        onSocialLinksChange={(name, value) => formik.setFieldValue(`socialLinks.${name}`, value)}
                                    />
                                    <div className='mt-[20px]'>
                                        <button
                                            type="submit"
                                            className="float-right font-semibold py-[5px] px-[50px] h-[50px] bg-[#FFCB05] rounded-[4px]"
                                            disabled={formik.isSubmitting}
                                        >
                                            {formik.isSubmitting ? <span className="loading"></span> : 'Save'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        : <>
                            <InternalPage />
                        </>
            }
        </>

    );
}

export default CompanyProfile;
