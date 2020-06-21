// Changes to database of challenges

const router = require('express').Router();
let Challenge = require('../../models/Challenge');

// @route GET api/challenges
// @desc Get all challenges
router.get("/", async(req, res) => {
    await Challenge.find()
      .then(challenges => res.json(challenges))
      .catch(err => res.status(400).json(err));
  }
);

// @route GET api/challenges/:id
// @desc Get specific challenge by id
router.get('/:id', (req, res) => {
    Challenge.findById(req.params.id)
      .then(challenge => res.json(challenge))
      .catch(err => res.status(400).json(err));
  }
);

// @route POST api/challenges/add
// @desc Add challenge to database

router.post('/add', async (req, res) => {
    
    if (!req.body.challenge) {
        return res.status(400).json("Cannot be empty or undefined")
    }
    else if (!req.body.challenge.trim()) {
        return res.status(400).json("Cannot be only spaces")
    }
    
    const NEW_CHALLENGE = await new Challenge({
      challenge: req.body.challenge.trim()
    });

    NEW_CHALLENGE.save()
      .then(challenge => res.json(challenge))
      .catch(err => res.status(400).json(err));
  }
);



// @route DELETE api/challenges/:id
// @desc Delete a challenge

router.delete('/:id', (req, res) => {
    Challenge.findByIdAndDelete(req.params.id)
      .then(() => res.json({ success: true }))
      .catch(err => res.status(400).json(err));
  }
);

// @route POST api/challenges/update/:id
// @desc Update a challenge
  
router.post('/update/:id', (req, res) => {
    Challenge.findById(req.params.id)
      .then(challenge => {
        if (!req.body.challenge) {
            return res.status(400).json("Cannot be empty or undefined")
        }
        else if (!req.body.challenge.trim()) {
            return res.status(400).json("Cannot be only spaces")
        }
      
        challenge.challenge = req.body.challenge;
        challenge.save()
          .then(() => res.json('Challenge updated!'))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
    }
);

module.exports = router;