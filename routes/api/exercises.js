const router = require('express').Router();
const passport = require("passport");
let Exercise = require('../../models/Exercise');

// @route GET api/exercises
// @desc Get all logged exercises for a specific user
// @access Private

const validateExercise = require("../../validation/validateExercise");

router.get("/",
  passport.authenticate("jwt", { session: false }),
  async(req, res) => {

    const USER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    // Find all logged exercises of a user
    await Exercise.find({ user: USER })
      .then(exercises => {
        res.json(exercises);
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route POST api/exercises/add
// @desc Log new exercise
// @access Private

router.post('/add',
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // Form validation
    const { errors, isValid } = validateExercise(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
   
    const USER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };
    
    
    const NEW_EXERCISE = await new Exercise({
      user: USER,
      exercise: req.body.exercise,
      start: Date.parse(req.body.start),
      end: Date.parse(req.body.end),
      duration: Number((new Date(req.body.end).getTime() - new Date(req.body.start).getTime())/(1000*60)) // in minutes
    });

    NEW_EXERCISE.save()
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json(err));
  }
);

// @route GET api/exercises/:id
// @desc Get specific logged exercise by id
// @access Private

router.get('/:id',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json(err));
  }
);

// @route DELETE api/exercises/:id
// @desc Delete an exercise log
// @access Private

router.delete('/:id',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json({ success: true }))
      .catch(err => res.status(400).json(err));
  }
);

// @route POST api/exercises/update/:id
// @desc Update an exercise log
// @access Private
  
router.post('/update/:id',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => {
        const { errors, isValid } = validateExercise(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
      
        const USER = {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email
        };
        
        exercise.user = USER;
        exercise.exercise = req.body.exercise;
        exercise.start = Date.parse(req.body.start);
        exercise.end = Date.parse(req.body.end);
        exercise.duration = Number((new Date(req.body.end).getTime() - new Date(req.body.start).getTime())/(1000*60)); // in minutes
  
        exercise.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json(err));
      })
      .catch(err => res.status(400).json(err));
    }
);

module.exports = router;