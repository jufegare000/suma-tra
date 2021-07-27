import { CommonRoutesConfig } from '../common/routes/common.routes.config';
import express from 'express';
import TramiteMiddleware from '../tramite/middleware/tramite.middleware';
import UploadTramiteFormatsController  from './controller/upload-tramite-formats.controller';

export class TramiteManagementRoutes extends CommonRoutesConfig {

    constructor(app: express.Application) {
        super(app, 'TramitesManagementRoutes');
    }

    configureRoutes(): express.Application {

        this.app.route(`/upload-tramite-formats`)
            .all(TramiteMiddleware.validateTramiteIdInBodyForHandling)
            .post((req, res) => UploadTramiteFormatsController.execute(req, res))

        return this.app;
    }
}