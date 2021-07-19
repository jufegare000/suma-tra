
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { TramiteModel } from '../../components/tramite/model/db/tamite.model';
import { DocumentoTramiteModel } from '../../components/tramite/model/db/documento-tramite.model';
import { UserModel } from '../../components/users/model/db/user.model';

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

sequalize.addModels([TramiteModel, UserModel, DocumentoTramiteModel]);
