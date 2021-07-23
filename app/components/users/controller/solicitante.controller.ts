import { Logger } from "tslog";
import express from 'express';
import { SolicitanteTramitesService } from "../services/solicitante-tramites.service";
import { UserValidators } from "../midleware/user-validators.midleware";
import { StatusCodes } from 'http-status-codes';
import { GetTramiteDTO } from "../../tramite/model/dto/get-tramite/getTramite.dto";
import { UserEnum } from "../../../enums/user/solicitante.enum";
import { GetUserDTO } from "../model/dto/get-user.dto";

const log: Logger = new Logger();

const tramiteSolicitanteService: SolicitanteTramitesService = new SolicitanteTramitesService();
const userValidators: UserValidators = new UserValidators();
class SolicitanteController {

    async getSolicitanteTramites(req: express.Request, res: express.Response) {
        try {
            const userDto: GetUserDTO | null = await userValidators.validateEmailInHeaders(req, UserEnum.solicitanteRole);

            const tramites: GetTramiteDTO[] | null = await tramiteSolicitanteService.getTramitesSolicitante(userDto);

            res.status(StatusCodes.OK).send(tramites);

        } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED).send("No email headers found")
        }
    }
}

export default new SolicitanteController();