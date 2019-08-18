// Express Router
const router = require('express').Router()

// Firebase
const firebase = require('../../utils/firebase')

// Middlewares
const rules = require('../../middleware/rule.middleware')
router.use(rules)

router.put('/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = await firebase.createUser({ name, email, password })
    res.json({user})
  } catch (error) {
    res.status(403).json({error})
  }
})

module.exports = router
