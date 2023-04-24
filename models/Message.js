const { Sequelize } = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Message', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userid: {
            type: Sequelize.UUID
        },
        content: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        }    }, {
        tableName: 'mitra_learn_messages',
        paranoid: false,
        syncOnAssociation: false,
        timestamps: false
    });
};

