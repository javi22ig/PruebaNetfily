import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  nameProduct: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  descriptionPost: {
    type: String,
    maxlength: 500,
    default: '',
  },
  locationPost: {
    type: String,
    required: false,
    default: 'my city',
  },
  imgPost: {
    type: String,
    trim: true,
    default: 'IMG',
  },
  changeBy: {
    type: String,
    trim: true,
    maxlength: 200,
    default: '',
  },
  dateCreateProduct: {
    type: Date,
    trim: true,
  },
  createBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required:[true, 'Please provide user']
  }

},{timestamps: true

})


export default mongoose.model('Post', PostSchema)