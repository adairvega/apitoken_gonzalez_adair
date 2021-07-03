const { User, Studentdata } = require('../../db/connection');
const mysqlConnection = require('../database');
const bcrypt = require('bcryptjs');
import jwt from "jsonwebtoken";
import config from "../config";

export const signup = async (req, res) => {
    const {email, password} = req.body;

    User.findOne({
        where: {
            email: email
        }
    }).then(async data => {
        if (data == null) {
            const query = `
            INSERT INTO user (email, password, createdAt, updatedAt) VALUES (?,?,?,?);
            `;
            mysqlConnection.query(query, [email, await encryptPassword(password), new Date(), new Date()], (err, rows, fields) => {
                if (!err) {
                    User.findOne({
                        where: {
                            id: rows.insertId
                        }
                    }).then(data => {
                        const savedUser = data.dataValues;
                        const token = jwt.sign({id: savedUser.id}, config.SECRET, {
                            expiresIn: 86400
                        });
                        res.status(200).json({token});
                    })
                }else{
                    console.log(err);
                }
            });
        } else {
            res.status(400).json({status: "El usuario ya existe"})
        }
    }).catch(err => {
        res.status(500).json({status: err})
    });
}

export const signin = async (req, res) => {
    const {email, password} = req.body;
    let user;

    if (email) {
        if (/^[^\s@]+@[^\s@]+$/.test(email)) {
            user = await User.findOne({where: {email: email}});
            if (user == undefined) {
                res.status(404).send({userIsValid:false});
            }
        }else{
            res.status(404).send({userIsValid:true});
        }
    }else{
        res.status(404).json({Error:"Credenciales no existen"});
    }

    if (!user) {
        res.status(400).json({isValide: "El usuario con email indicado no existe"});
    } else {
        const passwordvalide = await comparePassword(password, user.password);
        if (passwordvalide) {
            const token = jwt.sign({id: user.id}, config.SECRET, {
                expiresIn: 86400
            });
            res.status(200).json({token:token,user:{id: user.id, email:user.email}});
        } else {
            res.status(404).send({isValid:true});
        }
    }
}

async function encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function comparePassword(password, receivedPassword) {
    return await bcrypt.compare(password, receivedPassword);
}