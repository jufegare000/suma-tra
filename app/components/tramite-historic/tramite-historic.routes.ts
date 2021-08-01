import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import TramiteMiddleware from '../tramite/middleware/tramite.middleware';
import GetTramiteHistoricController  from './controller/tramite-historic.controller';

export class TramiteAttendingRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramitesHistoricRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/tramite-historic/:tramiteId`)
            .all(TramiteMiddleware.validateTramiteIdInBodyForHandling)
            .post((req, res) => GetTramiteHistoricController.execute(req, res))

        return this.app;
    }
}