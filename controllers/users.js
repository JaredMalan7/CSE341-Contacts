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
    const userId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db().collection('Contacts').find({ _id: userId })
    result.toArray().then((Contacts) => {
        res.setHeader(`Content-Type`, `application/json`)
        res.status(200).json(Contacts[0])
    })
}

// const createUser = async (req, res) => {
//     try {
//         const userData = req.body
//         console.log(userData)
//         //const result = await mongodb.getDatabase().db().collection('Contacts').insertOne(userData)

//         res.setHeader(`content-type`, `application/json`)
//         res.status(201).json('ok')
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: "Internal Server Error", details: error.message })
//     }
// }


module.exports = {
    getAll,
    getSingle,
    //createUser
}