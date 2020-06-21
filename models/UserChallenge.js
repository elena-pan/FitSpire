const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userChallengeSchema = new Schema({
    user: {type: Object, required: true},
    challenge: {type: String, required: true},
    completed: {type: Boolean, required: true}
});

const UserChallenge = mongoose.model('UserChallenge', userChallengeSchema);

module.exports = UserChallenge;