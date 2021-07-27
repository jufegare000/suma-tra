import express from "express";
import { BaseController } from "../../../shared/infra/http/models/base-controller";
import { UpdateTramiteService } from "../service/update-tramite/update-tramite.service";
import { Logger } from "tslog";
import { UserValidators } from "../../users/midleware/user-validators.midleware";
import { UserEnum } from "../../../enums/user/solicitante.enum";
import { UpdateTramiteDTO } from "../model/dto/update-tramite/update-tramite.dto";
import { GetUserDTO } from "../../users/model/dto/get-user.dto";

const log: Logger = new Logger();
const userValidators: UserValidators = new UserValidators();
export class UpdateTramiteController extends BaseController {
    private useCase: UpdateTramiteService = new UpdateTramiteService();

    async executeImpl(req: express.Request, res: express.Response) {
        const getUserDto: GetUserDTO | null = await userValidators.validateEmailInHeaders(req, UserEnum.solicitanteRole);
        if (getUserDto) {
            try {

                const updateTramiteDto: UpdateTramiteDTO = req.body;
                const tramiteUpdated = await this.useCase.updateTramite(updateTramiteDto, getUserDto);
                return this.ok(res, tramiteUpdated);
            } catch (error) {
                log.error(`Error during excecution: ${error}`)
                return this.clientError(res, `Unexpected error: ${error}`);
            }
        } else {
            return this.unauthorized(res, `user not pressent in headers`)
        }
    }
}