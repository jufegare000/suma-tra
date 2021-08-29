import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import AddSupportPaymentController  from './controller/add-support-payment.controller';

export class TramiteSupportPaymentsRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramiteSupportPaymentsRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/suport-payment`)
            .put((req, res) => AddSupportPaymentController.execute(req, res))

        return this.app;
    }
}