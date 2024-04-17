// db.mjs
// Copyright (c) 2024 Ishan Pranav
// Licensed under the MIT license.

import mongoose from 'mongoose';

console.log("connecting to database", process.env.DSN);
mongoose.connect(process.env.DSN);

export const Question = mongoose.model("Questions", new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answers: [String]
}));
