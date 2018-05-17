import Sequelize from 'sequelize';
import env from './environment';

const sequelize = new Sequelize(env.db.db, env.db.username, env.db.password, env.db.params);

sequelize.authenticate()
.then( () => {
    console.log('DB connected');
})
.catch(error => {
    console.log('DB not connected', error);
})

export default sequelize;