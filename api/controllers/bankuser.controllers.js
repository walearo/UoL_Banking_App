require('dotenv').config()
const { registerValidation } = require('../validations/register.validation')
const { bank_user } = require('../models');
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid')
const { hashMyPassword } = require('../utils')

const createUser = (req, res) => {
    const { error, value } = registerValidation(req.body)
    if (error != undefined) {
        res.status(400).json({
            status: false,
            message: error.details[0].message
        })
    } else {
        const { firstname, lastname, email, phone, password } = req.body;
        const user_id = uuidv4()
        try {
            bank_user.findAll({
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
                return bank_user.create({
                    userid: user_id,
                    lastname: lastname,
                    firstname: firstname,
                    email: email,
                    phone_number: phone,
                    password_hash: hash
                })
            })
            .then((data3) => {
                res.status(200).send({
                    status: true,
                    message: 'Bank user successful created'
                })
            })
            .catch((err) => {
                res.status(400).json({
                    status: false,
                    message: err.message || "Some error occurred while creating the Customer."
                })
            })
        } catch (error) {
            console.log("error: ", error)
            res.status(400).json({
                status: false,
                message: error.message || "Some error occurred while creating the Customer."
            })
        }
    }
}

module.exports = { createUser }