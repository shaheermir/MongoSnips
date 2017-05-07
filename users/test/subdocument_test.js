const assert = require('assert')
const User = require('../src/user')

describe('Subdocuments', () => {
  it('Can Create A Sub-Document', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
    })
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts[0].title === 'PostTitle')
        done()
      })
  })

  it('Can Add Subdocuments To An Existing Record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        user.posts.push({ title: 'New Post' })
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts.length === 1)
        assert(user.posts[0].title === 'New Post')
        done()
      })
  })

  it('Can Remove An Existing Subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        const post = user.posts[0]
        post.remove()
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts.length === 0)
        done()
      })
  })
})
