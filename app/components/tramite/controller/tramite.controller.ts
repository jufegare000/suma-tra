import debug from 'debug';
import express from 'express';
import { TramiteService } from '../service/tramite.service';

const log: debug.IDebugger = debug('app: tramite-controller');
const tramiteService: TramiteService = new TramiteService();
class TramiteController {

    async listTramites(req: express.Request, res: express.Response){
        const tramites = tramiteService.getAllTramites();
    }
}

export default new TramiteController();