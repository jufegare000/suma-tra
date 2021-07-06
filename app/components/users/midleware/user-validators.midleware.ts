import {Request} from 'express'
import { Logger } from "tslog";
import {StatusCodes} from 'http-status-codes';

const log: Logger = new Logger();

export class UserValidators {
    
    validateEmailInHeaders(request: Request ): string|null {
        const mail: string | string[] | undefined = request.headers['email'];
        log.warn('mail: ',mail);
        if(mail){
            return mail.toString();
        }else{
            return null;
        }
    }

}