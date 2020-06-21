const isEmpty = require("is-empty");

module.exports = function validateExercise(data) {
  let errors = {};

  // Name checks
  if (data.exercise === null || data.exercise === undefined || data.exercise.trim() === "") {
    errors.exercise = "Exercise field is required";
  }

  if (data.start > data.end) {
      errors.dates = "End must be after start";
  }

  if (new Date(data.start).getTime() === new Date(data.end).getTime()) {
      errors.dates = "Start and end cannot be the same";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};