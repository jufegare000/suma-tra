import express from 'express';
import { UserValidators } from '../../users/midleware/user-validators.midleware';
import { BaseController } from '../../../shared/infra/http/models/base-controller';
import { Logger } from "tslog";
import { UserEnum } from '../../../enums/user/solicitante.enum';
import { GetUserDTO } from '../../users/model/dto/get-user.dto';
import { TramiteDeliveryService } from '../service/tramite-delivery.service';
import { AttendTramiteDTO } from '../../tramite-attending/model/dto/attend-tramite.dto';
import { TramiteFinalizationService } from '../service/tramite-finalization.service';



const log: Logger = new Logger();
const userValidator: UserValidators = new UserValidators();
class TramiteDinalizationController extends BaseController {

    private useCase: TramiteFinalizationService = new TramiteFinalizationService();

    protected async executeImpl(req: express.Request, res: express.Response): Promise<void | any> {
        const userDto: GetUserDTO | null = await userValidator.validateEmailInHeaders(req, UserEnum.solicitanteRole);
        if (userDto) {
            try {
                log.info('getted email: ' + userDto)
                const attendTramiteDto: AttendTramiteDTO = req.body;
                const result = await this.useCase.terminateTramite(userDto, attendTramiteDto.tramite_id)
                if (result) {
                    return this.ok(res, result);
                }
            } catch (error: any) {
                return this.clientError(res, error.toString());

            }
        }
        return this.unauthorized(res, 'email was no setted in headers');
    }
}

export default new TramiteDinalizationController();