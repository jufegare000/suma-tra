import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import { CreateTramiteController } from './controller/create-tramite.controller';
import TramiteMiddleware from './middleware/tramite.middleware';
import { CreateTramiteService } from './service/create-tramite/create-tramite.service';
import { GetTramiteService } from './service/get-tramite/get-tramite.service';
import { GetTramiteController } from './controller/get-tramite.controller';
import CreateTramiteValidator from './middleware/create-tramite-validator.middleware';
import ListTramitesController from './controller/list-tramites.controllers';
import { UpdateTramiteController } from './controller/update-tramite.controller';
import { DeleteTramiteController } from './controller/delete-tramite.controller';


const createTramiteUseCase = new CreateTramiteService();
const getTramiteUseCase = new GetTramiteService();
const createTramiteController: CreateTramiteController = new CreateTramiteController(createTramiteUseCase)
const getTramiteController: GetTramiteController = new GetTramiteController(getTramiteUseCase);
const updateTramiteDontroller: UpdateTramiteController = new UpdateTramiteController();
const deleteTramiteController: DeleteTramiteController = new DeleteTramiteController();
export class TramiteRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramitesRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/tramites`)
            .get((req, res) => ListTramitesController.executeImpl(req, res))
            .post(CreateTramiteValidator.validateInputFields,
                CreateTramiteValidator.validateDocumentsPresentInRequest,
                CreateTramiteValidator.validateDocumentsFormatInReques,
                (req, res) => createTramiteController.execute(req, res))
            .put(TramiteMiddleware.validateTramiteIdInBodyForHandling, (req, res) => updateTramiteDontroller.execute(req, res))

        this.app.route(`/tramites/:tramiteId`)
            .all(TramiteMiddleware.validateTramiteExists)
            .get(
                (req, res) => getTramiteController.execute(req, res)
            )
            .put((req: express.Request, res: express.Response) => {
                res.status(200).send(`PUT requested for id ${req.params.tramiteId}`);
            })
            .delete(TramiteMiddleware.validateTramiteExists, (req, res) => deleteTramiteController.execute(req, res));;

        return this.app;
    }
}