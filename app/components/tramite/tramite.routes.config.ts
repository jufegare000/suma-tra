import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import {CreateTramiteController} from './controller/create-tramite.controller';
import TramiteController from './controller/tramite.controller';
import TramiteMiddleware from './middleware/tramite.middleware';
import { CreateTramiteService } from './service/create-tramite/create-tramite.service';
import { GetTramiteService } from './service/get-tramite/get-tramite.service';
import { GetTramiteController } from './controller/get-tramite.controller';

const createTramiteUseCase = new CreateTramiteService();
const getTramiteUseCase = new GetTramiteService()

const createTramiteController: CreateTramiteController = new CreateTramiteController(createTramiteUseCase)
const getTramiteController: GetTramiteController = new GetTramiteController(getTramiteUseCase);
export class TramiteRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramitesRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/tramites`)
            .post(
                (req, res) => createTramiteController.execute(req, res));

        this.app.route(`/tramites/:tramiteId`)
            .all(TramiteMiddleware.validateTramiteExists)
            .get(
                (req, res) => getTramiteController.execute(req, res)
            )
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