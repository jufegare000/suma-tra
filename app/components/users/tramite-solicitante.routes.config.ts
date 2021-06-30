import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import SolicitanteController from '../users/controller/solicitante.controller';


export class TramiteSolicitanteRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramiteSolicitanteRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/tramites-solicitantes/`)
            .get(SolicitanteController.getSolicitanteTramites);

        return this.app;
    }
}