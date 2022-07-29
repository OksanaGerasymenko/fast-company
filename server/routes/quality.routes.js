const express = require('express')
const router = express.Router({ mergeParams: true })
const Quality = require('../models/Quality')

router.get('/', async (req, res) => {
    try {
        const list = await Quality.find()
        res.status(200).send(list)
    } catch(e){
        res.status(500).json({error: 'Something was wrong on the server. Try it later...'})
    }
})
module.exports = router