import { SumatraResponse } from "../../../common/response/sumatra.response";
import { CreateTramiteDTO } from "../../model/dto/createTramite.dto";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
export class CreateTramiteResponseBuilder {

    async getSumatraResponse(tramiteDTO: CreateTramiteDTO): Promise<SumatraResponse> {
        const response: SumatraResponse = {
            status: StatusCodes.OK,
            message: ReasonPhrases.OK,
            data: tramiteDTO
        };
        return response;
    }
}