import express from 'express';
import { ArchivosTramiteDTO } from '../model/dto/create-tramite/archivos-tramite.dto';
import { CreateTramiteDTO } from '../model/dto/create-tramite/create-tramite.dto';
import { CreateTramiteValidator } from '../validators/create-tramite.validator';

class CreateTramiteValidatorMiddleware {

    

    async validateInputFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {

        next();
    }

    validateDocumentsPresentInRequest(req: express.Request,
        res: express.Response, next: express.NextFunction) {
        const createTramiteDTO: CreateTramiteDTO = req.body;
        if (!!!createTramiteDTO.archivos) {
            res.status(400).send({
                error: `files must be present in request`
            })
        } else {
            next();
        }
    }

    validateDocumentsFormatInReques(req: express.Request,
        res: express.Response, next: express.NextFunction) {
        const createTramiteDTO: ArchivosTramiteDTO = req.body.archivos;
        const createTramiteValidator: CreateTramiteValidator = new CreateTramiteValidator();
        const validatorResponse = createTramiteValidator.validateDocuments(createTramiteDTO);
        if (!validatorResponse.status) {
            res.status(400).send({
                error: validatorResponse.message
            })
        } else {
            next();
        }

    }
}

export default new CreateTramiteValidatorMiddleware();