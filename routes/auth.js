/**
 * User routes / Auth
 * host + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { signUp, userLogin, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

router.post(
    '/new', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({min: 6}),
        fieldValidator
    ], 
    signUp
);

router.post(
    '/', 
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({min: 6}),
        fieldValidator
    ],
    userLogin
);

router.get('/renew', validateJWT, renewToken);

module.exports = router;