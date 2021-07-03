const { User } = require('../../db/connection');
const mysqlConnection = require('../database');
const bcrypt = require('bcryptjs');


export const getUsers = (req, res) => {
    User.findAll({
    }).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).send({ status: "bad", data: err.message })
    });
}
export const getUserById = (req, res) => {
    let {id} = req.params;
    User.findAll({
        where: {
            id: id
        }
    }).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).send({ status: "bad", data: err.message })
    });
}
export const registerUser = async (req, res) => {
    const { email, password } = req.body;
    const query = `
    INSERT INTO user (email, password, createdAt, updatedAt) VALUES (?,?,?,?);
    `;
    mysqlConnection.query(query, [email, await encryptPassword(password), new Date(), new Date()], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({status: 'Usuario agregado correctamente'});
        }else{
            console.log(err);
        }
    });
}

export const updateUserById = async (req, res) => {
    const { email, password } = req.body;
    const { id } = req.params;
    const query = `
    UPDATE user SET email = ?, password = ?, updatedAt = ? WHERE (id = ?);
    `;
    let user = await User.findOne({where: {id: id}});
    if (user) {
        mysqlConnection.query(query, [email, await encryptPassword(password),new Date(), id], (err, rows, fields) => {
            if (!err) {   
                res.status(200).json({status: 'Usuario actualizado correctamente'});
            }else{
                res.status(404).send({ status: "El usuario no existe" });
            }
        });
    } else {
        res.status(404).send({ status: "El usuario no existe" });
    }
}

export const deleteUserById = (req, res) => {
    const { id } = req.params;
    const query = `
    DELETE * FROM user WHERE id = ?
    `;
    mysqlConnection.query(query, [id], (err, rows, fields) => {
        if (!err) {
            if (rows.affectedRows > 0) {
                res.status(200).json({status: 'Usuario dado de baja correctamente'});
            } else {
                res.status(400).json({status: 'El usuario no existe'});
            } 
        }else{
            console.log(err);
        }
    });
}

async function encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}