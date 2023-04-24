const { Sequelize } = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }    }, {
        tableName: 'mitra_learn_users',
        paranoid: false,
        syncOnAssociation: false,
        timestamps: false
    });
};
