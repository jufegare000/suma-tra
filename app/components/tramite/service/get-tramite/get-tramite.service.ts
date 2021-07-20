import { TramiteRepository } from "../../repository/tramite.repository";
import { TramiteModel } from "../../model/db/tamite.model";
import { GetTramiteObjectMapper } from "../object-mappers/get-tramite.objectMapper";
import { GetTramiteDTO } from "../../model/dto/get-tramite/getTramite.dto";
import { GetDocumentsTramiteService } from "./get-documents.service";
import { GetDocumentosTramiteDTO } from "../../model/dto/get-tramite/get-documetos-tramite.dto";

export class GetTramiteService {
    private tramiteRepository: TramiteRepository = new TramiteRepository();
    private getTramiteObjectMapper: GetTramiteObjectMapper = new GetTramiteObjectMapper();
    private getDocumentsService: GetDocumentsTramiteService = new GetDocumentsTramiteService()

    async getTramiteById(tramiteId: number): Promise<GetTramiteDTO | null> {
        try {
            const tramiteCrudo: TramiteModel | null = await this.tramiteRepository.getTramiteById(tramiteId);
            if (tramiteCrudo) {
                let tramiteDTO: GetTramiteDTO = await this.getTramiteObjectMapper.mapModelToDto(tramiteCrudo);

                const documents: GetDocumentosTramiteDTO | undefined = await this.getDocumentsService.getDocumentsFromTramiteByIdTramite(tramiteDTO.id)
                tramiteDTO.archivos = documents;
                return tramiteDTO;
            }
        } catch (ex) {
            
            throw new Error(`Can't get Tramite`);
        }
        return null;
    }
}