import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import TramiteMiddleware from '../tramite/middleware/tramite.middleware';
import AttachExpenditureController from './controller/attach-expenditures.controller'
import AttachAditionalExpenditureController from './controller/attach-additional-expenditure.controller'
export class TramiteExpenditureRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramitesExpendiruresRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/tramite-expenditures`)
            .all(TramiteMiddleware.validateTramiteIdInBodyForHandling)
            .post((req, res) => AttachExpenditureController.execute(req, res))

        this.app.route(`/tramite-aditional-expenditure`)
            .all(TramiteMiddleware.validateTramiteIdInBodyForHandling)
            .post((req, res) => AttachAditionalExpenditureController.execute(req, res))

        return this.app;
    }
}