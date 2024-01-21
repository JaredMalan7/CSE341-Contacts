const mongodb = require('../db/database')

const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().db().collection('Contacts').find()
    result.toArray().then((Contacts) => {
        res.setHeader(`Content-Type`, `application/json`)
        res.status(200).json(Contacts)
    })
}
const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = req.params.id
    console.log('Received userId:', userId)

    // Validate if userId has a valid ObjectId format
    const objectIdRegex = /^[0-9a-fA-F]{24}$/
    if (!objectIdRegex.test(userId)) {
        console.log('Invalid ObjectId format')
        res.status(400).json({ error: 'Invalid ObjectId format' })
        return
    }

    try {
        // Use findOne with a query directly
        const user = await mongodb.getDatabase().db().collection('Contacts').findOne({ _id: new ObjectId(userId) })

        if (!user) {
            // If user not found, respond with a 404 status code
            console.log('User not found')
            res.status(404).json({ error: 'User not found' })
            return
        }

        // Respond with the user data
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(user)
    } catch (error) {
        // Handle other errors
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error', details: error.message })
    }
}

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    console.log(req.body)
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        }

        const response = await mongodb.getDatabase().db().collection('Contacts').insertOne(user)
        if (response.acknowledged) {

            // Testing what I am getting when creating a user, and immediately pulling and logging the data
            // const insertedId = response.insertedId
            // const insertedUser = await mongodb.getDatabase().db().collection('Contacts').findOne({ _id: insertedId })
            // console.log('Inserted User Data:', insertedUser)

            res.status(201).json(response)
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating a user.')
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err)
    }
}

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id)
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const response = await mongodb.getDatabase().db().collection('Contacts').replaceOne({ _id: userId }, user)
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error ocrrred while updating the user.')
    }
}

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id)
    const response = await mongodb.getDatabase().db().collection('Contacts').deleteOne({ _id: userId }, true)
    console.log(response)
    if (response.deletedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the user')
    }
}

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}