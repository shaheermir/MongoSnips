const assert = require('assert')
const User = require('../src/user')

describe('Updating records', () => {
  let joe

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 })
    joe.save()
      .then(() => done())
  })

  function assertName (operation, done) {
    operation
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1)
        assert(users[0].name === 'Alex')
        done()
      })
  }

  it('Instance Type Using Set n Save', (done) => {
    joe.set('name', 'Alex')
    assertName(joe.save(), done)
  })

  it('A Model Instance Can Update', (done) => {
    assertName(joe.update({ name: 'Alex' }), done)
  })

  it('A Model Class Can Update', (done) => {
    // Will update all the records that match the given criteria.
    assertName(
      User.update({ name: 'Joe' }, { name: 'Alex' }),
      done
    )
  })

  it('A Model Class Can Update One Record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
      done
    )
  })

  it('A Model Class Can Find A Record With An Id And Update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
      done
    )
  })

  /* Mongo Operators */

  it('Increments A User\'s Post Count By 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.likes === 1)
        done()
      })
  })
})
