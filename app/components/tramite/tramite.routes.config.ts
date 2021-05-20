import {CommonRoutesConfig} from '../common/routes/common.routes.config';
import {Application, Request, Response, NextFunction} from 'express';

export class TramiteRoutes extends CommonRoutesConfig {
    
    constructor(app: Application) {
        super(app, 'TramitesRoutes');
    }

    configureRoutes(): Application {

        this.app.route(`/tramites`)
            .get((req: Request, res: Response) => {
                res.status(200).send(`List of tramites`)
            })
        
        this.app.route(`/tramite/:tramiteId`)
            .all((req: Request, res: Response, next: NextFunction) =>{
                next();
            })
            .get((req: Request, res: Response) => {
                res.status(200).send(`GET request for id: ${req.params.tramiteId}`)
            })
        return this.app;
    }
}