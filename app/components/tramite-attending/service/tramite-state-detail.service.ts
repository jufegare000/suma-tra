import { TramiteStateDetailModel } from "../../tramte-management/model/bd/detalle-estado-tramite.model";
import { TramiteStateDetailI } from "../../tramte-management/model/interface/detalle-estado-tramite.interface";
import { TramiteStateDetailRepository } from "../../tramte-management/repository/tramite-state-detail.repository";
import { CreateTramiteStateDetailDTO } from "../model/dto/create-tramite-state-detail.dto";


export class TramiteStateDetailService {

    private tramiteStateDetailRepo: TramiteStateDetailRepository = new TramiteStateDetailRepository();

    async createTramiteStateDetail(createTramiteStateDetailDTO: CreateTramiteStateDetailDTO): Promise<TramiteStateDetailModel> {
        const {idTramite, currentState, lastState, infInformer, observations } = createTramiteStateDetailDTO
        const tramiteStateDetail: TramiteStateDetailI = {
            id_tramite: idTramite,
            id_estado_anterior: lastState,
            id_estado_actual: currentState,
            id_informador: infInformer,
            fecha_cambio_estado: new Date(),
            observaciones: observations
        };
        const tramiteStatedetailnew: TramiteStateDetailModel = await this.tramiteStateDetailRepo.saveTramiteStateDetail(tramiteStateDetail);
        
        return tramiteStatedetailnew;
    }

    async getLastTramiteStateDetailByIdAndState(idTramite: number, steteDetail: number): Promise<TramiteStateDetailModel| null> {
        return await this.tramiteStateDetailRepo.getTramiteStateDetailByLastStateAndIdTramite(idTramite, steteDetail);
    }
}