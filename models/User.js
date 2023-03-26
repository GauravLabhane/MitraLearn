const { Sequelize } = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }    }, {
        tableName: 'users',
        paranoid: false,
        syncOnAssociation: false,
        timestamps: false
    });
};
