import { UsersRoutes } from '../../users/users.routes.config';
import {CommonRoutesConfig} from './common.routes.config';
import {Application} from 'express';

export class RoutesModule {
    routes: Array<CommonRoutesConfig> = [];
    app: Application;

    constructor(app: Application){
        this.app = app;
        this.routes.push(new UsersRoutes(app))
    }

}