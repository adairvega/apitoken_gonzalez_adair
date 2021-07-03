module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: type.STRING,
        password: type.STRING,
        createdAt: {
            type: type.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "createdAt"
        },
          updatedAt: {
            type: type.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            primaryKey: false,
            autoIncrement: false,
            comment: null,
            field: "updatedAt"
        }
    },{
        tableName: "user",
        comment: "",
        onDelete: 'cascade'
    });
};