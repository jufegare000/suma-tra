
import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { GetTramiteService } from "../../tramite/service/get-tramite/get-tramite.service";
import { GetUserDTO } from "../../users/model/dto/get-user.dto";


export class AttendTramiteService {

    private getTramiteService: GetTramiteService = new GetTramiteService();
    private tramiteRepository: TramiteRepository = new TramiteRepository()
   
    async handleTramiteWithTramitadorUser(tramitador: GetUserDTO, tramiteId: number) {
        await this.tramiteRepository.updateTramiteWithTramitadorAndState(tramitador.id, tramiteId, 2);
        return await this.getTramiteService.getTramiteById(tramiteId);
    }
}