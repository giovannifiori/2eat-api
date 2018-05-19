import Sequelize from 'sequelize';
import sequelize from '../config/db';

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

Comments.sync();

export default Comments;