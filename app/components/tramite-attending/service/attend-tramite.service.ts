
import { url } from "inspector";
import { EstadoTramiteEnum } from "../../../enums/tramites/estado-tramite.enum";
import { TramiteRepository } from "../../tramite/repository/tramite.repository";
import { GetTramiteService } from "../../tramite/service/get-tramite/get-tramite.service";
import { TramiteStateDetailI } from "../../tramte-management/model/interface/detalle-estado-tramite.interface";
import { TramiteStateDetailRepository } from "../../tramte-management/repository/tramite-state-detail.repository";
import { GetUserDTO } from "../../users/model/dto/get-user.dto";
import { CreateTramiteStateDetailDTO } from "../model/dto/create-tramite-state-detail.dto";
import { TramiteStateDetailService } from "./tramite-state-detail.service";


export class AttendTramiteService {

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