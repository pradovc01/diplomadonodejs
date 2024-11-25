import { Sequelize } from 'sequelize';
import 'dotenv/config'
const sequelize = new Sequelize(
    process.env.DB_DATABASE,//db name
    process.env.DB_USER,//use name
    process.env.DB_PASSWORD,//pwd    
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        logging: console.log,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        }

    }

)

export default sequelize;