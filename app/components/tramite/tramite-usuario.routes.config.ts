import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import TramiteController from './controller/tramite.controller';
import TramiteMiddleware from './middleware/tramite.middleware';

export class TramiteRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramiteUsuarioRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/tramites-usuarios/:userId`)
            .get(TramiteController.getTramiteById)

        return this.app;
    }
}