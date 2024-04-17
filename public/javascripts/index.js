// index.js
// Copyright (c) 2024 Ishan Pranav
// Licensed under the MIT license.

function createElement(type, attrs, ...children) {
    const ele = document.createElement(type);

    // add element attributes
    for (const prop in attrs) {
        if (attrs.hasOwnProperty(prop)) {
            ele.setAttribute(prop, attrs[prop]);
        }
    }

    // add child nodes to element
    children.forEach(c => ele.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));

    return ele;
}

let questionModal;

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

async function onDOMContentLoaded() {
    try {
        const response = await fetch('/questions');

        console.log(await response.json());
    } catch (err) {
        console.log(err);
    }

    const createQuestionButton = document.getElementById('create-question');
    const showQuestionModalButton =
        document.getElementById('btn-show-modal-question');

    createQuestionButton.addEventListener('click', onCreateQuestionButtonClick);
    showQuestionModalButton.addEventListener(
        'click',
        onShowQuestionModalButtonClick);

    questionModal = document.getElementById('modal-question');
}

function onShowQuestionModalButtonClick() {
    questionModal.showModal();
}

async function onCreateQuestionButtonClick() {
    try {
        const questionTextBox = document.getElementById('question-text');

        console.log(questionTextBox.value);

        await fetch('/questions', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: questionTextBox.value
            })
        });
    } catch (err) {
        console.log(err);
    }

    questionModal.close();
}
