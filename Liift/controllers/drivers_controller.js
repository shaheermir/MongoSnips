const Driver = require('../models/Driver')

module.exports = {
  greeting (req, res) {
    res.json({hi: 'there'})
  },

  index (req, res, next) {
    const { lng, lat } = req.query

    Driver.geoNear(
      { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      { spherical: true, maxDistance: 200000 }
    )
    .then(drivers => res.send(drivers))
    .catch(next)
  },

  create (req, res, next) {
    const driverProps = req.body

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(err => next(err))
  },

  edit (req, res, next) {
    const id = req.params.id
    const driverProps = req.body

    Driver.findByIdAndUpdate(id, driverProps)
      .then(() => Driver.findById(id))
      .then(driver => res.send(driver))
      .catch(next)
  },

  delete (req, res, next) {
    const id = req.params.id
    Driver.findByIdAndRemove(id)
      .then(driver => res.status(204).send(driver))
      .catch(next)
  }
}
