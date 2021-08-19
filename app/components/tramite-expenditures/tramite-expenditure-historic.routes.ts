import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import TramiteMiddleware from '../tramite/middleware/tramite.middleware';
import AttachAditionalExpenditureController from './controller/expenditures-tramite-historic.controller'
export class TramiteHistoryExpenditureRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramitesHistoryExpendiruresRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/expenditures/:tramiteId`)
            .all(TramiteMiddleware.validateTramiteExists)
            .get((req, res) => AttachAditionalExpenditureController.execute(req, res))
        return this.app;
    }
}