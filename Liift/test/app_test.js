const assert = require('assert')
const request = require('supertest')
const app = require('../app')

describe('The Express App', () => {
  it('Handles a GET request to /api', done => {
    request(app)
      .get('/api')
      .end((err, resp) => {
        assert(resp.body.hi === 'there')
        done()
      })
  })
})
