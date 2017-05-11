const Driver = require('../models/Driver')

module.exports = {
  greeting (req, res) {
    res.json({hi: 'there'})
  },

  create (req, res) {
    const driverProps = req.body

    Driver.create(driverProps)
      .then(driver => res.send(driver))
  }
}
