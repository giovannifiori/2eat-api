import os from 'os';
import dotenv from 'dotenv';
dotenv.config();

const interfaces = os.networkInterfaces();
const env = {
    db: {
        db: 'd84m65tcf4fepc',
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        params: {
            host: 'ec2-54-235-132-202.compute-1.amazonaws.com',
            dialect: 'postgres',
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: {
                underscored: true,
            },
            logging: false
        },
    },
    app: {
        port: process.env.NODE_PORT || 5432
    }
}

Object.values(interfaces).forEach( device => {
    device.filter(details => { details.family === 'IPv4' && details.internal === false ? env.app.host = details.address : null });
});
env.app.address = `http://${env.app.host}:${env.app.port}`;

export default env;
