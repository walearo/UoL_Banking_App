require('dotenv').config()
const { registerValidation } = require('../validations/register.validation')
const { updateValidation } = require('../validations/update.validation')
const { customer, otp, account } = require('../models');
const { createAccountNumber } = require('./account.controllers');
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid')
const { hashMyPassword, generateOtp } = require('../utils')
const { sendEmail } = require('../services/email')

const register = (req, res) => {
    const { error, value } = registerValidation(req.body)
    if (error != undefined) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        })
    } else {
        const { firstname, lastname, email, phone, password } = req.body;
        const customer_id = uuidv4()
        const _otp = generateOtp()
        try {
            customer.findAll({
                where: {
                    [Op.or]: [
                        { email: email },
                        { phone_number: phone }
                    ]
                }
            })
                .then((data) => {
                    if (data.length > 0) throw new Error('Email or phone number already exist')
                    return hashMyPassword(password) //[hash, salt]
                })
                .then(([hash, salt]) => {
                    return customer.create({
                        customer_id: customer_id,
                        lastname: lastname,
                        firstname: firstname,
                        email: email,
                        phone_number: phone,
                        password_hash: hash
                    })
                })
                .then((createCustomerdata) => {
                    const id = createCustomerdata.id
                    return createAccountNumber(customer_id, id)
                })
                .then((insertIntoOtpTable) => {
                    return otp.create({
                        customer_id: customer_id,
                        otp: _otp,
                        email: email
                    })
                })
                .then((data3) => {
                    sendEmail(email, 'OTP', ` Hello  ${lastname} ${firstname},\n Your OTP is ${_otp}`)
                    res.status(200).send({
                        status: true,
                        message: 'Registration successful, An otp has been sent to your email'
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        status: false,
                        message: err.message || "Some error occurred while creating the Customer."
                    })
                })
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error.message || "Some error occurred while creating the Customer."
            })
        }
    }
}

const verifyEmailOtp = (req, res) => {
    const { email, _otp } = req.params
    try {
        otp.findAll({
            where: {
                email: email,
                otp: _otp
            },
            attributes: ['otp', 'email', 'createdAt'],
        })
            .then((otpDataFetched) => {
                if (otpDataFetched.length == 0) throw new Error('Invalid OTP')
                console.log("otpdataFetched: ", otpDataFetched[0])
                const timeOtpWasSent = Date.now() - new Date(otpDataFetched[0].dataValues.createdAt)
                const convertToMin = Math.floor(timeOtpWasSent / 60000) // 60000 is the number of milliseconds in a minute
                if (convertToMin > process.env.OTPExpirationTime) throw new Error('OTP has expired')
                return customer.update({ is_email_verified: true }, {
                    where: {
                        email: email
                    }
                })
            })
            .then((emailverifiedData) => {
                return otp.destroy({
                    where: {
                        otp: _otp,
                        email: email
                    }
                })
            })
            .then((data5) => {
                res.status(200).send({
                    status: true,
                    message: 'Email verification successful'
                })
            })
            .catch((err) => {
                res.status(400).json({
                    status: false,
                    message: err.message || "Some error occurred while verifying OTP."
                })
            })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: err.message || "Some error occurred while verifying OTP."
        })
    }
}

const resendEmailOtp = async (req, res) => {
    const { email } = req.params
    const newOtp = generateOtp()
    try {
        const findOtpWithEmail = await otp.findAll({ where: { email: email } })
        if (findOtpWithEmail.length == 0) throw new Error('Email does not exist')
        await otp.destroy({ where: { email: email } })
        await otp.create({ otp: newOtp, email: email })
        sendEmail(email, 'RESEND OTP', `Hello, your new otp is ${newOtp}`)
        res.status(200).send({
            status: true,
            message: 'otp resent to email'
        })
    } catch (e) {
        res.status(400).json({
            status: false,
            message: e.message || "Some error occurred"
        })
    }
}

const updateCustomer = async (req, res) => {
    const { error, value } = updateValidation(req.body)
    if (error != undefined) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        })
    } else {
        const { customer_id } = req.body.userData //from the authorization middleware
        const { title, lastname, firstname, gender, house_number, street, landmark, dob,
            country, means_of_id, means_of_id_number, photo,
            marital_status } = req.body
        try {
            await customer.update({
                title: title,
                lastname: lastname,
                firstname: firstname,
                gender: gender,
                house_number: house_number,
                street: street,
                landmark: landmark,
                dob: dob,
                country: country,
                means_of_id: means_of_id,
                means_of_id_number: means_of_id_number,
                marital_status: marital_status
            }, { where: { customer_id: customer_id } })

            res.status(200).send({
                status: true,
                message: 'Customer updated successfully'
            })

        } catch (e) {
            res.status(400).json({
                status: false,
                message: e.message || "Some error occurred"
            })
        }
    }
}

const getCustomerDetails = async (req, res) => {
    const { customer_id } = req.body.userData //from the authorization middleware
    const customerData = await customer.findOne({ where: { customer_id: customer_id } })
    const accountData = await account.findOne({
        where: { customer_id: customer_id },
        attributes: ['account_number', 'balance'],
    })
    delete customerData.dataValues.password_hash
    customerData.dataValues.accts = accountData
    res.status(200).send({
        status: true,
        message: 'Customer details successfully fetched',
        data: customerData
    })
}

const getAllCustomersDetails = async (req, res) => {
    const customerData = await customer.findAll({
        attributes: ['customer_id', 'lastname', 'firstname'],
        limit: 5,
        order: [['id', 'DESC']]
    })
    const accountData = await account.findAll({
        attributes: ['customer_id', 'account_number', 'balance'],
        limit: 5,
        order: [['id', 'DESC']]
    })
    const data = customerData.map((customer, i) => [customer, accountData[i]])
    res.status(200).send({
        status: true,
        message: 'Customer details successfully fetched',
        data: data
    })
}

module.exports = {
    register, verifyEmailOtp, resendEmailOtp, updateCustomer, getCustomerDetails, getAllCustomersDetails
}