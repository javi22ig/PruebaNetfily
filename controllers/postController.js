import Post from "../models/Post.js";
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError, UnAuthenticatedError } from '../errors/index.js'

const createPost = async (req, res) => {
    const { locationPost, nameProduct } = req.body

    if (!locationPost || !nameProduct) {
        throw new BadRequestError('Please provide all values')
    }
    req.body.createBy = req.user.userId;

    const post = await Post.create(req.body)
    res.status(StatusCodes.CREATED).json({ post })
}
const deletePost = async (req, res) => {
    const { id: postId } = req.params

    const post = await Post.findOne({ _id: postId })
  
    if (!post) {
      throw new CustomError.NotFoundError(`No post with id : ${postId}`)
    }
  
    await post.remove()
    res.status(StatusCodes.OK).json({ msg: 'Success! post removed' })
}
const getAllPosts = async (req, res) => {

    const posts = await Post.find()

    res
        .status(StatusCodes.OK)
        .json({ posts, totalJobs: posts.length, numOfPages: 1 })
}

const getMyAllPosts = async (req, res) => {

    const posts = await Post.find({ createBy: req.user.userId })

    res
        .status(StatusCodes.OK)
        .json({ posts, totalJobs: posts.length, numOfPages: 1 })
}
const updatePost = async (req, res) => {
    const { id: postId } = req.params

    const { nameProduct, locationPost } = req.body
    if (!nameProduct || !locationPost) {
        throw new BadRequestError('Please Provide All Values')
    }

    const post = await Post.findOne({ _id: postId })

    if (!post) {
        throw new NotFoundError(`No post with id ${postId}`)
    }
    if (req.user.userId !== post.createBy.toString()){
        throw new UnAuthenticatedError('Not authorized to access this route')
    }
    const updatedPost = await Post.findOneAndUpdate({ _id: postId }, req.body, {
        new: true,
        runValidators: true,
    })

    res.status(StatusCodes.OK).json({ updatedPost })
}

export { createPost, deletePost, getAllPosts, updatePost, getMyAllPosts }