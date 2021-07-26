import express from 'express';

import { UserValidators } from '../../users/midleware/user-validators.midleware';

import { BaseController } from '../../../shared/infra/http/models/base-controller';

import { Logger } from "tslog";
import { UserEnum } from '../../../enums/user/solicitante.enum';
import { GetUserDTO } from '../../users/model/dto/get-user.dto';
import { UploadTramiteFormatsService } from '../services/upload-tramite-service.service';
import { UploadTramiteFormatsDTO } from '../model/dto/upload-tramite-formats.dto';

const log: Logger = new Logger();
const userValidator: UserValidators = new UserValidators();

class UploadTramiteFormatsController extends BaseController {

    private useCase: UploadTramiteFormatsService = new UploadTramiteFormatsService();


    protected async executeImpl(req: express.Request, res: express.Response): Promise<void | any> {
        const userDto: GetUserDTO | null = await userValidator.validateEmailInHeaders(req, UserEnum.solicitanteRole);
        if (userDto) {
            try {
                log.info('getted email: ' + userDto)
                const requestWithFormats: UploadTramiteFormatsDTO = req.body;
                const result = await this.useCase.uploadFormats(requestWithFormats, userDto);
                if (result) {
                    return this.ok(res, result);
                }
            } catch (error: any) {
                return this.fail(res, error.toString());
            }
        }
        return this.unauthorized(res, 'email was no setted in headers');
    }

}

export default new UploadTramiteFormatsController();