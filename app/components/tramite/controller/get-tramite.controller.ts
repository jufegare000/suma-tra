
import express from 'express';
import { GetTramiteDTO } from '../model/dto/get-tramite/getTramite.dto';
import { GetTramiteService } from '../service/get-tramite/get-tramite.service';
import { BaseController } from '../../../shared/infra/http/models/base-controller';
import { Logger } from "tslog";

const log: Logger = new Logger();

export class GetTramiteController extends BaseController {

    private useCase: GetTramiteService;

    constructor(useCase: GetTramiteService) {
        super();
        this.useCase = useCase;
    }

    async executeImpl(req: express.Request, res: express.Response) {
        try {
            const idTramite: number = +req.params.tramiteId;
            log.info('id: ', idTramite);
            const tramite: GetTramiteDTO | null = await this.useCase.getTramiteById(idTramite);
            return this.ok(res, tramite);
        } catch (error) {
            log.error(`Error during excecution: ${error}`)
            return this.clientError(res, `Unexpected error: ${error}`);
        }
    }
}