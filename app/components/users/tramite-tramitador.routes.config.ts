import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import TramitadorController from '../users/controller/tramitador.controller'

export class TramiteTramitadorRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramiteTramitadorRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route(`/tramites-tramitador/`)
            .get(TramitadorController.getTramitadorTramites);
        return this.app;
    }
}