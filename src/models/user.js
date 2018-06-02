import sequelize from '../config/db';
import Sequelize from 'sequelize';

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image_path: {
        type: Sequelize.STRING,
        allowNull: true,
    },
}, {
    tableName: 'user',
    timestamps: true
});

User.sync();

export default User;
