import React, { useEffect, useState } from 'react';
import { customStylesSelect } from "../../components/ReactSelectStyle";
import Select from "react-select";
import PreviewModal from '../../employerComponents/Modal/previewModal';
import { getCall, postCall, putCall } from '../../app/axiosConfig';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { languageData } from '../../components/PersonalInformation/data';
import { dateOfDDList, dateOfMMList, dateOfYYListUp } from '../../app/selectData';
import { notifyError, notifySuccess } from '../../app/toaster';
import { customStyles, initialJobPayload, educationList, scurityClearance, LicenseData, inOutState, jobCriteria, addquestion, usaCities } from './JobConsts';
import SuspenseContent from '../../containers/SuspenseContent';
import { selectFieldLabelDefault, selectFieldValueDefault } from '../../app/helperFunction';
import cleanDeep from 'clean-deep';
import SkillComponent from '../../employerComponents/JobPostComponent/SkillComponent';
import ProfileInfo from '../../employerComponents/JobPostComponent/ProfileInfo';
import JobPostInputFieldComponent from '../../employerComponents/JobPostComponent/JobPostInputFieldComponent';
function JobPost() {
  const updatedUsaCities = Object.fromEntries(
    Object.entries(usaCities).map(([state, cities]) => [
      state,
      cities.map(city => ({
        value: city.label,
        label: city.label,
      }))
    ])
  );
  const navigate = useNavigate()
  const [draftPostData, setDraftPostData] = useState(null);
  const [postJobData, setPostJobData] = useState(initialJobPayload);
  const [publish, setPublish] = useState(false)
  const [publishShow, setPublishShow] = useState(true)
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [loadingForDraft, setLoadingForDraft] = useState(false);
  const [draftJobDataLoader, setDraftJobDataLoader] = useState(false)
  const [submitCheck, setSubmitCheck] = useState(false)
  const [cloneJobData, setCloneJobData] = useState("")
  const [__id, set__Id] = useState("")
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [localQuestions, setLocalQuestions] = useState([]);
  const [tempSelected, setTempSelected] = useState([]);
  const [show, setShow] = useState(true);
  const [greaterThanOptions, setGreaterThanOptions] = useState(educationList);
  const [lessThanOptions, setLessThanOptions] = useState(educationList);
  const [pianoButtonCheck, setPianoButton] = useState("")
  const [action, setAction] = useState("")

  /////////////////////////////////qulifier////////////////////////////////////

  const handleDisqualifierChange = (field, value) => {
    if (field === 'notHavingLicenses') {
      if (value) {
        handleLicenseChange([LicenseData[0]]);
      } else {
        setPostJobData(prevState => ({
          ...prevState,
          disqualifiers: {
            ...prevState.disqualifiers,
            notHavingLicenses: []
          }
        }));
      }
    } else if (field === 'notHavingSecurityClearances') {
      if (value) {
        notHavingSecurityClearancesChange([scurityClearance[0]]);
      } else {
        setPostJobData(prevState => ({
          ...prevState,
          disqualifiers: {
            ...prevState.disqualifiers,
            notHavingSecurityClearances: []
          }
        }));
      }
    } else if (field === 'beingInOutState') {

      if (value) {
        handleInOutChange(inOutState[0].value)
      } else {
        setPostJobData(prevState => ({
          ...prevState,
          disqualifiers: {
            ...prevState.disqualifiers,
            beingInOutState: value
          }
        }));
      }

    } else if (field === 'notAbleToSpeak') {
      if (value) {
        handleSpeakChange(languageData[0].label)
      } else {
        setPostJobData(prevState => ({
          ...prevState,
          disqualifiers: {
            ...prevState.disqualifiers,
            notAbleToSpeak: ''
          }
        }));
      }
    } else if (field === 'havingGreaterThan' || field === 'havingLessThan' || field === 'notHaving') {
      if (field === 'havingGreaterThan') { updateGreaterThanOptions() } else if (field === 'havingLessThan') { updateLessThanOptions() }
      if (field === 'notHaving') {
        setPostJobData(prevState => ({
          ...prevState,
          disqualifiers: {
            ...prevState.disqualifiers,
            education: {
              ...prevState.disqualifiers.education,
              havingGreaterThan: '',
              havingLessThan: '',
              [field]: value
            }
          }
        }));
      }
      else {
        setPostJobData(prevState => ({
          ...prevState,
          disqualifiers: {
            ...prevState.disqualifiers,
            education: {
              ...prevState.disqualifiers.education,
              notHaving: '',
              [field]: value
            }
          }
        }));
      }
    } else if (field === 'education') {
      handleDisqualifierChange('havingGreaterThan', '')
      handleDisqualifierChange('havingLessThan', '')
      handleDisqualifierChange('notHaving', '')
    } else {
      setPostJobData(prevState => ({
        ...prevState,
        disqualifiers: {
          ...prevState.disqualifiers,
          [field]: value
        }
      }));
    }
  };
  const handlePianoButtonChange = (value) => {
    setPianoButton(value);
    setPostJobData(prevState => {
      const newDisqualifiers = { ...prevState.disqualifiers.education };

      if (value === "Not Having") {
        newDisqualifiers.havingGreaterThan = '';
        newDisqualifiers.havingLessThan = '';
        newDisqualifiers.notHaving = '';
      } else if (value === "Having Greater than") {
        newDisqualifiers.notHaving = '';
        newDisqualifiers.havingGreaterThan = '';
        newDisqualifiers.havingLessThan = '';
      } else if (value === "Having Less than") {
        newDisqualifiers.notHaving = '';
        newDisqualifiers.havingGreaterThan = '';
        newDisqualifiers.havingLessThan = '';
      }

      return {
        ...prevState,
        disqualifiers: {
          ...prevState.disqualifiers,
          education: newDisqualifiers
        }
      };
    });
  };
  useEffect(() => {
    if (postJobData?.disqualifiers?.education?.havingGreaterThan) {
      setPianoButton("Having Greater than");
    } else if (postJobData?.disqualifiers?.education?.havingLessThan) {
      setPianoButton("Having Less than");
    } else if (postJobData?.disqualifiers?.education?.notHaving) {
      setPianoButton("Not Having");
    }
  }, [postJobData]);
  const handleLicenseChange = (selectedOption) => {
    setPostJobData(prevState => ({
      ...prevState,
      disqualifiers: {
        ...prevState.disqualifiers,
        notHavingLicenses: selectedOption.map(item => item.value)
      }
    }));
  };

  const handleSpeakChange = (selectedOption) => {
    setPostJobData(prevState => ({
      ...prevState,
      disqualifiers: {
        ...prevState.disqualifiers,
        notAbleToSpeak: selectedOption
      }
    }));
  };

  const handleInOutChange = (selectedOption) => {
    setPostJobData(prevState => ({
      ...prevState,
      disqualifiers: {
        ...prevState.disqualifiers,
        beingInOutState: selectedOption
      }
    }));
  };

  const notHavingSecurityClearancesChange = (selectedOption) => {
    setPostJobData(prevState => ({
      ...prevState,
      disqualifiers: {
        ...prevState.disqualifiers,
        notHavingSecurityClearances: selectedOption.map(item => item.value)
      }
    }));
  };

  const updateGreaterThanOptions = (lessThanValue) => {
    const index = educationList.findIndex(item => item.value === lessThanValue);
    if (index !== -1) {
      setGreaterThanOptions(educationList.slice(index + 1));
    } else {
      setGreaterThanOptions(educationList);
    }
  };

  const updateLessThanOptions = (greaterThanValue) => {
    const index = educationList.findIndex(item => item.value === greaterThanValue);
    if (index !== -1) {
      setLessThanOptions(educationList.slice(0, index));
    } else {
      setLessThanOptions(educationList);
    }
  };
  useEffect(() => {
    if (postJobData?.disqualifiers?.education?.havingGreaterThan) {
      updateLessThanOptions(postJobData.disqualifiers.education.havingGreaterThan);
    }
  }, [postJobData?.disqualifiers?.education?.havingGreaterThan]);

  useEffect(() => {
    if (postJobData?.disqualifiers?.education?.havingLessThan) {
      updateGreaterThanOptions(postJobData.disqualifiers.education.havingLessThan);
    }
  }, [postJobData?.disqualifiers?.education?.havingLessThan]);
  //////////////////////////////Question///////////////////////////////

  const handleQuestions = (action, question = '') => {
    if (action === 'select') {
      if (!tempSelected.includes(question)) {
        setTempSelected([...tempSelected, question]);
      } else {
        setTempSelected(tempSelected.filter(q => q !== question));
      }
    } else if (action === 'add') {
      const duplicateQuestions = tempSelected.filter(q => selectedQuestions.includes(q));
      if (duplicateQuestions.length > 0) {
        alert('Question already added');
      } else {
        setLocalQuestions([...localQuestions, ...tempSelected]);
        setTempSelected([]);
      }
    } else if (action === 'remove') {
      setLocalQuestions(localQuestions.filter(q => q !== question));
    } else if (action === 'toggleShow') {
      setShow(!show);
    }
  };

  const saveQuestionsToPostData = () => {
    const questionKeys = localQuestions.map(question => {
      for (const key in addquestion) {
        if (addquestion[key] === question) {
          return key;
        }
      }
      return null;
    }).filter(key => key !== null);

    setPostJobData(prevPostJobData => ({
      ...prevPostJobData,
      questions: questionKeys
    }));
  };

  useEffect(() => {
    setLocalQuestions(selectedQuestions);
  }, [selectedQuestions]);

  useEffect(() => {
    const questionsFromKeys = postJobData?.questions?.map(key => addquestion[key]) || [];
    if (JSON.stringify(questionsFromKeys) !== JSON.stringify(selectedQuestions)) {
      setSelectedQuestions(questionsFromKeys);
    }
  }, [postJobData]);

  useEffect(() => {
    saveQuestionsToPostData();
  }, [localQuestions]);
  /////////////////////////////EndQuestion////////////////////////////////////////////


  /////////////////////////////Expire Criteria//////////////////////////////////////////////
  const handleInputChange = (field, value) => {
    setPostJobData(prevData => {
      let expireCriteria = { ...prevData.expireCriteria, [field]: value };

      if (field === 'criteria') {
        if (value === 'applicants') {
          setPublishShow(true);
          expireCriteria = { ...expireCriteria, numberOfApplicants: prevData.expireCriteria?.numberOfApplicants };
          delete expireCriteria.date; // Remove date if applicants is selected
        } else if (value === 'date') {
          setPublishShow(false);
          expireCriteria = { ...expireCriteria, date: '' };
          delete expireCriteria.numberOfApplicants; // Remove numberOfApplicants if date is selected
        }
      } else if (['fromDay', 'fromMonth', 'fromYear'].includes(field)) {
        const updatedFields = {
          fromYear: field === 'fromYear' ? value : (prevData.expireCriteria.date?.split('-')[0] || ''),
          fromMonth: field === 'fromMonth' ? value : (prevData.expireCriteria.date?.split('-')[1] || ''),
          fromDay: field === 'fromDay' ? value : (prevData.expireCriteria.date?.split('-')[2] || ''),
        };

        const date = `${updatedFields.fromYear}-${updatedFields.fromMonth}-${updatedFields.fromDay}`;
        expireCriteria = { ...expireCriteria, date: date.trim() !== '--' ? date : '' };
      }

      return {
        ...prevData,
        expireCriteria
      };
    });
  };

  const setFieldValue = (field, value) => {
    handleInputChange(field, value);
  };


  ////////////////////////////////////////////////////////////////////////////////////////
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const param1 = searchParams.get('_id');
    const param2 = searchParams.get('name');
    set__Id(param1)
    setAction(param2)
  }, [location.search]);
  useEffect(() => {
    if (action) {
      gettingDraftJobData();
    }
  }, [action]);
  /////////////////setting draftJobData///////////////////
  useEffect(() => {
    if (cloneJobData) {
      setPostJobData(cloneJobData);
    }
  }, [cloneJobData]);
  /////////////////setting draftJobData///////////////////
  useEffect(() => {
    console.log(draftPostData)
    if (draftPostData) {
      setPostJobData(draftPostData);
    }
  }, [draftPostData]);
  const gettingDraftJobData = async () => {
    if (action === "clone") {
      try {
        setDraftJobDataLoader(true)
        const response = await getCall(`/jobs/${__id}`);
        const jobData = response?.data
        console.log(jobData, "clone")
        if (jobData) {
          delete jobData._id;
          delete jobData.employerId
          delete jobData.updatedAt;
          delete jobData.__v;
          delete jobData.createdAt;
          delete jobData.status;
          delete jobData.applicants;
          delete jobData.hired;
          delete jobData.interviewed;
          delete jobData.new;
          delete jobData.offer;
          delete jobData.screened;
          delete jobData.shortListed;
          setDraftPostData(jobData);
        } else {
          console.log("Job data not found");
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
      } finally {
        setDraftJobDataLoader(false)
      }
    } else {
      try {
        setDraftJobDataLoader(true)
        const response = await getCall(`/jobs/${__id}`);
        const jobData = response?.data
        console.log(jobData, "clone")
        if (jobData) {
          delete jobData.status;
          delete jobData._id;
          delete jobData.updateAt;
          delete jobData.__v;
          delete jobData.createdAt;
          setDraftPostData(jobData);
        } else {
          console.log("Job data not found");
        }
      } catch (error) {
        console.error('Error fetching job data:', error);
      } finally {
        setDraftJobDataLoader(false)
      }
    }
  };
  const removeUnwantedProperties = (jobData) => {
    const { _id, createdAt, updatedAt, __v, skills, ...rest } = jobData;
    return {
      ...rest,
      skills: skills?.map(({ _id, ...rest }) => rest)
    };
  };
  /////////////////////////////////-----------------------------------------------------------------------
  ////////////////Api Call Start
  ///////////////////////////////--------------------------------------------------------------------------
  const checkDateValidation = (date) => {
    let checkDatevalidation = date.split('-')
    if (checkDatevalidation.length < 3) return false
    return checkDatevalidation.find(item => item === '') === '' ? false : true

  }

  const checkApplicantValidation = (count) => {
    if(count){
      return true
    }else{
      return false
    }
  }

  const handleJobStatusChange = (status) => {
    if (status === 'draft') {
      setLoadingForDraft(true);
    } else if (status === 'published') {
      setLoading(true);
    }
  };

  const cleanJobData = (data) => {
    const cleanedData = { ...data };
    delete cleanedData?.expireCriteria?.fromDay;
    delete cleanedData?.expireCriteria?.fromMonth;
    delete cleanedData?.expireCriteria?.fromYear;
    delete cleanedData?.applied;
    delete cleanedData?.offered;
    delete cleanedData?.employerId;
    delete cleanedData?.applicants;
    delete cleanedData?.new;
    delete cleanedData?.offer;
    delete cleanedData?.interviewed;
    delete cleanedData?.hired;
    delete cleanedData?.shortListed;
    delete cleanedData?.screened;
    delete cleanedData?.applied;
    return cleanDeep(cleanedData);
  };

  const validatePay = () => {
    const { showBy, minimum, maximum } = postJobData?.pay?.pay || {};
    if (showBy === "range") {
      return minimum != 0 && maximum != 0
    }
    else if (showBy === "starting_amount") {
      return minimum != 0
    }
    else if (showBy === "maximum_amount") {
      return maximum != 0
    }
    else if (showBy === "exact_amount") {
      return minimum != 0
    }
  };

  // const validateExpectedHours = () => {

  //   const { rateUnit } = postJobData?.pay?.pay || {};
  //   const { showBy, minimum, maximum } = postJobData?.pay?.expectedHours || {};
  //   if (rateUnit === 'per_hour') {
  //     if (showBy === "range") {
  //       return minimum != 0 && maximum != 0
  //     }
  //     else if (showBy === "minimum") {
  //       return minimum != 0
  //     }
  //     else if (showBy === "maximum") {
  //       return maximum != 0
  //     }
  //     else if (showBy === "fixed_hours") {
  //       return minimum != 0
  //     }
  //   }
  //   return true
  // };

  const publishJob = async (e) => {
    setSubmitCheck(true);
    const { name: status } = e.target;
    if (status !== "draft" && !validatePay()) {
      notifyError("Fill all mandatory fields");
      return
    }
    postJobData.status = status;

    // Validate date if criteria is 'date'
    if (postJobData?.expireCriteria?.criteria === 'date' && !checkDateValidation(postJobData?.expireCriteria?.date)) {
      notifyError('Date should be valid');
      return;
    }

    // Validate date if criteria is 'date'
    if (postJobData?.expireCriteria?.criteria === 'applicants' && !checkApplicantValidation(postJobData?.expireCriteria?.numberOfApplicants)) {
      notifyError('Date should be valid');
      return;
    }
    

    // Clean job data
    let jobData = cleanJobData(postJobData);

    try {
      handleJobStatusChange(status);

      // Determine the API call method and endpoint
      const apiCall = action == null || action === "clone" ? postCall : putCall;
      const endpoint = action == null || action === "clone" ? "/jobs" : `/jobs/${__id}`;
      const sanitizedJobData = removeUnwantedProperties(jobData);

      if (sanitizedJobData.disqualifiers.beingInOutState === false) {
        delete sanitizedJobData.disqualifiers.beingInOutState
      }

      const response = await apiCall(endpoint, sanitizedJobData);

      // Notify user based on status
      if (status === "draft") {
        notifySuccess("Job saved as Draft Successfully");
      } else if (status === "published") {
        notifySuccess("Job Published Successfully");
      }

      navigate('/employer/job-ads');
    } catch (error) {
      notifyError("Fill all mandatory fields");
    } finally {
      if (status === "published") {
        setLoading(false);
      } else {
        setLoadingForDraft(false);
      }
    }
  };
  /////////////////////////////////-----------------------------------------------------------------------
  ////////////////Api Call end
  ///////////////////////////////-------------------------------------------------------------------------

  const saveAsdraft = (e, draft = true) => {
    if (draft) {
      setPostJobData({ ...postJobData, status: 'draft' })
    } else {
      setPostJobData({ ...postJobData, status: 'published' })
    }
    setTimeout(() => { publishJob(e) }, 10)
  }
  if (draftJobDataLoader) {
    return <SuspenseContent />
  }
  console.log("Ahmaddddd",postJobData)
  return (

    <>
      <div>
        <div className='w-[100%] flex justify-end px-[20px] pb-[5px]'>
          <button className="py-[5px] text-[15px] px-4 rounded-[10px] font-semibold bg-[#FFCB05] hover:bg-[#F8B501] transition-colors duration-100"
            onClick={() => { setModal(true) }}
          >Preview</button>
        </div>
        <div className='mx-5 mx- py-[40px] job-post-wrapper overflow-hidden -bg-white border-t border-[#CECECE] border-dotted rounded -h-[100%] -w-100%'>
          {/* -------------------input field------------------ */}
          <JobPostInputFieldComponent postJobData={postJobData} setPostJobData={setPostJobData} submitCheck={submitCheck} />
          {/* -------------Applicants Info----------- */}
          <ProfileInfo postJobData={postJobData} setPostJobData={setPostJobData} submitCheck={submitCheck} />
          {/* -------------------Add Skill--------------------- */}
          <SkillComponent postJobData={postJobData} setPostJobData={setPostJobData} submitCheck={submitCheck} />
          {/* -------------------Questions--------------------- */}
          <div>
            <div className='mt-[50px]'>
              <p className='font-[700] text-[16px] switch-text-1000'>Questions</p>
              <div className="mt-[10px]">
                {postJobData?.questions?.map((key, idx) => (
                  <div key={idx} className="flex items-center justify-between border-b border-b-[2px] text-white px-5 py-2 mt-1">
                    <span className='text-[15px] -font-semibold text-[black]'>
                      {addquestion[key]}
                    </span>
                    <span className='ml-4 cursor-pointer' onClick={() => handleQuestions('remove', addquestion[key])}>
                      <img className='min-h-[20px] min-w-[20px]' src="/assets/images/employer-images/add-questions-del-icon.svg" alt="" />
                    </span>
                  </div>
                ))}
              </div>
              <p onClick={() => handleQuestions('toggleShow')} className='cursor-pointer flex text-[15px] gap-[15px] mt-[15px] '>
                <img src="/assets/images/employer-images/question-add-icon.svg" alt="" />
                <span className='text-[15px]'>Add question</span>
              </p>
              {/* {postJobData.status !== 'draft' && (postJobData.questions[0] === '' || postJobData.questions[0] === undefined) && submitCheck && <p className='text-[red] text-[13px]'>Question is required</p>} */}

              <div className={`App p-4 -fff ${show ? 'question-display-none' : ''}`}>
                <div className={`h-[100vh] flex justify-center items-center fixed overflow-y-scroll z-[999] w-[100%] m-[0px] overlay-color -px-[400px] py-[100px] top-[0px] left-[0px]`}>
                  <div className='bg-[white] -fff'>
                    <div className={`bg-[white] py-[30px] rounded-[15px] question-inner-div overflow-y-scroll w-[800px]`}>
                      <div className='px-5 flex justify-between'>
                        <p className='flex -py-2 text-[18px] font-[600]'>Select a question</p>
                        <img onClick={() => handleQuestions('toggleShow')} className='cursor-pointer h-[15px]' src="/assets/images/employer-images/jobpostoverlaytabcross.svg" alt="" />
                      </div>
                      {Object.keys(addquestion).map((key, idx) => (
                        <p key={idx} className={`px-5 py-2 text-[15px] font-[500] cursor-pointer w-[100%] border-b text-left border-b-[2px] ${tempSelected.includes(addquestion[key]) ? 'bg-gray-300' : 'bg-white'}`} onClick={() => handleQuestions('select', addquestion[key])}>
                          {addquestion[key]}
                        </p>
                      ))}
                      <div className='flex gap-[5px] justify-end px-[40px]'>
                        <button className="px-4 py-2 bg-[#E2E2E2] text-[15px] text-[black] rounded-[8px] mt-4" onClick={() => handleQuestions('toggleShow')}>
                          Close
                        </button>
                        <button className="px-4 py-2 bg-[#FFCB05] text-[15px] text-[black] rounded-[8px] mt-4" onClick={() => handleQuestions('add')}>
                          Add questions
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <QuestionComponent setPostJobData={setPostJobData} postJobData={postJobData} submitCheck={submitCheck} /> */}
          {/* -------------------Disqualifiers--------------------- */}
          <div>
            <div>
              <p className='font-[700] text-[16px] switch-text-1000 mt-[50px]'>Disqualifiers</p>
              <div className='mt-[10px] flex flex-col gap-[30px]'>
                <span className='flex gap-[12px] mt-[5px]'>
                  <input
                    className='min-h-[24px] min-w-[18px]'
                    type="checkbox"
                    checked={postJobData.disqualifiers.hasCriminalRecord}
                    onChange={(e) => handleDisqualifierChange('hasCriminalRecord', e.target.checked)}
                  />
                  <p className='text-[15px] switch-text-900'>Having a criminal record</p>
                </span>
                <span className='flex gap-[12px] -mt-[5px]'>
                  <input
                    className='min-h-[24px] min-w-[18px]'
                    type="checkbox"
                    checked={postJobData.disqualifiers.requiresWorkAuthorizationUS}
                    onChange={(e) => handleDisqualifierChange('requiresWorkAuthorizationUS', e.target.checked)}
                  />
                  <p className='text-[15px] switch-text-900'>Requiring work authorization to work in the US</p>
                </span>
                <span className='flex gap-[12px] -mt-[5px]'>
                  <input
                    className='min-h-[24px] min-w-[18px]'
                    type="checkbox"
                    checked={postJobData.disqualifiers.requiresSponsorship}
                    onChange={(e) => handleDisqualifierChange('requiresSponsorship', e.target.checked)}
                  />
                  <p className='text-[15px] switch-text-900'>Requiring sponsorship now or in the future for continued work authorization</p>
                </span>
                <span className='flex flex-wrap gap-[12px] items-center -mt-[5px]'>
                  <input
                    className='min-h-[24px] min-w-[18px]'
                    type="checkbox"
                    checked={postJobData.disqualifiers.notHavingLicenses.length > 0}
                    onChange={(e) => handleDisqualifierChange('notHavingLicenses', e.target.checked)}
                  />
                  <p className='text-[15px] switch-text-900'>Not having the following certificate</p>
                  <div className='w-[150px] -mt-[5px]'>
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
                      value={postJobData.disqualifiers.notHavingLicenses.map(value =>
                        LicenseData.flatMap(group => group.options).find(option => option.value === value)
                      )}
                      // value={postJobData.disqualifiers.notHavingLicenses.map(value => LicenseData.find(item => item.value === value))}
                      options={LicenseData}
                      isSearchable={true}
                      placeholder="Certificate"
                      onChange={handleLicenseChange}
                      isMulti={true}
                    />
                  </div>
                </span>
                <span className='flex gap-[12px] items-center -mt-[5px]'>
                  <input
                    className='min-h-[24px] min-w-[18px]'
                    type="checkbox"
                    checked={postJobData?.disqualifiers?.beingInOutState ? postJobData?.disqualifiers?.beingInOutState : ''}

                    onChange={(e) => handleDisqualifierChange('beingInOutState', e.target.checked)}
                  />
                  <p className='text-[15px] switch-text-900'>Being</p>
                  <div className='w-[150px] -mt-[5px]'>
                    <Select
                      styles={customStylesSelect}
                      className="react-select font-[500] text-[15px] -height"
                      classNamePrefix="All"
                      options={inOutState}
                      value={selectFieldValueDefault(inOutState, postJobData?.disqualifiers?.beingInOutState)}
                      isSearchable={true}
                      placeholder="Select"
                      onChange={(selectedOption) => handleInOutChange(selectedOption.value)}

                    />
                  </div>
                  <p className='text-[15px] switch-text-900'>state</p>
                </span>
                <span className='flex gap-[12px] items-center -mt-[5px]'>
                  <input
                    className='min-h-[24px] min-w-[18px]'
                    type="checkbox"
                    checked={postJobData.disqualifiers.notAbleToSpeak !== "" ? postJobData.disqualifiers.notAbleToSpeak : ""}
                    onChange={(e) => handleDisqualifierChange('notAbleToSpeak', e.target.checked)}
                  />
                  <p className='text-[15px] switch-text-900'>Not able to speak</p>
                  <div className='w-[150px] -mt-[5px]'>
                    <Select
                      styles={customStylesSelect}
                      className="react-select font-[400] text-[14px] height-[auto]"
                      classNamePrefix="All"
                      options={languageData}
                      value={selectFieldLabelDefault(languageData, postJobData?.disqualifiers?.notAbleToSpeak)}
                      isSearchable={true}
                      placeholder="Select"
                      onChange={(selectedOption) => handleSpeakChange(selectedOption.label)}
                    />

                  </div>
                </span>
                <span className='flex gap-[12px] mt-[-2px]'>
                  {/* <DisqualifiersCheckBox /> */}
                  <input
                    className='min-h-[24px] min-w-[18px]'
                    type="checkbox"
                    checked={
                      postJobData.disqualifiers.education?.havingGreaterThan ? true :
                        postJobData.disqualifiers.education?.havingLessThan ? true : postJobData.disqualifiers.education?.notHaving ? true : false
                    }
                    onChange={(e) => handleDisqualifierChange('education', e.target.checked)}
                    onClick={(e) => { if (e.target.checked) handlePianoButtonChange("Having greater than") }}
                  />
                  <p className='text-[15px] switch-text-900'>Education</p>
                </span>
              </div>
              <div className='pl-[40px] mt-[20px] disqualifiers-wrapper'>
                <div className='-h-[200px] w-[100%] -bg-[blue] radio-input-wrapper flex items-center'>
                  <div className='h-[100%] -bg-[red] w-[50%] -bg-[yellow] radio-input-left -flex -gap-[15px] -items-center'>
                    <div className='flex gap-[15px] radio-input-right items-center -justify-start'>
                      <input
                        className=" -appearance-none disqualifiers-radio bg-[#D9D9D9] min-h-[22px] rounded-[50%] min-w-[22px] border-2 border-black checked:bg-[#FFCB05] focus:outline-none transition duration-200 cursor-pointer"
                        type="radio"
                        name="education"
                        checked={pianoButtonCheck === "Having Greater than" || pianoButtonCheck === "Having Less than"}
                        onChange={() => handlePianoButtonChange("Having Greater than")}
                      />
                      <p className='text-[15px] switch-text-900 font-1600 -w-[250px] text-nowrap'>Having greater than</p>
                      <div className='w-[380px] radio-input-left-select -mt-[5px]'>
                        <Select
                          styles={customStylesSelect}
                          className="react-select -fontbold"
                          classNamePrefix="All"
                          options={greaterThanOptions}
                          isSearchable={true}
                          value={selectFieldValueDefault(educationList, postJobData?.disqualifiers?.education?.havingGreaterThan)}
                          placeholder="Select"
                          onChange={(selectedOption) => handleDisqualifierChange('havingGreaterThan', selectedOption ? selectedOption.value : '')}
                          isDisabled={pianoButtonCheck === "Not Having"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='h-[100%]  -bg-[pink] w-[50%] radio-input-right -bg-[green]'>
                    <div className='flex items-center radio-padding-left'>
                      <p className='font-bold text-[15px] pl-[10px] ml-[30px] radio-display-none'>OR</p>
                      <p className='text-[15px] switch-text-900  ml-[30px] text-nowrap'>Having less than</p>
                      <div className='w-[380px] radio-input-right-select-bottom ml-[15px]'>
                        <Select
                          styles={customStylesSelect}
                          className="react-select -fontbold"
                          classNamePrefix="All"
                          options={lessThanOptions}
                          isSearchable={true}
                          value={selectFieldValueDefault(educationList, postJobData?.disqualifiers?.education?.havingLessThan)}
                          placeholder="Select"
                          onChange={(selectedOption) => handleDisqualifierChange('havingLessThan', selectedOption ? selectedOption.value : '')}
                          isDisabled={pianoButtonCheck === "Not Having"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='-h-[100px] mt-[5px] w-[100%] grid grid-cols-1'>
                  <div className='flex gap-[15px] items-center  justify-start'>
                    <input
                      type="radio"
                      name="education"
                      checked={pianoButtonCheck === "Not Having"}
                      onChange={() => handlePianoButtonChange("Not Having")}
                      className=" -appearance-none disqualifiers-radio bg-[#D9D9D9] -rounded-[50%] min-h-[50px] min-w-[22px] border-2 border-black checked:bg-[#FFCB05] focus:outline-none transition duration-200 cursor-pointer"
                    />
                    <p className='text-[15px] switch-text-900 text-nowrap'>Not having</p>
                    <div className='w-[380px] radio-input-right-select-bottom mt-[5px]'>
                      <Select
                        styles={customStylesSelect}
                        className="react-select -fontbold"
                        classNamePrefix="All"
                        options={educationList}
                        isSearchable={true}
                        value={selectFieldValueDefault(educationList, postJobData?.disqualifiers?.education?.notHaving)}
                        placeholder="Select"
                        onChange={(selectedOption) => handleDisqualifierChange('notHaving', selectedOption ? selectedOption.value : '')}
                        isDisabled={pianoButtonCheck === "Having Greater than" || pianoButtonCheck === "Having Less than"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* -------------------Disqualifiers--------------------- */}
          {/* {----------------------Publish----------------------} */}

          <div className='flex gap-[20px] justify-end'>
            <div className='flex gap-[15px] mt-[20px]'>
              <button className='px-[15px] font-[500] py-[10px] bg-[#E2E2E2] text-[15px] rounded-[8px] min-w-[130px]' onClick={saveAsdraft} name={"draft"}>
                {loadingForDraft ? <span className="loading"></span> : "Save As Draft"}
              </button>
              <button onClick={() => setPublish(!publish)} className='px-[15px] font-[500] py-[10px] bg-[#FFCB05] text-[15px] rounded-[8px] min-w-[130px]'>{loading ? <span className="loading"></span> : "Publish"}</button>
            </div>

            <div className={`${publish ? '' : 'hide'} w-[100%] flex items-center justify-center fixed top-0 left-0 w-full h-full z-50`}>
              <div className="bg-gray-900 bg-opacity-50 fixed inset-0 z-[6]"></div>
              {/* ------ */}
              <div className='employer-job-post-publish-preview sm:w-[70%] md:w-[41%] min-h-[30%] py-5 px-[8px] max-w-[1500px] bg-[#fff] rounded-xl absolute z-[7] shadow-2xl -relative -overflow-y-scroll -overflow-x-hidden'>
                <button onClick={() => { setPublish(!publish) }} className='h-[25px] w-[25px] flex justify-center items-center text-[14px] font-bold rounded-[50%] bg-[#afc4b5] absolute right-3 top-2'>X</button>
                <span className='flex flex-wrap items-center gap-[8px] mt-[20px]'>
                  <p className='text-[15px]'>When should you stop receiving applications</p>
                  <Select
                    styles={customStyles}
                    className="react-select font-[500] w-[140px] text-[18px]"
                    classNamePrefix="All"
                    options={jobCriteria}
                    isSearchable={true}
                    value={selectFieldValueDefault(jobCriteria, postJobData?.expireCriteria?.criteria)}
                    placeholder="Select"
                    onChange={(selectedOption) => handleInputChange('criteria', selectedOption.value)}
                  />
                </span>
                {postJobData.status != 'draft' && (postJobData?.expireCriteria?.criteria == '' || postJobData?.expireCriteria?.criteria == undefined) && submitCheck && <p className='text-[red] text-[13px]'>Criteria of expire is required</p>}
                {(postJobData?.expireCriteria?.criteria ?
                  postJobData?.expireCriteria?.criteria !== 'date' ? true : false : publishShow) ?
                  <div>
                    <span className='flex flex-wrap items-center mt-[20px] gap-[5px]'>
                      <p className='text-[15px]'>Stop receiving applications after:</p>
                      <input
                        className='h-[25px] w-[80px] rounded-[5px] px-[5px] text-[14px] border outline-none'
                        type="number"
                        value={postJobData?.expireCriteria?.numberOfApplicants || 0}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          handleInputChange('numberOfApplicants', value > 0 ? value : '');
                        }}
                      />
                      <p className='text-[15px]'>applicants</p>
                    </span>
                    {console.log(postJobData?.status != 'draft', "clone1", (postJobData?.expireCriteria?.numberOfApplicants == '' || postJobData?.expireCriteria?.numberOfApplicants == undefined), 2, submitCheck)}
                    {postJobData?.status != 'draft' && (postJobData?.expireCriteria?.numberOfApplicants == '' || postJobData?.expireCriteria?.numberOfApplicants == undefined) && submitCheck && <p className='text-[red] text-[13px]'>Number Of Applicants is required</p>}
                  </div>
                  :
                  <div>
                    <span className='pt-[20px] flex flex-wrap items-center gap-[8px]'>
                      <p className='text-[15px]'>When should you stop receiving applications on:</p>
                      <span className='flex gap-[5px]'>
                      <Select
                        // styles={customStyles}
                        styles={{
                          ...customStyles,
                          menuList: (provided) => ({
                            ...provided,
                            maxHeight: '90px',
                          }),
                        }}
                        className="react-select"
                        classNamePrefix="select"
                        options={dateOfDDList}
                        isSearchable
                        name="Day"
                        placeholder="DD"
                        value={dateOfDDList.find((item) => item.value === (postJobData?.expireCriteria?.date?.split('-')[2]?.slice(0, 2) || '')) || null}
                        onChange={(selectedOption) => setFieldValue('fromDay', selectedOption.value)}
                      />
                      <Select
                        // styles={customStyles}
                        styles={{
                          ...customStyles,
                          menuList: (provided) => ({
                            ...provided,
                            maxHeight: '90px',
                          }),
                        }}
                        className="react-select"
                        classNamePrefix="select"
                        options={dateOfMMList}
                        isSearchable
                        name="Month"
                        placeholder="MM"
                        value={dateOfMMList.find((item) => item.value === (postJobData?.expireCriteria?.date?.split('-')[1] || '')) || null}
                        onChange={(selectedOption) => setFieldValue('fromMonth', selectedOption.value)}
                      />
                      <Select
                        // styles={customStyles}
                        styles={{
                          ...customStyles,
                          menuList: (provided) => ({
                            ...provided,
                            maxHeight: '90px',
                          }),
                        }}
                        className="react-select"
                        classNamePrefix="select"
                        options={dateOfYYListUp}
                        isSearchable
                        name="Year"
                        placeholder="YYYY"
                        value={dateOfYYListUp.find((item) => item.value === (postJobData?.expireCriteria?.date?.split('-')[0] || '')) || null}
                        onChange={(selectedOption) => setFieldValue('fromYear', selectedOption.value)}
                      />
                      </span>
                    </span>
                    {

                      postJobData.status != 'draft' && (
                        postJobData?.expireCriteria?.date ?
                          !checkDateValidation(postJobData?.expireCriteria?.date ?? '') : ((postJobData?.expireCriteria?.fromDay == '' || postJobData?.expireCriteria?.fromDay == undefined) || (postJobData?.expireCriteria?.fromMonth == '' || postJobData?.expireCriteria?.fromDay == undefined) || (postJobData?.expireCriteria?.fromYear == '' || postJobData?.expireCriteria?.fromYear == undefined))) && submitCheck && <p className='text-[red] text-[13px]'>date should be valid</p>}

                  </div>

                }
                <span className='mt-[40px] flex-wrap -bg-[blue] flex items-center'>
                  <p className='text-[15px]'>You will be charged 1$ for per application</p>
                  <button className='-absolute -bottom-3 -right-3 ml-[10px] px-[20px] mt-[10px] font-[500] py-[5px] bg-[#FFCB05] text-[14px] rounded-[2px] -min-w-[130px]' onClick={(e) => saveAsdraft(e, false)} name={"published"} > {loading ? <span className="loading"></span> : "Publish"}</button>
                </span>
              </div>
            </div>
          </div>

        </div>
        {/* jobs,modal, setModal */}
        <PreviewModal modal={modal} setModal={setModal} data={postJobData} />
      </div>
    </>
  );
}
export default JobPost;