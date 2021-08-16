import express from 'express';

import { UserValidators } from '../../users/midleware/user-validators.midleware';

import { BaseController } from '../../../shared/infra/http/models/base-controller';

import { Logger } from "tslog";
import { UserEnum } from '../../../enums/user/solicitante.enum';
import { GetUserDTO } from '../../users/model/dto/get-user.dto';
import { ExpenditureHistoryService } from '../service/expenditures-history.service';

const log: Logger = new Logger();
const userValidator: UserValidators = new UserValidators();

class ExpenditureHistoryController extends BaseController {

    private useCase: ExpenditureHistoryService = new ExpenditureHistoryService();

    protected async executeImpl(req: express.Request, res: express.Response): Promise<void | any> {
        const userDto: GetUserDTO | null = await userValidator.validateEmailInHeaders(req, UserEnum.solicitanteRole);
        if (userDto) {
            try {
                const idTramite: number = +req.params.tramiteId;
                const result = await this.useCase.getExpendituresHistoryOfTramite(idTramite);

                return this.ok(res, result);

            } catch (error: any) {
                return this.fail(res, error.toString());
            }
        }
        return this.unauthorized(res, 'email was no setted in headers');
    }

}

export default new ExpenditureHistoryController();