const sequelize = require('../configs/db.config');
const fs = require('fs');
const { keys } = require('lodash');

const getModuleNameFromFile = file => {
    const name = file.split('.')[0];
    return name.slice(0, 1).toUpperCase() + name.slice(1);
};

const models = {};

// Initialize Sequelize models
fs
    .readdirSync(__dirname)
    .filter(file => file.endsWith('.model.js'))
    .forEach(file => {
        const name = getModuleNameFromFile(file);
        const model = require(__dirname + '/' + file);
        models[name] = model(sequelize);
    });

// Initialize models associations
keys(models).forEach(model => {
    if (models[model].associate) {
        models[model].associate(models);
    }
});

module.exports = models;