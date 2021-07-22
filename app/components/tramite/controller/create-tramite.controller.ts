import express from 'express';
import { CreateTramiteDTO } from '../model/dto/create-tramite/create-tramite.dto';
import { UserValidators } from '../../users/midleware/user-validators.midleware';
import { CreateTramiteService } from '../service/create-tramite/create-tramite.service';
import { BaseController } from '../../../shared/infra/http/models/base-controller';

import { Logger } from "tslog";
import { UserEnum } from '../../../enums/user/solicitante.enum';
import { GetUserDTO } from '../../users/model/dto/get-user.dto';

const log: Logger = new Logger();
const userValidator: UserValidators = new UserValidators();
export class CreateTramiteController extends BaseController {

    private useCase: CreateTramiteService;

    constructor(useCase: CreateTramiteService) {
        super();
        this.useCase = useCase;
    }

    protected async executeImpl(req: express.Request, res: express.Response): Promise<void | any> {
        const userDto: GetUserDTO | null = await userValidator.validateEmailInHeaders(req, UserEnum.solicitanteRole);
        if (userDto) {
            try {
                log.info('getted email: ' + userDto)
                const createTramiteDTO: CreateTramiteDTO = req.body;
                const result = await this.useCase.createTramite(createTramiteDTO, userDto.email)
                if (result) {
                    return this.ok(res, result);
                }
            } catch (error: any) {
                return this.clientError(res, error.toString());
            }
        }
        return this.clientError(res, 'Unexpected error');
    }

}