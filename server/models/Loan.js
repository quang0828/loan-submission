const mongoose = require('mongoose')

const AllowTypes = ['Purchase Order', 'Invoice Financing'];

const loanSchema = mongoose.Schema({
    productType: {
        type: String,
        required: true,
        validator: value => {
            if (!AllowTypes.includes(value)) {
                throw new Error({error: 'productType is not correct'})
            }
        }
    },
    loanAmount: {
        type: Number,
        required: true,
        validate: value => {
            if (value <= 0) {
                throw new Error({error: 'loanAmount is greater than 0'})
            }
        }
    },
    terms: {
        type: Number,
        required: true,
    },
    documents: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
})

const Loan = mongoose.model('loan', loanSchema)

module.exports = Loan