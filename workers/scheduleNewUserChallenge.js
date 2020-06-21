const schedule = require('node-schedule');
const UserChallenge = require('../models/UserChallenge');
const Challenge = require('../models/Challenge');

const scheduleNewUserChallenge = (user, date) => {
    const scheduled = schedule.scheduleJob(date, function(){
        Challenge.find()
            .then(challenges => {
                // Get random challenge
                const index = Math.floor(Math.random() * (challenges.length));
                const challenge = challenges[index];

                // Delete past challenges of user
                UserChallenge.deleteMany({ user: user })
                    .then(() => {
                        const NEW_USERCHALLENGE = new UserChallenge({
                            user: user,
                            challenge: challenge.challenge,
                            completed: false
                        });
                    
                        NEW_USERCHALLENGE.save()
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err))
            
            })
            .catch(err => console.log(err));
    });
}

module.exports = scheduleNewUserChallenge;