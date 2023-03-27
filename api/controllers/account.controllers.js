const { account, customer, transaction } = require('../models')
const { accountNumberValidation } = require('../validations/account.validation')
const { depositValidation } = require('../validations/deposit.validation')
const { transferValidation } = require('../validations/transfer.validation')
const { v4: uuidv4 } = require('uuid')

const transferFund = async (req, res) => {
    const { error, value } = transferValidation(req.body)
    if (error != undefined) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        })
    } else {
        const { senderaccount, receiveraccount, amount } = req.body
        try {
            //check sender account details
            const senderAccountData = await account.findOne({
                where: { account_number: senderaccount },
                attributes: ['customer_id', 'balance']
            })
            if (!senderAccountData) throw new Error('Account number does not exist')
            const senderdataset = senderAccountData.dataValues;
            if (senderdataset.balance < amount) throw new Error('Insufficient balance')

            //check receiver account details
            const receiverAccountData = await account.findOne({
                where: { account_number: receiveraccount },
                attributes: ['customer_id', 'balance']
            })
            if (!receiverAccountData) throw new Error('Account number does not exist')
            const receiverdataset = receiverAccountData.dataValues;

            //debit sender
            await account.update({
                balance: parseFloat(senderdataset.balance) - amount
            }, { where: { customer_id: senderdataset.customer_id } })
            await transaction.create({
                transaction_id: uuidv4(),
                customer_id: senderdataset.customer_id,
                transaction_amount: amount,
                transaction_type: "2", //1 - deposit, 2 - withdraw
                transaction_description: "Send Transfer",
                balance_before: senderdataset.balance,
                balance_after: parseFloat(senderdataset.balance) - amount
            })

            //credit receiver
            await account.update({
                balance: parseFloat(receiverdataset.balance) + amount
            }, { where: { customer_id: receiverdataset.customer_id } })
            await transaction.create({
                transaction_id: uuidv4(),
                customer_id: receiverdataset.customer_id,
                transaction_amount: amount,
                transaction_type: "1", //1 - deposit, 2 - withdraw
                transaction_description: "Receive Transfer",
                balance_before: receiverdataset.balance,
                balance_after: parseFloat(receiverdataset.balance) + amount
            })

            res.status(200).send({
                status: true,
                message: '£' + amount + ' was transferred from ' + senderaccount + ' to ' + receiveraccount,
            })

        } catch (error) {
            res.status(400).json({
                status: false,
                message: error.message || "Some error occurred"
            })
        }
    }
}

const withdrawCash = async (req, res) => {
    const { error, value } = depositValidation(req.body)
    if (error != undefined) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        })
    } else {
        const { accountno, amount } = req.body
        try {
            const accountData = await account.findOne({
                where: { account_number: accountno },
                attributes: ['customer_id', 'balance']
            })
            if (!accountData) throw new Error('Account number does not exist')
            const dataset = accountData.dataValues;
            if (dataset.balance < amount) {
                throw new Error('Insufficient balance')
            } else {
                await account.update({
                    balance: parseFloat(dataset.balance) - amount
                }, { where: { customer_id: dataset.customer_id } })
                await transaction.create({
                    transaction_id: uuidv4(),
                    customer_id: dataset.customer_id,
                    transaction_amount: amount,
                    transaction_type: "2", //1 - deposit, 2 - withdraw
                    transaction_description: "Cash Withdraw",
                    balance_before: dataset.balance,
                    balance_after: parseFloat(dataset.balance) - amount
                })
                res.status(200).send({
                    status: true,
                    message: '£' + amount + ' debited from ' + accountno,
                })
            }
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error.message || "Some error occurred"
            })
        }
    }
}

const depositCash = async (req, res) => {
    const { error, value } = depositValidation(req.body)
    if (error != undefined) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        })
    } else {
        const { accountno, amount } = req.body
        try {
            const accountData = await account.findOne({
                where: { account_number: accountno },
                attributes: ['customer_id', 'balance']
            })
            if (!accountData) throw new Error('Account number does not exist')
            const dataset = accountData.dataValues;
            await account.update({
                balance: amount + parseFloat(dataset.balance)
            }, { where: { customer_id: dataset.customer_id } })
            await transaction.create({
                transaction_id: uuidv4(),
                customer_id: dataset.customer_id,
                transaction_amount: amount,
                transaction_type: "1", //1 - deposit, 2 - withdraw
                transaction_description: "Cash Deposit",
                balance_before: dataset.balance,
                balance_after: amount + parseFloat(dataset.balance)
            })
            res.status(200).send({
                status: true,
                message: '£' + amount + ' credited to ' + accountno,
            })
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error.message || "Some error occurred"
            })
        }
    }
}

const getTransactions = async (req, res) => {
    const { email, password } = req.body
}

const getAccountDetails = async (req, res) => {
    const { error, value } = accountNumberValidation(req.params)
    if (error != undefined) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        })
    } else {
        const { accountno } = req.params
        try {
            const accountData = await account.findOne({
                where: { account_number: accountno },
                attributes: ['customer_id', 'balance'],
            })
            if (!accountData) throw new Error('Account number does not exist')
            const customerid = accountData.dataValues.customer_id;
            const customerData = await customer.findOne({
                where: { customer_id: customerid },
                attributes: ['firstname', 'lastname'],
            })
            const customerDetails = { ...customerData.dataValues, ...accountData.dataValues };
            res.status(200).send({
                status: true,
                message: 'Account details fetched',
                data: customerDetails
            })
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error.message || "error occurred while fetching account."
            })
        }
    }
}

const generateAccountNumber = (id) => {
    let day = new Date().getDate()
    let year = ((new Date().getFullYear()).toString()).slice(2) //give only the last 2 digits of the year
    let others = id.toString().padStart(4, '0') //completes to make 6 digits
    return `${others}${day}${year}`
}

const createAccountNumber = (customer_id, id) => {
    return account.create({
        account_number: generateAccountNumber(id),
        customer_id: customer_id,
        balance: 0.00,
        lien: 'none'
    })
}

module.exports = {
    createAccountNumber, transferFund, withdrawCash,
    depositCash, getAccountDetails, getTransactions
}