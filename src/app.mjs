// app.mjs
// Copyright (c) 2024 Ishan Pranav
// Licensed under the MIT license.

import './config.mjs'; // first

import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Question } from './db.mjs';

const rootDirectory = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.static(join(rootDirectory, '..', 'public')));

app.post('/questions', async (request, response) => {
    try {
        const added = new Question({
            question: request.body.question,
            answers: []
        });

        await added.save();

        response.json(added);
    } catch (ex) {
        console.error(ex);
        response.status(500).json({ error: "Failed to add question" });
    }
});

app.post('/questions/:id/answers', async (request, response) => {
    const update = { '$push': { answers: request.body.answer } };

    try {
        const command = {
            'new': true
        };

        await Question.findByIdAndUpdate(
            request.params.id,
            update,
            command);

        response.json({ success: "Added an answer" });
    } catch (ex) {
        console.error(ex);
        response.status(500).json({ error: "Failed to add answer" });
    }
});

app.get('/questions', async (request, response) => {
    response.json(await Question.find());
});

const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Server is listening on ${port}`) });
