import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import TramiteMiddleware from '../tramite/middleware/tramite.middleware';
import AddInitialPaymentController  from './controller/add-initial-payment.controller';

export class TramitePaymentsRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramitePaymentsRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/initial-payment`)
            .all(TramiteMiddleware.validateTramiteIdInBodyForHandling)
            .post((req, res) => AddInitialPaymentController.execute(req, res))

        return this.app;
    }
}