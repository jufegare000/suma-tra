import { SumatraResponse } from "../../../common/response/sumatra.response";
import { CreateTramiteDTO } from "../../model/dto/createTramite.dto";
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { TramiteModel } from "../../model/db/tamite.model";

export class CreateTramiteResponseBuilder {

    async getSumatraResponse(tramiteDTO: CreateTramiteDTO): Promise<SumatraResponse> {
        const response: SumatraResponse = {
            status: StatusCodes.OK,
            message: ReasonPhrases.OK,
            data: tramiteDTO
        };
        return response;
    }

    /*mapTramiteModelToDto(tramiteModel: TramiteModel): CreateTramiteDTO {
        const createTramiteDTO: CreateTramiteDTO = {
            id:tramiteModel.ge
        }
    }*/
}