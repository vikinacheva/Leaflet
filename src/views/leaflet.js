// Gets random questions from database
// creates leaflet
// manages buttons visibility and classes
// shows correct and wrong answer
// exports final score for the leaflet

import { getQuestionsList, increaseScore } from '../api/data.js';
import { html, render } from '../lib.js';
import { gotoResult } from '../redirects.js';

// gets the place for rendering all the content
const main = document.getElementById('main');

// the template for every leaflet
// takes functions to control buttons classes and visibility
const questionTemplate = (
    question,
    markChoice,
    checkResult,
    nextQuestion,
    gotoResult
) =>
    html`
        <h2 class="question">${question.question}</h2>

        <button @click=${markChoice} class="option">${question.option1}</button>
        <button @click=${markChoice} class="option">${question.option2}</button>
        <button @click=${markChoice} class="option">${question.option3}</button>
        <br />
        <br>
        <button @click=${checkResult} id="checkBtn" disabled>
            Check Answer
        </button>
        ${getQuestionsList().length !== 1
            ? html`<button id="nextBtn" @click=${nextQuestion} disabled>
                  <span>Next</span>
              </button>`
            : html`<button id="finishBtn" @click=${gotoResult} disabled>
                  <span>Finish</span>
              </button>`}
    `;

// function to render the template
export function showLeaflet() {
    render(
        questionTemplate(
            getQuestionsList()[0],
            markChoice,
            checkResult,
            nextQuestion,
            gotoResult
        ),
        main
    );
}

// removes the current question from the list
// lowers the total count
// makes every 'option button' and 'nextBtn' visible again
// renders next leaflet
function nextQuestion() {
    getQuestionsList().shift();
    main.querySelectorAll('.option').forEach((element) => {
        element.classList.remove('selected', 'wrong', 'correct');
        element.disabled = false;
    });
    main.querySelector('#nextBtn').disabled = true;
    showLeaflet();
}

//controls the select class for the buttons and checkBtn Visibility
// if a button is clicked, mark it with class 'selected'
// if a button is already selected, and another one is pressed, give the selected class to the new one, and remove it from the old one
// if a button is selected, and you click the same button again, it deselects
// if there is a selected option, checkBtn is visible, otherwise it's not
function markChoice(event) {
    const aBtn = event.target;

    checkIfAnyChoiceIsSelected(aBtn);

    const checkBtn = document.getElementById('checkBtn');
    //if current button contains 'selected', remove 'select' and disable checkBtn
    if (aBtn.classList.contains('selected')) {
        aBtn.classList.remove('selected');
        checkBtn.disabled = true;
    } else {
        //else add select and enable checkBtn
        aBtn.classList.add('selected');
        checkBtn.disabled = false;
    }
}

// iterates trough all the options and removes the 'selected' class from every button except the currently pressed one
function checkIfAnyChoiceIsSelected(button) {
    main.querySelectorAll('.option').forEach((element) => {
        if (element.classList.contains('selected') && element != button) {
            element.classList.remove('selected');
        }
    });
}

// iterates trough all the options and searches for the correct one, returns the correct option button
function getCorrectAnswer() {
    let correctBtn = undefined;
    main.querySelectorAll('.option').forEach((element) => {
        if (element.textContent == getQuestionsList()[0].correct) {
            correctBtn = element;
        }
    });
    return correctBtn;
}

// checks if the selected option is the correct one
// if it is, add 1 to the overall score, and mark the selected option with class 'correct'
// else mark the selected option with class 'wrong', get the correct option, and mark it with class 'correct'
// correct btn visibility at the end
function checkResult() {
    // things to do!
    const selectedOption = document.querySelector('.selected');
    if (selectedOption.textContent == getQuestionsList()[0].correct) {
        selectedOption.classList.add('correct');
        increaseScore();
    } else {
        selectedOption.classList.add('wrong');
        getCorrectAnswer().classList.add('correct');
    }
    disableOptionBtnsAndEnableNextOrFinish();
}

//controls the visibility of option, next and finish buttons
//if the current question is the last one, enable finishBtn, otherwise enable nextBtn
// disable every optionBtn
function disableOptionBtnsAndEnableNextOrFinish() {
    //things to do!
    main.querySelectorAll('.option').forEach((element) => {
        element.disabled = true; // can add class and change color of option buttons
    });

    if (getQuestionsList().length !== 1) {
        document.getElementById('nextBtn').disabled = false;
    } else {
        document.getElementById('finishBtn').disabled = false;
    }

    document.getElementById('checkBtn').disabled = true;
    // can change color by adding class to the buttons here
}