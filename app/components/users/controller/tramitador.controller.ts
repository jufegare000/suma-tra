import { Logger } from "tslog";
import express from 'express';
import { SolicitanteTramitesService } from "../services/solicitante-tramites.service";
import { UserValidators } from "../midleware/user-validators.midleware";
import {StatusCodes} from 'http-status-codes';
import { TramitadorTramitesService } from "../services/tramitador-tramites.service";
import { GetTramiteDTO } from "../../tramite/model/dto/get-tramite/getTramite.dto";
import { UserEnum } from "../../../enums/user/solicitante.enum";
import { GetUserDTO } from "../model/dto/get-user.dto";

const log: Logger = new Logger();

const tramiteTramitadorService: TramitadorTramitesService = new TramitadorTramitesService();
const userValidators: UserValidators = new UserValidators();

class TramitadorController {

    async getTramitadorTramites(req: express.Request, res: express.Response){
        try {
            const user:GetUserDTO|null = await userValidators.validateEmailInHeaders(req, UserEnum.tramitadorRole);
            const tramites: GetTramiteDTO[] |null = await tramiteTramitadorService.getTramitesTramitadorByMail(user);
            res.status(StatusCodes.OK).send(tramites);
        } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED).send("No email headers found")
        }       
    }    
}

export default new TramitadorController();