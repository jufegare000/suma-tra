import express from 'express';

import { UserValidators } from '../../users/midleware/user-validators.midleware';

import { BaseController } from '../../../shared/infra/http/models/base-controller';

import { Logger } from "tslog";
import { UserEnum } from '../../../enums/user/solicitante.enum';
import { GetUserDTO } from '../../users/model/dto/get-user.dto';
import { GetExpendituresConceptsService } from '../service/get-expenditure-concept.service';

const log: Logger = new Logger();
const userValidator: UserValidators = new UserValidators();

class ExpenditureConceptController extends BaseController {

    private useCase: GetExpendituresConceptsService = new GetExpendituresConceptsService();


    protected async executeImpl(req: express.Request, res: express.Response): Promise<void | any> {
        const userDto: GetUserDTO | null = await userValidator.validateEmailInHeaders(req, UserEnum.solicitanteRole);
        if (userDto) {
            try {
                
                const result = await this.useCase.getExpendituresConcept();

                return this.ok(res, result);

            } catch (error: any) {
                return this.fail(res, error.toString());
            }
        }
        return this.unauthorized(res, 'email was no setted in headers');
    }

}

export default new ExpenditureConceptController();