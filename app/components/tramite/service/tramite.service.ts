import { CreateTramiteDTO } from "../model/dto/createTramite.dto";
import { SumatraResponse } from "../../common/response/sumatra.response";
import { CreateTramiteResponseBuilder } from "./create-tramite/createTramite.responsebuilder";

export class TramiteService {

    private createTramiteResponseBuilder: CreateTramiteResponseBuilder = new CreateTramiteResponseBuilder();
/*
    async createTramite(createTramiteDTO: CreateTramiteDTO): Promise<SumatraResponse> {
        const response = this.createTramiteResponseBuilder.getSumatraResponse(null, );
        // first validate tramite creation
        // get entity and map values
        // map response
        // return tramite creation
        
    }
*/
}