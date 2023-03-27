const express = require('express')
const router = express.Router()
const { depositCash, withdrawCash, transferFund, getTransactions, getAccountDetails } = require('../controllers/account.controllers')
const { authorization } = require('../middlewares/authorization')

router.post('/account/withdraw', withdrawCash)

router.post('/account/deposit', depositCash)

router.post('/account/transfer', transferFund)

router.get('/account/transaction', getTransactions)

router.get('/account/details/:accountno', getAccountDetails)

module.exports = router