const express = require('express')
const router = express.Router({ mergeParams: true })
const Profession = require('../models/Profession')

router.get('/', async (req, res) => {
    try {
        const list = await Profession.find()
        res.status(200).send(list)
    } catch(e) {
        res.status(500).json({ message: 'Something was wrong on the server. Try it later...' })
    }
})
module.exports = router