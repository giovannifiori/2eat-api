import Sequelize from 'sequelize';
import sequelize from '../config/db';
import User from './user';

const Recipe = sequelize.define('recipe', {
    id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 40]
        }
    },
    image_path: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ingredients: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 360]
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 140]
        }
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tags: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    tableName: 'recipe',
    timestamps: true
});

Recipe.belongsTo(User, { foreignKey: 'user_id' });

Recipe.sync();

export default Recipe;