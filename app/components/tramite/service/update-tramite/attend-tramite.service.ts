import { GetUserDTO } from "../../../users/model/dto/get-user.dto";
import { TramiteModel } from "../../model/db/tamite.model";
import { GetTramiteDTO } from "../../model/dto/get-tramite/getTramite.dto";
import { TramiteRepository } from "../../repository/tramite.repository";
import { GetTramiteService } from "../get-tramite/get-tramite.service";
import { CreateTramiteObjectMapper } from "../object-mappers/createTramite.objectMapper";

export class AttendTramiteService {

    private getTramiteService: GetTramiteService = new GetTramiteService();
    private tramiteRepository: TramiteRepository = new TramiteRepository()
    private createTramiteObjectMapper: CreateTramiteObjectMapper = new CreateTramiteObjectMapper()
    async handleTramiteWithTramitadorUser(tramitador: GetUserDTO, tramiteId: number) {
        const tramite = await this.tramiteRepository.updateTramiteWithTramitadorAndState(tramitador.id, tramiteId, 2);
        console.log(tramite[0])
    }
}