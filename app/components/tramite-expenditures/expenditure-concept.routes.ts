import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import TramiteMiddleware from '../tramite/middleware/tramite.middleware';
import ExpenditureConceptController from './controller/expenditure-concept.controller'

export class ExpenditureConceptRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'ExpenditureConceptRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/expenditure-concept`)
            .get((req, res) => ExpenditureConceptController.execute(req, res))

        return this.app;
    }
}