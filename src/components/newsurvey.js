import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import StepSelector from './stepselector';

//styles
import Breadcrumb from 'react-bootstrap/Breadcrumb';

//icons
import { Icon } from '@iconify/react';
import pencilIcon from '@iconify/icons-mdi/pencil';
import plusCircleFilled from '@iconify/icons-ant-design/plus-circle-filled';
import { CgToggleOff, CgToggleOn } from 'react-icons/cg';
import checkboxIcon from '@iconify/icons-carbon/checkbox';
import xIcon from '@iconify/icons-bi/x';
import checkboxBlankCircleOutline from '@iconify/icons-mdi/checkbox-blank-circle-outline';


const inputsValueDefault = 'Nova anketa';

const NewSurvey = () => {
    const [inputsValue, setValue] = useState('');
    const [questions, setQuestions] = useState(['']);
    const [answers, setAnswers] = useState(['']);
    const [isMultipleChoices, setIsMultipleChoices ] = useState(false);
    const [optionOther, setOptionOther ] = useState(false);
    const [isRequired, setIsRequired ] = useState(false);
 
    function onInputHandler(event) {
      setValue(event.target.value)
    }

    return (
  <>
    <nav>
      <Breadcrumb>
      <Breadcrumb.Item><Link to='/'>Ankete</Link></Breadcrumb.Item>
      <Breadcrumb.Item active>{inputsValue || inputsValueDefault}</Breadcrumb.Item>
      </Breadcrumb>
    </nav>

     <StepSelector />

    <div className='container'>
   
      <form>
       
        <div className='headerWrapper'>
          <label>
            <input type="text" placeholder='Nova anketa' value={inputsValue} onInput={onInputHandler} className='surveyHeader'/>
            <Icon className='hoverIcon' icon={pencilIcon} style={{color: '#aaaaaa', fontSize: '28px', boxShadow:'1px 1px 2px 1px rgba(206, 203, 203, 0.2)'}}/>
          </label>
        </div>

        {
        questions.map( (question, index) => (
            <label className='questionWrapper'>
              <span className='questionNumber'>{index + 1}.</span>
              <input 
                type="text"
                placeholder={`Pitanje ${index + 1}`} 
                className='question'
                onInput={(event) => setQuestions( (prevQuestions) => prevQuestions.map( (question, innerIndex) => {
                  if (innerIndex === index) {
                    question = event.target.value
                  }

                  return question;
                }))}
                value={question}>
              </input>
              <Icon icon={pencilIcon} className='hoverIcon' style={{color: '#aaaaaa', fontSize: '28px', boxShadow:'1px 1px 2px 1px rgba(206, 203, 203, 0.2)'}}/>
            </label>
          ))
        } 
        
        <div className='answersWrapper'>
          {
            answers.map( (answer, index) => (
              <label className='answerWrapper'>
                  {
                 isMultipleChoices         
                 ?    <Icon icon={checkboxBlankCircleOutline} className='circle' style={{color: '#e2dfdf', fontSize: '32px'}} />
                 :    <Icon icon={checkboxIcon} className='square' style={{color: '#e2dfdf', fontSize: '32px'}} />
               }
                  
                  <input 
                    type="text" 
                    placeholder={`Odgovor ${index+1}`} 
                    className='answer' 
                    onInput={(event) => setAnswers( (prevAnswers) => [...prevAnswers.slice(0, index), event.target.value, ...prevAnswers.slice(index + 1)])}
                    value={answer}
                  />
                  <Icon icon={xIcon} style={{color: '#6c757d', fontSize: '32px', cursor:'pointer'}} onClick={(event) => setAnswers( (prevAnswers) => [...prevAnswers.slice(1)])} />
                  <Icon icon={pencilIcon} className='hoverIcon' style={{color: '#aaaaaa', fontSize: '28px', boxShadow:'1px 1px 2px 1px rgba(206, 203, 203, 0.2)'}}/>
              </label>
              ))
          }

        <div className='addButtons'>
          <span><Icon icon={plusCircleFilled} className='addAnswer' style={{color: '#FFD954', fontSize: '32px'}} onClick={() => setAnswers( (prevAnswers) => [...prevAnswers, ''])}></Icon>&nbsp;&nbsp;Dodaj odgovor</span>
          
          <span onClick={() => setOptionOther(  (prevState) => !prevState)}>
            {
            optionOther
            ?   <Icon icon={plusCircleFilled} style={{color: '#FFD954', fontSize: '32px', cursor:'pointer'}}></Icon>
            :   <Icon icon={plusCircleFilled} style={{color: '#e2dfdf', fontSize: '32px', cursor:'pointer'}}></Icon>
            }

        &nbsp;&nbsp;Dodaj opciju "Drugo"
          </span>
        </div>


          <div className='toggleButtons'>
             <span onClick={() => setIsMultipleChoices( (prevState) => !prevState)}>
               {
                 isMultipleChoices         
                 ?   <CgToggleOn className='toggleOn' style={{color: '#FFD954', fontSize: '40px', cursor:'pointer'}} />
                 :   <CgToggleOff className='toggleOff' style={{color: '#FFD954', fontSize: '40px', cursor:'pointer'}} /> 
               }

                  &nbsp;&nbsp;Višestruki odabir
              </span>
          </div>

        </div>
      
        <hr/>

        <div className='itemsBelow'>
          <span onClick={() => setIsRequired( (prevState) => !prevState)}>
          {
            isRequired 
            ?   <CgToggleOff className='toggleOff' style={{color: '#FFD954', fontSize: '40px', border:'aaaaaa', cursor:'pointer'}} />
            :   <CgToggleOn className='toggleOn' style={{color: '#FFD954', fontSize: '40px', cursor:'pointer'}} /> 
          }
            &nbsp;&nbsp;Obavezan odgovor
          </span>
        

          <div className='dismissSave'>
            <span>Odustani</span>
            <span>Spremi</span>
          </div>

        </div>
      </form>

    </div>
  </>
    )
}

export default NewSurvey