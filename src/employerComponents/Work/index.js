import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { dateOfDDList, dateOfMMList, dateOfYYList } from "../../app/selectData";
import { getCountryList } from "../../app/commonFunction";
import { customStylesSelect } from "../../components/ReactSelectStyle";
import { postCall } from "../../app/axiosConfig";
import { useDispatch } from 'react-redux'
import { postProfileData } from "../../features/profile/profileSlice";
import { notifySuccess } from "../../app/toaster";
let actionType = 'save'
const Work1 = ({ collapse1, workIndexItem, workIndex, tabData }) => {

    const [loading, setLoading] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const dispatch = useDispatch()
    const [CountrydataForWorkPage, setCountrydataForWorkPage] = useState([]);

    const initialValues = {
        occupation: workIndexItem.occupation,
        employeer: workIndexItem.employeer,
        city: workIndexItem.city,
        country: workIndexItem.country,
        fromYear: workIndexItem?.from ? workIndexItem.from.split('-')[0] : '',
        fromMonth: workIndexItem?.from ? workIndexItem.from.split('-')[1] : '',
        fromDay: workIndexItem?.from ? workIndexItem.from.split('-')[2].slice(0, 2) : '',
        ongoing: workIndexItem.ongoing,
        toMonth: workIndexItem?.to ? workIndexItem.to.split('-')[1] : '',
        toDay: workIndexItem?.to ? workIndexItem.to.split('-')[2].slice(0, 2) : '',
        toYear: workIndexItem?.to ? workIndexItem.to.split('-')[0] : '',
        roleDescription: workIndexItem.roleDescription
    };

    const validationSchema = Yup.object().shape({
        occupation: Yup.string().required('Required'),
        employeer: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        country: Yup.string().required("Required"),
        fromMonth: Yup.string().required("Required"),
        fromDay: Yup.string().required("Required"),
        fromYear: Yup.string().required("Required"),
        ongoing: Yup.boolean(),
        toMonth: Yup.string().when('ongoing', { is: false, then: () => Yup.string().required('Required') }),
        toDay: Yup.string().when('ongoing', { is: false, then: () => Yup.string().required('Required') }),
        toYear: Yup.string().when('ongoing', { is: false, then: () => Yup.string().required('Required') }),
        roleDescription: Yup.string().required('Required')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {

            let payload = [...tabData]
            let _newValue = Object.assign({}, values)
            _newValue['from'] = `${_newValue.fromYear}-${_newValue.fromMonth}-${_newValue.fromDay}`
            delete _newValue.fromMonth
            delete _newValue.fromDay
            delete _newValue.fromYear

            if (!_newValue.ongoing) {
                _newValue['to'] = `${_newValue.toYear}-${_newValue.toMonth}-${_newValue.toDay}`
                delete _newValue.toMonth
                delete _newValue.toDay
                delete _newValue.toYear
            }


            if (actionType === 'delete') {
                setLoadingDelete(true)
                payload = payload.filter((item, index) => { return index !== workIndex })
            }

            else if (actionType === 'update') {
                setLoading(true)
                payload[workIndex] = _newValue
            }
            else {
                setLoading(true)
                payload = [...payload, _newValue]
            }

            try {
                dispatch(postProfileData({ work: payload })).unwrap().then(() => {
                    setLoading(false)
                    setLoadingDelete(false)
                    console.log('thererer------>actionType',actionType)
                    notifySuccess(actionType === 'delete' ? 'Work Delete Successfully' : 'Work Update Successfully')
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
                setCountrydataForWorkPage(data)

            })
            .catch((error) => {
                console.error("Error fetching country list:", error);
            });
    }, []);

    const { values, handleChange, handleSubmit, errors, touched, setFieldValue, getFieldProps } = formik;
    const { fromMonth, fromDay, fromYear, toMonth, toDay, toYear, country, ongoing } = values
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={`transition-all duration-300 ${collapse1 ? 'show' : 'hidden'}`}>

                    <div className="section-1 mb-10">

                        <div className="grid w-full mb-5">
                            <label className="mb-1">Occupation or position held {!values.occupation && <span className="text-[red]">*</span>}</label>
                            <input type="text" name="occupation" value={values.occupation} onChange={handleChange} placeholder="Title of the Occupation" className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]" />
                            {touched.occupation && errors.occupation && <p className="text-red-500">{errors.occupation}</p>}
                        </div>
                        <div className="grid lg:w-6/12 mb-5">
                            <label className="mb-1">Employeer {!values.employeer && <span className="text-[red]">*</span>}</label>
                            <input type="text" name="employeer" value={values.employeer} onChange={handleChange} placeholder="Name of the Employeer" className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]" />
                            {touched.employeer && errors.employeer && <p className="text-red-500">{errors.employeer}</p>}
                        </div>
                        <div className="grid lg:grid-cols-2 gap-2 mb-5">
                            <div>
                                <label className="-mb-1">City {!values.city && <span className="text-[red]">*</span>}</label>
                                <input type="text" name="city" value={values.city} onChange={handleChange} placeholder="e.g. Paris" className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]" />
                                {touched.city && errors.city && <p className="text-red-500">{errors.city}</p>}
                            </div>
                            <div>
                                <label className="mb-1">Country {!values.country && <span className="text-[red]">*</span>}</label>
                                <Select
                                    name="country"
                                    styles={customStylesSelect}
                                    className="react-select"
                                    classNamePrefix="select"
                                    options={CountrydataForWorkPage}
                                    isSearchable
                                    placeholder="Select"
                                    defaultValue={country}
                                    value={CountrydataForWorkPage.filter((item) => item.label === country)}
                                    onChange={(selectedOption) => { setFieldValue('country', selectedOption.label) }}
                                />

                                {touched.country && errors.country ? (<div className="text-red-500">{errors.country}</div>) : null}
                            </div>
                        </div>
                        <div className="mb-5">
                            <div className="flex gap-2 items-end">
                                <div className="grid lg:grid-cols-2 gap-2 flex-1">
                                    <div>
                                        <label className="mb-1">From{!fromDay && !fromMonth && !fromYear && <span className="text-[red]">*</span>}</label>
                                        <div className="grid lg:grid-cols-3 gap-2">
                                            <div>
                                                <Select
                                                    styles={customStylesSelect}
                                                    className="react-select"
                                                    classNamePrefix="select"
                                                    options={dateOfMMList}
                                                    isSearchable
                                                    name="fromMonth"
                                                    placeholder="MM"
                                                    defaultValue={fromMonth}
                                                    value={dateOfMMList.filter((item) => item.label === fromMonth)}
                                                    onChange={(selectedOption) => setFieldValue('fromMonth', selectedOption.label)}
                                                />
                                                {touched.fromMonth && errors.fromMonth ? (
                                                    <div className="text-red-500">{errors.fromMonth}</div>
                                                ) : null}

                                            </div>
                                            <div>
                                                <Select
                                                    styles={customStylesSelect}
                                                    className="react-select"
                                                    classNamePrefix="select"
                                                    options={dateOfDDList}
                                                    isSearchable
                                                    name="fromDay"
                                                    placeholder="DD"
                                                    defaultValue={fromDay}
                                                    value={dateOfDDList.filter((item) => item.label === fromDay)}
                                                    onChange={(selectedOption) => setFieldValue('fromDay', selectedOption.label)}
                                                />
                                                {touched.fromDay && errors.fromDay ? (
                                                    <div className="text-red-500">{errors.fromDay}</div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <Select
                                                    styles={customStylesSelect}
                                                    className="react-select"
                                                    classNamePrefix="select"
                                                    options={dateOfYYList}
                                                    isSearchable
                                                    name="fromYear"
                                                    placeholder="YYYY"
                                                    defaultValue={fromYear}
                                                    value={dateOfYYList.filter((item) => item.label === fromYear)}
                                                    onChange={(selectedOption) => setFieldValue('fromYear', selectedOption.label)}
                                                />
                                                {touched.fromYear && errors.fromYear ? (
                                                    <div className="text-red-500">{errors.fromYear}</div>
                                                ) : null}
                                            </div>
                                        </div>


                                    </div>
                                    <div>
                                        <label className="mb-1">To {!ongoing && !toDay && !toMonth && !toYear && <span className="text-[red]">*</span>}</label>
                                        <div className="grid grid-cols-3 gap-2">

                                            <div>
                                                <Select
                                                    styles={customStylesSelect}
                                                    className="react-select"
                                                    classNamePrefix="select"
                                                    options={dateOfMMList}
                                                    name="toMonth"
                                                    isSearchable
                                                    placeholder="MM"
                                                    defaultValue={toMonth}
                                                    value={dateOfMMList.filter((item) => item.label === toMonth)}
                                                    onChange={(selectedOption) => setFieldValue('toMonth', selectedOption.label)}
                                                    isDisabled={ongoing}
                                                />
                                                <span className="text-red-500">
                                                </span>
                                                {touched.toMonth && errors.toMonth ? (
                                                    <div className="text-red-500">{errors.toMonth}</div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <Select
                                                    styles={customStylesSelect}
                                                    className="react-select"
                                                    classNamePrefix="select"
                                                    options={dateOfDDList}
                                                    name="toDay"
                                                    isSearchable
                                                    placeholder="DD"
                                                    defaultValue={toDay}
                                                    value={dateOfDDList.filter((item) => item.label === toDay)}
                                                    onChange={(selectedOption) => setFieldValue('toDay', selectedOption.label)}
                                                    isDisabled={ongoing}
                                                />
                                                {touched.toDay && errors.toDay ? (
                                                    <div className="text-red-500">{errors.toDay}</div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <Select
                                                    styles={customStylesSelect}
                                                    className="react-select"
                                                    classNamePrefix="select"
                                                    options={dateOfYYList}
                                                    name="toYear"
                                                    isSearchable
                                                    placeholder="MM"
                                                    defaultValue={toYear}
                                                    value={dateOfYYList.filter((item) => item.label === toYear)}
                                                    onChange={(selectedOption) => setFieldValue('toYear', selectedOption.label)}
                                                    isDisabled={ongoing}
                                                />
                                                {touched.toYear && errors.toYear ? (
                                                    <div className="text-red-500">{errors.toYear}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <input
                                        className="switch mr-2 mt-[0.3rem] h-3.5 w-full appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.7rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-white checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                        type="checkbox"
                                        name="ongoing"
                                        role="switch"
                                        checked={ongoing}
                                        value={ongoing}
                                        defaultValue={ongoing}
                                        id="flexSwitchCheckDefault"
                                        {...getFieldProps('ongoing')}
                                    />
                                    <label
                                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                        htmlFor="flexSwitchCheckDefault"
                                    > Ongoing</label>
                                </div>
                            </div>
                        </div>

                        <div className="section-2 mb-10">
                            <div className="px-0">
                                <div className="mb-3">
                                    <label className="mb-1">Role Description {!values.roleDescription && <span className="text-[red]">*</span>}</label>
                                    {touched.roleDescription && errors.roleDescription && <p className="text-red-500">{errors.roleDescription}</p>}
                                    <textarea
                                        name="roleDescription"
                                        value={values.roleDescription}
                                        onChange={handleChange}
                                        placeholder="Role Description"
                                        className="w-full bg-[#F4F8FB] text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#E4E4E4] resize-none h-[400px] placeholder:text-[#2E2D46] focus:bg-[#F3F8FC]"
                                    ></textarea>

                                </div>

                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className="text-end">

                {
                    workIndex < tabData.length ?
                        <>{collapse1 && <>
                            <button type="submit" className="mb-[20px] font-medium bg-[#FFCB05] px-[40px] text-[16px] rounded-[0px] py-[12px] border-0 mr-2" onClick={() => {
                                actionType = 'update'
                                handleSubmit()
                            }}>{loading ? <span className="loading"></span> : 'Update'}</button>
                            <button type="submit" className="mb-[20px] font-medium bg-[#FFCB05] px-[40px] text-[16px] rounded-[0px] py-[12px] border-0 mr-2" onClick={() => {
                                actionType = 'delete'
                                handleSubmit()
                            }}>{loadingDelete ? <span className="loading"></span> : 'Delete'}</button>
                        </>}
                        </>
                        :
                        <button type="submit" className="font-medium bg-[#FFCB05] px-[40px] text-[16px] rounded-[0px] py-[12px] border-0" onClick={() => {
                            actionType = 'save'
                            handleSubmit()
                        }}>{loading ? <span className="loading"></span> : 'Save'}</button>
                }
            </div>
        </div>
    )
}

export default Work1;
