import {CommonRoutesConfig} from '../common/routes/common.routes.config';
import {Application, Request, Response, NextFunction} from 'express';

export class UsersRoutes extends CommonRoutesConfig {
    
    constructor(app: Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): Application {

        this.app
            .route(`/users`)
            .get((req: Request, res: Response) => {
                res.status(200).send(`List of users`)
            })
            .post((req: Request, res: Response) => {
                res.status(200).send(`Post of users`)
            });
        
        this.app.route(`/users/:userId`)
            .all((req: Request, res: Response, next: NextFunction) =>{
                
                next();
            })
            .get((req: Request, res: Response) => {
                res.status(200).send(`GET request for id: ${req.params.userId}`)
            })
        return this.app;
    }
}