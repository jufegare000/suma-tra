import { Logger } from "tslog";
import express from 'express';
import { SolicitanteTramitesService } from "../services/solicitante-tramites.service";

const log: Logger = new Logger();

const tramiteSolicitanteService: SolicitanteTramitesService = new SolicitanteTramitesService();

class SolicitanteController {

    async getSolicitanteTramites(req: express.Request, res: express.Response){
        const mail: string | string[] | undefined = req.headers['email'];
        log.warn('mail: ',mail);
        if(mail){
            const tramites = await tramiteSolicitanteService.getTramitesSolicitanteByMail(mail.toString());
            log.info('req: ', req.body);
            res.status(200).send(tramites);
        }
        
    }
}

export default new SolicitanteController();