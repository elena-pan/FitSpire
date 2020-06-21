const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
    challenge: { type: String, required: true, unique: true }
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;