import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import TramiteMiddleware from '../tramite/middleware/tramite.middleware';
import GetTramiteHistoricController from './controller/tramite-historic.controller';

export class TramiteHistoricRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramitesHistoricRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/tramite-historic/:tramiteId`)
            .all(TramiteMiddleware.validateTramiteExists)
            .get((req, res) => GetTramiteHistoricController.execute(req, res))

        return this.app;
    }
}