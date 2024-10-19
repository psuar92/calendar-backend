/**
 * Event routes
 * /api/events
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { validateJWT } = require('../middlewares/jwt-validator');
const { fieldValidator } = require('../middlewares/field-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// All routes go through JWT validator

router.use(validateJWT);

// Get events

router.get('/', getEvents);

// Create new event

router.post(
    '/', 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        fieldValidator
    ],
    createEvent);

// Update event

router.put(
    '/:id', 
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        fieldValidator
    ],
    updateEvent);

// Delete event

router.delete('/:id', deleteEvent);

module.exports = router;