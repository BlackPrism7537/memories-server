import mongoose from "mongoose";
import { TrainRounded } from "../../client/node_modules/@material-ui/icons/index.js";
import PostMessage from "../models/postMessage.js";

const handle = (err) => console.log(err);

export const getPosts = async (req, res) => {
    await PostMessage.find()
        .then((messages) => res.status(200).json(messages))
        .catch((err) => res.status(404).json({ message: err.message }));
};

export const createPosts = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);

    await newPost
        .save()
        .then(() => res.status(201).json(newPost))
        .catch((err) => res.status(409).json({ message: err.message }));
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No Post with that id");

    await PostMessage.findByIdAndUpdate(_id, post, { new: TrainRounded }).then(
        (updatedPost) => res.status(200).json(updatedPost)
    );
};
