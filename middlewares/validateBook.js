const {body,validationResult } =require('express-validator')


 const bookValidationRules = [
  body('id').isInt().withMessage('ID must be in integer'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('author').trim().notEmpty().withMessage('Author is Required'),
  body('publishedYear').isInt({min:0}).withMessage('Published Year must be Integer')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  bookValidationRules,
  validate
};