import express from 'express';
import { TramiteService } from '../service/create-tramite/tramite.service';

const tramiteSetvice: TramiteService = new TramiteService();

class TramiteMiddleware {
    async extractTramiteId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.tramiteId = req.params.tramiteId;
        next();
    }

    async validateTramiteExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const tramite = await tramiteSetvice.getTramiteById(+req.params.tramiteId);
        if (tramite) {
            next();
        } else {
            res.status(404).send({
                error: `Tramite ${req.params.tramiteId} not found`,
            });
        }
    }

    async validateRequiredUserBodyFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.body) {
            next();
        } else {
            res.status(400).send({
                error: `Missing required fields email and password`,
            });
        }
    }
}

export default new TramiteMiddleware();