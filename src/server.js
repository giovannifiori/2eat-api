import express from 'express';
import env from './config/environment';
import db from './config/db';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads/'));
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));

app.route('*').all((req, res) => {
    let error = new Error();
    error.status = 404;
    error.message = 'Not found';
    res.status(404).json(error);
});

const server = app.listen(env.app.port, () => {
    console.log(`Express running at ${env.app.address}`);
});
