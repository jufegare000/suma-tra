import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import AddSupportPaymentController  from './controller/add-support-payment.controller';
import AddSupportPaymentPetitionerController from './controller/add-support-payment-petitioner.controller'

export class TramiteSupportPaymentsRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramiteSupportPaymentsRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/support-payment`)
            .put((req, res) => AddSupportPaymentController.execute(req, res))

        this.app.route(`/support-payment-petitioner`)
        .put((req, res) => AddSupportPaymentPetitionerController.execute(req, res))

        return this.app;
    }
}