import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import TramiteMiddleware from '../tramite/middleware/tramite.middleware';;
import TramiteDeliveryController from './controller/tramite-delivery.controller';
import TramiteFinalizationController from './controller/tramite-finalization.controller';
export class TramiteFinalizationRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramitesAttendingRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/tramite-delivery`)
            .all(TramiteMiddleware.validateTramiteIdInBodyForHandling)
            .post((req, res) => TramiteDeliveryController.execute(req, res))

        this.app.route(`/tramite-finalization`)
            .all(TramiteMiddleware.validateTramiteIdInBodyForHandling)
            .post((req, res) => TramiteFinalizationController.execute(req, res))

        return this.app;
    }
}