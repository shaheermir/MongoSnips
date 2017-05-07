const mongoose = require('mongoose')
const PostSchema = require('./post')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    }
  },
  posts: [PostSchema],
  likes: Number
})

UserSchema.virtual('postCount').get(function () {
  return this.posts.length
})

/* First param is the name of the colletion
 * if it doesnt exist, mongoose will
 * create one for us.
 */
const User = mongoose.model('user', UserSchema)

module.exports = User
