const assert = require('assert')
const User = require('../src/user')

describe('Deleting a user', () => {
  let joe

  beforeEach((done) => {
    joe = new User({name: 'Joe'})
    joe.save()
      .then(() => done())
  })

  it('Model Instance Remove', (done) => {
    joe.remove()
      .then(() => User.findOne({ _id: joe._id }))
      .then(user => {
        assert(user === null)
        done()
      })
  })

  it('Class Method Remove', (done) => {
    // Remove a buncha records with a given criteria.
    User.remove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null)
        done()
      })
  })

  it('Class Method findAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null)
        done()
      })
  })

  it('Class Method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ _id: joe._id }))
      .then(user => {
        assert(user === null)
        done()
      })
  })
})
