const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    subscriptionId: {
        type:String,
        required: true
    },
    subscriptionStatus: {
        type:String,
        required: true
    },
    customerId: {
        type:String,
        required: true
    },
    paymentStatus: {
        type:String,
        required: true
    },
    subscriptionStartDate: {
        type: Date,
        required: true,
    },
    subscriptionEndDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'canceled', 'expired'],
        default: 'active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order