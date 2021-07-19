
import { CreateTramiteDTO } from "../../model/dto/create-tramite/create-tramite.dto";
import { TramiteRepository } from "../../repository/tramite.repository";
import { CreateTramiteObjectMapper } from "../object-mappers/createTramite.objectMapper"
import { CreateDocumentService } from "../create-documents/create-document.service";
import { SolicitanteTramitesService } from "../../../users/services/solicitante-tramites.service";
import { GetUserDTO } from "../../../users/model/dto/get-user.dto";
import { TramiteI } from "../../model/interface/tramite.interface";
import { TramiteModel } from "../../model/db/tamite.model";
import { Logger } from "tslog";

const log: Logger = new Logger();

export class CreateTramiteService {
    private tramiteRepository: TramiteRepository = new TramiteRepository();
    private createTramiteObjectMapper: CreateTramiteObjectMapper = new CreateTramiteObjectMapper();
    private createDocumentService: CreateDocumentService = new CreateDocumentService()
    private solicitanteTramiteService: SolicitanteTramitesService = new SolicitanteTramitesService();

    async createTramite(createTramiteDTO: CreateTramiteDTO, solicitanteMail: string): Promise<CreateTramiteDTO | undefined> {
        const solicitante: GetUserDTO | undefined = await this.solicitanteTramiteService.getUserByMailOrCreate(solicitanteMail);
        try {
            if (solicitante) {
                const tramiteI: TramiteI | undefined = await this.createTramiteObjectMapper.mapDtoToTramiteI(createTramiteDTO, solicitante.id);
                if (tramiteI) {
                    const tramiteCrudo: TramiteModel = await this.tramiteRepository.guardarTramiteModel(tramiteI);
                    const tramiteResponse: CreateTramiteDTO = this.createTramiteObjectMapper.mapModelToDto(tramiteCrudo);
                    await this.createDocumentService.createDocumentsForTramite(createTramiteDTO, tramiteResponse.id);
                    return tramiteResponse;
                }
            }
        } catch (error) {
            log.error(`Error creating tramite: ${error}`);
            throw new Error(`Error creating tramite: ${error}`)
        }
    }
}