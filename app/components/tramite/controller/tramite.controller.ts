import debug from 'debug';
import {Request, Response} from 'express';
import { CreateTramiteDTO } from '../model/dto/createTramite.dto';
import { TramiteService } from '../service/tramite.service';
import { GetTramiteDTO } from '../model/dto/getTramite.dto';
import { StatusCodes } from 'http-status-codes';
import { debugLog } from '../../common/loggers/logger';

const log: debug.IDebugger = debug('app: tramite-controller');
const tramiteService: TramiteService = new TramiteService();
class TramiteController {

    async listTramites(req: Request, res: Response){
        const tramites = await tramiteService.getAllTramites();
        debugLog('req: ', req.body);
        res.status(200).send(tramites);
    }

    async createTramite(req:Request, res: Response){
        console.log('request: ', req);
        const createTramiteDTO: CreateTramiteDTO = req.body.createTramite;
        res.status(201).send('holi');
    }

    async getTramiteById(req:Request, res: Response){
        console.log('request: ', req);
        const idTramite: number = +req.params.tramiteId;
        console.log('id: ', idTramite);
        const tramite: GetTramiteDTO|null = await tramiteService.getTramiteById(idTramite);
        res.status(StatusCodes.OK).send(tramite);
    }
}

export default new TramiteController();