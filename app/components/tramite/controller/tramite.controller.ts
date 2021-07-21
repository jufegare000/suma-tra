import debug from 'debug';
import express from 'express';
import { CreateTramiteDTO } from '../model/dto/create-tramite/create-tramite.dto';
import { GetTramiteDTO } from '../model/dto/get-tramite/getTramite.dto';
import { StatusCodes } from 'http-status-codes';
import { UserValidators } from '../../users/midleware/user-validators.midleware';
import { CreateTramiteService } from '../service/create-tramite/create-tramite.service';
import { GetTramiteService } from '../service/get-tramite/get-tramite.service';

const log: debug.IDebugger = debug('app: tramite-controller');
const createTramiteService: CreateTramiteService = new CreateTramiteService();
const getTramiteService: GetTramiteService = new GetTramiteService();
const userValidator: UserValidators = new UserValidators();
class TramiteController {

    async getTramiteById(req:express.Request, res: express.Response){
        log('request: ', req);
        const idTramite: number = +req.params.tramiteId;
        log('id: ', idTramite);
        const tramite: GetTramiteDTO|null = await getTramiteService.getTramiteById(idTramite);
        if(tramite){
            res.status(StatusCodes.OK).send(tramite);
        }else{
            res.status(StatusCodes.NOT_FOUND).send("not found");
        }
        
    }
}

export default new TramiteController();