import express from 'express';
import { UploadTramiteFormatsDTO } from '../../tramte-management/model/dto/upload-tramite-formats.dto';
import { AttendTramiteDto } from '../model/dto/update-tramite/attend-tramite.dto';
import { TramiteService } from '../service/create-tramite/tramite.service';

const tramiteSetvice: TramiteService = new TramiteService();

class TramiteMiddleware {

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

    async validateTramiteIdInBody(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const attendTramiteDto: UploadTramiteFormatsDTO = req.body;
        const tramite = await tramiteSetvice.getTramiteById(attendTramiteDto.tramite_id);
        if (tramite) {
            next();
        } else {
            res.status(404).send({
                error: `Tramite ${req.params.tramiteId} not found`
            });
        }
    }

    async validateTramiteIdInBodyForHandling(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const attendTramiteDto: AttendTramiteDto = req.body;
        const tramite = await tramiteSetvice.getTramiteById(attendTramiteDto.tramite_id);
        if (tramite) {
            next();
        } else {
            res.status(404).send({
                error: `Tramite ${req.params.tramiteId} not found`
            });
        }
    }
}

export default new TramiteMiddleware();