
import express from 'express';
import { GetTramiteDTO } from '../model/dto/get-tramite/getTramite.dto';
import { BaseController } from '../../../shared/infra/http/models/base-controller';
import { Logger } from "tslog";
import { UserValidators } from '../../users/midleware/user-validators.midleware';
import { ListTramitesService } from '../service/get-tramite/list-tramites.service';
import { UserEnum } from '../../../enums/user/solicitante.enum';

const log: Logger = new Logger();
const userValidators: UserValidators = new UserValidators();

export class ListTramitesController extends BaseController {

    private useCase: ListTramitesService = new ListTramitesService();
    

    async executeImpl(req: express.Request, res: express.Response) {
        try {
            await userValidators.validateEmailInHeaders(req, UserEnum.tramitadorRole);
            const idTramite: number = +req.params.tramiteId;
            log.info('id: ', idTramite);
            const tramite: GetTramiteDTO[] | null = await this.useCase.getAllPendingTramites();
            return this.ok(res, tramite);
        } catch (error) {
            log.error(`Error during excecution: ${error}`)
            return this.clientError(res, `Unexpected error: ${error}`);
        }
    }
}