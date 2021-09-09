
import { EstadoTramiteEnum } from "../../../enums/tramites/estado-tramite.enum";
import { CreateTramiteStateDetailDTO } from "../../tramite-attending/model/dto/create-tramite-state-detail.dto";
import { TramiteStateDetailService } from "../../tramite-attending/service/tramite-state-detail.service";
import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { GetTramiteService } from "../../tramite/service/get-tramite/get-tramite.service";
import { GetUserDTO } from "../../users/model/dto/get-user.dto";

export class TramiteFinalizationService {

    private getTramiteService: GetTramiteService = new GetTramiteService();
    private tramiteRepository: TramiteRepository = new TramiteRepository();
    private tramiteStateDetailService: TramiteStateDetailService = new TramiteStateDetailService();
    async terminateTramite(tramitador: GetUserDTO, tramiteId: number) {
        const currentState: number = EstadoTramiteEnum.Entregado;
        const lastState: number = EstadoTramiteEnum.PendienteDeEntrega;
        const tramitadorId: number = tramitador.id;
        await this.tramiteRepository.updateTramiteState(tramiteId, currentState);
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