import { GetUserDTO } from "../../../users/model/dto/get-user.dto";
import { GetUserObjectMapper } from "../../../users/services/object-mapper/get-user.objectMapper";
import { TramiteModel } from "../../model/db/tamite.model";
import { UpdateTramiteDTO } from "../../model/dto/update-tramite/update-tramite.dto";
import { TramiteRepository } from "../../repository/tramite.repository";
import { UpdateTramiteDocumentsService } from "./update-documents/update-tramite-documents.service";

export class UpdateTramiteService {
    private tramiteRepo: TramiteRepository = new TramiteRepository();
    private updateTramiteDocumentsService: UpdateTramiteDocumentsService = new UpdateTramiteDocumentsService()
    private getUserObjectMapper: GetUserObjectMapper = new GetUserObjectMapper()

    async updateTramite(updateTramiteDto: UpdateTramiteDTO, getUserDto: GetUserDTO): Promise<TramiteModel|null> {
        await this.tramiteRepo.updateGeneralInformation(updateTramiteDto);
        
        if (updateTramiteDto.archivos) {
            
            const tramiteUser = this.getUserObjectMapper.mapDTOToInterface(getUserDto);
            
            await this.updateTramiteDocumentsService.checkWhichDocumentsToUpdate(updateTramiteDto.archivos, tramiteUser,updateTramiteDto.id)
        }
        return this.tramiteRepo.getTramiteById(updateTramiteDto.id);
    }
}