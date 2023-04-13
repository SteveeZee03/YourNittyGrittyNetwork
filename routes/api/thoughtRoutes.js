
const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createSingleThought,
    updateSingleThought,
    deleteSingleThought,
    addSingleThought,
    removeSingleReaction,
} = require('../../controllers/thoughtController');


router.route('/').get(getAllThoughts).post(createSingleThought);
router.route('/:thoughtId').get(getSingleThought).put(updateSingleThought).delete(deleteSingleThought);
router.route('/:thoughtId/reactions').post(addSingleThought);
router.route('/:thoughtId/reactions/:reactionId').delete(removeSingleReaction);


module.exports = router;