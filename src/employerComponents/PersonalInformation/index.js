import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { getCountryList } from "../../app/commonFunction";
import { customStylesSelect } from "../ReactSelectStyle";
import { postCall } from "../../app/axiosConfig";
import { useDispatch } from 'react-redux'
import { postProfileData } from "../../features/profile/profileSlice";
import { personalInformationSchema, contactSchema, addressSchema, languagesSchema, demographicsSchema, citizenshipsSchema, personalStatements } from "./Schemas";
import { Country } from "country-state-city";
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import { DateFormatType, addresslist, citizenShipStatus, contactlist, countryCode, dateOfDDList, dateOfMMList, dateOfYYList, genderLis, genderList, languagesList } from "../../app/selectData";
import { notifySuccess } from "../../app/toaster";
let actionType = 'save'
const PersonalInformationForm = ({ tabData }) => {
    const [countryData, setCountryData] = useState([])
    const [collapse1, setCollapse1] = useState(true);
    const [collapse2, setCollapse2] = useState(true);
    const [collapse3, setCollapse3] = useState(true);
    const [collapse4, setCollapse4] = useState(true);
    const [collapse5, setCollapse5] = useState(true);
    const [collapse6, setCollapse6] = useState(true);
    const [collapse7, setCollapse7] = useState(true);
    const [mLang, setMLang] = useState(tabData?.languages?.mother?.length == 0 ? tabData?.languages?.mother : '')
    const [oLang, setOLang] = useState(tabData?.languages?.other?.length == 0 ? tabData?.languages?.other : '')

    const toggleCollapse = (collapseNumber) => {
        switch (collapseNumber) {
            case 1:
                setCollapse1(!collapse1);
                break;
            case 2:
                setCollapse2(!collapse2);
                break;
            case 3:
                setCollapse3(!collapse3);
                break;
            case 4:
                setCollapse4(!collapse4);
                break;
            case 5:
                setCollapse5(!collapse5);
                break;
            case 6:
                setCollapse6(!collapse6);
                break;
            case 7:
                setCollapse7(!collapse7);
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        getCountryList()
            .then((data) => {
                setCountryData(data)
            })
            .catch((error) => {
                console.error("Error fetching country list:", error);
            });

    }, [])

    const [loading, setLoading] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const dispatch = useDispatch()
    const [CountrydataForWorkPage, setCountrydataForWorkPage] = useState([]);

    const initialValues = {
        personalInformation: {
            firstName: tabData?.personalInformation?.firstName,
            lastName: tabData?.personalInformation?.lastName,
            nationality: tabData?.personalInformation?.nationality,
            dd: tabData?.personalInformation?.dateOfBirth ? tabData?.personalInformation?.dateOfBirth?.split('-')[2].slice(0, 2) : '',
            mm: tabData?.personalInformation?.dateOfBirth ? tabData?.personalInformation?.dateOfBirth?.split('-')[1] : '',
            yyyy: tabData?.personalInformation?.dateOfBirth ? tabData?.personalInformation?.dateOfBirth?.split('-')[0] : '',
        },
        contact: {
            email: tabData?.contact?.email,
            phone: tabData?.contact?.phone,
            phoneCode: tabData?.contact?.phoneCode,
            phoneType: tabData?.contact?.phoneType,
        },
        address: {
            type: tabData?.address?.type,
            addressLine1: tabData?.address?.addressLine1,
            addressLine2: tabData?.address?.addressLine2,
            postalCode: tabData?.address?.postalCode,
            city: tabData?.address?.city,
            country: tabData?.address?.country,
        },
        languages: {
            mother: tabData?.languages?.mother,
            other: tabData?.languages?.other,
        },
        demographics: {
            gender: tabData?.demographics?.gender,
            veteranStatus: tabData?.demographics?.veteranStatus,
            race: tabData?.demographics?.race,
            isHaspanicLatino: tabData?.demographics?.isHaspanicLatino,

        },
        citizenships: {
            status: tabData?.citizenships?.status,
            isEligibleToWork: tabData?.citizenships?.isEligibleToWork,
            isNeedSponserShip: tabData?.citizenships?.isNeedSponserShip,
            isConvictedOfFelony: tabData?.citizenships?.isConvictedOfFelony,
            isDesiredCompensation: tabData?.citizenships?.isDesiredCompensation,
            isAgreeTermsCondition: tabData?.citizenships?.isAgreeTermsCondition,
        },
        personalStatements: tabData?.personalStatements
    };

    const validationSchema = Yup.object().shape({
        personalInformation: personalInformationSchema,
        contact: contactSchema,
        address: addressSchema,
        demographics: demographicsSchema,
        citizenships: citizenshipsSchema,
        languages: languagesSchema,
        personalStatements: personalStatements,
    });

    const { values, setFieldValue, setTouched, errors, touched, handleBlur, handleChange, handleSubmit, getFieldProps }
        = useFormik({
            initialValues: initialValues,
            validationSchema: validationSchema,
            onSubmit: async (values) => {

                let _newValue = Object.assign({}, values)
                _newValue.personalInformation['dateOfBirth'] = `${_newValue.personalInformation.yyyy}-${_newValue.personalInformation.mm}-${_newValue.personalInformation.dd}`
                // delete _newValue.personalInformation.yyyy
                // delete _newValue.personalInformation.mm
                // delete _newValue.personalInformation.dd
                setLoading(true)
                try {
                    dispatch(postProfileData({ personalInformation: _newValue })).unwrap().then(() => {
                        setLoading(false)
                        setLoadingDelete(false)
                        notifySuccess('Personal information Update Successfully')
                    })
                } catch (e) {
                    console.log('error profile', e)
                    setLoadingDelete(false)
                    setLoading(false)
                }
            },
        });
    useEffect(() => {
        getCountryList()
            .then((data) => {
                // console.log('data:::', data)
                setCountrydataForWorkPage(data)
            })
            .catch((error) => {
                console.error("Error fetching country list:", error);
            });
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="section-1 mb-5">
                    <h4
                        onClick={() => toggleCollapse(5)}
                        className=" flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[16px] mb-3"
                    >
                        Personal information
                        <ChevronDownIcon
                            className={` transition-all duration-300 ${collapse5 ? "rotate-180" : ""
                                } w-[23px]`}
                        />
                    </h4>
                    <div
                        className={`transition-all duration-300 ${collapse5 ? "show" : "hidden"
                            }`}
                    >
                        <div className="grid lg:grid-cols-2 gap-2">
                            <div className="mb-5">
                                <label className="mb-1">First name(s)*</label>
                                <input
                                    value={values.personalInformation.firstName}
                                    onChange={(event) => {
                                        const { value } = event.target; // Get the value from the event
                                        // Update Formik values directly
                                        setFieldValue("personalInformation.firstName", value);
                                    }}
                                    onBlur={() => {
                                        // Update touched state for the language field
                                        setTouched({
                                            ...touched,
                                            personalInformation: {
                                                ...touched.personalInformation,
                                                firstName: true,
                                            },
                                        });
                                    }}
                                    name="firstName"
                                    type="text"
                                    placeholder={
                                        values.personalInformation.firstName
                                            ? values.personalInformation.firstName
                                            : "e.g. John"
                                    }
                                    className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]"
                                />
                                {errors.personalInformation?.firstName &&
                                    touched.personalInformation?.firstName ? (
                                    <p className="text-red-500">
                                        {errors.personalInformation.firstName}
                                    </p>
                                ) : null}
                            </div>
                            <div className="mb-5">
                                <label className="mb-1">Last name(s)*</label>
                                <input
                                    value={values.personalInformation.lastName}
                                    onChange={(event) => {
                                        const { value } = event.target; // Get the value from the event
                                        // Update Formik values directly
                                        setFieldValue("personalInformation.lastName", value);
                                    }}
                                    onBlur={() => {
                                        // Update touched state for the language field
                                        setTouched({
                                            ...touched,
                                            personalInformation: {
                                                ...touched.personalInformation,
                                                lastName: true,
                                            },
                                        });
                                    }}
                                    name="lastName"
                                    type="text"
                                    placeholder={
                                        values.personalInformation.lastName
                                            ? values.personalInformation.lastName
                                            : "e.g. Doe"
                                    }
                                    className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]"
                                />
                                {errors.personalInformation?.lastName &&
                                    touched.personalInformation?.lastName ? (
                                    <p className="text-red-500">
                                        {errors.personalInformation.lastName}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-2">
                            <div className="mb-5">
                                <label className="mb-1">Date of Birth* </label>
                                <div className="grid lg:grid-cols-3 gap-2">
                                    <div>
                                        <Select
                                            value={values?.personalInformation.dd}
                                            onChange={(selectedOption) => { setFieldValue("personalInformation.dd", selectedOption ? selectedOption.label : ""); }}
                                            onBlur={() => {
                                                setTouched({
                                                    ...touched,
                                                    personalInformation: {
                                                        ...touched.personalInformation,
                                                        dd: true,
                                                    },
                                                });
                                            }}
                                            name="dd"
                                            styles={customStylesSelect}
                                            className="react-select"
                                            classNamePrefix="select"
                                            options={dateOfDDList}
                                            isSearchable
                                            placeholder={
                                                values?.personalInformation.dd
                                                    ? values?.personalInformation.dd
                                                    : "DD"
                                            }
                                        />
                                        {errors.personalInformation?.dd &&
                                            touched.personalInformation?.dd ? (
                                            <p className="text-red-500">
                                                {errors.personalInformation.dd}
                                            </p>
                                        ) : null}
                                    </div>
                                    <div>
                                        <Select
                                            value={values.personalInformation.mm}
                                            onChange={(selectedOption) => {
                                                setFieldValue("personalInformation.mm", selectedOption ? selectedOption.label : "");
                                            }}
                                            onBlur={() => {
                                                // Update touched state for the language field
                                                setTouched({
                                                    ...touched,
                                                    personalInformation: {
                                                        ...touched.personalInformation,
                                                        mm: true,
                                                    },
                                                });
                                            }}
                                            name="mm"
                                            styles={customStylesSelect}
                                            className="react-select"
                                            classNamePrefix="select"
                                            options={dateOfMMList}
                                            isSearchable
                                            placeholder={
                                                values.personalInformation.mm
                                                    ? values.personalInformation.mm
                                                    : "MM"
                                            }
                                        />
                                        {errors.personalInformation?.mm &&
                                            touched.personalInformation?.mm ? (
                                            <p className="text-red-500">
                                                {errors.personalInformation.mm}
                                            </p>
                                        ) : null}
                                    </div>
                                    <div>
                                        <Select
                                            value={values.personalInformation.yyyy}
                                            onChange={(selectedOption) => {
                                                setFieldValue("personalInformation.yyyy", selectedOption ? selectedOption.label : "");
                                            }}
                                            onBlur={() => {
                                                // Update touched state for the language field
                                                setTouched({
                                                    ...touched,
                                                    personalInformation: {
                                                        ...touched.personalInformation,
                                                        yyyy: true,
                                                    },
                                                });
                                            }}
                                            name="yyyy"
                                            styles={customStylesSelect}
                                            className="react-select"
                                            classNamePrefix="select"
                                            options={dateOfYYList}
                                            isSearchable
                                            placeholder={
                                                values.personalInformation.yyyy
                                                    ? values.personalInformation.yyyy
                                                    : "YYYY"
                                            }
                                        />
                                        {errors.personalInformation?.yyyy &&
                                            touched.personalInformation?.yyyy ? (
                                            <p className="text-red-500">
                                                {errors.personalInformation.yyyy}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="Nationality" className="mb-1">
                                    Nationality
                                </label>
                                <Select
                                    as="select"
                                    value={values.personalInformation.nationality}
                                    onChange={(selectedOption) => {
                                        // Update Formik values directly
                                        setFieldValue(
                                            "personalInformation.nationality",
                                            selectedOption ? selectedOption.label : ""
                                        );
                                    }}
                                    onBlur={() => {
                                        // Update touched state for the language field
                                        setTouched({
                                            ...touched,
                                            personalInformation: {
                                                ...touched.personalInformation,
                                                nationality: true,
                                            },
                                        });
                                    }}
                                    name="nationality"
                                    styles={customStylesSelect}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={countryData}
                                    isSearchable
                                    placeholder={
                                        values.personalInformation.nationality
                                            ? values.personalInformation.nationality
                                            : "Select from list"
                                    }
                                />
                                {errors.personalInformation?.nationality &&
                                    touched.personalInformation?.nationality ? (
                                    <p className="text-red-500">
                                        {errors.personalInformation.nationality}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-2 mb-5">
                    <h4
                        onClick={() => toggleCollapse(6)}
                        className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[16px] mb-3"
                    >
                        Contact
                        <ChevronDownIcon
                            className={` transition-all duration-300 ${collapse6 ? "rotate-180" : ""
                                } w-[23px]`}
                        />
                    </h4>
                    <div
                        className={`transition-all duration-300 ${collapse6 ? "show" : "hidden"
                            }`}
                    >
                        <div className="grid lg:w-6/12 mb-5">
                            <label className="mb-1">Email address</label>
                            <input
                                value={values.contact.email}
                                onChange={(event) => {
                                    const { value } = event.target; // Get the value from the event
                                    // Update Formik values directly
                                    setFieldValue("contact.email", value);
                                }}
                                onBlur={() => {
                                    // Update touched state for the language field
                                    setTouched({
                                        ...touched,
                                        contact: { ...touched.contact, email: true },
                                    });
                                }}
                                name="email"
                                type="text"
                                placeholder={
                                    values.contact.email
                                        ? values.contact.email
                                        : "e.g. Johndoe@gmail.com"
                                }
                                className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]"
                            />
                            {errors.contact?.email && touched.contact?.email ? (
                                <p className="text-red-500">{errors.contact.email}</p>
                            ) : null}
                        </div>
                        <div className="">
                            <label className="mb-1">Phone number</label>
                            <div className="grid lg:grid-cols-2 gap-2">
                                <div className="grid lg:grid-cols-2 gap-2 mb-4">
                                    <Select
                                        value={values.contact.phoneType}
                                        onChange={(selectedOption) => {
                                            // Update Formik values directly
                                            setFieldValue(
                                                "contact.phoneType",
                                                selectedOption ? selectedOption.label : ""
                                            );
                                        }}
                                        onBlur={() => {
                                            // Update touched state for the language field
                                            setTouched({
                                                ...touched,
                                                contact: { ...touched.contact, phoneType: true },
                                            });
                                        }}
                                        name="phoneType"
                                        styles={customStylesSelect}
                                        className="react-select"
                                        classNamePrefix="select"
                                        options={contactlist}
                                        isSearchable
                                        placeholder={
                                            values.contact.phoneType
                                                ? values.contact.phoneType
                                                : "select"
                                        }
                                    />

                                    <Select
                                        value={values.contact.phoneCode}
                                        onChange={(selectedOption) => {
                                            // Update Formik values directly
                                            setFieldValue(
                                                "contact.phoneCode",
                                                selectedOption ? selectedOption.label : ""
                                            );
                                        }}
                                        onBlur={() => {
                                            // Update touched state for the language field
                                            setTouched({
                                                ...touched,
                                                contact: { ...touched.contact, phoneCode: true },
                                            });
                                        }}
                                        name="phoneCode"
                                        styles={customStylesSelect}
                                        className="react-select"
                                        classNamePrefix="select"
                                        options={countryCode.map((item) => ({
                                            value: item.code,
                                            label: `${item.name} (${item.dial_code})`,
                                        }))}
                                        isSearchable
                                        placeholder={
                                            values.contact.phoneCode
                                                ? values.contact.phoneCode
                                                : "select"
                                        }
                                    />
                                    {errors.contact?.phoneType && touched.contact?.phoneType ? (
                                        <p className="text-red-500">{errors.contact.phoneType}</p>
                                    ) : null}
                                    {errors.contact?.phoneCode && touched.contact?.phoneCode ? (
                                        <p className="text-red-500">{errors.contact.phoneCode}</p>
                                    ) : null}
                                </div>
                                <div className="">
                                    <input
                                        value={values.contact.phone}
                                        onChange={(event) => {
                                            const { value } = event.target; // Get the value from the event
                                            // Update Formik values directly
                                            setFieldValue("contact.phone", value);
                                        }}
                                        onBlur={() => {
                                            // Update touched state for the language field
                                            setTouched({
                                                ...touched,
                                                contact: { ...touched.contact, phone: true },
                                            });
                                        }}
                                        name="phone"
                                        type="text"
                                        placeholder={
                                            values.contact.phone
                                                ? values.contact.phone
                                                : "e.g. 000000000"
                                        }
                                        className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]"
                                    />
                                    {errors.contact?.phone && touched.contact?.phone ? (
                                        <p className="text-red-500">{errors.contact.phone}</p>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-3 mb-5">
                    <h4
                        onClick={() => toggleCollapse(7)}
                        className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[16px] mb-3"
                    >
                        Address
                        <ChevronDownIcon
                            className={` transition-all duration-300 ${collapse7 ? "rotate-180" : ""
                                } w-[23px]`}
                        />
                    </h4>
                    <div
                        className={`transition-all duration-300 ${collapse7 ? "show" : "hidden"
                            }`}
                    >
                        <div className="grid lg:w-6/12 mb-5">
                            <label className="mb-1">Type</label>
                            <Select
                                value={values.address.type}
                                onChange={(selectedOption) => {
                                    // Update Formik values directly
                                    setFieldValue(
                                        "address.type",
                                        selectedOption ? selectedOption.label : ""
                                    );
                                }}
                                onBlur={() => {
                                    // Update touched state for the language field
                                    setTouched({
                                        ...touched,
                                        address: { ...touched.address, type: true },
                                    });
                                }}
                                name="type"
                                styles={customStylesSelect}
                                className="react-select"
                                classNamePrefix="select"
                                options={addresslist}
                                isSearchable
                                placeholder={
                                    values.address.type ? values.address.type : "select"
                                }
                            />
                            {errors.address?.type && touched.address?.type ? (
                                <p className="text-red-500">{errors.address.type}</p>
                            ) : null}
                        </div>
                        <div className="mb-5">
                            <label className="mb-1">Address line 1*</label>
                            <input
                                value={values.address.addressLine1}
                                onChange={(event) => {
                                    const { value } = event.target; // Get the value from the event
                                    // Update Formik values directly
                                    setFieldValue("address.addressLine1", value);
                                }}
                                onBlur={() => {
                                    // Update touched state for the language field
                                    setTouched({
                                        ...touched,
                                        contact: { ...touched.contact, addressLine1: true },
                                    });
                                }}
                                name="addressLine1"
                                type="text"
                                placeholder={
                                    values.address.addressLine1
                                        ? values.address.addressLine1
                                        : "e.g. Street name, P.O. Box"
                                }
                                className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]"
                            />
                            {errors.address?.addressLine1 && touched.address?.addressLine1 ? (
                                <p className="text-red-500">{errors.address.addressLine1}</p>
                            ) : null}
                        </div>
                        <div className="mb-5">
                            <label className="mb-1">Address line 2</label>
                            <input
                                value={values.address.addressLine2}
                                onChange={(event) => {
                                    const { value } = event.target; // Get the value from the event
                                    // Update Formik values directly
                                    setFieldValue("address.addressLine2", value);
                                }}
                                onBlur={() => {
                                    // Update touched state for the language field
                                    setTouched({
                                        ...touched,
                                        contact: { ...touched.contact, addressLine2: true },
                                    });
                                }}
                                name="addressLine2"
                                type="text"
                                placeholder={
                                    values.address.addressLine2
                                        ? values.address.addressLine2
                                        : "e.g. Street name, P.O. Box"
                                }
                                className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]"
                            />
                            {errors.address?.addressLine2 && touched.address?.addressLine2 ? (
                                <p className="text-red-500">{errors.address.addressLine2}</p>
                            ) : null}
                        </div>

                        <div className="grid lg:grid-cols-3 gap-2">
                            {/* <div className="">
                            <label className="mb-1">Postal code</label>
                            <input type="text" placeholder="e.g 0035482" className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]" />
                        </div> */}
                            <div className="mb-5">
                                <div className="">
                                    <label className="mb-1">Postal code*</label>
                                    <input
                                        value={values.address.postalCode}
                                        onChange={(event) => {
                                            const { value } = event.target; // Get the value from the event
                                            // Update Formik values directly
                                            setFieldValue("address.postalCode", value);
                                        }}
                                        onBlur={() => {
                                            // Update touched state for the language field
                                            setTouched({
                                                ...touched,
                                                address: { ...touched.address, postalCode: true },
                                            });
                                        }}
                                        name="postalCode"
                                        type="text"
                                        placeholder={
                                            values.address.postalCode
                                                ? values.address.postalCode
                                                : "e.g 0035482"
                                        }
                                        className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]"
                                    />
                                    {errors.address?.postalCode && touched.address?.postalCode ? (
                                        <p className="text-red-500">{errors.address.postalCode}</p>
                                    ) : null}
                                </div>
                                {/* <label className="mb-1">Postal code</label>
                            <Select
                                styles={customStylesSelect}
                                className="react-select"
                                classNamePrefix="select"
                                options={[
                                    { value: '1/12/12', label: 'January 12, 2012' },
                                    { value: '2,2,12', label: 'February 2, 2012' }
                                ]}
                                isSearchable
                                placeholder="Select"
                            /> */}
                            </div>
                            {/* <div className="mb-5">
                            <label className="mb-1">City</label>
                            <Select
                                styles={customStylesSelect}
                                className="react-select"
                                classNamePrefix="select"
                                options={[{value:"asd" ,label:"asd"}]}
                                
                                isSearchable
                                placeholder="Select"
                            />
                        </div> */}
                            <div className="">
                                <label className="mb-1">City*</label>
                                <input
                                    value={values.contact.city}
                                    onChange={(event) => {
                                        const { value } = event.target; // Get the value from the event
                                        // Update Formik values directly
                                        setFieldValue("address.city", value);
                                    }}
                                    onBlur={() => {
                                        // Update touched state for the language field
                                        setTouched({
                                            ...touched,
                                            address: { ...touched.address, city: true },
                                        });
                                    }}
                                    name="city"
                                    type="text"
                                    placeholder={
                                        values.address.city ? values.address.city : "e.g:Paris"
                                    }
                                    className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]"
                                />
                                {errors.address?.city && touched.address?.city ? (
                                    <p className="text-red-500">{errors.address.city}</p>
                                ) : null}
                            </div>
                            <div className="mb-5">
                                <label className="mb-1">Country*</label>
                                <Select
                                    value={values.address.country}
                                    onChange={(selectedOption) => {
                                        // Update Formik values directly
                                        setFieldValue(
                                            "address.country",
                                            selectedOption ? selectedOption.label : ""
                                        );
                                    }}
                                    onBlur={() => {
                                        // Update touched state for the language field
                                        setTouched({
                                            ...touched,
                                            address: { ...touched.address, country: true },
                                        });
                                    }}
                                    name="country"
                                    styles={customStylesSelect}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={countryData}
                                    isSearchable
                                    placeholder={
                                        values.address.country ? values.address.country : "Select"
                                    }
                                />
                                {errors.address?.country && touched.address?.country ? (
                                    <p className="text-red-500">{errors.address.country}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-4 mb-5">
                    <h4
                        onClick={() => toggleCollapse(1)}
                        className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[16px] mb-3"
                    >
                        Languages
                        <ChevronDownIcon
                            className={` transition-all duration-300 ${collapse1 ? "rotate-180" : ""
                                } w-[23px]`}
                        />
                    </h4>
                    <div
                        className={`transition-all duration-300 ${collapse1 ? "show" : "hidden"
                            }`}
                    >
                        <div className="grid">
                            {/* <label className="mb-3 text-[#1E1E1E]">
                                Describe your personal skills, such as language skills and
                                digital skills, etc.
                            </label> */}
                            {/* <label className="mb-3 text-[#1E1E1E]">Language skills</label> */}
                            {/* <label className="mb-3 text-[#1E1E1E]">
                                Present your language skills here.
                            </label> */}
                        </div>
                        {/* <div className="w-full h-[1px] bg-[#D4D4D4] mb-4"></div> */}
                        <div className="mb-5 grid gap-2 lg:w-6/12">
                            <label className="mb-0 font-semibold">Mother tongue</label>
                            <input
                                value={values.languages.mother}
                                onChange={(event) => {
                                    const { value } = event.target; // Get the value from the event
                                    // Update Formik values directly
                                    setFieldValue("languages.mother", value);
                                }}
                                onBlur={() => {
                                    // Update touched state for the language field
                                    setTouched({
                                        ...touched,
                                        languages: { ...touched.languages, mother: true },
                                    });
                                }}
                                name="mother"
                                type="text"
                                placeholder={
                                    values.languages.mother ? values.languages.mother : "English"
                                }
                                className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]"
                            />
                            {errors.languages?.mother && touched.languages?.mother ? (
                                <p className="text-red-500">{errors.languages.mother}</p>
                            ) : null}
                            {/* <div className="mt-5">
                                <div className="inline-flex gap-1 cursor-pointer hover:text-[#FFCB05]">
                                    <PlusCircleIcon className="w-[20px]" />
                                    <span> Add another mother tongue</span>
                                </div>
                            </div> */}
                        </div>
                        <div className="w-full h-[1px] bg-[#D4D4D4] mb-4"></div>
                        <div className="mb-5 grid gap-2 lg:w-6/12">
                            <label className="mb-0 font-semibold">Other language</label>
                            <input
                                value={values.languages.other}
                                onChange={(event) => {
                                    const { value } = event.target; // Get the value from the event
                                    // Update Formik values directly
                                    setFieldValue("languages.other", value);
                                }}
                                onBlur={() => {
                                    // Update touched state for the language field
                                    setTouched({
                                        ...touched,
                                        languages: { ...touched.languages, other: true },
                                    });
                                }}
                                name="other"
                                type="text"
                                placeholder={
                                    values.languages.other ? values.languages.other : "English"
                                }
                                className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]"
                            />
                            {errors.languages?.other && touched.languages?.other ? (
                                <p className="text-red-500">{errors.languages.other}</p>
                            ) : null}
                            {/* <div className="mt-5">
                                <div className="inline-flex gap-1 cursor-pointer hover:text-[#FFCB05]">
                                    <PlusCircleIcon className="w-[20px]" />
                                    <span> Add another mother tongue</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="section-5 mb-5">
                    <h4
                        onClick={() => toggleCollapse(2)}
                        className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[16px] mb-3"
                    >
                        Demographics
                        <ChevronDownIcon
                            className={`transition-all duration-300 ${collapse2 ? "rotate-180" : ""
                                } w-[23px]`}
                        />
                    </h4>
                    <div
                        className={`transition-all duration-300 ${collapse2 ? "show" : "hidden"
                            }`}
                    >
                        <div className="grid lg:grid-cols-2 gap-2">
                            <div className="">
                                <label className="mb-1">Gender*</label>
                                <Select
                                    value={values.demographics.gender}
                                    onChange={(selectedOption) => {
                                        // Update Formik values directly
                                        setFieldValue(
                                            "demographics.gender",
                                            selectedOption ? selectedOption.label : ""
                                        );
                                    }}
                                    onBlur={() => {
                                        // Update touched state for the language field
                                        setTouched({
                                            ...touched,
                                            demographics: { ...touched.demographics, gender: true },
                                        });
                                    }}
                                    name="gender"
                                    styles={customStylesSelect}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={genderList}
                                    isSearchable
                                    placeholder={
                                        values.demographics.gender
                                            ? values.demographics.gender
                                            : "Select from list"
                                    }
                                />
                                {errors.demographics?.gender && touched.demographics?.gender ? (
                                    <p className="text-red-500">{errors.demographics.gender}</p>
                                ) : null}
                            </div>
                            <div className="">
                                <label className="mb-1">Veteran status</label>
                                <input
                                    value={values.demographics.veteranStatus}
                                    onChange={(event) => {
                                        const { value } = event.target; // Get the value from the event
                                        // Update Formik values directly
                                        setFieldValue("demographics.veteranStatus", value);
                                    }}
                                    onBlur={() => {
                                        // Update touched state for the language field
                                        setTouched({
                                            ...touched,
                                            demographics: {
                                                ...touched.demographics,
                                                veteranStatus: true,
                                            },
                                        });
                                    }}
                                    name="veteranStatus"
                                    type="text"
                                    placeholder="Select from list"
                                    className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]"
                                />
                                {errors.demographics?.veteranStatus &&
                                    touched.demographics?.veteranStatus ? (
                                    <p className="text-red-500">
                                        {errors.demographics.veteranStatus}
                                    </p>
                                ) : null}
                            </div>
                            <div className="">
                                <label className="mb-1">Race</label>
                                <Select
                                    value={values.demographics.race}
                                    onChange={(selectedOption) => {
                                        // Update Formik values directly
                                        setFieldValue(
                                            "demographics.race",
                                            selectedOption ? selectedOption.label : ""
                                        );
                                    }}
                                    onBlur={() => {
                                        // Update touched state for the language field
                                        setTouched({
                                            ...touched,
                                            demographics: { ...touched.demographics, race: true },
                                        });
                                    }}
                                    name="race"
                                    styles={customStylesSelect}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={[
                                        { value: "1/12/12", label: "January 12, 2012" },
                                        { value: "2,2,12", label: "February 2, 2012" },
                                    ]}
                                    isSearchable
                                    placeholder={
                                        values.demographics.race
                                            ? values.demographics.race
                                            : "Select from list"
                                    }
                                />
                                {errors.demographics?.race && touched.demographics?.race ? (
                                    <p className="text-red-500">{errors.demographics.race}</p>
                                ) : null}
                            </div>
                            <div className="">
                                <label className="mb-1">Are you Hispanic or Latino/a/x?</label>
                                <Select
                                    defaultValue={values.demographics.isHaspanicLatino}
                                    onChange={(selectedOption) => {
                                        // Update Formik values directly
                                        setFieldValue(
                                            "demographics.isHaspanicLatino",
                                            selectedOption ? selectedOption.value : ""
                                        );
                                    }}
                                    onBlur={() => {
                                        // Update touched state for the language field
                                        setTouched({
                                            ...touched,
                                            demographics: {
                                                ...touched.demographics,
                                                isHaspanicLatino: true,
                                            },
                                        });
                                    }}
                                    name="isHaspanicLatino"
                                    styles={customStylesSelect}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={[
                                        { value: true, label: "Yes" },
                                        { value: false, label: "No" },
                                    ]}
                                    isSearchable
                                    placeholder={values.demographics.isHaspanicLatino == true ? "Yes"
                                        : values.demographics.isHaspanicLatino == false ? "No" : "Select from list"}
                                />
                                {errors.demographics?.isHaspanicLatino &&
                                    touched.demographics?.isHaspanicLatino ? (
                                    <p className="text-red-500">
                                        {errors.demographics.isHaspanicLatino}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-6 mb-5">
                    <h4
                        onClick={() => toggleCollapse(3)}
                        className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[16px] mb-3"
                    >
                        Citizenship Status
                        <ChevronDownIcon
                            className={` $transition-all duration-300 ${collapse3 ? "rotate-180" : ""
                                } w-[23px]`}
                        />
                    </h4>
                    <div
                        className={`transition-all duration-300 ${collapse3 ? "show" : "hidden"
                            }`}
                    >
                        <div className="grid lg:grid-cols-2 gap-2">
                            <div className="mb-5">
                                <label className="mb-1">
                                    Please declare your citizenship status
                                </label>
                                <Select
                                    value={values.citizenships.status}
                                    onChange={(selectedOption) => {
                                        // Update Formik values directly
                                        setFieldValue(
                                            "citizenships.status",
                                            selectedOption ? selectedOption.label : ""
                                        );
                                    }}
                                    onBlur={() => {
                                        // Update touched state for the language field
                                        setTouched({
                                            ...touched,
                                            citizenships: { ...touched.citizenships, status: true },
                                        });
                                    }}
                                    name="status"
                                    styles={customStylesSelect}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={citizenShipStatus}
                                    isSearchable
                                    placeholder={
                                        values.citizenships.status
                                            ? values.citizenships.status
                                            : "Select from list"
                                    }
                                />
                                {errors.citizenships?.status && touched.citizenships?.status ? (
                                    <p className="text-red-500">{errors.citizenships.status}</p>
                                ) : null}
                            </div>
                            <div className="mb-5">
                                <label className="mb-1">
                                    Are you eligible to work legally in the United States?
                                </label>
                                <Select
                                    value={values.citizenships.isEligibleToWork}
                                    onChange={(selectedOption) => {
                                        // Update Formik values directly
                                        setFieldValue(
                                            "citizenships.isEligibleToWork",
                                            selectedOption ? selectedOption.value : ""
                                        );
                                    }}
                                    onBlur={() => {
                                        // Update touched state for the language field
                                        setTouched({
                                            ...touched,
                                            citizenships: {
                                                ...touched.citizenships,
                                                isEligibleToWork: true,
                                            },
                                        });
                                    }}
                                    name="isEligibleToWork"
                                    styles={customStylesSelect}
                                    isEligibleToWork={customStylesSelect}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={[
                                        { value: true, label: "Yes" },
                                        { value: false, label: "No" },
                                    ]}
                                    isSearchable
                                    placeholder={values.citizenships.isEligibleToWork == true ? "Yes"
                                        : values.citizenships.isEligibleToWork == false ? "No" : "Select from list"}
                                />
                                {errors.citizenships?.isEligibleToWork &&
                                    touched.citizenships?.isEligibleToWork ? (
                                    <p className="text-red-500">
                                        {errors.citizenships.isEligibleToWork}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                        <div className="mb-5">
                            <label className="mb-1">
                                Do you now, or will you in the future, need sponsorship from an
                                employer in order to obtain, extend or renew your authorization
                                to work in the United States?
                            </label>
                            <Select
                                value={values.citizenships.isNeedSponserShip}
                                onChange={(selectedOption) => {
                                    // Update Formik values directly
                                    setFieldValue(
                                        "citizenships.isNeedSponserShip",
                                        selectedOption ? selectedOption.value : ""
                                    );
                                }}
                                onBlur={() => {
                                    // Update touched state for the language field
                                    setTouched({
                                        ...touched,
                                        citizenships: {
                                            ...touched.citizenships,
                                            isNeedSponserShip: true,
                                        },
                                    });
                                }}
                                name="isNeedSponserShip"
                                styles={customStylesSelect}
                                className="react-select"
                                classNamePrefix="select"
                                options={[
                                    { value: true, label: "Yes" },
                                    { value: false, label: "No" },
                                ]}
                                isSearchable
                                placeholder={values.citizenships.isNeedSponserShip == true ? "Yes"
                                    : values.citizenships.isNeedSponserShip == false ? "No" : "Select from list"}
                            />
                            {errors.citizenships?.isNeedSponserShip &&
                                touched.citizenships?.isNeedSponserShip ? (
                                <p className="text-red-500">
                                    {errors.citizenships.isNeedSponserShip}
                                </p>
                            ) : null}
                        </div>
                        <div className="mb-5 grid" role="group">
                            <label className="mb-1">
                                Have you been convicted of any felony?
                            </label>
                            <label className="inline-flex gap-2">
                                <input
                                    value={'yes'}
                                    checked={values.citizenships.isConvictedOfFelony}
                                    onChange={() => {
                                        setFieldValue("citizenships.isConvictedOfFelony", true);
                                    }}
                                    name="isConvictedOfFelony"
                                    type="radio"
                                />
                                <span>Yes</span>
                            </label>
                            <label className="inline-flex gap-2">
                                <input
                                    value={'no'}
                                    checked={!values.citizenships.isConvictedOfFelony}
                                    onBlur={() => {
                                        setTouched({
                                            ...touched,
                                            citizenships: {
                                                ...touched.citizenships,
                                                isConvictedOfFelony: true,
                                            },
                                        });
                                    }}
                                    onClick={() => {
                                        setFieldValue("citizenships.isConvictedOfFelony", false);
                                    }}
                                    name="isConvictedOfFelony"
                                    type="radio"
                                />
                                <span>No</span>
                            </label>
                            {errors.citizenships?.isConvictedOfFelony &&
                                touched.citizenships?.isConvictedOfFelony ? (
                                <p className="text-red-500">
                                    {errors.citizenships.isConvictedOfFelony}
                                </p>
                            ) : null}
                        </div>
                        <div className="mb-5 grid" role="group">
                            <h6 className="mb-1 font-semibold">Desired compensation</h6>

                            <label className="mb-1">
                                Are you presently subject to any noncompete, nondisclosure or
                                nonsolicitation agreement?*
                            </label>

                            <div role="group">
                                
                            </div>
                            <label className="inline-flex gap-2">
                                <input
                                    type="radio"
                                    name="isDesiredCompensation"
                                    value="yes"
                                    checked={values.citizenships.isDesiredCompensation}
                                    onChange={() => {
                                        setFieldValue("citizenships.isDesiredCompensation", true);
                                    }}
                                />
                                <span>Yes</span>
                            </label>
                            <label className="inline-flex gap-2">
                                <input
                                    type="radio"
                                    name="isDesiredCompensation"
                                    value="no"
                                    checked={!values.citizenships.isDesiredCompensation}
                                    onChange={() => {
                                        setFieldValue("citizenships.isDesiredCompensation", false);
                                    }}
                                />
                                <span>No</span>
                            </label>
                            {errors.citizenships?.isDesiredCompensation &&
                                touched.citizenships?.isDesiredCompensation ? (
                                <p className="text-red-500">
                                    {errors.citizenships.isDesiredCompensation}
                                </p>
                            ) : null}
                        </div>
                        <div className="mb-5 grid">
                            <label className="inline-flex gap-1">
                                <input
                                    value="check" // Value to be assigned when the checkbox is checked
                                    checked={values.citizenships.isAgreeTermsCondition}
                                    // Check if the checkbox is checked based on the form state
                                    onClick={(e) => {
                                        setFieldValue(
                                            "citizenships.isAgreeTermsCondition",
                                            e.target.checked

                                        ); // Update the form state when the checkbox state changes
                                    }}
                                    onBlur={() => {
                                        setTouched({
                                            ...touched,
                                            citizenships: {
                                                ...touched.citizenships,
                                                isAgreeTermsCondition: true,
                                            },
                                        }); // Mark the field as touched when it loses focus
                                    }}
                                    name="isAgreeTermsCondition"
                                    type="checkbox"
                                    //   value={"desired"}
                                    className="mr-2"
                                />
                                <span>I agree to the</span>
                                <a href="#" className="text-[#0094FF] font-semibold">
                                    Terms and Conditions
                                </a>
                            </label>
                            {errors.citizenships?.isAgreeTermsCondition &&
                                touched.citizenships?.isAgreeTermsCondition ? (
                                <p className="text-red-500">
                                    {errors.citizenships.isAgreeTermsCondition}
                                </p>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="section-7 mb-10">
                    <h4
                        onClick={() => toggleCollapse(4)}
                        className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[16px] mb-3"
                    >
                        Personal Statement
                        <ChevronDownIcon
                            className={`transition-all duration-300 ${collapse4 ? "rotate-180" : ""
                                } w-[23px]`}
                        />
                    </h4>
                    <div
                        className={`transition-all duration-300 ${collapse4 ? "show" : "hidden"
                            }`}
                    >
                        <div className="mb-5">
                            <label className="mb-1">Personal Statement</label>
                            {errors.personalStatements &&
                                touched.personalStatements ? (
                                <p className="text-red-500">
                                    {errors.personalStatements}
                                </p>
                            ) : null}
                            <textarea
                                value={values.personalStatements}
                                onChange={(event) => {
                                    const { value } = event.target; // Get the value from the event
                                    // Update Formik values directly
                                    setFieldValue("personalStatements", value);
                                    // { console.log("dsdsdsdsdsd", personalStatements) }
                                }}
                                onBlur={() => {
                                    // Update touched state for the language field
                                    setTouched({
                                        ...touched,
                                        personalStatements: {
                                            ...touched.personalStatements,
                                            statement: true,
                                        },
                                    });
                                }}
                                name="personalStatements"
                                type="text"
                                placeholder={
                                    values.personalStatements
                                        ? values.personalStatements
                                        : "Personal Statement"
                                }
                                className="w-full bg-[#F4F8FB] text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#E4E4E4] resize-none h-[400px] placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="text-end">
                    <button type="submit" className="font-medium bg-[#FFCB05] px-[40px] text-[16px] rounded-[0px] py-[12px] border-0">{loading ? <span className="loading"></span> : 'Save'}</button>
                </div>
            </form>
        </div>
    )
}

export default PersonalInformationForm;
