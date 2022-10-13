const { check, validationResult } = require("express-validator");

exports.createTaskRules = () => [
  check(
    "description",
    "This field should have between 4 and 15 characters"
  ).isLength({ min: 4, max: 15 }),
];

exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.mapped());
  }
  next();
};
