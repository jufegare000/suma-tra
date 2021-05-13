
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import {TramiUserModel} from '../../models/tramiUser.model';

dotenv.config();

const userName: any = process.env.DB_USER;
const pass: any = process.env.DB_PWD
const dbn: any = process.env.DB_NAME


export const sequalize = new Sequelize(dbn, userName, pass, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle:10000
    },
    repositoryMode: true
    
}
)

sequalize.addModels([TramiUserModel]);