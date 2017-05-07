const mongoose = require('mongoose')

mongoose.Promise = global.Promise

before((done) => {
  mongoose.connect('mongodb://localhost/users_test')
  mongoose.connection
    .once('open', () => {
      console.log('Connected to DB')
      done()
    })
    .on('error', (err) => {
      console.log('Error', err)
    })
})

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    // console.log('Emptied the database.')
    done()
  })
})
