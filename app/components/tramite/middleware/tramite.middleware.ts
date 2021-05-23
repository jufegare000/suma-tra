import express from 'express';
import debug from 'debug';
import { TramiteService } from '../service/tramite.service';

const log: debug.IDebugger = debug('app:tramite-middleware');

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
}

export default new TramiteMiddleware();