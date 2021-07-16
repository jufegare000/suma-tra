import debug from 'debug';
import express from 'express';
import { CreateTramiteDTO } from '../model/dto/create-tramite/create-tramite.dto';
import { TramiteService } from '../service/tramite.service';
import { GetTramiteDTO } from '../model/dto/getTramite.dto';
import { StatusCodes } from 'http-status-codes';
import { debugLog } from '../../common/loggers/logger';
import { UserValidators } from '../../users/midleware/user-validators.midleware';


const log: debug.IDebugger = debug('app: tramite-controller');
const tramiteService: TramiteService = new TramiteService();
class TramiteController {

    private userValidator: UserValidators = new UserValidators();

    async listTramites(req: express.Request, res: express.Response){
        const tramites = await tramiteService.getAllTramites();
        debugLog('req: ', req.body);
        res.status(200).send(tramites);
    }

    async createTramite(req: express.Request, res: express.Response){
        const email =  this.userValidator.validateEmailInHeaders(req)
        const createTramiteDTO: CreateTramiteDTO = req.body;
        log('request: ', createTramiteDTO);
        const tramite = await tramiteService.createTramite(createTramiteDTO);
        res.status(StatusCodes.CREATED).send(tramite);
    }

    async getTramiteById(req:express.Request, res: express.Response){
        log('request: ', req);
        const idTramite: number = +req.params.tramiteId;
        log('id: ', idTramite);
        const tramite: GetTramiteDTO|null = await tramiteService.getTramiteById(idTramite);
        res.status(StatusCodes.OK).send(tramite);
    }
}

export default new TramiteController();