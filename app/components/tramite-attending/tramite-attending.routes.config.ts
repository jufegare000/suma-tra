import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import TramiteMiddleware from '../tramite/middleware/tramite.middleware';
import TramiteAttendingController  from './controller/attend-tramte.controller';

export class TramiteAttendingRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramitesAttendingRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/tramite-attending`)
            .all(TramiteMiddleware.validateTramiteIdInBodyForHandling)
            .post((req, res) => TramiteAttendingController.execute(req, res))

        return this.app;
    }
}