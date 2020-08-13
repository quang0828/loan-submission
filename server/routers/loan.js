const express = require('express')
const Loan = require('../models/Loan')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/loans', auth, async (req, res) => {
    // create loan
    try {
        const { user } = req;
        const loan = new Loan({...req.body, userId: user._id})
        await loan.save()
        res.status(201).send(loan)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/loans', auth, async (req, res) => {
    // list loans
    try {
        const loans = await Loan.find().sort({'_id': 'desc'});
        res.status(201).send(loans)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router
