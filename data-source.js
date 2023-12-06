require('dotenv').config()
require('reflect-metadata');
const { DataSource } = require('typeorm')
const User = require('./entity/User');
const Job = require('./entity/Job');
const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    synchronize: true,
    logging: false,
    entities: [User, Job],
    migrations: [],
    subscribers: [],
})

module.exports = AppDataSource;