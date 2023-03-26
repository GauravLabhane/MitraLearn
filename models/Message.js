const { Sequelize } = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userid: {
            type: Sequelize.INTEGER
        },
        content: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        }    }, {
        tableName: 'messages',
        paranoid: false,
        syncOnAssociation: false,
        timestamps: false
    });
};
