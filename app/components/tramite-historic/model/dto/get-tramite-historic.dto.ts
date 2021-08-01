import { TramiteStateDetailDto } from "./tramite-state-detail.dto";

export interface GetTramiteHistoricDTO {
    idTramite: number;
    tramiteStateDetail: TramiteStateDetailDto
}