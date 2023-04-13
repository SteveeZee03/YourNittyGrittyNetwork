
const { User, Thought } = require('../models');


const userController = {


    getUsers(req, res) {
        User.find()
        .select('-__v')
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')
        .populate('thoughts')
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "User not found :("});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    createSingleUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    updateSingleUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true,
            }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "User not found :("})
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteSingleUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "User not found :("});
            }

            return Thought.deleteMany({ _id: { $in: dbUserData.thoughts }});
        })
        .then(() => {
            res.json({ message: "User and thoughts deleted. :)"});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    addSingleFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId}, { $addToSet: { friends: req.params.friendId }}, { new: true })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "User not found. :("});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    removeSingleFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId }}, { new: true })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "User not found. :(" });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};


module.exports = userController;