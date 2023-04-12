
const { Thought, User } = require('../models');


const thoughtController = {


    getAllThoughts(req, res) {
        Thought.find()
        .sort({ createdAt: -1 })
        .then((dbThoughtData) => {
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: "There isn't a thought with that ID :("});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    createSingleThought(req, res) {
        Thought.create(req.body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "There isn't a thought with that ID :("})
            }

            res.json({ message: 'Your thought has been created!' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    updateSingleThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body}, {runValidators: true, new: true })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: "There isn't a thought with with ID :("});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteSingleThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: "There isn't a thought with this ID :("});
            }
            return User.findOneAndUpdate( 
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "There isn't a thought with this ID :("});
            }
            res.json({ message: 'Your thought??? its gone off the face earth. your welcome :) '});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    addSingleThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reaction: req.body }},
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: "There isn't a thought with this ID :("});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    removeSingleReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: {reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: "There isn't a thought with this ID"});
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};


module.exports = thoughtController;