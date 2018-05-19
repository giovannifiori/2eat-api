import Sequelize from 'sequelize';
import sequelize from '../config/db';

const UserRelation = sequelize.define('user_relation', {
    id: { 
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    following_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, {
  tableName: 'user_relation',
  timestamps: true
});

UserRelation.sync();

export default UserRelation;