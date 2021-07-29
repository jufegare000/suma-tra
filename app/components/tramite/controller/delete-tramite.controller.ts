
import express from 'express';
import { GetTramiteDTO } from '../model/dto/get-tramite/getTramite.dto';
import { GetTramiteService } from '../service/get-tramite/get-tramite.service';
import { BaseController } from '../../../shared/infra/http/models/base-controller';
import { Logger } from "tslog";
import { DeleteTramiteService } from '../service/delete-tramite/delete-tramite.service.service';

const log: Logger = new Logger();

export class DeleteTramiteController extends BaseController {

    private useCase: DeleteTramiteService = new DeleteTramiteService;

    async executeImpl(req: express.Request, res: express.Response) {
        try {
            const idTramite: number = +req.params.tramiteId;
            log.info('id: ', idTramite.toString());
            await this.useCase.deleteTramiteById(idTramite);
            return this.ok(res, `tramite ${idTramite} deleted`)
        } catch (error) {
            log.error(`Error during excecution: ${error}`)
            return this.fail(res, `Unexpected error: ${error}`);
        }
    }
}