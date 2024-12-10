import 'dotenv/config';
import mongoose from 'mongoose';

const protocol = process.env.DB_PROTOCOL;
const domain = process.env.DB_DOMAIN;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const cluster = process.env.DB_CLUSTER;

const uri = `${protocol}://${username}:${password}@${domain}/${database}?retryWrites=true&w=majority&appName=${cluster}`;

mongoose.connect(uri);

const db = mongoose.connection;

export default db;
