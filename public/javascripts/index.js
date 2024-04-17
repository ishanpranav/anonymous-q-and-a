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

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

async function onDOMContentLoaded() {
    try {
        response = await fetch('/questions');
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
}

function onShowQuestionModalButtonClick() {
    const questionModal = document.getElementById('modal-question');

    questionModal.showModal();
}

function onCreateQuestionButtonClick() {
    
}
