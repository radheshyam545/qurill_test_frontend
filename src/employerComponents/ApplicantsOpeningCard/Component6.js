import React from 'react';
import { addquestion } from '../../pages/employerProtected/JobConsts';

function Component6({ selectedApplicantData = {}, checkShowHideQuestion = [] }) {
  const { questions = {} } = selectedApplicantData;
console.log(questions)
  // Filter and map the questions based on checkShowHideQuestion
  const filteredQuestions = checkShowHideQuestion
    .filter(key => questions[key] !== '') // Ensure that the question has a non-empty answer
    .map(key => {
      const questionText = addquestion[key] || 'Question not found';
      const answerText = questions[key] || 'No answer provided';
      return { key, questionText, answerText };
    });

  return (
    <div className='border border-[#919191] px-[20px] py-[20px] rounded-[12px] border-[2px] mt-[20px]'>
          <p className='font-[700] text-[17px] text-[#1E1E1E]'>Application questions</p>
      {filteredQuestions.length === 0 ? (
        <p>No questions available.</p> // Handle the case where there are no filtered questions
      ) : (
        filteredQuestions.map(({ key, questionText, answerText }) => (
          <div key={key} className='border-b py-[20px] mb-[5px] -border-b-[#4E4E4E]'>
            <p className='text-[15px] font-[400]'>{questionText}</p>
            <p className='pl-[10px] text-[#9c9292] text-[15px] mt-[5px]'>{answerText}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Component6;
