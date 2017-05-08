const assert = require('assert')
const User = require('../src/user')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')

describe('Associations', () => {
  let joe, blogPost, comment

  beforeEach(done => {
    joe = new User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'JS Is Great.', content: 'Yes sir.' })
    comment = new Comment({ content: 'Congrats!' })

    joe.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.user = joe

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    )
  })

  it('Saves a relation between a user and a blogpost.', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'JS Is Great.')
        done()
      })
  })

  it('It saves a full relation tree.', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then(user => {
        assert(user.name === 'Joe')
        assert(user.blogPosts[0].title === 'JS Is Great.')
        assert(user.blogPosts[0].comments[0].content === 'Congrats!')
        assert(user.blogPosts[0].comments[0].user.name === 'Joe')
        done()
      })
  })
})