
import { CreateTramiteDTO } from "../../model/dto/create-tramite/create-tramite.dto";
import { TramiteRepository } from "../../repository/tramite.repository";
import { CreateTramiteObjectMapper } from "../object-mappers/createTramite.objectMapper"
import { CreateDocumentService } from "../create-documents/create-document.service";
import { SolicitanteTramitesService } from "../../../users/services/solicitante-tramites.service";
import { GetUserDTO } from "../../../users/model/dto/get-user.dto";
import { TramiteI } from "../../model/interface/tramite.interface";
import { TramiteModel } from "../../model/db/tamite.model";
import { Logger } from "tslog";
import { TramiUserService } from "../../../users/services/trami-user.service";
import { UserEnum } from "../../../../enums/user/solicitante.enum";

const log: Logger = new Logger();

export class CreateTramiteService {
    private tramiteRepository: TramiteRepository = new TramiteRepository();
    private createTramiteObjectMapper: CreateTramiteObjectMapper = new CreateTramiteObjectMapper();
    private createDocumentService: CreateDocumentService = new CreateDocumentService()
    private solicitanteTramiteService: SolicitanteTramitesService = new SolicitanteTramitesService();
    private tramiUserService: TramiUserService = new TramiUserService();
    private tramiteCreated: TramiteModel | null = null;

    async createTramite(createTramiteDTO: CreateTramiteDTO, solicitanteMail: string): Promise<CreateTramiteDTO | undefined> {
        
        try {
            const userDto: GetUserDTO = await this.tramiUserService.validateTramiUserInDB(solicitanteMail, UserEnum.solicitanteRole);
            if (userDto) {
                const tramiteI: TramiteI | undefined = await this.createTramiteObjectMapper.mapDtoToTramiteI(createTramiteDTO, userDto.id);
                log.info(`id solicitante: ${tramiteI?.solicitante_id}`)
                if (tramiteI) {
                    const tramiteCrudo: TramiteModel = await this.tramiteRepository.guardarTramiteModel(tramiteI);
                    let tramiteResponse: CreateTramiteDTO = this.createTramiteObjectMapper.mapModelToDto(tramiteCrudo);
                    tramiteResponse.archivos = createTramiteDTO.archivos;
                    this.tramiteCreated = tramiteCrudo;
                    await this.createDocumentService.createDocumentsForTramite(tramiteResponse);
                    
                    return tramiteResponse;
                }
            }
        } catch (error) {
            log.error(`Error creating tramite: ${error}`);
            if (this.tramiteCreated)
                this.tramiteRepository.eliminarTramite(this.tramiteCreated)
            throw new Error(`Error creating tramite: ${error}`);
        }
    }

}