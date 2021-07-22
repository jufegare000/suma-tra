import { CreateTramiteDTO } from "../../model/dto/create-tramite/create-tramite.dto";
import { TramiteRepository } from "../../repository/tramite.repository";
import { TramiteModel } from "../../model/db/tamite.model";
import { GetTramiteObjectMapper } from "../object-mappers/get-tramite.objectMapper";
import { GetTramiteDTO } from "../../model/dto/get-tramite/getTramite.dto";
import { CreateTramiteObjectMapper } from "../object-mappers/createTramite.objectMapper"
import { CreateDocumentService } from "../create-documents/create-document.service";
import { GetUserDTO } from "../../../users/model/dto/get-user.dto";

export class TramiteService {
    private tramiteRepository: TramiteRepository = new TramiteRepository();
    private getTramiteObjectMapper: GetTramiteObjectMapper = new GetTramiteObjectMapper();
    private createTramiteObjectMapper: CreateTramiteObjectMapper = new CreateTramiteObjectMapper();
    private createDocumentService: CreateDocumentService = new CreateDocumentService()

    async createTramite(createTramiteDTO: CreateTramiteDTO, solicitante: GetUserDTO) {
        try {
            const tramiteI = this.createTramiteObjectMapper.mapDtoToTramiteI(createTramiteDTO, solicitante.id);

            const tramiteCrudo = await this.tramiteRepository.guardarTramiteModel(tramiteI);
            const tramiteResponse = this.createTramiteObjectMapper.mapModelToDto(tramiteCrudo);
            await this.createDocumentService.createDocumentsForTramite(tramiteResponse);
            return tramiteResponse;

        } catch (error) {
            throw new Error(`Can not create tramite because: ${error}`)
        }
    }

    async getTramiteById(tramiteId: number): Promise<GetTramiteDTO | null> {
        try {
            const tramiteCrudo: TramiteModel | null = await this.tramiteRepository.getTramiteById(tramiteId);
            if (tramiteCrudo) {
                const tramiteDTO: GetTramiteDTO = await this.getTramiteObjectMapper.mapModelToDto(tramiteCrudo);

                return tramiteDTO;
            }
        } catch (ex) {
            throw new Error(`Can't get Tramite`);
        }
        return null;
    }

    async getAllTramites() {
        return await this.tramiteRepository.getAllTramites();
    }
}