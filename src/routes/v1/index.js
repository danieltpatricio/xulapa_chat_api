// Express Router
const router = require('express').Router()

// Routes
const supportRoute = require('./support.route')

// Routing
router.use('/support', supportRoute)

module.exports = router
