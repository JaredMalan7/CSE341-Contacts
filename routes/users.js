const express = require('express')
const router = express.Router()

const userController = require('../controllers/users')

router.get('/', userController.getAll)
router.get('/:id', userController.getSingle)
//router.post('/users', userController.createUser)

module.exports = router