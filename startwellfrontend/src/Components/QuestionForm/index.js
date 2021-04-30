import React, { useState } from 'react';
import TagsInput from 'react-tagsinput';
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';
import 'react-tagsinput/react-tagsinput.css';
import 'react-toastify/dist/ReactToastify.minimal.css'
import 'react-toastify/dist/ReactToastify.css'
import './form.css';

toast.configure();
const QuestionForm = ({ toggleModal, surveyID }) => {
  const [questionForm, setQuestion] = useState({
    options: [],
    question: '',
    questionNo: '',
    image: {},
    weightage: '',
  });
  const inputProps = {
    placeholder: 'Add an option and press enter',
    className: 'question-input',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   // console.log(message);
   // console.log(props.message);
    console.log("*********");
    console.log(surveyID);
    console.log(questionForm.options);
    console.log(questionForm.question);
    console.log(questionForm.weightage);
    console.log("*********");

    axios
    .post('http://206.189.195.166:3200/addQuestionwithOptions', {
      SurveyID:surveyID,
      QuesID: questionForm.questionNo,
      QText: questionForm.question,
      Weights:questionForm.weightage,
      Options:questionForm.options
    })
    .then(response => { 
      if (response.status === 200) {
        toast.success('Your question has been created successfully');
      } else if (response.data.code === 204) {
        console.log('User Status Submission failed with response: ', response);
        toast.error('Error');
      }
    })
    .catch(error => {
      console.log('error occured', error);
      toast.error('Error');
    });

    toggleModal();
  //  toast.success('Your question has been created successfully');
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;

    setQuestion({
      ...questionForm,
      [name]: value,
    });
  };

  const handleTagsChange = (options) => {
    setQuestion({
      ...questionForm,
      options,
    });
  };



  return (
    <form action="" id="question-form" >
    <input
        type="text"
        name="questionNo"
        placeholder="Enter Survey question Number.. "
        onChange={handleInputChange}
        value={questionForm.questionNo}
        className="question-input"
      />

      <input
        type="text"
        name="question"
        placeholder="Enter Survey question...."
        onChange={handleInputChange}
        value={questionForm.question}
        className="question-input"
      />
      <TagsInput
        value={questionForm.options}
        onChange={handleTagsChange}
        maxTags={4}
        inputProps={inputProps}
      />

<input
        type="text"
        name="weightage"
        placeholder="Enter weightage  Number.. "
        onChange={handleInputChange}
        value={questionForm.weightage}
        className="question-input"
      />

   
      

      <div className="submit-area">
        <button className="submit-button" onClick={handleSubmit}>
          Create Question
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;
