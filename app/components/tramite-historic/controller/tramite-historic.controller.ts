
import express from 'express';
import { BaseController } from '../../../shared/infra/http/models/base-controller';
import { Logger } from "tslog";
import { GetTramiteHistoricService } from '../service/get-tramite-historic.service';
import { GetTramiteHistoricDTO } from '../model/dto/get-tramite-historic.dto';

const log: Logger = new Logger();

class GetTramiteHistoricController extends BaseController {

    private useCase: GetTramiteHistoricService = new GetTramiteHistoricService();

    async executeImpl(req: express.Request, res: express.Response) {
        try {
            const idTramite: number = +req.params.tramiteId;
            log.info('id: ', idTramite);
            const tramiteHistoric: GetTramiteHistoricDTO = await this.useCase.getTramiteHistoric(idTramite);
            return this.ok(res, tramiteHistoric);
        } catch (error) {
            log.error(`Error during excecution: ${error}`)
            return this.fail(res, `Unexpected error: ${error}`);
        }
    }
}
export default new GetTramiteHistoricController();