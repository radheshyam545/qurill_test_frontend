import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { getCountryList } from "../../app/commonFunction";
import { customStylesSelect } from "../ReactSelectStyle";
import { postCall } from "../../app/axiosConfig";
import { useDispatch, useSelector } from 'react-redux'
import { postProfileData } from "../../features/profile/profileSlice";
import { personalInformationSchema, contactSchema, addressSchema, languagesSchema, demographicsSchema, citizenshipsSchema, personalStatements, experienceLevel } from "./Schemas";
import { Country } from "country-state-city";
import PlusCircleIcon from '@heroicons/react/24/outline/PlusCircleIcon'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import { DateFormatType, addresslist, citizenShipStatus, contactlist, countryCode, dateOfDDList, dateOfMMList, dateOfYYList, genderLis, genderList, languagesList } from "../../app/selectData";
import { notifySuccess } from "../../app/toaster";
import { experienceLevelDropDown, languageData } from "./data";
import { Racer, veteranStatusOptions } from "../../demoData";
import { CountryDATA, Experience, usaCities, usaCitiesEnum, USStates } from "../../pages/employerProtected/JobConsts";
let actionType = 'save'
const PersonalInformationForm = ({ tabData }) => {
    const { countryList } = useSelector(state => state.lead)
    const [countryData, setCountryData] = useState()
    const [collapse1, setCollapse1] = useState(true);
    const [collapse2, setCollapse2] = useState(true);
    const [collapse3, setCollapse3] = useState(true);
    const [collapse4, setCollapse4] = useState(true);
    const [collapse5, setCollapse5] = useState(true);
    const [collapse6, setCollapse6] = useState(true);
    const [collapse7, setCollapse7] = useState(true);
    const [collapse8, setCollapse8] = useState(true);
    const [collapse9, setCollapse9] = useState(true);
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
            case 8:
                setCollapse8(!collapse8);
                break;
            case 9:
                setCollapse9(!collapse9);
                break;
            default:
                break;
        }
    };

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
        experienceLevel: tabData?.experienceLevel,
        contact: {
            email: tabData?.contact?.email,
            phone: tabData?.contact?.phone,
            phoneCode: tabData?.contact?.phoneCode,
            phoneType: tabData?.contact?.phoneType,
        },
        address: {
            type: tabData?.address?.type,
            state: tabData?.address?.state,
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
        experienceLevel: experienceLevel,
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
    const { dd, fromDay, fromYear, toMonth, toDay, toYear, country, state, ongoing } = values
    console.log(values.personalInformation.dd, "kkkkkkkkkkkkkkkkkkk")

    useEffect(() => {
        getCountryList()
            .then((data) => {
                setCountrydataForWorkPage(data)
            })
            .catch((error) => {
                console.error("Error fetching country list:", error);
            });
    }, []);
    const optionss = countryCode.map((item) => ({
        value: item.dial_code,
        label: `${item.name} (${item.dial_code})`,
        code: item.code // Optionally include the code if needed
    }));
    const selectedOptioncountry = optionss.find(option => option.value === values.contact.phoneCode);
    const cityOptions = values.address.state && usaCities[values?.address?.state] ? usaCities[values.address.state]: [];
    const selectedCity = cityOptions.find(option => option.label === values.address.city);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="section-1 mb-5">
                    <h4
                        onClick={() => toggleCollapse(5)}
                        className=" flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[15px] mb-3"
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
                                <label className="mb-1 text-[15px]">First name(s)*</label>
                                <input
                                    value={values.personalInformation.firstName || ''}
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
                                    placeholder=""
                                    className="w-full text-[15px] text-black px-[20px] py-[10px] rounded-[8px] outline-none border -border-[#919191]  placeholder:text-[#919191] focus:bg-[#F3F8FC]"
                                />
                                {errors.personalInformation?.firstName &&
                                    touched.personalInformation?.firstName ? (
                                    <p className="text-red-500">
                                        {errors.personalInformation.firstName}
                                    </p>
                                ) : null}
                            </div>
                            <div className="mb-5">
                                <label className="mb-1 text-[15px]">Last name(s)*</label>
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
                                            : ""
                                    }
                                    className="w-full text-[15px] text-black px-[20px] py-[10px] rounded-[8px] outline-none border -border-[#919191]  placeholder:text-[#919191] focus:bg-[#F3F8FC]"
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
                                <label className="mb-1 text-[15px]">Date of Birth* </label>
                                <div className="grid lg:grid-cols-3 gap-2">
                                    <div>
                                        <Select
                                            // value={values?.personalInformation?.dd}
                                            value={dateOfDDList.filter((item) => item.label === values.personalInformation.dd)}
                                            onChange={(selectedOption) => { setFieldValue("personalInformation.dd", selectedOption ? selectedOption.label : ""); }}
                                            onBlur={() => { setTouched({ ...touched, personalInformation: { ...touched.personalInformation, dd: true, }, }); }}

                                            name="dd"
                                            defaultValue={values.personalInformation.dd}
                                            styles={customStylesSelect}
                                            className="react-select text-black"
                                            classNamePrefix="select"
                                            options={dateOfDDList}
                                            isSearchable
                                            placeholder="DD"

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
                                            value={dateOfMMList.filter((item) => item.label === values.personalInformation.mm)}
                                            onChange={(selectedOption) => {
                                                setFieldValue("personalInformation.mm", selectedOption ? selectedOption.label : "");
                                            }}
                                            onBlur={() => {
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
                                            value={dateOfYYList.filter((item) => item.label === values.personalInformation.yyyy)}
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
                                <label htmlFor="Nationality" className="mb-1 text-[15px]">
                                    Nationality
                                </label>
                                <Select
                                    as="select"
                                    value={countryList.filter((item) => item.label === values.personalInformation.nationality)}
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
                                    styles={{
                                        ...customStylesSelect,
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#919191',
                                            fontSize: '15px'
                                        })
                                    }
                                    }
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={countryList}
                                    isSearchable
                                    placeholder={
                                        values.personalInformation.nationality
                                            ? values.personalInformation.nationality
                                            : "Select"
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
                        className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[15px] mb-3"
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
                            <label className="mb-1 text-[15px]">Email address</label>
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
                                        : ""
                                }
                                className="w-full text-[15px] text-black px-[20px] py-[10px] rounded-[8px] outline-none border -border-[#919191]  placeholder:text-[#919191] focus:bg-[#F3F8FC]"
                            />
                            {errors.contact?.email && touched.contact?.email ? (
                                <p className="text-red-500">{errors.contact.email}</p>
                            ) : null}
                        </div>
                        <div className="">
                            <label className="mb-1 text-[15px]">Phone number</label>
                            <div className="grid lg:grid-cols-2 gap-2">
                                <div className="grid lg:grid-cols-2 gap-2 mb-4">
                                    <Select
                                        value={contactlist.filter((item) => item.label === values.contact.phoneType)}
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
                                        // value={values.contact.phoneCode}
                                        value={selectedOptioncountry}
                                        onChange={(selectedOption) => {
                                            // Update Formik values directly
                                            setFieldValue(
                                                "contact.phoneCode",
                                                selectedOption ? selectedOption.value : ""
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
                                        options={optionss}
                                        isSearchable
                                        placeholder="select"
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
                                        type="number"
                                        placeholder={
                                            values.contact.phone
                                                ? values.contact.phone
                                                : "Phone Number"
                                        }
                                        className="w-full text-[15px] text-black px-[20px] py-[10px] rounded-[8px] outline-none border -border-[#919191]  placeholder:text-[#919191] focus:bg-[#F3F8FC]"
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
                        className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[15px] mb-3"
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
                            <label className="mb-1 text-[15px]">Types</label>
                            <Select
                                // value={values.address.type}
                                value={addresslist.filter((item) => item.label === values.address.type)}

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
                                styles={{
                                    ...customStylesSelect,
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: '#919191',
                                        fontSize: '15px'
                                    })
                                }
                                }
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
                            <label className="mb-1 text-[15px]">Address line 1*</label>
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
                                        : ""
                                }
                                className="w-full text-[15px] text-black px-[20px] py-[10px] rounded-[8px] outline-none border -border-[#919191]  placeholder:text-[#919191] focus:bg-[#F3F8FC]"
                            />
                            {errors.address?.addressLine1 && touched.address?.addressLine1 ? (
                                <p className="text-red-500">{errors.address.addressLine1}</p>
                            ) : null}
                        </div>
                        <div className="mb-5">
                            <label className="mb-1 text-[15px]">Address line 2</label>
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
                                        : ""
                                }
                                className="w-full text-[15px] text-black px-[20px] py-[10px] rounded-[8px] outline-none border -border-[#919191]  placeholder:text-[#919191] focus:bg-[#F3F8FC]"
                            />
                            {errors.address?.addressLine2 && touched.address?.addressLine2 ? (
                                <p className="text-red-500">{errors.address.addressLine2}</p>
                            ) : null}
                        </div>

                        <div className="grid lg:grid-cols-3 gap-2">
                            <div className="mb-5">
                                <div className="">
                                    <label className="mb-1 text-[15px]">Postal code*</label>
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
                                                : ""
                                        }
                                        className="w-full text-[15px] text-black px-[20px] py-[10px] rounded-[8px] outline-none border -border-[#919191]  placeholder:text-[#919191] focus:bg-[#F3F8FC]"
                                    />
                                    {errors.address?.postalCode && touched.address?.postalCode ? (
                                        <p className="text-red-500">{errors.address.postalCode}</p>
                                    ) : null}
                                </div>
                            </div>
                            <div className="">
                                <label className="mb-1 text-[15px]">State*</label>
                                <Select
                                    onChange={(selectedOption) => {
                                        setFieldValue(
                                            "address.state",
                                            selectedOption ? selectedOption.value : ""
                                        );
                                    }}
                                    onBlur={() => {
                                        setTouched({
                                            ...touched,
                                            address: { ...touched.address, state: true },
                                        });
                                    }}
                                    name="state"
                                    styles={{
                                        ...customStylesSelect,
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#919191',
                                            fontSize: '15px'
                                        })
                                    }
                                    }
                                    className="react-select  "
                                    classNamePrefix="select"
                                    options={USStates}
                                    isSearchable
                                    placeholder={
                                        values.address.state ? values.address.state : "Select"
                                    }
                                    value={USStates.find((item) => item.value === values?.address?.state) || null}
                                />
                                {errors.address?.state && touched.address?.state ? (
                                    <p className="text-red-500">{errors.address.state}</p>
                                ) : null}
                            </div>
                            <div className="">
                                <label className="mb-1 text-[15px]">City*</label>
                                <Select
                                    onChange={(selectedOption) => {
                                        setFieldValue(
                                            "address.city",
                                            selectedOption ? selectedOption.value : ""
                                        );
                                    }}
                                    onBlur={() => {
                                        setTouched({
                                            ...touched,
                                            address: { ...touched.address, city: true },
                                        });
                                    }}
                                    name="city"
                                    styles={{
                                        ...customStylesSelect,
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#919191',
                                            fontSize: '15px'
                                        })
                                    }
                                    }
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={usaCities[values.address.state]}
                                    isSearchable
                                    isDisabled={values.address.state ? false : true}
                                    placeholder={
                                        values.address.city ? values.address.city || "Select"
                                            : "Select"
                                    }
                                    value={selectedCity}
                                />

                                {errors.address?.city && touched.address?.city ? (
                                    <p className="text-red-500">{errors.address.city}</p>
                                ) : null}
                            </div>
                            <div className="mb-5">
                                <label className="mb-1 text-[15px]">Country*</label>
                                <Select
                                    onChange={(selectedOption) => {
                                        setFieldValue(
                                            "address.country",
                                            selectedOption ? selectedOption.value : ""
                                        );
                                    }}
                                    onBlur={() => {
                                        setTouched({
                                            ...touched,
                                            address: { ...touched.address, country: true },
                                        });
                                    }}
                                    name="country"
                                    styles={{
                                        ...customStylesSelect,
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#919191',
                                            fontSize: '15px'
                                        })
                                    }
                                    }
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={CountryDATA}
                                    isSearchable
                                    placeholder={
                                        values.address.country ? values.address.country : "Select"
                                    }
                                    value={CountryDATA.find((item) => item.value === values?.address?.country) || null}

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
                        className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[15px] mb-3"
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
                        <div className="grid lg:grid-cols-2 gap-2">
                            <div className="">
                                <label className="mb-0 -font-semibold text-[15px]">Mother tongue</label>
                                <Select
                                    onChange={(selectedOption) => {
                                        setFieldValue(
                                            "languages.mother",
                                            selectedOption ? selectedOption.label : ""
                                        );
                                    }}
                                    onBlur={() => {
                                        setTouched({
                                            ...touched,
                                            address: { ...touched.languages, mother: true },
                                        });
                                    }}
                                    name="mother"
                                    // value={languageData.filter((item) => item.value === values?.languages?.mother[0])}
                                    value={languageData.find((item) => item.label === values?.languages?.mother[0])}
                                    styles={customStylesSelect}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={languageData}
                                    isSearchable
                                    placeholder="Select"
                                />
                                {errors.languages?.mother && touched.languages?.mother ? (
                                    <p className="text-red-500">{errors.languages.mother}</p>
                                ) : null}

                            </div>
                            <div className="">
                                <label className="mb-0 -font-semibold text-[15px]">Other language</label>
                                <Select
                                    onChange={(selectedOption) => {
                                        setFieldValue(
                                            "languages.other",
                                            selectedOption ? selectedOption.label : ""
                                        );
                                    }}
                                    onBlur={() => { setTouched({ ...touched, address: { ...touched.other, other: true }, }); }}
                                    name="mother"
                                    value={languageData.find((item) => item.label === values?.languages?.other[0])}
                                    styles={{
                                        ...customStylesSelect,
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#919191',
                                            fontSize: '15px'
                                        })
                                    }
                                    }
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={languageData}
                                    isSearchable
                                    placeholder={values.languages.other
                                        ? languageData.find(item => item.label === values.languages.other)?.label || "Select"
                                        : "Select"}
                                />
                                {errors.languages?.other && touched.languages?.other ? (
                                    <p className="text-red-500">{errors.languages.other}</p>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-4 mb-5">
                    <h4
                        onClick={() => toggleCollapse(9)}
                        className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[15px] mb-3"
                    >
                        Experience
                        <ChevronDownIcon
                            className={` transition-all duration-300 ${collapse9 ? "rotate-180" : ""
                                } w-[23px]`}
                        />
                    </h4>
                    <div
                        className={`transition-all duration-300 ${collapse9 ? "show" : "hidden"
                            }`}
                    >
                        <div className="grid">
                        </div>
                        <div className="mb-5 grid gap-2 lg:w-6/12">
                            {/* <label className="mb-0 font-semibold">Experience Level</label> */}
                            <Select
                                value={Experience.find((item) => item.value === values?.experienceLevel) || null}
                                onChange={(selectedOption) => {
                                    setFieldValue(
                                        "experienceLevel",
                                        selectedOption ? selectedOption.value : ""
                                    );
                                }}
                                onBlur={() => {
                                    setTouched({
                                        ...touched,
                                        address: { ...touched.experienceLevel, experienceLevel: true },
                                    });
                                }}
                                name="experienceLevel"
                                styles={{
                                    ...customStylesSelect,
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: '#919191',
                                        fontSize: '15px'
                                    })
                                }
                                }
                                className="react-select"
                                classNamePrefix="select"
                                options={Experience}
                                isSearchable
                                placeholder="Select"

                            />
                            {errors.experienceLevel && touched.experienceLevel ? (
                                <p className="text-red-500">{errors.experienceLevel}</p>
                            ) : null}
                        </div>
                        {/* <div className="w-full h-[1px] bg-[#D4D4D4] mb-4"></div> */}
                    </div>
                </div>
                <div className="section-5 mb-5">
                    <h4
                        onClick={() => toggleCollapse(2)}
                        className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[15px] mb-3"
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
                                <label className="mb-1 text-[15px]">Gender*</label>
                                <Select
                                    // value={values.demographics.gender}
                                    value={genderList.find((item) => item.value === values?.demographics?.gender)}
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
                                    styles={{
                                        ...customStylesSelect,
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#919191',
                                            fontSize: '15px'
                                        })
                                    }
                                    }
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={genderList}
                                    isSearchable
                                    placeholder={
                                        values.demographics.gender
                                            ? values.demographics.gender
                                            : "Select"
                                    }
                                />
                                {errors.demographics?.gender && touched.demographics?.gender ? (
                                    <p className="text-red-500">{errors.demographics.gender}</p>
                                ) : null}
                            </div>
                            <div className="">
                                <label className="mb-1 text-[15px]">Veteran status</label>

                                <Select
                                    value={
                                        veteranStatusOptions.find((item) => item?.value === values?.demographics?.veteranStatus) || null
                                    }
                                    onChange={(selectedOption) => {
                                        // Update Formik values directly
                                        setFieldValue(
                                            "demographics.veteranStatus",
                                            selectedOption ? selectedOption.value : ""
                                        );
                                    }}
                                    onBlur={() => {
                                        // Update touched state for the language field
                                        setTouched({
                                            ...touched,
                                            demographics: { ...touched.demographics, veteranStatus: true },
                                        });
                                    }}
                                    name="veteranStatus"
                                    styles={{
                                        ...customStylesSelect,
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#919191',
                                            fontSize: '15px'
                                        })
                                    }
                                    }
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={veteranStatusOptions}
                                    isSearchable
                                    placeholder={
                                        values.demographics.veteranStatus
                                            ? values.demographics.veteranStatus
                                            : "Select"
                                    }
                                />


                                {errors.demographics?.veteranStatus &&
                                    touched.demographics?.veteranStatus ? (
                                    <p className="text-red-500">
                                        {errors.demographics.veteranStatus}
                                    </p>
                                ) : null}
                            </div>
                            <div className="">
                                <label className="mb-1 text-[15px]">Race</label>
                                <Select
                                    value={
                                        Racer.find((item) => item?.value === values?.demographics?.race) || null
                                    }
                                    onChange={(selectedOption) => {
                                        // Update Formik values directly
                                        setFieldValue(
                                            "demographics.race",
                                            selectedOption ? selectedOption.value : ""
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
                                    styles={{
                                        ...customStylesSelect,
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#919191',
                                            fontSize: '15px'
                                        })
                                    }
                                    }
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={Racer}
                                    isSearchable
                                    placeholder={
                                        values.demographics.race
                                            ? values.demographics.race
                                            : "Select"
                                    }
                                />
                                {errors.demographics?.race && touched.demographics?.race ? (
                                    <p className="text-red-500">{errors.demographics.race}</p>
                                ) : null}
                            </div>
                            <div className="">
                                <label className="mb-1 text-[15px]">Are you Hispanic or Latino/a/x?</label>
                                <Select
                                    // defaultValue={values.demographics.isHaspanicLatino}
                                    value={values.demographics.isHaspanicLatino !== null
                                        ? { value: values.demographics.isHaspanicLatino, label: values.demographics.isHaspanicLatino ? "Yes" : "No" }
                                        : null
                                    }
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
                                    styles={{
                                        ...customStylesSelect,
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#919191',
                                            fontSize: '15px'
                                        })
                                    }
                                    }
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={[
                                        { value: true, label: "Yes" },
                                        { value: false, label: "No" },
                                    ]}
                                    isSearchable
                                    placeholder="Select from list"
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
                        className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[15px] mb-3"
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
                                <label className="mb-1 text-[15px]">
                                    Please declare your citizenship status
                                </label>
                                <Select
                                    // value={values.citizenships.status}
                                    value={citizenShipStatus.find((item) => item.value === values?.citizenships?.status)}

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
                                    styles={{
                                        ...customStylesSelect,
                                        placeholder: (provided) => ({
                                            ...provided,
                                            color: '#919191',
                                            fontSize: '15px'
                                        })
                                    }
                                    }
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={citizenShipStatus}
                                    isSearchable
                                    placeholder={
                                        values.citizenships.status
                                            ? values.citizenships.status
                                            : "Select"
                                    }
                                />
                                {errors.citizenships?.status && touched.citizenships?.status ? (
                                    <p className="text-red-500">{errors.citizenships.status}</p>
                                ) : null}
                            </div>
                            <div className="mb-5">
                                <label className="mb-1 text-[15px]">
                                    Are you eligible to work legally in the United States?
                                </label>
                                <Select
                                    // defaultValue={values.citizenships.isEligibleToWork}
                                    // Value={values?.citizenships?.isEligibleToWork}
                                    value={values.citizenships.isEligibleToWork !== null
                                        ? { value: values.citizenships.isEligibleToWork, label: values.citizenships.isEligibleToWork ? "Yes" : "No" }
                                        : null
                                    }
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
                                    placeholder="Select from list"
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
                            <label className="mb-1 text-[15px]">
                                Do you now, or will you in the future, need sponsorship from an
                                employer in order to obtain, extend or renew your authorization
                                to work in the United States?
                            </label>
                            <Select
                                // defaultValue={values.citizenships.isNeedSponserShip}
                                value={values.citizenships.isNeedSponserShip !== null
                                    ? { value: values.citizenships.isNeedSponserShip, label: values.citizenships.isNeedSponserShip ? "Yes" : "No" }
                                    : null
                                }
                                onChange={(selectedOption) => {
                                    // Update Formik values directly
                                    setFieldValue("citizenships.isNeedSponserShip", selectedOption ? selectedOption.value : "");
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
                                styles={{
                                    ...customStylesSelect,
                                    placeholder: (provided) => ({
                                        ...provided,
                                        color: '#919191',
                                        fontSize: '15px'
                                    })
                                }
                                }
                                className="react-select"
                                classNamePrefix="select"
                                options={[
                                    { value: true, label: "Yes" },
                                    { value: false, label: "No" },
                                ]}
                                isSearchable
                                placeholder="Select from list"
                            />
                            {errors.citizenships?.isNeedSponserShip &&
                                touched.citizenships?.isNeedSponserShip ? (
                                <p className="text-red-500">
                                    {errors.citizenships.isNeedSponserShip}
                                </p>
                            ) : null}
                        </div>

                    </div>
                </div>
                <div className="section-6 mb-5">
                    <h4
                        onClick={() => toggleCollapse(8)}
                        className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[15px] mb-3"
                    >
                        Legal Declarations
                        <ChevronDownIcon
                            className={` $transition-all duration-300 ${collapse8 ? "rotate-180" : ""
                                } w-[23px]`}
                        />
                    </h4>
                    <div
                        className={`transition-all duration-300 ${collapse8 ? "show" : "hidden"
                            }`}
                    >
                        <div className="mb-5 grid" role="group">
                            {/* <h6 className="mb-1 font-semibold">Legal Declarations</h6> */}
                            <label className="mb-1 text-[15px]">
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
                            <label className="mb-1 text-[15px]">
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
                    </div>
                </div>
                <div className="section-7 mb-10">
                    <h4
                        onClick={() => toggleCollapse(4)}
                        className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[15px] mb-3"
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
                            {errors.personalStatements &&
                                touched.personalStatements ? (
                                <p className="text-red-500">
                                    {errors.personalStatements}
                                </p>
                            ) : null}
                            <textarea
                                value={values.personalStatements}
                                onChange={(event) => {
                                    const { value } = event.target
                                    setFieldValue("personalStatements", value)
                                }}
                                onBlur={() => {
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
                                className="w-full bg-[#F4F8FB] text-[15px] text-black px-[20px] py-[10px] rounded-[8px] outline-none border border-[#E4E4E4] resize-none h-[200px] placeholder:text-[#919191] focus:bg-[#F3F8FC]"
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="text-end">
                    <button type="submit" className="font-medium bg-[#FFCB05] px-[40px] text-[15px] rounded-[0px] py-[12px] border-0">{loading ? <span className="loading"></span> : 'Save'}</button>
                </div>
            </form>
        </div>
    )
}

export default PersonalInformationForm;
