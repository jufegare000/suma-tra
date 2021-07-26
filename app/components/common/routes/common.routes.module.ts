
import { TramiteRoutes } from '../../tramite/tramite.routes.config';
import {TramiteSolicitanteRoutes} from '../../users/tramite-solicitante.routes.config'
import {CommonRoutesConfig} from './common.routes.config';
import {Application} from 'express';
import { TramiteTramitadorRoutes } from '../../users/tramite-tramitador.routes.config';
import { TramiteManagementRoutes } from '../../tramte-management/tramite.management.routes';

export class RoutesModule {
    routes: Array<CommonRoutesConfig> = [];
    app: Application;

    constructor(app: Application){
        this.app = app;
        this.routes.push(new TramiteTramitadorRoutes(app))
        this.routes.push(new TramiteSolicitanteRoutes(app))
        this.routes.push(new TramiteRoutes(app))
        this.routes.push(new TramiteManagementRoutes(app))
    }

}