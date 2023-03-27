const express = require('express')
const router = express.Router()
const { register, verifyEmailOtp, resendEmailOtp, updateCustomer, getCustomerDetails, getAllCustomersDetails
} = require('../controllers/customer.controllers')
const { authorization } = require('../middlewares/authorization')

// @route   POST api/customers
router.post('/register', register)

router.get('/verify-email-otp/:_otp/:email', verifyEmailOtp)

router.post('/resend-email-otp/:email', resendEmailOtp)

router.get('/customers', getAllCustomersDetails)

router.get('/profile', authorization, getCustomerDetails)

router.put('/update', authorization, updateCustomer)

module.exports = router