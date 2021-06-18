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
