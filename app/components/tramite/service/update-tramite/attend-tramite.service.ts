import { GetUserDTO } from "../../../users/model/dto/get-user.dto";
import { TramiteRepository } from "../../repository/tramite.repository";
import { GetTramiteService } from "../get-tramite/get-tramite.service";

export class AttendTramiteService {

    private getTramiteService: GetTramiteService = new GetTramiteService();
    private tramiteRepository: TramiteRepository = new TramiteRepository()
   
    async handleTramiteWithTramitadorUser(tramitador: GetUserDTO, tramiteId: number) {
        await this.tramiteRepository.updateTramiteWithTramitadorAndState(tramitador.id, tramiteId, 2);
        return await this.getTramiteService.getTramiteById(tramiteId);
    }
}