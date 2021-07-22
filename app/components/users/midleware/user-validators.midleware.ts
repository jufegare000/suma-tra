import { Request } from 'express'
import { Logger } from "tslog";
import { GetUserDTO } from '../model/dto/get-user.dto';
import { TramiUserService } from '../services/trami-user.service';

const log: Logger = new Logger();


export class UserValidators {

    private tramiUserService: TramiUserService = new TramiUserService();

    async validateEmailInHeaders(request: Request, role: string): Promise<GetUserDTO | null> {
        const mail: string | string[] | undefined = request.headers['email'];
        log.warn('mail: ', mail);
        if (mail) {
            mail.toString();
            return await this.tramiUserService.validateTramiUserInDB(mail.toString(), role);
        } else {
            log.error(`Mail must be present in headers`);
            return null
        }
    }
}