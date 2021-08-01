
import express from 'express';
import { BaseController } from '../../../shared/infra/http/models/base-controller';
import { Logger } from "tslog";

const log: Logger = new Logger();

class GetTramiteHistoricController extends BaseController {


    async executeImpl(req: express.Request, res: express.Response) {

    }
}
export default new GetTramiteHistoricController();