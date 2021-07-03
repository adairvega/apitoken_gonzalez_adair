import { Sequelize } from 'sequelize';

const UserModel = require('../src/models/User');

const db = new Sequelize('apitoken', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true
});

const User = UserModel(db, Sequelize);

db.sync({force: false}).then(() => {
    console.log('Entities created succesfully');
});

module.exports = {
    User,  
}