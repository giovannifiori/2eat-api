import Sequelize from 'sequelize';
import sequelize from '../config/db';
import User from './user';

const Review = sequelize.define('review', {
    id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    recipe_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 10
        }
    },
    text: {
        type: Sequelize.STRING,
        validate: {
            len: [0, 140]
        }
    }
}, {
    tableName: 'review',
    timestamps: true
});

Review.belongsTo(User, { foreignKey: 'user_id' });

Review.sync();

export default Review;