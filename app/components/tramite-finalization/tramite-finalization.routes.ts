import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import TramiteMiddleware from '../tramite/middleware/tramite.middleware';;
import TramiteDeliveryController from './controller/tramite-delivery.controller';
export class TramiteFinalizationRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramitesAttendingRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/tramite-delivery`)
            .all(TramiteMiddleware.validateTramiteIdInBodyForHandling)
            .post((req, res) => TramiteDeliveryController.execute(req, res))

        return this.app;
    }
}