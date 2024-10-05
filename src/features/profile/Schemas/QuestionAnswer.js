import React, { useState, useEffect } from 'react';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import QuestionComponent from './QuestionComponent';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { notifyError, notifySuccess } from '../../../app/toaster';
import { useSelector, useDispatch } from 'react-redux'
import { postProfileData } from '../profileSlice';


function QuestionAnswer() {
    const dispatch = useDispatch()
    const [collapse1, setCollapse1] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const { profilePagesData } = useSelector(state => state.profile)
    const { questions } = profilePagesData
    const [getData, setGetData] = useState(questions)

    console.log("abcd")



    useEffect(() => {
        if (getData) {
            formik.setValues(getData);
            setIsUpdate(true);
        }
    }, [questions, isUpdate])

    const toggleCollapse = (collapseNumber) => {
        switch (collapseNumber) {
            case 1:
                setCollapse1(!collapse1)
                break
            default:
                break
        }
    };

    const validationSchema = Yup.object({
        // interest_in_position: Yup.string().required('This field is required'),
        // good_fit_reason: Yup.string().required('This field is required'),
        // experience_qualifications: Yup.string().required('This field is required'),
        // career_goals: Yup.string().required('This field is required'),
        // challenging_situation: Yup.string().required('This field is required'),
        // work_motivation: Yup.string().required('This field is required'),
        // teamwork_experience: Yup.string().required('This field is required'),
        // stress_handling: Yup.string().required('This field is required'),
        // greatest_achievements: Yup.string().required('This field is required'),
        // unique_qualities: Yup.string().required('This field is required'),
        // learning_experience: Yup.string().required('This field is required'),
        // team_conflict_resolution: Yup.string().required('This field is required'),
    });




    const formik = useFormik({
        initialValues: {
            interest_in_position: "",
            good_fit_reason: "",
            experience_qualifications: "",
            career_goals: "",
            challenging_situation: "",
            work_motivation: "",
            teamwork_experience: "",
            stress_handling: "",
            greatest_achievements: "",
            unique_qualities: "",
            learning_experience: "",
            team_conflict_resolution: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setTimeout(() => {
                try {
                    dispatch(postProfileData({ questions: values })).unwrap().then(() => {
                        notifySuccess('Question/Answer Update Successfully');
                        setIsUpdate(true);
                        formik.setValues(values);
                    });
                } catch (e) {
                    console.log('error profile', e);
                }
                setLoading(false);
            }, 500);
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="section-1 mb-10">
                    <h4 onClick={() => toggleCollapse(1)} className="flex items-center justify-between cursor-pointer py-[7px] px-[20px] rounded-[5px] bg-[#D8D7D7] -hover-effect border border-[#D8D7D7] border-[2px] duration-[0.3s] font-semibold text-[15px] mb-3">
                        Question
                        <ChevronDownIcon className={`transition-all duration-300 ${collapse1 ? 'rotate-180' : ''} w-[23px]`} />
                    </h4>
                    <div className={`transition-all duration-300 ${collapse1 ? 'show' : 'hidden'}`}>
                        <QuestionComponent
                            question="Why are you interested in this position?*"
                            name="interest_in_position"
                            value={formik.values.interest_in_position}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.interest_in_position && formik.errors.interest_in_position}
                        />
                        <QuestionComponent
                            question="What makes you a good fit for this role?*"
                            name="good_fit_reason"
                            value={formik.values.good_fit_reason}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.good_fit_reason && formik.errors.good_fit_reason}
                        />
                        <QuestionComponent
                            question="Describe your relevant experience and qualifications?*"
                            name="experience_qualifications"
                            value={formik.values.experience_qualifications}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.experience_qualifications && formik.errors.experience_qualifications}
                        />
                        <QuestionComponent
                            question="What are your career goals and how does this position align with them?*"
                            name="career_goals"
                            value={formik.values.career_goals}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.career_goals && formik.errors.career_goals}
                        />
                        <QuestionComponent
                            question="Tell us about a challenging situation you faced at work and how you resolved it?*"
                            name="challenging_situation"
                            value={formik.values.challenging_situation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.challenging_situation && formik.errors.challenging_situation}
                        />
                        <QuestionComponent
                            question="What motivates you in your work?*"
                            name="work_motivation"
                            value={formik.values.work_motivation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.work_motivation && formik.errors.work_motivation}
                        />
                        <QuestionComponent
                            question="Describe a time when you had to work collaboratively as part of a team?*"
                            name="teamwork_experience"
                            value={formik.values.teamwork_experience}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.teamwork_experience && formik.errors.teamwork_experience}
                        />
                        <QuestionComponent
                            question="How do you handle stress and pressure in the workplace?*"
                            name="stress_handling"
                            value={formik.values.stress_handling}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.stress_handling && formik.errors.stress_handling}
                        />
                        <QuestionComponent
                            question="What are your greatest achievements?*"
                            name="greatest_achievements"
                            value={formik.values.greatest_achievements}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.greatest_achievements && formik.errors.greatest_achievements}
                        />
                        <QuestionComponent
                            question="What sets you apart from other candidates applying for this position?*"
                            name="unique_qualities"
                            value={formik.values.unique_qualities}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.unique_qualities && formik.errors.unique_qualities}
                        />
                        <QuestionComponent
                            question="What have you learned from your previous work experience?*"
                            name="learning_experience"
                            value={formik.values.learning_experience}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.learning_experience && formik.errors.learning_experience}
                        />
                        <QuestionComponent
                            question="Give an example of a time you resolved a team conflict?*"
                            name="team_conflict_resolution"
                            value={formik.values.team_conflict_resolution}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.team_conflict_resolution && formik.errors.team_conflict_resolution}
                        />
                        {/* <QuestionComponent
                            question="What percentage of the time are you willing to travel for work?*"
                            name="WILLING_TO_TRAVEL"
                            value={formik.values.WILLING_TO_TRAVEL}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.WILLING_TO_TRAVEL && formik.errors.WILLING_TO_TRAVEL}
                        /> */}
                        <div className="text-end mt-[20px]">
                            <button type="submit" className="font-medium bg-[#FFCB05] px-[40px] text-[15px] rounded-[0px] py-[8px] border-0">
                                {loading ? <span className="loading"></span> : isUpdate ? 'Update' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default QuestionAnswer;
