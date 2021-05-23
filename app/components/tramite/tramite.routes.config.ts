import {CommonRoutesConfig} from '../common/routes/common.routes.config';
import {Application, Request, Response, NextFunction} from 'express';
import TramiteController from './controller/tramite.controller';
import TramiteMiddleware from './middleware/tramite.middleware';

export class TramiteRoutes extends CommonRoutesConfig {
    
    constructor(app: Application) {
        super(app, 'TramitesRoutes');
    }

    configureRoutes(): Application {


        this.app.param(`tramiteId`, TramiteMiddleware.extractTramiteId);
        this.app
            .route(`/tramites/:tramiteId`)
            .all(TramiteMiddleware.validateTramiteExists)
            .get(TramiteController.getTramiteById);

            /*
        this.app.route(`/tramites`)
            .get(TramiteController.listTramites)
            .post(
                TramiteController.createTramite
            );
            */

        return this.app;
    }
}