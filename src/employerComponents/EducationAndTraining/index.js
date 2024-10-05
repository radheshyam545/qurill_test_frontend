import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { customStylesSelect } from "../../components/ReactSelectStyle";
import { dateOfDDList, dateOfMMList, dateOfYYList } from "../../app/selectData";
import { postCall } from "../../app/axiosConfig";
import { useDispatch } from 'react-redux'
import { postProfileData } from "../../features/profile/profileSlice";

import { notifySuccess } from "../../app/toaster";
let actionType = 'save'

const EducationAndTraining = ({ collapse1, educationAndTrainingIndexItem, educationAndTrainingIndex, tabData }) => {

  const [loading, setLoading] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const dispatch = useDispatch()
  const initialValues = {
    nameOfCenter: educationAndTrainingIndexItem.nameOfCenter,
    degree: educationAndTrainingIndexItem.degree,
    fieldOfStudy: educationAndTrainingIndexItem.fieldOfStudy,
    gpa: educationAndTrainingIndexItem.gpa,
    academicCenter: educationAndTrainingIndexItem.academicCenter,
    fromYear: educationAndTrainingIndexItem?.from ? educationAndTrainingIndexItem.from.split('-')[0] : '',
    fromMonth: educationAndTrainingIndexItem?.from ? educationAndTrainingIndexItem.from.split('-')[1] : '',
    fromDay: educationAndTrainingIndexItem?.from ? educationAndTrainingIndexItem.from.split('-')[2].slice(0, 2) : '',
    ongoing: educationAndTrainingIndexItem.ongoing,
    toMonth: educationAndTrainingIndexItem?.to ? educationAndTrainingIndexItem.to.split('-')[1] : '',
    toDay: educationAndTrainingIndexItem?.to ? educationAndTrainingIndexItem.to.split('-')[2].slice(0, 2) : '',
    toYear: educationAndTrainingIndexItem?.to ? educationAndTrainingIndexItem.to.split('-')[0] : '',
  };

  const validationSchema =
    Yup.object({
      nameOfCenter: Yup.string().required("Required"),
      degree: Yup.string().required("Required"),
      fieldOfStudy: Yup.string().required("Required"),
      gpa: Yup.string().required("Required"),
      academicCenter: Yup.string().required("Required"),
      fromMonth: Yup.string().required("Required"),
      fromDay: Yup.string().required("Required"),
      fromYear: Yup.string().required("Required"),
      ongoing: Yup.boolean(),
      toMonth: Yup.string().when('ongoing', { is: false, then: () => Yup.string().required('Required') }),
      toDay: Yup.string().when('ongoing', { is: false, then: () => Yup.string().required('Required') }),
      toYear: Yup.string().when('ongoing', { is: false, then: () => Yup.string().required('Required') }),
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
      
      if(!_newValue.ongoing){
        _newValue['to'] = `${_newValue.toYear}-${_newValue.toMonth}-${_newValue.toDay}`  
        delete _newValue.toMonth
        delete _newValue.toDay
        delete _newValue.toYear
      }

      if (actionType === 'delete') {
        setLoadingDelete(true)
        payload = payload.filter((item, index) => { return index !== educationAndTrainingIndex })
      }
      else if (actionType === 'update') {
        setLoading(true)
        payload[educationAndTrainingIndex] = _newValue
      }
      else {
        setLoading(true)
        payload = [...payload, _newValue]
      }
      try {
        dispatch(postProfileData({ educationTraining: payload })).unwrap().then(() => {
          setLoading(false)
          setLoadingDelete(false)
          notifySuccess('Education and training Update Successfully')
        })
      } catch (e) {
        console.log('error profile', e)
        setLoadingDelete(false)
        setLoading(false)
      }

    },
  });

  const { handleChange, errors, touched, setFieldValue, getFieldProps, handleBlur, handleSubmit, values } = formik;
  const { academicCenter, degree, fromMonth, fromDay, fromYear, toMonth, toDay, toYear, ongoing } = values


  return (
    <div key={educationAndTrainingIndex}>
      <form>
        <div className={`transition-all duration-300 ${collapse1 ? 'show' : 'hidden'}`}>

          <div className="grid w-full mb-2">
            <label className="mb-1">Academic Center {!values.academicCenter && <span className="text-[red]">*</span>}</label>
            {/* <Select
              styles={customStylesSelect}
              className="react-select"
              classNamePrefix="select"
              options={[
                { value: '1/12/12', label: 'January 12, 2012' },
                { value: '2,2,12', label: 'February 2, 2012' }
              ]}
              isSearchable
              placeholder="Academic Center"
              value={academicCenter}
              onChange={(selectedOption) => setFieldValue('academicCenter', selectedOption)}
            /> */}

            <input
              type="text"
              name="academicCenter"
              placeholder=""
              className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#919191] focus:bg-[#F3F8FC]"
              {...getFieldProps('academicCenter')}
            />

            {touched.academicCenter && errors.academicCenter ? (
              <div className="text-red-500">{errors.academicCenter}</div>
            ) : null}
          </div>
          <div className="grid lg:grid-cols-2 gap-2">
            <div className="mb-2">
              <label className="mb-1">Name of center {!values.nameOfCenter && <span className="text-[red]">*</span>}</label>
              <input
                name="nameOfCenter"
                type="text"
                placeholder="Name of the Employer"
                className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#919191] focus:bg-[#F3F8FC]"
                {...getFieldProps('nameOfCenter')}
              />
              {touched.nameOfCenter && errors.nameOfCenter ? (
                <div className="text-red-500">{errors.nameOfCenter}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label className="mb-1">Degree {!values.degree && <span className="text-[red]">*</span>}</label>
              {/* <Select
                styles={customStylesSelect}
                className="react-select"
                classNamePrefix="select"
                options={[
                  { value: 'ADP(se)', label: 'ADP(se)' },
                  { value: 'ADP(cs)', label: 'ADP(cs)' }
                ]}
                isSearchable
                placeholder="Select"
                value={{ value: degree, label: degree }}
                onChange={(selectedOption) => setFieldValue('degree', selectedOption.value)}
              /> */}
              <input
                name="degree"
                type="text"
                placeholder="e.g . MS, BS, BBA, MBA, etc."
                className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#919191] focus:bg-[#F3F8FC]"
                {...getFieldProps('degree')}
              />

              {touched.degree && errors.degree ? (
                <div className="text-red-500">{errors.degree}</div>
              ) : null}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-2">
            <div className="mb-2">
              <label className="mb-1">Field of study {!values.fieldOfStudy && <span className="text-[red]">*</span>}</label>
              <input
                name="fieldOfStudy"
                type="text"
                placeholder="e.g . law"
                className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#919191] focus:bg-[#F3F8FC]"
                {...getFieldProps('fieldOfStudy')}
              />
              {touched.fieldOfStudy && errors.fieldOfStudy ? (
                <div className="text-red-500">{errors.fieldOfStudy}</div>
              ) : null}
            </div>
            <div className="mb-2">
              <label className="mb-1">GPA {!values.gpa && <span className="text-[red]">*</span>}</label>
              <input
                name="gpa"
                type="number"
                placeholder=""
                className="w-full text-[15px] text-[#000] px-[20px] py-[10px] rounded-[8px] outline-none border border-[#919191]  placeholder:text-[#919191] focus:bg-[#F3F8FC]"
                {...getFieldProps('gpa')}
              />
              {touched.gpa && errors.gpa ? (
                <div className="text-red-500">{errors.gpa}</div>
              ) : null}
            </div>
          </div>
          <div className="mb-2">
            <div className="flex gap-2 items-end">
              <div className="grid lg:grid-cols-2 gap-2 flex-1">
                <div>
                  <label className="mb-1">From {!fromDay && !fromMonth && !fromYear && <span className="text-[red]">*</span>}</label>
                  <div className="grid grid-cols-3 gap-2">
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
        </div>
      </form>
      <div className="text-end">
        {
          educationAndTrainingIndex < tabData.length ?
            <>{collapse1&&
              <>
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
  );
}

export default EducationAndTraining;
