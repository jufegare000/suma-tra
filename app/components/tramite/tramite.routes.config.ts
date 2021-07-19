import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import TramiteController from './controller/tramite.controller';
import TramiteMiddleware from './middleware/tramite.middleware';

export class TramiteRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramitesRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/tramites`)
            .get(TramiteController.listTramites)
            .post(
                TramiteController.createTramite);

        this.app.route(`/tramites/:tramiteId`)
            .all(TramiteMiddleware.validateTramiteExists)
            .get(TramiteController.getTramiteById)
            .put((req: express.Request, res: express.Response) => {
                res.status(200).send(`PUT requested for id ${req.params.tramiteId}`);
            })
            .patch((req: express.Request, res: express.Response) => {
                res.status(200).send(`PATCH requested for id ${req.params.tramiteId}`);
            })
            .delete((req: express.Request, res: express.Response) => {
                res.status(200).send(`DELETE requested for id ${req.params.tramiteId}`);
            });


        return this.app;
    }
}