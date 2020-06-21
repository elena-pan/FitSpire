const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    user: {type: Object, required: true},
    exercise: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    duration: {type: Number, required: true}, // in minutes
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;