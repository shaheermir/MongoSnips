const assert = require('assert')
const User = require('../src/user')

describe('Reading users from the database', () => {
  let alex, joe, maria, zach

  beforeEach(done => {
    alex = new User({ name: 'Alex' })
    joe = new User({ name: 'Joe' })
    maria = new User({ name: 'Maria' })
    zach = new User({ name: 'Zach' })

    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
      .then(() => done())
  })

  it('Finds all users with a name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString())
        done()
      })
  })

  it('Find a user with a perticular id', (done) => {
    User.findOne({ _id: joe._id })
      .then(user => {
        assert(user.name === 'Joe')
        done()
      })
  })

  it('Can skip and limit the result set', done => {
    // - Alex(Skipped), [Joe, Maria], Zach(Excluded due to limit)
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        assert(users[0].name === 'Joe')
        assert(users[1].name === 'Maria')
        done()
      })
  })
})
