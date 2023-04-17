
const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createSingleUser,
    updateSingleUser,
    deleteSingleUser,
    addSingleFriend,
    removeSingleFriend,
} = require ('../../controllers/userController');


router.route('/').get(getUsers).post(createSingleUser);
router.route('/:userId').get(getSingleUser).put(updateSingleUser).delete(deleteSingleUser);
router.route('/:userId/friends/:friendId').post(addSingleFriend).delete(removeSingleFriend);


module.exports = router;