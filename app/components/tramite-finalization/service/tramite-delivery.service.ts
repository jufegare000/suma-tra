
import { EstadoTramiteEnum } from "../../../enums/tramites/estado-tramite.enum";
import { CreateTramiteStateDetailDTO } from "../../tramite-attending/model/dto/create-tramite-state-detail.dto";
import { TramiteStateDetailService } from "../../tramite-attending/service/tramite-state-detail.service";
import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { GetTramiteService } from "../../tramite/service/get-tramite/get-tramite.service";
import { GetUserDTO } from "../../users/model/dto/get-user.dto";

export class TramiteDeliveryService {

    private getTramiteService: GetTramiteService = new GetTramiteService();
    private tramiteRepository: TramiteRepository = new TramiteRepository();
    private tramiteStateDetailService: TramiteStateDetailService = new TramiteStateDetailService();
    async handleTramiteWithTramitadorUser(tramitador: GetUserDTO, tramiteId: number) {
        const currentState: number = EstadoTramiteEnum.PendienteDeInformacion;
        const lastState: number = EstadoTramiteEnum.PendienteDeAprobacion;
        const tramitadorId: number = tramitador.id;
        await this.tramiteRepository.updateTramiteWithTramitadorAndState(tramitador.id, tramiteId, currentState);
        const createTramiteStateDetailDTO: CreateTramiteStateDetailDTO = {
            currentState: currentState,
            lastState: lastState,
            idTramite: tramiteId,
            infInformer: tramitadorId
        }
        await this.tramiteStateDetailService.createTramiteStateDetail(createTramiteStateDetailDTO);
        return await this.getTramiteService.getTramiteById(tramiteId);
    }
}