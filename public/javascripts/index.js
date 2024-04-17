// index.js
// Copyright (c) 2024 Ishan Pranav
// Licensed under the MIT license.

let questionId;

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

async function onDOMContentLoaded() {
    try {
        const response = await fetch('/questions');

        for (const question of await response.json()) {
            appendQuestion(question);
        }
    } catch (err) {
        console.log(err);
    }

    const createQuestionButton = document.getElementById('create-question');
    const closeQuestionButton = document.getElementById('close-question');
    const createAnswerButton = document.getElementById('create-answer');
    const closeAnswerButton = document.getElementById('close-answer');
    const showQuestionModalButton =
        document.getElementById('btn-show-modal-question');

    createQuestionButton.addEventListener('click', onCreateQuestionButtonClick);
    createAnswerButton.addEventListener('click', onCreateAnswerButtonClick);
    closeQuestionButton.addEventListener('click', onCloseQuestionButtonClick);
    closeAnswerButton.addEventListener('click', onCloseAnswerButtonClick);
    showQuestionModalButton.addEventListener(
        'click',
        onShowQuestionModalButtonClick);
}

function getQuestionModal() {
    return document.getElementById('modal-question');
}

function getAnswerModal() {
    return document.getElementById('modal-answer');
}

function onShowQuestionModalButtonClick() {
    getQuestionModal().showModal();
}

async function onCreateQuestionButtonClick() {
    try {
        const questionTextBox = document.getElementById('question-text');

        console.log(questionTextBox.value);

        let response = await fetch('/questions', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: questionTextBox.value
            })
        });

        response = await response.json();

        appendQuestion(response);
    } catch (err) {
        console.log(err);
    }

    getQuestionModal().close();
}

function onCloseQuestionButtonClick() {
    getQuestionModal().close();
}

function appendQuestion(question) {
    const main = document.getElementById('main');
    const heading = document.createElement('h2');
    const unorderedList = document.createElement('ul');
    const answerButton = document.createElement('input');

    heading.textContent = question.question;
    answerButton.type = 'button';
    answerButton.value = "Add an Answer";

    for (const answer of question.answers) {
        const listItem = document.createElement('li');

        listItem.textContent = answer;

        unorderedList.appendChild(listItem);
    }

    answerButton.id = question._id;
    answerButton.classList.add('button');
    answerButton.classList.add('submit');
    answerButton.addEventListener('click', onAnswerButtonClick);
    main.appendChild(heading);
    main.appendChild(unorderedList);
    main.appendChild(answerButton);
}

function onAnswerButtonClick(e) {
    questionId = e.target.id;

    getAnswerModal().showModal();
}

async function onCreateAnswerButtonClick() {
    try {
        const answerTextBox = document.getElementById('answer-text');

        console.log(answerTextBox.value);

        let response = await fetch(`/questions/${questionId}/answers`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                answer: answerTextBox.value
            })
        });

        response = await response.json();
    } catch (err) {
        console.log(err);
    }

    getAnswerModal().close();
}

function onCloseAnswerButtonClick() {
    getAnswerModal().close();
}
