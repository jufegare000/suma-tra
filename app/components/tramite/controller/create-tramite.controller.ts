
import express from 'express';
import { CreateTramiteDTO } from '../model/dto/create-tramite/create-tramite.dto';
import { UserValidators } from '../../users/midleware/user-validators.midleware';
import { CreateTramiteService } from '../service/create-tramite/create-tramite.service';
import { BaseController } from '../../../shared/infra/http/models/base-controller';

import { Logger } from "tslog";

const log: Logger = new Logger();

const createTramiteService: CreateTramiteService = new CreateTramiteService();
const userValidator: UserValidators = new UserValidators();

export class CreateTramiteController extends BaseController {

    private useCase: CreateTramiteService;
    // private createTramiteUseCase: CreateTramiteUseCase;

    constructor(useCase: CreateTramiteService) {
        super();
        this.useCase = useCase;
    }

    protected async executeImpl(req: express.Request, res: express.Response): Promise<void | any>{
        
        try {
            const email =  await this.validateUser(req, res);
            log.info('getted email: ' + email)
            const createTramiteDTO: CreateTramiteDTO = req.body;
            const result = await this.useCase.createTramite(createTramiteDTO, email.toString());
            if(result){
                return this.ok(res, result);
            }           
        } catch (error: any) {
            return this.clientError(res, error.toString());
        }   
        return this.clientError(res, 'Unexpected error');
    }

    async validateUser(req: express.Request, res: express.Response) {
        const email =  userValidator.validateEmailInHeaders(req);
        if(!email) {
            return this.clientError(res, "Invalid email")
        }else{
            return email;
        }
    }
}