import os from 'os';
import dotenv from 'dotenv';
dotenv.config();

const interfaces = os.networkInterfaces();
const env = {
    db: {
        db: '2eat',
        username: 'root',
        password: process.env.DB_PASSWORD,
        params: {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: {
                underscored: true,
            },
            insecureAuth: true
        },
    },
    app: {
        port: process.env.NODE_PORT || 3001
    }
}

Object.values(interfaces).forEach( device => {
    device.filter(details => { details.family === 'IPv4' && details.internal === false ? env.app.host = details.address : null });
});
env.app.address = `http://${env.app.host}:${env.app.port}`;

export default env;