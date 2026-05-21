const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },dueDate: {
        type: DataTypes.DATE,
        allowNull: true
    }, priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        defaultValue: 'Medium'
    },isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });     

module.exports = Task;