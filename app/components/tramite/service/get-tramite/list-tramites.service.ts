
import { TramiteRepository } from "../../repository/tramite.repository";
import { TramiteModel } from "../../model/db/tamite.model";
import { GetTramiteObjectMapper } from "../object-mappers/get-tramite.objectMapper";
import { GetTramiteDTO } from "../../model/dto/get-tramite/getTramite.dto";
export class ListTramitesService {
    private tramiteRepository: TramiteRepository = new TramiteRepository();
    private getTramiteObjectMapper: GetTramiteObjectMapper = new GetTramiteObjectMapper();

    async getAllPendingTramites(): Promise<GetTramiteDTO[] | null> {

        const tramitesOfSolicitante: TramiteModel[] | null = await this.tramiteRepository.getPendingTramites();
        if (tramitesOfSolicitante) {
            const tramitesDTO: GetTramiteDTO[] = await this.getTramiteObjectMapper.mapArrayToDto(tramitesOfSolicitante);
            return tramitesDTO;
        } else {
            return null
        }
    }
}