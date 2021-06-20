import mongoose from "mongoose";
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

    await PostMessage.findByIdAndUpdate(
        _id,
        { ...post, _id },
        { new: true }
    ).then((updatedPost) => res.status(200).json(updatedPost));
};

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No Post with that id");

    await PostMessage.findByIdAndRemove(_id).then(() =>
        res.status(204).json("Deleted post with that id")
    );
};

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!req.userId) return res.status(401);

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No Post with that id");

    if (post.likes)
        await PostMessage.findById(_id).then(async (post) => {
            post.likes.findIndex((id) => id === String(req.userId)) === -1
                ? (post.likes = post.likes.push(req.userId))
                : (post.likes = post.likes.filter(
                      (id) => id !== String(req.userId)
                  ));

            await PostMessage.findByIdAndUpdate(_id, post, { new: true }).then(
                (updatedPost) => res.status(200).json(updatedPost)
            );
        });
};
