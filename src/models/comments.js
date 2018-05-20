import Sequelize from 'sequelize';
import sequelize from '../config/db';
import User from '../models/user';

const Comments = sequelize.define('comments', {
    id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment_id: { 
        type: Sequelize.INTEGER,
        allowNull: false
    },
    text: {
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
    }
}, {
    tableName: 'comments',
    timestamps: true
});

Comments.belongsTo(User, { foreignKey: 'user_id' });

Comments.sync();

export default Comments;