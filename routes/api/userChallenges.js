const router = require('express').Router();
const passport = require("passport");
const UserChallenge = require('../../models/UserChallenge');
const Challenge = require('../../models/Challenge');

const scheduleNewUserChallenge = require("../../workers/scheduleNewUserChallenge");

// @route GET api/user-challenges
// @desc Get all challenges for a specific user
// @access Private

router.get("/",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    const USER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    // Find all logged exercises of a user
    await UserChallenge.find({ user: USER })
      .then(userChallenges => {
        res.json(userChallenges);
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route GET api/user-challenges/new
// @desc Get new challenge
// @access Private

router.get('/new',
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    
    // Get next challenge from database
    await Challenge.find()
      .then(challenges => {

        // Get random challenge
        const index = Math.floor(Math.random() * (challenges.length));
        const challenge = challenges[index];

        const USER = {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email
        };

        // Delete past challenges of user
        UserChallenge.deleteMany({ user: USER })
          .then(() => {
            const NEW_USERCHALLENGE = new UserChallenge({
              user: USER,
              challenge: challenge.challenge,
              completed: false
            });
        
            NEW_USERCHALLENGE.save()
              .then(userChallenge => res.json(userChallenge))
              .catch(err => res.status(400).json(err));
          })
          .catch(err => console.log(err))
      
      })
      .catch(err => res.status(400).json(err));
   
  }
);

// @route DELETE api/user-challenges/:id
// @desc Delete a user challenge
// @access Private

router.delete('/:id',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    UserChallenge.findByIdAndDelete(req.params.id)
      .then(() => res.json({ success: true }))
      .catch(err => res.status(400).json(err));
  }
);

// @route POST api/user-challenges/update/:id
// @desc Update a challenge - completed 
// @access Private
router.post('/update/:id',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    UserChallenge.findById(req.params.id)
      .then(userChallenge => {
        
        userChallenge.completed = req.body.completed;
  
        userChallenge.save()
          .then(() => {
            const USER = {
              id: req.user.id,
              name: req.user.name,
              email: req.user.email
            };
            // Schedule new challenge in 1 day
            scheduleNewUserChallenge(USER, new Date(new Date().setDate(new Date().getDate()+1)));
            res.json(userChallenge)
          })
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
    }
);

module.exports = router;