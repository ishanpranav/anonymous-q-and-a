// db.mjs
// Copyright (c) 2024 Ishan Pranav
// Licensed under the MIT license.

import { connect, model, Schema } from 'mongoose';

console.log("connecting to database", process.env.DSN);
connect(process.env.DSN);

/** Represents an answerable question. */
export const Question = model("Questions", new Schema({
    question: {
        type: String,
        required: true
    },
    answers: [String]
}));
