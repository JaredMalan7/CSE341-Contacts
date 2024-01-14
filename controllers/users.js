const mongodb = require('../db/database')

const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('Contacts').find()
    result.toArray().then((Contacts) => {
        res.setHeader(`Content-Type`, `application/json`)
        res.status(200).json(Contacts)
    })
}
const getSingle = async (req, res) => {
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
    try {
        const userData = req.body
        //console.log(userData)
        const result = await mongodb.getDatabase().db().collection('Contacts').insertOne(userData)

        res.setHeader(`content-type`, `application/json`)
        res.status(201).json(result.ops[0])
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error", details: error.message })
    }
}


module.exports = {
    getAll,
    getSingle,
    createUser
}